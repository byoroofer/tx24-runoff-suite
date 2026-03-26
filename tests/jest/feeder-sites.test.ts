import { expect, test } from "@jest/globals";
import {
  CANONICAL_ISSUE_STACK,
  getEditorialQueueSnapshot,
  getFeederSiteBySlug,
  getFeederNetworkSnapshot,
  listEditorialQueueRows,
  listFeederRegistryRows,
  listLandingFactoryRows,
  findTrackedLanding,
  resolveFeederSite,
  resolveLandingSection
} from "../../packages/shared/src";

test("resolves feeder site by host", () => {
  const site = resolveFeederSite("localhost:3101");
  expect(site.tenantSlug).toBe("tx24-affordability-watch");
});

test("resolves new issue-led feeder sites by explicit preview slug", () => {
  const democracy = getFeederSiteBySlug("preserving-democracy-tx24");
  const freedoms = getFeederSiteBySlug("individual-freedoms-tx24");

  expect(democracy?.landingPages.length).toBe(3);
  expect(freedoms?.landingPages[0]?.slug).toBe("freedoms");
});

test("resolves landing section and tracking slug", () => {
  const site = resolveFeederSite("localhost:3101");
  const landing = resolveLandingSection(site, "operator");
  const tracked = findTrackedLanding(`${site.tenantSlug}-${landing.slug}`);

  expect(landing.slug).toBe("operator");
  expect(tracked?.landing.slug).toBe("operator");
});

test("computes feeder network snapshot and landing inventory", () => {
  const snapshot = getFeederNetworkSnapshot();
  const rows = listLandingFactoryRows("https://electtj-site.vercel.app");

  expect(snapshot.siteCount).toBe(18);
  expect(snapshot.landingPageCount).toBe(54);
  expect(rows.length).toBe(54);
  expect(CANONICAL_ISSUE_STACK.length).toBe(6);
});

test("builds feeder registry and editorial queue rows", () => {
  const registry = listFeederRegistryRows();
  const editorial = listEditorialQueueRows();
  const snapshot = getEditorialQueueSnapshot();

  expect(registry.length).toBe(18);
  expect(editorial.length).toBe(54);
  expect(snapshot.taskCount).toBe(54);
  expect(snapshot.publishedCount).toBeGreaterThan(0);
  expect(registry.some((item) => item.dominantRail === "native-texan-authenticity")).toBe(true);
  expect(registry.some((item) => item.tenantSlug === "honest-government-tx24")).toBe(true);
});
