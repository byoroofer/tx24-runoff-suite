import { expect, test } from "@jest/globals";
import { evaluatePublication } from "../../packages/shared/src";

test("blocks near-duplicate content", () => {
  const result = evaluatePublication({
    draftId: "draft-1",
    body: "Working families in TX-24 deserve affordable healthcare and lower costs now.",
    provenanceSources: ["https://example.org/source"],
    candidateBodySamples: [
      "Working families in TX-24 deserve affordable healthcare and lower costs now."
    ],
    similarityThreshold: 0.8,
    assets: []
  });

  expect(result.blocked).toBe(true);
  expect(result.reasons).toContain("SIMILARITY_BLOCKED");
});

test("blocks altered images without label or compliance approval", () => {
  const result = evaluatePublication({
    draftId: "draft-2",
    body: "Original reporting and campaign updates with source links and district value.",
    provenanceSources: ["https://example.org/source"],
    candidateBodySamples: [],
    similarityThreshold: 0.8,
    assets: [
      {
        id: "asset-1",
        isAltered: true,
        isDeepFake: false,
        alteredImageLabelApplied: false,
        complianceApproved: false
      }
    ]
  });

  expect(result.blocked).toBe(true);
  expect(
    result.reasons.some((reason: string) => reason.startsWith("ALTERED_MEDIA_APPROVAL_REQUIRED"))
  ).toBe(true);
});
