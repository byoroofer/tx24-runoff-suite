import { Router } from "express";
import { assertSmsConsent, consentLedgerEntrySchema, outboundMessageSchema } from "@tx24/shared";
import { recordAudit, recordMessage, isSuppressed, listMessages } from "../services/memory-store";
import { z } from "zod";

const sendBodySchema = z.object({
  message: outboundMessageSchema,
  consentEntry: consentLedgerEntrySchema.optional()
});

export const messagingRouter = Router();

messagingRouter.get("/inbox", (_req, res) => {
  res.json({ items: listMessages() });
});

messagingRouter.post("/send-single", (req, res) => {
  const parsed = sendBodySchema.parse(req.body);
  const consent = assertSmsConsent({
    consentEntry: parsed.consentEntry,
    isSuppressed: isSuppressed(parsed.message.to)
  });

  if (!consent.ok) {
    return res.status(422).json({ ok: false, error: consent.code, reason: consent.reason });
  }

  recordMessage({
    tenantId: parsed.message.tenantId,
    to: parsed.message.to,
    body: parsed.message.body,
    channel: parsed.message.channel,
    senderId: parsed.message.senderId
  });
  recordAudit("message_enqueued", `Queued single message to ${parsed.message.to}`);

  return res.status(202).json({ ok: true, queued: 1 });
});

messagingRouter.post("/send-batch", (req, res) => {
  const body = z.array(sendBodySchema).parse(req.body);
  const failures: Array<{ to: string; reason: string }> = [];
  let queued = 0;

  for (const item of body) {
    const consent = assertSmsConsent({
      consentEntry: item.consentEntry,
      isSuppressed: isSuppressed(item.message.to)
    });

    if (!consent.ok) {
      failures.push({ to: item.message.to, reason: consent.reason });
      continue;
    }

    recordMessage({
      tenantId: item.message.tenantId,
      to: item.message.to,
      body: item.message.body,
      channel: item.message.channel,
      senderId: item.message.senderId
    });
    queued += 1;
  }

  recordAudit("message_batch_enqueued", `Queued ${queued} messages`);

  return res.status(202).json({ ok: true, queued, failures });
});

