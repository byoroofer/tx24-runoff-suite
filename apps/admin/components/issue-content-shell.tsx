import { getIssueContentBoardSnapshot, listIssueContentBoards } from "@tx24/shared";

const snapshot = getIssueContentBoardSnapshot();
const boards = listIssueContentBoards();

export function IssueContentShell() {
  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">Issue boards</div>
        <h1>Issue-led content production board</h1>
        <p className="muted">
          This is the bridge between feeder-site architecture and actual publishing output: what to
          write, where to deploy it, and which source rails support it.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Issue boards</div>
          <h2>{snapshot.boardCount}</h2>
          <p className="muted">Canonical issue lanes now mapped into a real content-production layer.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Linked landing pages</div>
          <h2>{snapshot.totalLandingPages}</h2>
          <p className="muted">Total feeder landing inventory attached to the current issue boards.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Active tasks</div>
          <h2>{snapshot.totalActiveTasks}</h2>
          <p className="muted">Editorial tasks still in brief, research, writing, or review.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Published tasks</div>
          <h2>{snapshot.totalPublishedTasks}</h2>
          <p className="muted">Already-published feeder tasks attached to these issue lanes.</p>
        </article>
      </section>

      <section className="grid">
        {boards.map((board) => (
          <article key={board.slug} className="panel">
            <div className="eyebrow">{board.slug}</div>
            <h2>{board.title}</h2>
            <p className="muted">{board.strategicFrame}</p>
            <p className="muted">{board.whyNow}</p>
            <p className="muted">Anchor: {board.anchorSlug}</p>
            <p className="muted">Operator kit: {board.operatorKitSlug ?? "none assigned yet"}</p>
            <p className="muted">Feeder sites: {board.feederSiteSlugs.join(", ")}</p>
            <p className="muted">Cities: {board.localCities.join(", ")}</p>
            <p className="muted">Contrast figures: {board.contrastFigures.join(", ")}</p>
            <div className="pill">Landing pages: {board.landingPageCount}</div>
            <div className="pill">Active tasks: {board.activeTaskCount}</div>
            <div className="pill">Published: {board.publishedTaskCount}</div>
            <ul className="list">
              {board.suggestedOutputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
