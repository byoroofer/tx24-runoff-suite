import type { Request } from "express";
import twilio from "twilio";

export function validateTwilioSignature(input: {
  req: Request;
  authToken?: string;
  allowInsecureWebhooks: boolean;
}): boolean {
  if (!input.authToken) {
    return input.allowInsecureWebhooks;
  }

  const signature = input.req.header("x-twilio-signature");
  if (!signature) {
    return false;
  }

  const url = `${input.req.protocol}://${input.req.get("host")}${input.req.originalUrl}`;
  const params = input.req.body as Record<string, string>;

  return twilio.validateRequest(input.authToken, signature, url, params);
}

