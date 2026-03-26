import { expect, test } from "@jest/globals";
import {
  buildFeederSiteProposal,
  getLaunchWavePlan,
  getLaunchWaveSnapshot,
  getPerformanceSummary,
  rankFeederSites
} from "../../packages/shared/src";

test("computes performance summary for feeder network", () => {
  const summary = getPerformanceSummary();
  const ranked = rankFeederSites();

  expect(summary.clicks).toBeGreaterThan(1000);
  expect(summary.highestPerformer).toBeTruthy();
  expect(ranked[0]?.signups).toBeGreaterThanOrEqual(ranked[1]?.signups ?? 0);
});

test("builds a launch-wave plan for the current feeder inventory", () => {
  const plan = getLaunchWavePlan();
  const snapshot = getLaunchWaveSnapshot();

  expect(plan.length).toBe(18);
  expect(snapshot.launchFirstCount).toBe(9);
  expect(snapshot.launchSecondCount).toBe(6);
  expect(snapshot.holdCount).toBe(3);
  expect(plan.some((item) => item.tenantSlug === "health-care-affordability-tx24" && item.launchWave === "launch-first")).toBe(true);
  expect(plan.some((item) => item.tenantSlug === "honest-government-tx24" && item.launchWave === "launch-first")).toBe(true);
});

test("builds feeder site proposal previews", () => {
  const proposal = buildFeederSiteProposal({
    audience: "clean government reform voters",
    theme: "economic",
    funnelGoal: "Convert anti-corruption anger into donations and volunteer action.",
    priority: "high"
  });

  expect(proposal.tenantSlug).toContain("clean-government-reform-voters");
  expect(proposal.recommendedLandingMix).toEqual(["clean-government", "accountability", "turnout"]);
});
