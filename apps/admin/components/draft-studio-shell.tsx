"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  buildDraftOutputBundleFromInput,
  getDraftGeneratorSnapshot,
  listSeededDraftOutputBundles
} from "@tx24/shared";

const snapshot = getDraftGeneratorSnapshot();
const examples = listSeededDraftOutputBundles();

export function DraftStudioShell() {
  const [url, setUrl] = useState("https://www.lonestarleft.com/p/tx24-is-sitting-right-there");
  const [title, setTitle] = useState("TX24 Is Sitting Right There");
  const [source, setSource] = useState("Lone Star Left");
  const [notes, setNotes] = useState("");

  const draftBundle = useMemo(
    () =>
      buildDraftOutputBundleFromInput({
        url,
        title: title || undefined,
        source: source || undefined,
        notes: notes || undefined
      }),
    [notes, source, title, url]
  );

  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">Draft studio</div>
        <h1>Turn routed source material into deployable first-pass copy</h1>
        <p className="muted">
          This deterministic studio converts a source into feeder-page, op-ed, and commentary
          scaffolds so the content team can move quickly without losing message discipline.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Example bundles</div>
          <h2>{snapshot.exampleCount}</h2>
          <p className="muted">Seeded draft bundles available from the shared generator.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Publishable drafts</div>
          <h2>{snapshot.publishableCount}</h2>
          <p className="muted">Examples already aligned to public issue-board deployment lanes.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Admin-only drafts</div>
          <h2>{snapshot.adminOnlyCount}</h2>
          <p className="muted">Examples that stay internal until proof and approval are complete.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Issue coverage</div>
          <h2>{snapshot.boardCount}</h2>
          <p className="muted">Canonical issue lanes represented in the seeded draft set.</p>
        </article>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Source intake</div>
          <h2>Build one draft bundle</h2>
          <div className="formStack">
            <label className="fieldLabel">
              URL
              <input className="fieldInput" value={url} onChange={(event) => setUrl(event.target.value)} />
            </label>
            <label className="fieldLabel">
              Title
              <input className="fieldInput" value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label className="fieldLabel">
              Source
              <input className="fieldInput" value={source} onChange={(event) => setSource(event.target.value)} />
            </label>
            <label className="fieldLabel">
              Notes
              <textarea
                className="fieldTextarea"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </label>
          </div>
        </article>

        <article className="panel">
          <div className="eyebrow">{draftBundle.routing.recommendedVisibility}</div>
          <h2>{draftBundle.routing.input.title ?? draftBundle.routing.input.url}</h2>
          <p className="muted">Board: {draftBundle.selectedBoardSlug ?? "none"}</p>
          <p className="muted">Feeder: {draftBundle.selectedFeederSiteSlug ?? "none"}</p>
          <p className="muted">Anchor: {draftBundle.selectedAnchorSlug ?? "none"}</p>
          <div className="stack" style={{ marginTop: 12 }}>
            <Link href="/source-router" className="navlink">
              Back to source router
            </Link>
            <Link href="/issue-boards" className="navlink">
              Open issue boards
            </Link>
          </div>
          <ul className="list">
            {draftBundle.strategyNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Feeder page scaffold</div>
          <h2>{draftBundle.feederPage.headline}</h2>
          <p className="muted">{draftBundle.feederPage.subhead}</p>
          <div className="pill">{draftBundle.feederPage.primaryCta}</div>
          <div className="pill">{draftBundle.feederPage.secondaryCta}</div>
          <p className="muted">Slug suggestion: {draftBundle.feederPage.slugSuggestion}</p>
          <p className="muted">Meta title: {draftBundle.feederPage.metaTitle}</p>
          <p className="muted">{draftBundle.feederPage.metaDescription}</p>
          <h3>Section outline</h3>
          <ul className="list">
            {draftBundle.feederPage.sectionOutline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Proof points</h3>
          <ul className="list">
            {draftBundle.feederPage.proofPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Copy hooks</h3>
          <ul className="list">
            {draftBundle.feederPage.copyHooks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="eyebrow">Op-ed scaffold</div>
          <h2>{draftBundle.opEd.workingTitle}</h2>
          <p className="muted">{draftBundle.opEd.standfirst}</p>
          <p>{draftBundle.opEd.thesis}</p>
          <h3>Outline</h3>
          <ul className="list">
            {draftBundle.opEd.outline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Evidence hooks</h3>
          <ul className="list">
            {draftBundle.opEd.evidenceHooks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="muted">{draftBundle.opEd.closingArgument}</p>
        </article>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Commentary brief</div>
          <h2>{draftBundle.commentaryBrief.openingFrame}</h2>
          <p>{draftBundle.commentaryBrief.thesis}</p>
          <h3>Talking points</h3>
          <ul className="list">
            {draftBundle.commentaryBrief.talkingPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Contrast guardrails</h3>
          <ul className="list">
            {draftBundle.commentaryBrief.contrastGuardrails.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="muted">{draftBundle.commentaryBrief.closingAsk}</p>
          <div className="draftBlock">{draftBundle.commentaryBrief.socialCaption}</div>
        </article>

        <article className="panel">
          <div className="eyebrow">Compliance notes</div>
          <h2>Review before publication</h2>
          <ul className="list">
            {draftBundle.feederPage.complianceNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel">
        <div className="eyebrow">Seeded draft bundles</div>
        <h2>Shared-model examples</h2>
        <div className="grid">
          {examples.map((example) => (
            <article
              key={`${example.routing.input.url}-${example.feederPage.slugSuggestion}`}
              className="panel"
            >
              <div className="eyebrow">{example.routing.recommendedVisibility}</div>
              <h3>{example.feederPage.headline}</h3>
              <p className="muted">{example.routing.input.title ?? example.routing.input.url}</p>
              <p className="muted">Board: {example.selectedBoardSlug ?? "none"}</p>
              <p className="muted">Feeder: {example.selectedFeederSiteSlug ?? "none"}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
