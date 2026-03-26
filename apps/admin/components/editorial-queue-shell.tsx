import { getEditorialQueueSnapshot, listEditorialQueueRows } from "@tx24/shared";

const publicPreviewBaseUrl = process.env.NEXT_PUBLIC_FEEDER_PREVIEW_URL ?? "http://localhost:3101";
const snapshot = getEditorialQueueSnapshot();
const items = listEditorialQueueRows();

function buildPreviewUrl(tenantSlug: string, landingSlug: string) {
  return `${publicPreviewBaseUrl}/${landingSlug}?site=${tenantSlug}`;
}

export function EditorialQueueShell() {
  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">Editorial queue</div>
        <h1>Feeder-site publishing workflow</h1>
        <p className="muted">
          This board turns the 18-site feeder network into a production queue, with clear source
          rails, copy goals, and preview links for every landing page.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Tasks</div>
          <h2>{snapshot.taskCount}</h2>
          <p className="muted">Every configured feeder landing now has an explicit editorial work item.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">In progress</div>
          <h2>{snapshot.researchCount + snapshot.writingCount}</h2>
          <p className="muted">
            {snapshot.researchCount} research and {snapshot.writingCount} writing tasks are active.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Review lane</div>
          <h2>{snapshot.reviewCount + snapshot.approvedCount}</h2>
          <p className="muted">
            {snapshot.reviewCount} in review and {snapshot.approvedCount} approved for near-term ship.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Live pages</div>
          <h2>{snapshot.publishedCount}</h2>
          <p className="muted">Published landers are already positioned for immediate preview and iteration.</p>
        </article>
      </section>

      <section className="panel">
        <div className="eyebrow">Editorial matrix</div>
        <h2>Site-by-site publishing board</h2>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Site</th>
                <th>Landing</th>
                <th>Status</th>
                <th>Source rail</th>
                <th>Owner lane</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.siteName}</strong>
                    <div className="muted">{item.audience}</div>
                  </td>
                  <td>
                    <strong>{item.landingSlug}</strong>
                    <div className="muted">{item.landingHeadline}</div>
                  </td>
                  <td>
                    <span className="pill">{item.status}</span>
                  </td>
                  <td className="mono">{item.sourceRail}</td>
                  <td>{item.ownerLane}</td>
                  <td>
                    <a href={buildPreviewUrl(item.tenantSlug, item.landingSlug)} className="navlink">
                      Open preview
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
