import Link from "next/link";
import {
  getDraftGeneratorSnapshot,
  getEditorialQueueSnapshot,
  getFeederNetworkSnapshot,
  GOOGLE_PUBLISHING_POLICY_BANNER,
  getIssueContentBoardSnapshot,
  getSourceRoutingSnapshot,
  listFeederSiteSummary,
  getSourceIntelSnapshot,
  TCR_WARNING_BANNERS,
  TX24_RUNOFF_ELECTION_CALENDAR
} from "@tx24/shared";

const modules = [
  "Sites / Tenants & Domains",
  "Content Publishing Governance",
  "Experiments & Conversion Tracking",
  "Messaging Compliance Center",
  "Creators & Distribution",
  "Volunteers / Events / Relational",
  "Dashboards & CPV Monte Carlo"
];

const feederSites = listFeederSiteSummary();
const snapshot = getFeederNetworkSnapshot();
const sourceIntelSnapshot = getSourceIntelSnapshot();
const editorialSnapshot = getEditorialQueueSnapshot();
const issueBoardSnapshot = getIssueContentBoardSnapshot();
const sourceRoutingSnapshot = getSourceRoutingSnapshot();
const draftGeneratorSnapshot = getDraftGeneratorSnapshot();

export function DashboardShell() {
  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">TX-24 runoff timing</div>
        <h1>Compliance-first campaign operating system</h1>
        <p className="muted">
          Registration deadline {TX24_RUNOFF_ELECTION_CALENDAR.voterRegistrationDeadline}. Early
          voting {TX24_RUNOFF_ELECTION_CALENDAR.earlyVotingStarts} through{" "}
          {TX24_RUNOFF_ELECTION_CALENDAR.earlyVotingEnds}. Election day{" "}
          {TX24_RUNOFF_ELECTION_CALENDAR.electionDay}.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Feeder network</div>
          <h2>{snapshot.siteCount} configured sites</h2>
          <p className="muted">
            {snapshot.readyCount} ready, {snapshot.buildingCount} building, {snapshot.plannedCount} planned.
          </p>
          <Link href="/feeder-sites" className="navlink" style={{ marginTop: 12 }}>
            Open feeder catalog
          </Link>
        </article>
        <article className="panel">
          <div className="eyebrow">Landing inventory</div>
          <h2>{snapshot.landingPageCount} landing pages</h2>
          <p className="muted">
            Each configured landing page has a tracked redirect route into the main ElectTJ funnel.
          </p>
          <Link href="/network-analytics" className="navlink" style={{ marginTop: 12 }}>
            View network analytics
          </Link>
        </article>
        <article className="panel">
          <div className="eyebrow">Source intelligence</div>
          <h2>{sourceIntelSnapshot.anchorCount} evidence anchors</h2>
          <p className="muted">
            {sourceIntelSnapshot.researchLeadCount} admin-only research leads and{" "}
            {sourceIntelSnapshot.operatorKitCount} deployment kits are now available for rapid
            contrast work.
          </p>
          <Link href="/source-intel" className="navlink" style={{ marginTop: 12 }}>
            Open source intel
          </Link>
        </article>
        <article className="panel">
          <div className="eyebrow">Editorial queue</div>
          <h2>{editorialSnapshot.taskCount} feeder tasks</h2>
          <p className="muted">
            {editorialSnapshot.publishedCount} published, {editorialSnapshot.reviewCount} in review,{" "}
            {editorialSnapshot.writingCount} in writing.
          </p>
          <Link href="/editorial-queue" className="navlink" style={{ marginTop: 12 }}>
            Open editorial queue
          </Link>
        </article>
        <article className="panel">
          <div className="eyebrow">Issue boards</div>
          <h2>{issueBoardSnapshot.boardCount} issue lanes</h2>
          <p className="muted">
            {issueBoardSnapshot.totalActiveTasks} active tasks tied to the six canonical feeder
            issues.
          </p>
          <Link href="/issue-boards" className="navlink" style={{ marginTop: 12 }}>
            Open issue boards
          </Link>
        </article>
        <article className="panel">
          <div className="eyebrow">Source router</div>
          <h2>{sourceRoutingSnapshot.exampleCount} routed examples</h2>
          <p className="muted">
            {sourceRoutingSnapshot.publishableCount} publishable and {sourceRoutingSnapshot.adminOnlyCount} admin-only routing decisions.
          </p>
          <Link href="/source-router" className="navlink" style={{ marginTop: 12 }}>
            Open source router
          </Link>
        </article>
        <article className="panel">
          <div className="eyebrow">Draft studio</div>
          <h2>{draftGeneratorSnapshot.exampleCount} draft bundles</h2>
          <p className="muted">
            {draftGeneratorSnapshot.publishableCount} publishable bundles spanning {draftGeneratorSnapshot.boardCount} issue lanes.
          </p>
          <Link href="/draft-studio" className="navlink" style={{ marginTop: 12 }}>
            Open draft studio
          </Link>
        </article>
        {modules.slice(0, 5).map((module) => (
          <article key={module} className="panel">
            <div className="eyebrow">Module</div>
            <h2>{module}</h2>
            <p className="muted">
              Scaffolded in the current build with shared policy contracts and audit-ready growth
              paths.
            </p>
          </article>
        ))}
      </section>

      <section className="grid">
        <article className="panel">
          <div className="eyebrow">Messaging warnings</div>
          <h2>A2P / TCR / Campaign Verify</h2>
          {TCR_WARNING_BANNERS.map((warning) => (
            <p key={warning} className="muted">
              {warning}
            </p>
          ))}
        </article>
        <article className="panel">
          <div className="eyebrow">Publishing governance</div>
          <h2>Value gate</h2>
          <p className="muted">{GOOGLE_PUBLISHING_POLICY_BANNER}</p>
          <div className="pill">Disclosure lock</div>
          <div className="pill">Similarity gate</div>
          <div className="pill">Altered media review</div>
          <div className="pill">Audit log required</div>
        </article>
      </section>

      <section style={{ marginTop: 20 }}>
        <article className="panel">
          <div className="eyebrow">Highest-priority feeder sites</div>
          <h2>Where the next build energy should go</h2>
          <div className="grid">
            {feederSites
              .filter((site) => site.launchPriority === "high")
              .map((site) => (
                <article key={site.tenantSlug} className="panel">
                  <div className="eyebrow">{site.launchStatus}</div>
                  <h3>{site.name}</h3>
                  <p className="muted">{site.audience}</p>
                  <p className="muted">{site.funnelGoal}</p>
                </article>
              ))}
          </div>
        </article>
      </section>
    </main>
  );
}
