import {
  CONTRAST_RAILS,
  getSourceIntelSnapshot,
  MEDIA_ANCHORS,
  OPERATOR_KITS,
  RESEARCH_LEADS
} from "@tx24/shared";

const snapshot = getSourceIntelSnapshot();
const primaryAnchor = MEDIA_ANCHORS.find((anchor) => anchor.slug === "lonestarleft-tx24-sitting-right-there");

export function SourceIntelShell() {
  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">Source intel</div>
        <h1>Anchor-driven contrast and research workflow</h1>
        <p className="muted">
          Turn recent articles, interviews, and documented public appearances into source-backed
          feeder pages, commentary kits, and contrast rails without slipping into unsupported claims.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Anchors</div>
          <h2>{snapshot.anchorCount}</h2>
          <p className="muted">
            {snapshot.articleAnchorCount} article-driven anchors, including the current Lone Star
            Left runoff frame.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Contrast rails</div>
          <h2>{snapshot.contrastRailCount}</h2>
          <p className="muted">
            Safe contrast frameworks the team can use across pages, commentary, and volunteer
            scripts.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Operator kits</div>
          <h2>{snapshot.operatorKitCount}</h2>
          <p className="muted">
            Deployment-ready kits for feeder pages, letters, social commentary, and volunteer copy.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Research leads</div>
          <h2>{snapshot.researchLeadCount}</h2>
          <p className="muted">Admin-only claims that still require artifact collection before publication.</p>
        </article>
      </section>

      {primaryAnchor ? (
        <section className="panel" style={{ marginBottom: 20 }}>
          <div className="eyebrow">Primary runoff anchor</div>
          <h2>{primaryAnchor.title}</h2>
          <p className="muted">{primaryAnchor.leverageAngle}</p>
          <div className="grid">
            <article className="panel">
              <div className="eyebrow">Verified takeaways</div>
              <ul className="list">
                {primaryAnchor.verifiedTakeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="panel">
              <div className="eyebrow">Approved contrast</div>
              <ul className="list">
                {primaryAnchor.approvedContrastAngles.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="panel">
              <div className="eyebrow">Do not do this</div>
              <ul className="list">
                {primaryAnchor.prohibitedUses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      ) : null}

      <section className="grid" style={{ marginBottom: 20 }}>
        {OPERATOR_KITS.map((kit) => (
          <article key={kit.slug} className="panel">
            <div className="eyebrow">Operator kit</div>
            <h2>{kit.title}</h2>
            <p className="muted">{kit.objective}</p>
            <p className="muted">Audience: {kit.audience}</p>
            <div className="pill">Anchor: {kit.anchorSlug}</div>
            <ul className="list">
              {kit.landingPageAngles.map((angle) => (
                <li key={angle}>{angle}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="eyebrow">Research leads pending proof</div>
        <h2>Keep these admin-only until the artifact trail is complete</h2>
        <div className="grid">
          {RESEARCH_LEADS.map((lead) => (
            <article key={lead.slug} className="panel">
              <div className="eyebrow">{lead.status}</div>
              <h3>{lead.title}</h3>
              <p className="muted">{lead.hypothesis}</p>
              <p className="muted">{lead.publishRule}</p>
              <ul className="list">
                {lead.evidenceTargets.map((target) => (
                  <li key={target}>{target}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="eyebrow">Contrast rails</div>
        <h2>What the team can say, and what still needs proof</h2>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Rail</th>
                <th>Strategic use</th>
                <th>Approved language</th>
                <th>Prohibited language</th>
              </tr>
            </thead>
            <tbody>
              {CONTRAST_RAILS.map((rail) => (
                <tr key={rail.slug}>
                  <td>{rail.title}</td>
                  <td>{rail.strategicUse}</td>
                  <td>{rail.approvedLanguage.join(", ")}</td>
                  <td>{rail.prohibitedLanguage.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
