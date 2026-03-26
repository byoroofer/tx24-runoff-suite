import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  ALLOW_INSECURE_WEBHOOKS: z.enum(["true", "false"]).default("false")
});

export type ApiEnv = z.infer<typeof envSchema>;

export function getEnv(): ApiEnv {
  return envSchema.parse(process.env);
}

