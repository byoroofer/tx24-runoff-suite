import { ALTERED_IMAGE_LABEL, PRE_ELECTION_WARNING_WINDOW_DAYS } from "../constants/compliance";
import { ERROR_CODES } from "../constants/errors";
import { publishGovernanceInputSchema } from "../schemas/compliance";

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function jaccardSimilarity(left: string, right: string): number {
  const leftSet = new Set(normalize(left));
  const rightSet = new Set(normalize(right));
  const intersection = [...leftSet].filter((token) => rightSet.has(token)).length;
  const union = new Set([...leftSet, ...rightSet]).size;

  return union === 0 ? 0 : intersection / union;
}

export function daysBeforeElection(electionDayIso: string, currentIso: string): number {
  const electionDay = new Date(electionDayIso);
  const currentDay = new Date(currentIso);
  const ms = electionDay.getTime() - currentDay.getTime();

  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function evaluatePublication(input: ReturnType<typeof publishGovernanceInputSchema.parse>) {
  const similarityScore = Math.max(
    0,
    ...input.candidateBodySamples.map((sample) => jaccardSimilarity(input.body, sample))
  );

  const reasons: string[] = [];

  if (input.provenanceSources.length === 0) {
    reasons.push(ERROR_CODES.missingProvenance);
  }

  if (similarityScore >= input.similarityThreshold) {
    reasons.push(ERROR_CODES.similarityBlocked);
  }

  for (const asset of input.assets) {
    if ((asset.isAltered || asset.isDeepFake) && !asset.complianceApproved) {
      reasons.push(ERROR_CODES.alteredMediaApprovalRequired);
    }

    if (asset.isAltered && !asset.alteredImageLabelApplied) {
      reasons.push(`${ERROR_CODES.alteredMediaApprovalRequired}:${ALTERED_IMAGE_LABEL}`);
    }
  }

  return {
    blocked: reasons.length > 0,
    reasons,
    similarityScore
  };
}

export function buildPreElectionWarning(electionDayIso: string, currentIso: string): string | null {
  const daysRemaining = daysBeforeElection(electionDayIso, currentIso);
  if (daysRemaining <= PRE_ELECTION_WARNING_WINDOW_DAYS) {
    return `Altered or AI-generated political media is inside the ${PRE_ELECTION_WARNING_WINDOW_DAYS}-day warning window and requires compliance review.`;
  }

  return null;
}

