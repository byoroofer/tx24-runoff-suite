import { headers } from "next/headers";
import {
  buildFeederNarrative,
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

function formatCalendarLabel() {
  return `Registration deadline ${TX24_RUNOFF_ELECTION_CALENDAR.voterRegistrationDeadline} • Early voting ${TX24_RUNOFF_ELECTION_CALENDAR.earlyVotingStarts} to ${TX24_RUNOFF_ELECTION_CALENDAR.earlyVotingEnds} • Election day ${TX24_RUNOFF_ELECTION_CALENDAR.electionDay}`;
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
  const narrative = buildFeederNarrative(site, landing);
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
    <main className="siteShell">
      {previewMode ? (
        <section className="previewPanel">
          <div className="previewHeader">
            <div>
              <p className="eyebrow">Preview mode</p>
              <h2>Browsing feeder tenant: {site.name}</h2>
            </div>
            <p className="muted">
              This switcher reviews configured feeder tenants before live domain mapping.
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
        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow light">{narrative.siteLabel}</p>
            <p className="masthead">{narrative.publicationTitle}</p>
            <h1>{landing.headline}</h1>
            <p className="heroDeck">{narrative.deck}</p>
            <p className="heroBody">{narrative.perspective}</p>
            <div className="ctaRow">
              <a href={trackedUrl} className="buttonPrimary">
                {landing.ctaLabel}
              </a>
              <a href={directUrl} className="buttonSecondary">
                Open main-site path
              </a>
            </div>
          </div>
          <aside className="heroAside">
            <div className="infoPanel">
              <p className="eyebrow light">Campaign window</p>
              <p>{formatCalendarLabel()}</p>
            </div>
            <div className="infoPanel">
              <p className="eyebrow light">District focus</p>
              <p>{site.localCities.join(" • ")}</p>
            </div>
            <div className="infoPanel">
              <p className="eyebrow light">Current route</p>
              <p className="mono">{trackingSlug}</p>
            </div>
          </aside>
        </div>
        <div className="proofStrip">
          {narrative.proofStrip.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Issue frame</p>
          <h2>Why this page should exist</h2>
          <p className="muted">
            The feeder site should sound like a real local publication with a clear argument, not a
            generic campaign template.
          </p>
        </div>
        <div className="grid threeUp">
          {narrative.issueFrame.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section splitSection">
        <article className="featureCard">
          <p className="eyebrow">Why TJ</p>
          <h2>Make the TJ case clearly and professionally</h2>
          <div className="stack">
            {narrative.whyTj.map((item) => (
              <div key={item.title} className="storyBlock">
                <h3>{item.title}</h3>
                <p className="muted">{item.body}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="featureSidebar">
          <div className="card">
            <p className="eyebrow">Local and issue focus</p>
            <h3>{site.priorityIssues.join(", ")}</h3>
            <p className="muted">
              This route is optimized around {site.localCities.join(", ")} and aimed at{" "}
              {site.audience}.
            </p>
          </div>
          <div className="card">
            <p className="eyebrow">Contrast map</p>
            <h3>{site.contrastFigures.join(", ")}</h3>
            <p className="muted">
              Use transparent, sourced, and disciplined contrast. No impersonation. No invented
              claims.
            </p>
          </div>
          <div className="card">
            <p className="eyebrow">Editorial note</p>
            <p className="muted">{narrative.editorialNote}</p>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Current landing path</p>
          <h2>{landing.eyebrow}</h2>
          <p className="muted">{landing.supportingText}</p>
        </div>
        <div className="grid threeUp">
          {landing.proofPoints.map((point) => (
            <article key={point} className="card emphasisCard">
              <h3>{point}</h3>
              <p className="muted">
                This element should reinforce the conversion path instead of acting like filler.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section calloutBand">
        <div>
          <p className="eyebrow light">Action plan</p>
          <h2>Turn intent into campaign movement</h2>
        </div>
        <ol className="actionList">
          {narrative.actionPlan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <div className="ctaRow">
          <a href={trackedUrl} className="buttonPrimary">
            {landing.ctaLabel}
          </a>
          <a href={directUrl} className="buttonSecondary dark">
            View the direct destination
          </a>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Related routes</p>
          <h2>Other conversion paths on this feeder site</h2>
        </div>
        <div className="grid threeUp">
          {site.landingPages.map((page) => (
            <article key={page.slug} className="card">
              <p className="eyebrow">{page.eyebrow}</p>
              <h3>{page.headline}</h3>
              <p className="muted">{page.supportingText}</p>
              <div className="cardActions">
                <a href={buildPreviewHref(site.tenantSlug, page.slug)}>{page.ctaLabel}</a>
                <span className="mono">{buildTrackingSlug(site, page)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
