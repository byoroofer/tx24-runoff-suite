import { CANONICAL_ISSUE_STACK, buildFeederSiteProposal, listLandingFactoryRows } from "@tx24/shared";

const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://electtj-site.vercel.app";
const landingRows = listLandingFactoryRows(mainSiteUrl);

const proposals = [
  buildFeederSiteProposal({
    audience: "health care affordability voters",
    theme: "family",
    funnelGoal: "Drive working-family traffic into signups, survey completions, and support.",
    priority: "high"
  }),
  buildFeederSiteProposal({
    audience: "clean government reform voters",
    theme: "economic",
    funnelGoal: "Convert anti-corruption anger into donations, volunteer action, and issue signups.",
    priority: "high"
  }),
  buildFeederSiteProposal({
    audience: "no new war voters",
    theme: "service",
    funnelGoal: "Move constitutional-restraint voters into supporter capture and turnout action.",
    priority: "medium"
  })
];

export function LandingFactoryShell() {
  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">Factory workspace</div>
        <h1>Feeder site proposal engine</h1>
        <p className="muted">
          Use this layer to spin up issue-led and audience-specific feeder sites, then route them
          into tracked ElectTJ destinations.
        </p>
      </section>

      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="eyebrow">Canonical issue stack</div>
        <h2>The six feeder lanes driving this buildout</h2>
        <ul className="list">
          {CANONICAL_ISSUE_STACK.map((issue) => (
            <li key={issue}>{issue}</li>
          ))}
        </ul>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        {proposals.map((proposal) => (
          <article key={proposal.tenantSlug} className="panel">
            <div className="eyebrow">
              {proposal.priority} priority / {proposal.theme}
            </div>
            <h2>{proposal.suggestedName}</h2>
            <p className="muted">{proposal.headline}</p>
            <p className="muted">Suggested slug: {proposal.tenantSlug}</p>
            <p className="muted">Suggested domain: {proposal.suggestedDomain}</p>
            <p className="muted">Landing mix: {proposal.recommendedLandingMix.join(", ")}</p>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="eyebrow">Existing route inventory</div>
        <h2>What the next proposals will plug into</h2>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Landing</th>
                <th>CTA</th>
                <th>Tracking slug</th>
              </tr>
            </thead>
            <tbody>
              {landingRows.map((row) => (
                <tr key={row.trackingSlug}>
                  <td>{row.siteName}</td>
                  <td>{row.slug}</td>
                  <td>{row.ctaLabel}</td>
                  <td className="mono">{row.trackingSlug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
