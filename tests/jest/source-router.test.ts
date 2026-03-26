import { expect, test } from "@jest/globals";
import {
  getSourceRoutingSnapshot,
  listSeededSourceRoutingExamples,
  parseSourceSubmissionBatch,
  routeSourceSubmission
} from "../../packages/shared/src";

test("routes source submissions into issue boards and feeder sites", () => {
  const routed = routeSourceSubmission({
    url: "https://www.lonestarleft.com/p/tx24-is-sitting-right-there",
    title: "TX24 Is Sitting Right There",
    source: "Lone Star Left"
  });

  expect(routed.recommendedVisibility).toBe("publishable");
  expect(routed.matchedIssueBoards).toContain("preserving-democracy");
  expect(routed.matchedFeederSites.length).toBeGreaterThan(0);
  expect(routed.matchedAnchorSlugs).toContain("lonestarleft-tx24-sitting-right-there");
});

test("keeps opposition-research style inputs admin-only", () => {
  const routed = routeSourceSubmission({
    url: "https://example.com/research-note",
    title: "Kevin Burge advisor title verification",
    notes: "Need evidence before publishing"
  });

  expect(routed.recommendedVisibility).toBe("admin-only");
  expect(routed.riskFlags.length).toBeGreaterThan(0);
});

test("builds seeded routing examples", () => {
  const examples = listSeededSourceRoutingExamples();
  const snapshot = getSourceRoutingSnapshot();

  expect(examples.length).toBe(snapshot.exampleCount);
  expect(snapshot.publishableCount).toBeGreaterThan(0);
});

test("parses batch source input lines", () => {
  const rows = parseSourceSubmissionBatch(
    [
      "https://example.com/one | First title | Source One",
      "not-a-url | broken input",
      "https://example.com/two"
    ].join("\n")
  );

  expect(rows.length).toBe(3);
  expect(rows[0]?.valid).toBe(true);
  expect(rows[1]?.valid).toBe(false);
  expect(rows[2]?.input?.url).toBe("https://example.com/two");
});
