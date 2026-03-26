import { Router } from "express";
import {
  buildDraftOutputBundleFromInput,
  buildPlacementBrief,
  CONTRAST_RAILS,
  getDraftGeneratorSnapshot,
  getAnchorBySlug,
  getSeoCampaignMap,
  getSourceIntelSnapshot,
  getSourceRoutingSnapshot,
  listSeededDraftOutputBundles,
  listSeededSourceRoutingExamples,
  MEDIA_ANCHORS,
  OPERATOR_KITS,
  PLACEMENT_TARGETS,
  RESEARCH_LEADS,
  routeSourceSubmission,
  SEO_ENTITIES
} from "@tx24/shared";
import { z } from "zod";

export const seoRouter = Router();

const briefSchema = z.object({
  city: z.string().min(2),
  issue: z.string().min(2),
  entity: z.string().min(2),
  targetLabel: z.string().min(2)
});

const sourceRouterSchema = z.object({
  url: z.string().url(),
  title: z.string().min(2).optional(),
  source: z.string().min(2).optional(),
  notes: z.string().min(2).optional()
});

seoRouter.get("/campaign-map", (_req, res) => {
  res.json({
    snapshot: getSeoCampaignMap(),
    entities: SEO_ENTITIES,
    targets: PLACEMENT_TARGETS
  });
});

seoRouter.get("/source-intel", (_req, res) => {
  res.json({
    snapshot: getSourceIntelSnapshot(),
    anchors: MEDIA_ANCHORS,
    contrastRails: CONTRAST_RAILS,
    operatorKits: OPERATOR_KITS,
    researchLeads: RESEARCH_LEADS
  });
});

seoRouter.get("/source-intel/:slug", (req, res) => {
  const anchor = getAnchorBySlug(req.params.slug);

  if (!anchor) {
    res.status(404).json({
      error: {
        code: "SOURCE_INTEL_NOT_FOUND",
        message: "Requested source intel anchor was not found."
      }
    });
    return;
  }

  res.json({ anchor });
});

seoRouter.get("/source-router/examples", (_req, res) => {
  res.json({
    snapshot: getSourceRoutingSnapshot(),
    items: listSeededSourceRoutingExamples()
  });
});

seoRouter.get("/draft-preview/examples", (_req, res) => {
  res.json({
    snapshot: getDraftGeneratorSnapshot(),
    items: listSeededDraftOutputBundles()
  });
});

seoRouter.post("/brief-preview", (req, res) => {
  const parsed = briefSchema.parse(req.body);
  const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://electtj-site.vercel.app";

  res.json({
    brief: buildPlacementBrief({
      ...parsed,
      mainSiteUrl
    })
  });
});

seoRouter.post("/source-router", (req, res) => {
  const parsed = sourceRouterSchema.parse(req.body);

  res.json({
    routed: routeSourceSubmission(parsed)
  });
});

seoRouter.post("/draft-preview", (req, res) => {
  const parsed = sourceRouterSchema.parse(req.body);

  res.json({
    draft: buildDraftOutputBundleFromInput(parsed)
  });
});
