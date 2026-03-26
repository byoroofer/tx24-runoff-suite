import {
  CANONICAL_ISSUE_STACK,
  getFeederNetworkSnapshot,
  getLaunchWavePlan,
  getLaunchWaveSnapshot,
  getPerformanceSummary,
  rankFeederSites
} from "@tx24/shared";

const snapshot = getFeederNetworkSnapshot();
const summary = getPerformanceSummary();
const ranked = rankFeederSites();
const launchPlan = getLaunchWavePlan();
const launchSnapshot = getLaunchWaveSnapshot();

export function NetworkAnalyticsShell() {
  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">Network analytics</div>
        <h1>Feeder buildout readiness</h1>
        <p className="muted">
          This is the current state of the issue-led feeder network before database-backed
          production analytics are wired in.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Sites configured</div>
          <h2>{snapshot.siteCount}</h2>
          <p className="muted">
            {snapshot.readyCount} ready, {snapshot.buildingCount} building, {snapshot.plannedCount} planned.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Landing pages</div>
          <h2>{snapshot.landingPageCount}</h2>
          <p className="muted">Three funnel variants per feeder site in the current slice.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Tracked routes</div>
          <h2>{snapshot.trackingRouteCount}</h2>
          <p className="muted">Each route can redirect to a tagged ElectTJ destination.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Network signups</div>
          <h2>{summary.signups}</h2>
          <p className="muted">
            Average conversion rate {summary.averageConversionRate}% across the seeded network model.
          </p>
        </article>
      </section>

      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="eyebrow">Priority issue stack</div>
        <h2>The six lanes shaping the current build order</h2>
        <ul className="list">
          {CANONICAL_ISSUE_STACK.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Launch first</div>
          <h2>{launchSnapshot.launchFirstCount}</h2>
          <ul className="list">
            {launchPlan
              .filter((item) => item.launchWave === "launch-first")
              .map((item) => (
                <li key={item.tenantSlug}>
                  <strong>{item.name}</strong>
                  <div className="muted">{item.rationale}</div>
                </li>
              ))}
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">Launch second</div>
          <h2>{launchSnapshot.launchSecondCount}</h2>
          <ul className="list">
            {launchPlan
              .filter((item) => item.launchWave === "launch-second")
              .map((item) => (
                <li key={item.tenantSlug}>
                  <strong>{item.name}</strong>
                  <div className="muted">{item.rationale}</div>
                </li>
              ))}
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">Hold for later</div>
          <h2>{launchSnapshot.holdCount}</h2>
          <ul className="list">
            {launchPlan
              .filter((item) => item.launchWave === "hold")
              .map((item) => (
                <li key={item.tenantSlug}>
                  <strong>{item.name}</strong>
                  <div className="muted">{item.rationale}</div>
                </li>
              ))}
          </ul>
        </article>
      </section>

      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="eyebrow">API surface</div>
        <h2>Operational endpoints</h2>
        <div className="stack" style={{ marginBottom: 20 }}>
          <div className="pill">GET /sites</div>
          <div className="pill">GET /sites/registry</div>
          <div className="pill">GET /sites/editorial</div>
          <div className="pill">GET /sites/issue-boards</div>
          <div className="pill">POST /seo/source-router</div>
          <div className="pill">GET /seo/source-router/examples</div>
          <div className="pill">GET /sites/landing-pages</div>
          <div className="pill">GET /sites/launch-plan</div>
          <div className="pill">GET /sites/performance</div>
          <div className="pill">POST /sites/factory-preview</div>
          <div className="pill">GET /sites/:tenantSlug</div>
          <div className="pill">GET /dashboard/feeder-sites</div>
          <div className="pill">GET /r/:slug</div>
          <div className="pill">POST /conversions</div>
        </div>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Site</th>
                <th>Status</th>
                <th>Clicks</th>
                <th>Signups</th>
                <th>Volunteers</th>
                <th>Donations</th>
                <th>Conv. rate</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((site) => (
                <tr key={site.tenantSlug}>
                  <td>{site.name}</td>
                  <td>{site.launchStatus}</td>
                  <td>{site.clicks}</td>
                  <td>{site.signups}</td>
                  <td>{site.volunteers}</td>
                  <td>{site.donations}</td>
                  <td>{site.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
