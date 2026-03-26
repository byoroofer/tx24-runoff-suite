import { z } from "zod";
import { ERROR_CODES } from "../constants/errors";
import { consentLedgerEntrySchema } from "../schemas/compliance";

export type ConsentLedgerEntry = z.infer<typeof consentLedgerEntrySchema>;

export type ConsentCheckResult =
  | { ok: true }
  | { ok: false; code: string; reason: string };

export function hasProvableSmsConsent(entry: ConsentLedgerEntry | null | undefined): boolean {
  if (!entry) return false;
  return (
    entry.channel === "sms" &&
    entry.status === "granted" &&
    entry.proof.textShown.length >= 10 &&
    entry.proof.sourceUrl.length > 0 &&
    entry.proof.sourceDomain.length > 0 &&
    entry.proof.userAgent.length > 0
  );
}

export function assertSmsConsent(input: {
  consentEntry: ConsentLedgerEntry | null | undefined;
  isSuppressed: boolean;
}): ConsentCheckResult {
  if (input.isSuppressed) {
    return {
      ok: false,
      code: ERROR_CODES.smsOptedOut,
      reason: "Recipient is suppressed due to STOP or explicit opt-out."
    };
  }

  if (!hasProvableSmsConsent(input.consentEntry)) {
    return {
      ok: false,
      code: ERROR_CODES.consentRequired,
      reason: "Prior express consent proof is required before SMS send."
    };
  }

  return { ok: true };
}
