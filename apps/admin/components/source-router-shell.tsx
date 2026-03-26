"use client";

import { useMemo, useState } from "react";
import {
  getSourceRoutingSnapshot,
  listSeededSourceRoutingExamples,
  parseSourceSubmissionBatch,
  routeSourceSubmission,
  routeSourceSubmissionBatch
} from "@tx24/shared";

const snapshot = getSourceRoutingSnapshot();
const examples = listSeededSourceRoutingExamples();

const starterBatch = [
  "https://www.lonestarleft.com/p/tx24-is-sitting-right-there | TX24 Is Sitting Right There | Lone Star Left",
  "https://paradiseclaims.com/paradise-claims-wts-2021 | Paradise Claims WTS 2021 | Paradise Claims",
  "https://example.com/clean-government-north-texas | North Texans are tired of insiders, games, and self-dealing politics. | draft source input",
  "https://example.com/war-powers | Stop another endless war. Congress decides war. | draft source input"
].join("\n");

export function SourceRouterShell() {
  const [batchInput, setBatchInput] = useState(starterBatch);
  const [singleUrl, setSingleUrl] = useState("https://www.lonestarleft.com/p/tx24-is-sitting-right-there");
  const [singleTitle, setSingleTitle] = useState("TX24 Is Sitting Right There");
  const [singleSource, setSingleSource] = useState("Lone Star Left");
  const [singleNotes, setSingleNotes] = useState("");

  const batchResult = useMemo(() => routeSourceSubmissionBatch(batchInput), [batchInput]);
  const singleResult = useMemo(
    () =>
      routeSourceSubmission({
        url: singleUrl,
        title: singleTitle || undefined,
        source: singleSource || undefined,
        notes: singleNotes || undefined
      }),
    [singleUrl, singleTitle, singleSource, singleNotes]
  );
  const parsedRows = useMemo(() => parseSourceSubmissionBatch(batchInput), [batchInput]);

  return (
    <main className="shell">
      <section className="banner">
        <div className="eyebrow">Source router</div>
        <h1>Source-ingestion to issue-board pipeline</h1>
        <p className="muted">
          Paste source links in batch format and this deterministic router will recommend the issue
          lane, feeder targets, output types, and whether the item should stay admin-only.
        </p>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Seeded examples</div>
          <h2>{snapshot.exampleCount}</h2>
          <p className="muted">Preloaded routing examples available from the shared source-router model.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Batch rows</div>
          <h2>{batchResult.summary.rowCount}</h2>
          <p className="muted">
            {batchResult.summary.validCount} valid, {batchResult.summary.invalidCount} invalid.
          </p>
        </article>
        <article className="panel">
          <div className="eyebrow">Publishable</div>
          <h2>{batchResult.summary.publishableCount}</h2>
          <p className="muted">Rows that are ready to route into public issue boards and feeder pages.</p>
        </article>
        <article className="panel">
          <div className="eyebrow">Admin-only</div>
          <h2>{batchResult.summary.adminOnlyCount}</h2>
          <p className="muted">Rows that should stay in research until the proof stack is complete.</p>
        </article>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Single source workbench</div>
          <h2>Route one item immediately</h2>
          <div className="formStack">
            <label className="fieldLabel">
              URL
              <input className="fieldInput" value={singleUrl} onChange={(event) => setSingleUrl(event.target.value)} />
            </label>
            <label className="fieldLabel">
              Title
              <input className="fieldInput" value={singleTitle} onChange={(event) => setSingleTitle(event.target.value)} />
            </label>
            <label className="fieldLabel">
              Source
              <input className="fieldInput" value={singleSource} onChange={(event) => setSingleSource(event.target.value)} />
            </label>
            <label className="fieldLabel">
              Notes
              <textarea
                className="fieldTextarea"
                value={singleNotes}
                onChange={(event) => setSingleNotes(event.target.value)}
              />
            </label>
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">{singleResult.recommendedVisibility}</div>
          <h2>{singleResult.input.title ?? singleResult.input.url}</h2>
          <p className="muted">Issue lanes: {singleResult.matchedIssueBoards.join(", ") || "none"}</p>
          <p className="muted">Feeder sites: {singleResult.matchedFeederSites.join(", ") || "none"}</p>
          <p className="muted">Anchors: {singleResult.matchedAnchorSlugs.join(", ") || "none"}</p>
          <p className="muted">Operator kits: {singleResult.matchedOperatorKits.join(", ") || "none"}</p>
          <ul className="list">
            {singleResult.suggestedOutputs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="eyebrow">Batch intake</div>
        <h2>Paste one source per line</h2>
        <p className="muted">
          Format: <span className="mono">url | title | source | notes</span>. Only the URL is required.
        </p>
        <textarea
          className="batchTextarea"
          value={batchInput}
          onChange={(event) => setBatchInput(event.target.value)}
        />
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="panel">
          <div className="eyebrow">Parsed rows</div>
          <h2>Input health check</h2>
          <ul className="list">
            {parsedRows.map((row) => (
              <li key={`${row.lineNumber}-${row.line}`}>
                Line {row.lineNumber}: {row.valid ? "valid" : row.error}
              </li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">Routing summary</div>
          <h2>Batch output mix</h2>
          <div className="pill">Publishable: {batchResult.summary.publishableCount}</div>
          <div className="pill">Operator-kit: {batchResult.summary.operatorKitCount}</div>
          <div className="pill">Admin-only: {batchResult.summary.adminOnlyCount}</div>
        </article>
      </section>

      <section className="grid" style={{ marginBottom: 20 }}>
        {batchResult.routed.map((item) => (
          <article key={`${item.lineNumber}-${item.result.input.url}`} className="panel">
            <div className="eyebrow">
              line {item.lineNumber} / {item.result.recommendedVisibility}
            </div>
            <h2>{item.result.input.title ?? item.result.input.url}</h2>
            <p className="muted">{item.result.input.url}</p>
            <p className="muted">Issue lanes: {item.result.matchedIssueBoards.join(", ") || "none"}</p>
            <p className="muted">Feeder sites: {item.result.matchedFeederSites.join(", ") || "none"}</p>
            <p className="muted">Anchors: {item.result.matchedAnchorSlugs.join(", ") || "none"}</p>
            <p className="muted">Operator kits: {item.result.matchedOperatorKits.join(", ") || "none"}</p>
            <ul className="list">
              {item.result.suggestedOutputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
            {item.result.riskFlags.length > 0 ? (
              <ul className="list">
                {item.result.riskFlags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="eyebrow">Seeded routing examples</div>
        <h2>Shared-model previews</h2>
        <div className="grid">
          {examples.map((example) => (
            <article key={`${example.input.url}-${example.input.title ?? "untitled"}`} className="panel">
              <div className="eyebrow">{example.recommendedVisibility}</div>
              <h3>{example.input.title ?? example.input.url}</h3>
              <p className="muted">Issue lanes: {example.matchedIssueBoards.join(", ") || "none"}</p>
              <p className="muted">Feeder sites: {example.matchedFeederSites.join(", ") || "none"}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
