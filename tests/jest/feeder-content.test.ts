import { expect, test } from "@jest/globals";
import {
  buildFeederNarrative,
  getFeederSiteBySlug,
  resolveLandingSection
} from "../../packages/shared/src";

test("builds richer narrative content for native texan feeder pages", () => {
  const site = getFeederSiteBySlug("native-texans-for-tx24");
  expect(site).toBeTruthy();

  const landing = resolveLandingSection(site!, "texas-roots");
  const narrative = buildFeederNarrative(site!, landing);

  expect(narrative.publicationTitle).toContain("Native Texans");
  expect(narrative.proofStrip).toContain("Born in Fort Worth");
  expect(narrative.issueFrame).toHaveLength(3);
  expect(narrative.actionPlan[0]).toBe(landing.ctaLabel);
});

test("falls back cleanly for feeder sites without a dedicated override", () => {
  const site = getFeederSiteBySlug("keller-community-action");
  expect(site).toBeTruthy();

  const landing = resolveLandingSection(site!, "community-action");
  const narrative = buildFeederNarrative(site!, landing);

  expect(narrative.publicationTitle).toBe(site!.name);
  expect(narrative.issueFrame).toHaveLength(3);
  expect(narrative.whyTj).toHaveLength(2);
});
