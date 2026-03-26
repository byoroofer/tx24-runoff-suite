import { Router } from "express";
import { ERROR_CODES, shouldSuppressFromInbound } from "@tx24/shared";
import { getEnv } from "../env";
import { markSuppressed, recordAudit } from "../services/memory-store";
import { validateTwilioSignature } from "../services/twilio-validation";

export const webhooksRouter = Router();

webhooksRouter.post("/twilio/inbound", (req, res) => {
  const env = getEnv();
  const valid = validateTwilioSignature({
    req,
    authToken: env.TWILIO_AUTH_TOKEN,
    allowInsecureWebhooks: env.ALLOW_INSECURE_WEBHOOKS === "true"
  });

  if (!valid) {
    return res.status(403).json({ ok: false, error: ERROR_CODES.twilioSignatureInvalid });
  }

  const from = String(req.body.From ?? "");
  const body = String(req.body.Body ?? "");

  if (shouldSuppressFromInbound(body)) {
    markSuppressed(from);
    recordAudit("stop_received", `STOP suppression applied to ${from}`);
  }

  return res.status(200).json({ ok: true });
});

webhooksRouter.post("/twilio/status", (req, res) => {
  const env = getEnv();
  const valid = validateTwilioSignature({
    req,
    authToken: env.TWILIO_AUTH_TOKEN,
    allowInsecureWebhooks: env.ALLOW_INSECURE_WEBHOOKS === "true"
  });

  if (!valid) {
    return res.status(403).json({ ok: false, error: ERROR_CODES.twilioSignatureInvalid });
  }

  recordAudit("twilio_status", JSON.stringify(req.body));
  return res.status(200).json({ ok: true });
});

