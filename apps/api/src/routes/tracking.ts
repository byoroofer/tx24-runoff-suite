import { Router } from "express";
import { findTrackedLanding, getFeederNetworkSnapshot } from "@tx24/shared";
import {
  listClicks,
  listConversions,
  recordAudit,
  recordClick,
  recordConversion
} from "../services/memory-store";

function getMainSiteUrl() {
  return process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://electtj-site.vercel.app";
}

export const trackingRouter = Router();

trackingRouter.get("/r/:slug", (req, res) => {
  const tracked = findTrackedLanding(req.params.slug);
  if (!tracked) {
    return res.status(404).json({ ok: false, error: "SHORTLINK_NOT_FOUND" });
  }

  const destination = new URL(tracked.landing.targetPath, getMainSiteUrl()).toString();
  recordClick(req.params.slug, destination);
  recordAudit("shortlink_click", `${req.params.slug} -> ${destination}`);

  return res.redirect(destination);
});

trackingRouter.post("/conversions", (req, res) => {
  const tenantSlug = String(req.body.tenantSlug ?? "");
  const eventName = String(req.body.eventName ?? "");
  const rawValue = req.body.value;
  const value = rawValue === undefined ? undefined : Number(rawValue);

  if (!tenantSlug || !eventName) {
    return res.status(422).json({ ok: false, error: "CONVERSION_FIELDS_REQUIRED" });
  }

  recordConversion({ tenantSlug, eventName, value });
  recordAudit("conversion_recorded", `${tenantSlug}:${eventName}`);

  return res.status(201).json({ ok: true });
});

trackingRouter.get("/dashboard/feeder-sites", (_req, res) => {
  res.json({
    snapshot: getFeederNetworkSnapshot(),
    clicks: listClicks(),
    conversions: listConversions()
  });
});
