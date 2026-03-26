import { Worker } from "bullmq";
import pino from "pino";
import { assertSmsConsent, consentLedgerEntrySchema, outboundMessageSchema } from "@tx24/shared";
import { z } from "zod";
import { sendViaMockTwilio } from "../providers/twilio-mock";

const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });

const queuedMessageSchema = z.object({
  message: outboundMessageSchema,
  consentEntry: consentLedgerEntrySchema.optional(),
  isSuppressed: z.boolean().default(false)
});

function buildConnection(redisUrl: string) {
  const parsed = new URL(redisUrl);

  return {
    host: parsed.hostname,
    port: Number(parsed.port || 6379),
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    maxRetriesPerRequest: null
  };
}

export function createMessagingWorker(redisUrl: string) {
  return new Worker(
    "messaging-dispatch",
    async (job) => {
      const parsed = queuedMessageSchema.parse(job.data);
      const consent = assertSmsConsent({
        consentEntry: parsed.consentEntry,
        isSuppressed: parsed.isSuppressed
      });

      if (!consent.ok) {
        logger.warn({ jobId: job.id, code: consent.code }, "Message blocked before provider send");
        throw new Error(consent.code);
      }

      const result = await sendViaMockTwilio({
        to: parsed.message.to,
        body: parsed.message.body,
        senderId: parsed.message.senderId
      });

      logger.info({ jobId: job.id, sid: result.sid }, "Message dispatched");
      return result;
    },
    {
      connection: buildConnection(redisUrl),
      concurrency: 5,
      limiter: {
        max: 10,
        duration: 1000
      }
    }
  );
}
