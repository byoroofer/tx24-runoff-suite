import { expect, test } from "@jest/globals";
import { assertSmsConsent } from "../../packages/shared/src";

const validConsent = {
  tenantId: "00000000-0000-0000-0000-000000000001",
  contactId: "00000000-0000-0000-0000-000000000002",
  channel: "sms" as const,
  status: "granted" as const,
  proof: {
    textShown: "By providing your number you agree to receive campaign texts.",
    timestamp: "2026-04-01T12:00:00.000Z",
    sourceUrl: "https://example.org/signup",
    sourceDomain: "example.org",
    userAgent: "Mozilla/5.0"
  }
};

test("blocks sends without provable consent", () => {
  const result = assertSmsConsent({
    consentEntry: undefined,
    isSuppressed: false
  });

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.code).toBe("CONSENT_REQUIRED");
  }
});

test("allows sends with provable consent", () => {
  const result = assertSmsConsent({
    consentEntry: validConsent,
    isSuppressed: false
  });

  expect(result).toEqual({ ok: true });
});
