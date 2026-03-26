import { Router } from "express";
import {
  buildFeederSiteProposal,
  FEEDER_SITES,
  getIssueContentBoardSnapshot,
  getLaunchWavePlan,
  getLaunchWaveSnapshot,
  getPerformanceSummary,
  listIssueContentBoards,
  listFeederSiteSummary,
  listLandingFactoryRows,
  rankFeederSites
} from "@tx24/shared";
import { z } from "zod";
import { listEditorialQueuePayload, listFeederRegistryPayload } from "../services/feeder-registry";

export const sitesRouter = Router();

const factoryPreviewSchema = z.object({
  audience: z.string().min(3),
  theme: z.enum(["economic", "service", "family", "turnout"]),
  funnelGoal: z.string().min(8),
  priority: z.enum(["high", "medium", "low"])
});

sitesRouter.get("/", (_req, res) => {
  res.json({
    snapshot: listFeederRegistryPayload().snapshot,
    items: listFeederSiteSummary()
  });
});

sitesRouter.get("/registry", (_req, res) => {
  res.json(listFeederRegistryPayload());
});

sitesRouter.get("/editorial", (_req, res) => {
  res.json(listEditorialQueuePayload());
});

sitesRouter.get("/landing-pages", (_req, res) => {
  const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://electtj-site.vercel.app";
  res.json({
    items: listLandingFactoryRows(mainSiteUrl)
  });
});

sitesRouter.get("/performance", (_req, res) => {
  res.json({
    summary: getPerformanceSummary(),
    items: rankFeederSites()
  });
});

sitesRouter.get("/launch-plan", (_req, res) => {
  res.json({
    snapshot: getLaunchWaveSnapshot(),
    items: getLaunchWavePlan()
  });
});

sitesRouter.get("/issue-boards", (_req, res) => {
  res.json({
    snapshot: getIssueContentBoardSnapshot(),
    items: listIssueContentBoards()
  });
});

sitesRouter.post("/factory-preview", (req, res) => {
  const parsed = factoryPreviewSchema.parse(req.body);

  res.status(200).json({
    proposal: buildFeederSiteProposal(parsed)
  });
});

sitesRouter.get("/:tenantSlug", (req, res) => {
  const site = FEEDER_SITES.find((entry) => entry.tenantSlug === req.params.tenantSlug);

  if (!site) {
    return res.status(404).json({ ok: false, error: "SITE_NOT_FOUND" });
  }

  return res.json({
    item: site
  });
});
