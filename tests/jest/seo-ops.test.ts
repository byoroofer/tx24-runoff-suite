import { expect, test } from "@jest/globals";
import { buildPlacementBrief, getSeoCampaignMap, PLACEMENT_TARGETS, SEO_ENTITIES } from "../../packages/shared/src";

test("builds a disclosure-safe placement brief", () => {
  const brief = buildPlacementBrief({
    city: "Irving",
    issue: "cost of living",
    entity: "Kevin Burge",
    targetLabel: "Local News Comments",
    mainSiteUrl: "https://electtj-site.vercel.app"
  });

  expect(brief.operatorMode).toBe("human-only");
  expect(brief.requiredDisclosure.toLowerCase()).toContain("political advertising");
  expect(brief.sourceHandling.some((item) => item.includes("Do not use automated posting"))).toBe(true);
});

test("exposes seo campaign entities and placement targets", () => {
  const map = getSeoCampaignMap();

  expect(map.entityCount).toBe(SEO_ENTITIES.length);
  expect(map.placementTargetCount).toBe(PLACEMENT_TARGETS.length);
  expect(map.peopleCount).toBeGreaterThan(0);
  expect(map.cityCount).toBeGreaterThan(0);
  expect(map.issueCount).toBeGreaterThan(0);
  expect(SEO_ENTITIES.some((entity) => entity.slug === "paradise-claims")).toBe(true);
  expect(SEO_ENTITIES.some((entity) => entity.slug === "constitutional-war-powers")).toBe(true);
  expect(SEO_ENTITIES.some((entity) => entity.slug === "preserving-democracy")).toBe(true);
  expect(SEO_ENTITIES.some((entity) => entity.slug === "individual-freedoms")).toBe(true);
  expect(SEO_ENTITIES.some((entity) => entity.slug === "anti-corruption")).toBe(true);
});
