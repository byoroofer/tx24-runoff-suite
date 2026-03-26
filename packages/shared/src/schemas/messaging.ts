import { z } from "zod";

export const messageTemplateSchema = z.object({
  id: z.string(),
  tenantId: z.string().uuid(),
  version: z.number().int().positive(),
  body: z.string().min(1),
  disclaimer: z.string().min(1),
  channel: z.enum(["sms", "email"])
});

export const outboundMessageSchema = z.object({
  tenantId: z.string().uuid(),
  contactId: z.string().uuid(),
  to: z.string().min(10),
  senderId: z.string(),
  body: z.string().min(1),
  channel: z.enum(["sms", "email"]),
  p2pMode: z.boolean().default(false),
  humanActionRecordedAt: z.string().datetime().optional()
});

export const inboundMessageSchema = z.object({
  from: z.string().min(10),
  to: z.string().min(10),
  body: z.string().min(1),
  tenantId: z.string().uuid().optional()
});

