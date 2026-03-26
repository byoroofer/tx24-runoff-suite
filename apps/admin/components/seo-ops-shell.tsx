import { buildPlacementBrief, getSeoCampaignMap, PLACEMENT_TARGETS, SEO_ENTITIES } from "@tx24/shared";

const snapshot = getSeoCampaignMap();
const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://electtj-site.vercel.app";
const sampleBrief = buildPlacementBrief({
  city: "Irving",
  issue: "cost of living",
  entity: "Kevin Burge",
  targetLabel: "Local News Comments",
  mainSiteUrl
});

export function SeoOpsShell() {
  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">SEO + distribution ops</div>
        <h1>Entity map and external placement resources</h1>
        <p className="muted">
          Build city-level, issue-level, and contrast content while giving human operators approved,
          disclosure-safe commentary frameworks and relevant link-back destinations.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Entities</div>
          <h2>{snapshot.entityCount}</h2>
          <p className="muted">
            {snapshot.peopleCount} people, {snapshot.cityCount} cities, {snapshot.issueCount} issue clusters.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Placement targets</div>
          <h2>{snapshot.placementTargetCount}</h2>
          <p className="muted">Human-operated only, with disclosure and non-spam link-back guardrails.</p>
        </article>
      </section>

      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="eyebrow">Sample placement brief</div>
        <h2>{sampleBrief.title}</h2>
        <p className="muted">{sampleBrief.summary}</p>
        <p className="muted">{sampleBrief.requiredDisclosure}</p>
        <p className="muted">{sampleBrief.recommendedCTA}</p>
        <div className="grid">
          <article className="panel">
            <div className="eyebrow">Talking points</div>
            <ul className="list">
              {sampleBrief.talkingPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
          <article className="panel">
            <div className="eyebrow">Source handling</div>
            <ul className="list">
              {sampleBrief.sourceHandling.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        {PLACEMENT_TARGETS.map((target) => (
          <article key={target.slug} className="panel">
            <div className="eyebrow">{target.channel}</div>
            <h2>{target.label}</h2>
            <p className="muted">Operator mode: {target.operatorMode}</p>
            <p className="muted">Disclosure required: {target.disclosureRequired ? "yes" : "no"}</p>
            <p className="muted">Link-back rule: {target.linkBackAllowed}</p>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="eyebrow">Entity coverage map</div>
        <h2>People, cities, and issues to cover</h2>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Kind</th>
                <th>Angle</th>
                <th>Related terms</th>
              </tr>
            </thead>
            <tbody>
              {SEO_ENTITIES.map((entity) => (
                <tr key={entity.slug}>
                  <td>{entity.name}</td>
                  <td>{entity.kind}</td>
                  <td>{entity.angle}</td>
                  <td>{entity.relatedTerms.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

