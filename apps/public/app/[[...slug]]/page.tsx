import { headers } from "next/headers";
import {
  buildTrackingSlug,
  FEEDER_SITES,
  getFeederSiteBySlug,
  resolveFeederSite,
  resolveLandingSection,
  TX24_RUNOFF_ELECTION_CALENDAR
} from "@tx24/shared";

function getTrackingBaseUrl() {
  return process.env.NEXT_PUBLIC_TRACKING_BASE_URL ?? "http://localhost:4100";
}

function getMainSiteUrl() {
  return process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://electtj-site.vercel.app";
}

function buildPreviewHref(siteSlug: string, landingSlug?: string) {
  const path = landingSlug ? `/${landingSlug}` : "";
  return `${path}?site=${siteSlug}`;
}

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ site?: string }>;
}) {
  const host = (await headers()).get("host") ?? "localhost:3101";
  const { slug } = await params;
  const search = await searchParams;
  const previewSite = getFeederSiteBySlug(search.site);
  const site = previewSite ?? resolveFeederSite(host);
  const landing = resolveLandingSection(site, slug?.[0]);
  const mainSiteUrl = getMainSiteUrl();
  const trackingBaseUrl = getTrackingBaseUrl();
  const trackingSlug = buildTrackingSlug(site, landing);
  const trackedUrl = `${trackingBaseUrl}/r/${trackingSlug}`;
  const directUrl = new URL(landing.targetPath, mainSiteUrl).toString();
  const previewMode = Boolean(previewSite);
  const relatedPreviewLinks = FEEDER_SITES.map((candidate) => {
    const preferredLanding = candidate.landingPages.find((page) => page.slug === landing.slug) ?? candidate.landingPages[0]!;

    return {
      tenantSlug: candidate.tenantSlug,
      name: candidate.name,
      href: buildPreviewHref(candidate.tenantSlug, preferredLanding.slug),
      launchStatus: candidate.launchStatus,
      current: candidate.tenantSlug === site.tenantSlug
    };
  });

  return (
    <main className="page">
      {previewMode ? (
        <section className="previewPanel">
          <div>
            <p className="eyebrow">Preview mode</p>
            <h2>Browsing feeder tenant: {site.name}</h2>
            <p className="muted">
              This local switcher lets you review all configured feeder tenants without live domain
              mapping.
            </p>
          </div>
          <div className="previewGrid">
            {relatedPreviewLinks.map((item) => (
              <a
                key={item.tenantSlug}
                href={item.href}
                className={`previewLink${item.current ? " current" : ""}`}
              >
                <strong>{item.name}</strong>
                <span>
                  {item.tenantSlug} / {item.launchStatus}
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className={`hero theme-${site.theme}`}>
        <p className="eyebrow">{landing.eyebrow}</p>
        <h1>{landing.headline}</h1>
        <p>{landing.supportingText}</p>
        <p>{site.message}</p>
        <p>
          Registration deadline {TX24_RUNOFF_ELECTION_CALENDAR.voterRegistrationDeadline}. Early
          voting {TX24_RUNOFF_ELECTION_CALENDAR.earlyVotingStarts} through{" "}
          {TX24_RUNOFF_ELECTION_CALENDAR.earlyVotingEnds}. Election day{" "}
          {TX24_RUNOFF_ELECTION_CALENDAR.electionDay}.
        </p>
        <div className="ctaRow">
          <a href={trackedUrl} className="buttonPrimary">
            {landing.ctaLabel}
          </a>
          <a href={directUrl} className="buttonSecondary">
            Open direct main-site path
          </a>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <p className="eyebrow">Audience</p>
          <h2>{site.audience}</h2>
          <p className="muted">{site.headline}</p>
        </article>
        <article className="card">
          <p className="eyebrow">Launch status</p>
          <h2>{site.launchStatus}</h2>
          <p className="muted">
            Priority: {site.launchPriority}. Funnel goal: {site.funnelGoal}
          </p>
        </article>
        <article className="card">
          <p className="eyebrow">Tracking</p>
          <h2 className="mono">{trackingSlug}</h2>
          <p className="muted">This route records feeder traffic before redirecting to ElectTJ.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Local SEO focus</p>
          <h2>{site.localCities.join(", ")}</h2>
          <p className="muted">Cities and neighborhoods this feeder site is optimized around.</p>
        </article>
      </section>

      <section className="grid">
        <article className="card">
          <p className="eyebrow">Why this page exists</p>
          <ul className="list">
            {landing.proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <p className="eyebrow">Target path</p>
          <h2>Main site destination</h2>
          <p className="muted">{directUrl}</p>
          <p className="muted">
            Every feeder page should translate issue-specific intent into a more valuable campaign
            action.
          </p>
        </article>
        <article className="card">
          <p className="eyebrow">Issue and contrast map</p>
          <h2>{site.priorityIssues.join(", ")}</h2>
          <p className="muted">
            Contrast and accountability figures: {site.contrastFigures.join(", ")}
          </p>
        </article>
      </section>

      <section className="grid">
        {site.landingPages.map((page) => (
          <article key={page.slug} className="card">
            <p className="eyebrow">{page.eyebrow}</p>
            <h2>{page.headline}</h2>
            <p className="muted">{page.supportingText}</p>
            <div className="cardActions">
              <a href={buildPreviewHref(site.tenantSlug, page.slug)}>{page.ctaLabel}</a>
              <span className="mono">{buildTrackingSlug(site, page)}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
