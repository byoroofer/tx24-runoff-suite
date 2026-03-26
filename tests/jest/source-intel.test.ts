import { expect, test } from "@jest/globals";
import {
  getAnchorBySlug,
  getSourceIntelSnapshot,
  MEDIA_ANCHORS,
  OPERATOR_KITS,
  RESEARCH_LEADS
} from "../../packages/shared/src";

test("exposes the Lone Star Left runoff anchor for TX-24", () => {
  const anchor = getAnchorBySlug("lonestarleft-tx24-sitting-right-there");

  expect(anchor).toBeDefined();
  expect(anchor?.source).toBe("Lone Star Left");
  expect(anchor?.verifiedTakeaways.some((item) => item.includes("flippable"))).toBe(true);
  expect(anchor?.prohibitedUses.some((item) => item.toLowerCase().includes("unsupported personal attacks"))).toBe(
    true
  );
});

test("tracks source-intel snapshot counts", () => {
  const snapshot = getSourceIntelSnapshot();

  expect(snapshot.anchorCount).toBe(MEDIA_ANCHORS.length);
  expect(snapshot.operatorKitCount).toBe(OPERATOR_KITS.length);
  expect(snapshot.researchLeadCount).toBe(RESEARCH_LEADS.length);
  expect(snapshot.articleAnchorCount).toBeGreaterThan(0);
  expect(snapshot.distributionAnchorCount).toBeGreaterThan(0);
});

test("keeps sensitive opposition research leads admin-only until verified", () => {
  const lead = RESEARCH_LEADS.find((item) => item.slug === "kevin-burge-title-description-verification");

  expect(lead).toBeDefined();
  expect(lead?.visibility).toBe("admin-only");
  expect(lead?.publishRule.toLowerCase()).toContain("do not publish");
});

test("captures hashtag footprint as a distribution anchor, not an editorial endorsement", () => {
  const anchor = getAnchorBySlug("tjwareforcongress-distribution-footprint");

  expect(anchor).toBeDefined();
  expect(anchor?.theme).toBe("distribution-footprint");
  expect(anchor?.prohibitedUses.some((item) => item.includes("Google search result pages"))).toBe(true);
});

test("keeps native-Texan contrast usable while gating opponent birthplace claims", () => {
  const anchor = getAnchorBySlug("native-texan-authenticity");
  const lead = RESEARCH_LEADS.find((item) => item.slug === "opponent-birthplace-verification");

  expect(anchor).toBeDefined();
  expect(anchor?.verifiedTakeaways.some((item) => item.includes("Fort Worth"))).toBe(true);
  expect(anchor?.prohibitedUses.some((item) => item.includes("only native Texan"))).toBe(true);
  expect(lead?.publishRule.toLowerCase()).toContain("do not publish");
});
