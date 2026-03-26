import { listFeederSiteSummary, listLandingFactoryRows } from "@tx24/shared";

const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://electtj-site.vercel.app";
const publicPreviewBaseUrl = process.env.NEXT_PUBLIC_FEEDER_PREVIEW_URL ?? "http://localhost:3101";
const sites = listFeederSiteSummary();
const landingRows = listLandingFactoryRows(mainSiteUrl);

function buildPreviewUrl(tenantSlug: string, landingSlug?: string) {
  const path = landingSlug ? `/${landingSlug}` : "";
  return `${publicPreviewBaseUrl}${path}?site=${tenantSlug}`;
}

export function FeederSitesShell() {
  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">Landing factory</div>
        <h1>Feeder site catalog</h1>
        <p className="muted">
          Each feeder tenant has audience positioning, launch status, tracked landing routes, and a
          live local preview path into the public shell.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        {sites.map((site) => (
          <article key={site.tenantSlug} className="panel">
            <div className="eyebrow">
              {site.launchPriority} priority / {site.launchStatus}
            </div>
            <h2>{site.name}</h2>
            <p className="muted">Audience: {site.audience}</p>
            <p className="muted">Domains: {site.domains.join(", ")}</p>
            <p className="muted">{site.funnelGoal}</p>
            <div className="stack" style={{ marginTop: 14 }}>
              <a href={buildPreviewUrl(site.tenantSlug)} className="navlink">
                Preview site
              </a>
              <span className="pill">{site.landingPageCount} landers</span>
            </div>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="eyebrow">Tracked landing inventory</div>
        <h2>Current route matrix</h2>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Site</th>
                <th>Landing</th>
                <th>Status</th>
                <th>Tracking slug</th>
                <th>Preview</th>
                <th>Target URL</th>
              </tr>
            </thead>
            <tbody>
              {landingRows.map((row) => (
                <tr key={row.trackingSlug}>
                  <td>{row.siteName}</td>
                  <td>{row.slug}</td>
                  <td>{row.launchStatus}</td>
                  <td className="mono">{row.trackingSlug}</td>
                  <td>
                    <a href={buildPreviewUrl(row.tenantSlug, row.slug)} className="navlink">
                      Open preview
                    </a>
                  </td>
                  <td className="mono">{row.targetUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
