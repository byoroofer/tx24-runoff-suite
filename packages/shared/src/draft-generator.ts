import { FEEDER_SITES } from "./feeder-sites";
import { listIssueContentBoards, type IssueContentBoard } from "./issue-content-board";
import { getAnchorBySlug } from "./source-intel";
import {
  listSeededSourceRoutingExamples,
  routeSourceSubmission,
  type SourceRoutingResult,
  type SourceSubmissionInput
} from "./source-router";

export type DraftFeederPage = {
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  slugSuggestion: string;
  metaTitle: string;
  metaDescription: string;
  sectionOutline: string[];
  proofPoints: string[];
  copyHooks: string[];
  complianceNotes: string[];
};

export type DraftOpEd = {
  workingTitle: string;
  standfirst: string;
  thesis: string;
  outline: string[];
  evidenceHooks: string[];
  closingArgument: string;
};

export type DraftCommentaryBrief = {
  openingFrame: string;
  thesis: string;
  talkingPoints: string[];
  contrastGuardrails: string[];
  closingAsk: string;
  socialCaption: string;
};

export type DraftOutputBundle = {
  routing: SourceRoutingResult;
  selectedBoardSlug: string | null;
  selectedFeederSiteSlug: string | null;
  selectedAnchorSlug: string | null;
  strategyNotes: string[];
  feederPage: DraftFeederPage;
  opEd: DraftOpEd;
  commentaryBrief: DraftCommentaryBrief;
};

type DraftFrame = {
  valueProp: string;
  headlineStem: string;
  evidenceAngle: string;
  cta: string;
  opEdVerb: string;
  commentaryFrame: string;
};

const DEFAULT_BOARD_SLUG = "cost-of-living";

const DRAFT_FRAMES: Record<string, DraftFrame> = {
  "cost-of-living": {
    valueProp: "Working families need relief that feels local, practical, and immediate.",
    headlineStem: "North Texans need a representative who understands the squeeze and knows how to fight it.",
    evidenceAngle: "Tie rising costs to real family pressure in TX-24 instead of generic national talking points.",
    cta: "Stand with TJ for lower costs",
    opEdVerb: "afford",
    commentaryFrame: "This race should be about what North Texas families can actually afford right now."
  },
  "health-care-affordability": {
    valueProp: "Health care is one of the clearest cost pressures families feel every month.",
    headlineStem: "Families in TX-24 deserve coverage they can trust and care they can actually afford.",
    evidenceAngle: "Use household pressure, insurance frustration, and care access to show why this race matters.",
    cta: "Join TJ on health care affordability",
    opEdVerb: "pay for care",
    commentaryFrame: "Health care costs are not abstract policy. They hit family budgets every single month."
  },
  "honest-government": {
    valueProp: "Voters want competence, ethics, and accountability they can see.",
    headlineStem: "TX-24 deserves honest government, not insider games or consultant-made politics.",
    evidenceAngle: "Frame reform around trust, transparency, and practical anti-corruption measures.",
    cta: "Back honest government in TX-24",
    opEdVerb: "trust government again",
    commentaryFrame: "People are tired of politics that feels managed, self-protective, and disconnected."
  },
  "individual-freedoms": {
    valueProp: "Freedom should feel personal, practical, and rooted in dignity.",
    headlineStem: "North Texans should have the freedom to make personal decisions without political intrusion.",
    evidenceAngle: "Bundle privacy, autonomy, due process, speech, and family trust into one clear freedom frame.",
    cta: "Stand up for individual freedoms",
    opEdVerb: "protect freedom",
    commentaryFrame: "The strongest freedom message is bigger than one headline or one party talking point."
  },
  "preserving-democracy": {
    valueProp: "Institutional trust becomes persuasive when it feels concrete and close to home.",
    headlineStem: "TX-24 needs a representative who will defend the rule of law and rebuild trust in public institutions.",
    evidenceAngle: "Make courts, DOJ, and democratic norms feel like everyday stability questions.",
    cta: "Help defend the rule of law",
    opEdVerb: "trust the system",
    commentaryFrame: "Democracy is not an abstract slogan if families no longer trust the system to work fairly."
  },
  "no-new-war": {
    valueProp: "Restraint, constitutional war powers, and America-first discipline cut through broad voter fatigue.",
    headlineStem: "Congress decides war, and North Texas families should not be dragged into another endless conflict.",
    evidenceAngle: "Keep the argument disciplined: constitutional authority, cost, risk, and American interests first.",
    cta: "Stand against another endless war",
    opEdVerb: "avoid another endless war",
    commentaryFrame: "People are exhausted by leaders who treat escalation like the default setting."
  }
};

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function getPrimaryBoard(routing: SourceRoutingResult): IssueContentBoard {
  const boards = listIssueContentBoards();
  const selectedBoard =
    boards.find((board) => board.slug === routing.matchedIssueBoards[0]) ??
    boards.find((board) => board.slug === DEFAULT_BOARD_SLUG) ??
    boards[0];

  if (!selectedBoard) {
    throw new Error("No issue boards are configured for draft generation.");
  }

  return selectedBoard;
}

function getPrimaryFeederSite(routing: SourceRoutingResult, board: IssueContentBoard) {
  const selectedFeederSlug = routing.matchedFeederSites[0] ?? board.feederSiteSlugs[0] ?? null;

  return {
    slug: selectedFeederSlug,
    site: FEEDER_SITES.find((site) => site.tenantSlug === selectedFeederSlug) ?? null
  };
}

function buildComplianceNotes(routing: SourceRoutingResult) {
  const notes = [...routing.riskFlags];

  notes.push("Keep disclosure lock enabled on public pages and route any altered-media claims through compliance review.");
  notes.push("Human review is required before publication or outward distribution.");

  if (routing.recommendedVisibility === "admin-only") {
    notes.push("This item should remain internal until the proof stack is complete and approved.");
  }

  return unique(notes);
}

function buildStrategyNotes(
  routing: SourceRoutingResult,
  board: IssueContentBoard,
  feederSiteSlug: string | null,
  anchorSlug: string | null
) {
  const anchor = anchorSlug ? getAnchorBySlug(anchorSlug) : null;
  const notes = [
    `Lead with the ${board.title.toLowerCase()} lane, then bridge into TJ's broader campaign narrative.`,
    `Deploy first on ${feederSiteSlug ?? board.feederSiteSlugs[0]} and route traffic back into the main ElectTJ funnel.`,
    `Use ${board.localCities.slice(0, 3).join(", ")} as the first local proof set when tightening copy.`,
    `Keep the contrast disciplined around ${board.contrastFigures.slice(0, 3).join(", ")} without drifting into unsupported claims.`
  ];

  if (anchor) {
    notes.push(`Use ${anchor.title} as a proof anchor rather than treating this as a cold-start topic.`);
  }

  if (routing.recommendedVisibility === "admin-only") {
    notes.push("Keep public-facing drafts soft until the underlying facts are independently sourced and archived.");
  }

  return notes;
}

export function buildDraftOutputBundleFromRouting(routing: SourceRoutingResult): DraftOutputBundle {
  const board = getPrimaryBoard(routing);
  const frame = DRAFT_FRAMES[board.slug] ?? DRAFT_FRAMES[DEFAULT_BOARD_SLUG];

  if (!frame) {
    throw new Error(`No draft frame configured for board ${board.slug}.`);
  }

  const anchorSlug = routing.matchedAnchorSlugs[0] ?? board.anchorSlug;
  const anchor = anchorSlug ? getAnchorBySlug(anchorSlug) : null;
  const feeder = getPrimaryFeederSite(routing, board);
  const feederName = feeder.site?.name ?? "TX-24 feeder site";
  const sourceTitle = routing.input.title ?? routing.input.url;
  const sourceLabel = routing.input.source ?? "source material";
  const localFocus = board.localCities.slice(0, 3).join(", ");
  const slugSuggestion = slugify(
    `${feeder.slug ?? board.slug}-${sourceTitle}-${routing.input.source ?? board.slug}`
  );
  const complianceNotes = buildComplianceNotes(routing);

  return {
    routing,
    selectedBoardSlug: board.slug,
    selectedFeederSiteSlug: feeder.slug,
    selectedAnchorSlug: anchorSlug,
    strategyNotes: buildStrategyNotes(routing, board, feeder.slug, anchorSlug),
    feederPage: {
      headline: frame.headlineStem,
      subhead: `${frame.valueProp} Use ${sourceLabel} and ${sourceTitle} to show why this matters specifically for ${localFocus}.`,
      primaryCta: frame.cta,
      secondaryCta: "See TJ's record and take action",
      slugSuggestion,
      metaTitle: `${board.title} | ${feederName} | Elect TJ`,
      metaDescription: `${frame.valueProp} ${sourceTitle} becomes a district-specific proof point tied to TJ Ware and TX-24.`,
      sectionOutline: [
        `Open with the core frame: ${frame.commentaryFrame}`,
        `Explain why ${sourceTitle} matters in TX-24 right now.`,
        `Connect the topic to TJ's local record, roots, or authority lane.`,
        `Draw a disciplined contrast with generic political messaging and insider politics.`,
        "Close with one clear action path into the main campaign funnel."
      ],
      proofPoints: unique([
        board.strategicFrame,
        board.whyNow,
        ...(anchor ? [anchor.title] : []),
        ...board.publishTargets.slice(0, 2)
      ]),
      copyHooks: unique([
        frame.evidenceAngle,
        `Use ${sourceLabel} as the opening proof hook.`,
        `Mention ${localFocus} early so the page feels district-rooted.`,
        `Bridge from issue urgency into ${board.publishTargets[0]}.`
      ]),
      complianceNotes
    },
    opEd: {
      workingTitle: `${sourceTitle}: What TX-24 should demand next`,
      standfirst: `${frame.valueProp} This piece should sound sober, specific, and district-rooted instead of generic or overheated.`,
      thesis: `${frame.commentaryFrame} TX-24 needs a representative who can ${frame.opEdVerb} with credibility, discipline, and local accountability.`,
      outline: [
        `Start with ${sourceTitle} as the public hook.`,
        `Translate the national or source-level issue into a district consequence for ${localFocus}.`,
        `Show why TJ's record, roots, or authority make him more credible on this question.`,
        "Offer a specific reform, accountability step, or constitutional frame.",
        "End by inviting readers into the broader campaign and runoff urgency."
      ],
      evidenceHooks: unique([
        `${sourceLabel} coverage`,
        ...(anchor ? [anchor.title] : []),
        ...routing.matchedAnchorSlugs.map((slug) => `anchor:${slug}`),
        ...board.suggestedOutputs.slice(0, 2)
      ]),
      closingArgument:
        "The closing should make the race feel like a choice between prepared, grounded leadership and politics that feels generic, disconnected, or overly managed."
    },
    commentaryBrief: {
      openingFrame: frame.commentaryFrame,
      thesis: `${board.title} is a trust question, and TJ should be framed as the candidate with the strongest local grounding and operating credibility.`,
      talkingPoints: unique([
        `Lead with ${board.title.toLowerCase()}, not a cluttered multi-issue jump.`,
        `Use ${sourceTitle} as a proof point, not as the whole argument.`,
        `Bring the issue back to ${localFocus} within the first 2-3 sentences.`,
        "Keep the contrast factual, calm, and evidence-backed.",
        "Route every commentary piece toward one action: join, donate, volunteer, or read more."
      ]),
      contrastGuardrails: [
        "Do not state unsupported allegations as fact.",
        "Do not overclaim what a source proves beyond its actual text or public record.",
        "Keep opponent contrast rooted in preparedness, originality, credibility, and local trust."
      ],
      closingAsk: "Close by asking readers to join the campaign, share the issue page, or move into the runoff action funnel.",
      socialCaption: `${frame.commentaryFrame} TJ Ware is offering a more grounded path for TX-24.`
    }
  };
}

export function buildDraftOutputBundleFromInput(input: SourceSubmissionInput) {
  return buildDraftOutputBundleFromRouting(routeSourceSubmission(input));
}

export function listSeededDraftOutputBundles() {
  return listSeededSourceRoutingExamples().map(buildDraftOutputBundleFromRouting);
}

export function getDraftGeneratorSnapshot() {
  const bundles = listSeededDraftOutputBundles();

  return {
    exampleCount: bundles.length,
    publishableCount: bundles.filter((bundle) => bundle.routing.recommendedVisibility === "publishable").length,
    adminOnlyCount: bundles.filter((bundle) => bundle.routing.recommendedVisibility === "admin-only").length,
    boardCount: unique(bundles.map((bundle) => bundle.selectedBoardSlug)).length
  };
}
