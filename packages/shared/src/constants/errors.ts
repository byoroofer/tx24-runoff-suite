export const ERROR_CODES = {
  consentRequired: "CONSENT_REQUIRED",
  smsOptedOut: "SMS_OPTED_OUT",
  missingDisclosure: "MISSING_DISCLOSURE",
  missingProvenance: "MISSING_PROVENANCE",
  similarityBlocked: "SIMILARITY_BLOCKED",
  alteredMediaApprovalRequired: "ALTERED_MEDIA_APPROVAL_REQUIRED",
  twilioSignatureInvalid: "TWILIO_SIGNATURE_INVALID",
  forbidden: "FORBIDDEN"
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

