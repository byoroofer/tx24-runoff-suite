import { expect, test } from "@jest/globals";
import {
  buildDraftOutputBundleFromInput,
  getDraftGeneratorSnapshot,
  listSeededDraftOutputBundles
} from "../../packages/shared/src";

test("builds a publishable draft bundle from a routed source", () => {
  const bundle = buildDraftOutputBundleFromInput({
    url: "https://www.lonestarleft.com/p/tx24-is-sitting-right-there",
    title: "TX24 Is Sitting Right There",
    source: "Lone Star Left"
  });

  expect(bundle.routing.recommendedVisibility).toBe("publishable");
  expect(bundle.selectedBoardSlug).toBe("preserving-democracy");
  expect(bundle.feederPage.headline.length).toBeGreaterThan(20);
  expect(bundle.opEd.outline.length).toBeGreaterThanOrEqual(4);
});

test("keeps admin-only draft bundles flagged for internal handling", () => {
  const bundle = buildDraftOutputBundleFromInput({
    url: "https://example.com/research-note",
    title: "Kevin Burge advisor title verification",
    notes: "Need evidence before publishing"
  });

  expect(bundle.routing.recommendedVisibility).toBe("admin-only");
  expect(bundle.feederPage.complianceNotes.join(" ")).toContain("internal");
});

test("seeded draft bundle snapshot stays aligned", () => {
  const bundles = listSeededDraftOutputBundles();
  const snapshot = getDraftGeneratorSnapshot();

  expect(bundles.length).toBe(snapshot.exampleCount);
  expect(snapshot.publishableCount).toBeGreaterThan(0);
  expect(snapshot.boardCount).toBeGreaterThan(0);
});
