import { z } from "zod";

export const consentProofSchema = z.object({
  textShown: z.string().min(10),
  timestamp: z.string().datetime(),
  sourceUrl: z.string().url(),
  sourceDomain: z.string().min(3),
  userAgent: z.string().min(5),
  ipAddress: z.string().optional()
});

export const consentLedgerEntrySchema = z.object({
  tenantId: z.string().uuid(),
  contactId: z.string().uuid(),
  channel: z.enum(["sms", "email"]),
  status: z.enum(["granted", "revoked"]),
  proof: consentProofSchema
});

export const disclosureSchema = z.object({
  paidForBy: z.string().min(3),
  authorizedBy: z.string().min(3),
  websiteUrl: z.string().url().optional(),
  linkToDisclosureAllowed: z.boolean().default(false)
});

export const contentAssetSchema = z.object({
  id: z.string(),
  isAltered: z.boolean().default(false),
  isDeepFake: z.boolean().default(false),
  alteredImageLabelApplied: z.boolean().default(false),
  complianceApproved: z.boolean().default(false)
});

export const publishGovernanceInputSchema = z.object({
  draftId: z.string(),
  body: z.string().min(40),
  provenanceSources: z.array(z.string().url()).min(1),
  candidateBodySamples: z.array(z.string()).default([]),
  similarityThreshold: z.number().min(0).max(1).default(0.85),
  assets: z.array(contentAssetSchema).default([])
});

