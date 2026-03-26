import { FEEDER_SITES } from "./feeder-sites";
import { listIssueContentBoards } from "./issue-content-board";
import { MEDIA_ANCHORS, OPERATOR_KITS } from "./source-intel";

export type SourceSubmissionInput = {
  url: string;
  title?: string;
  source?: string;
  notes?: string;
};

export type SourceRoutingResult = {
  input: SourceSubmissionInput;
  matchedIssueBoards: string[];
  matchedFeederSites: string[];
  matchedAnchorSlugs: string[];
  matchedOperatorKits: string[];
  recommendedVisibility: "publishable" | "operator-kit" | "admin-only";
  suggestedOutputs: string[];
  riskFlags: string[];
  rationale: string[];
};

export type ParsedSourceSubmissionRow = {
  line: string;
  lineNumber: number;
  valid: boolean;
  input: SourceSubmissionInput | null;
  error: string | null;
};

const BOARD_KEYWORDS: Record<string, string[]> = {
  "cost-of-living": [
    "cost of living",
    "affordability",
    "groceries",
    "housing",
    "rent",
    "inflation",
    "working families",
    "medical bills"
  ],
  "health-care-affordability": [
    "health care",
    "healthcare",
    "coverage",
    "medical",
    "hospital",
    "prescription",
    "premium",
    "deductible",
    "insured"
  ],
  "honest-government": [
    "corruption",
    "honest government",
    "clean government",
    "ethics",
    "transparency",
    "stock trading",
    "self-dealing",
    "insider"
  ],
  "individual-freedoms": [
    "freedom",
    "freedoms",
    "privacy",
    "autonomy",
    "abortion",
    "reproductive",
    "due process",
    "speech",
    "religious liberty"
  ],
  "preserving-democracy": [
    "democracy",
    "courts",
    "rule of law",
    "doj",
    "judicial",
    "checks and balances",
    "constitution",
    "trust in government"
  ],
  "no-new-war": [
    "iran",
    "war powers",
    "war",
    "troops",
    "military action",
    "escalation",
    "congress decides war",
    "endless war"
  ]
};

const CITY_PRIORITY_FEEDERS: Record<string, string> = {
  irving: "irving-turnout-network",
  keller: "keller-community-action",
  "fort worth": "native-texans-for-tx24",
  "north fort worth": "native-texans-for-tx24",
  carrollton: "carrollton-families-first",
  grapevine: "grapevine-colleyville-growth",
  colleyville: "grapevine-colleyville-growth"
};

const ADMIN_ONLY_PATTERNS = [
  "white house title",
  "advisor",
  "lied",
  "liar",
  "scheme",
  "blocked",
  "indivisible",
  "sdec",
  "facebook group",
  "ignored me",
  "birthplace verification"
];

function normalizeSubmission(input: SourceSubmissionInput) {
  return [input.url, input.title, input.source, input.notes]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function matchAnchors(input: SourceSubmissionInput, normalized: string) {
  return MEDIA_ANCHORS.filter((anchor) => {
    const anchorUrl = anchor.url.toLowerCase();
    const title = anchor.title.toLowerCase();
    const source = anchor.source.toLowerCase();

    return (
      normalized.includes(anchorUrl) ||
      normalized.includes(title) ||
      normalized.includes(source) ||
      input.url.toLowerCase() === anchorUrl
    );
  });
}

function matchIssueBoards(normalized: string) {
  const issueBoards = listIssueContentBoards();

  return issueBoards.filter((board) =>
    (BOARD_KEYWORDS[board.slug] ?? []).some((keyword) => normalized.includes(keyword))
  );
}

function inferBoardsFromAnchors(anchorSlugs: string[]) {
  const boardMap: Record<string, string[]> = {
    "lonestarleft-tx24-sitting-right-there": ["preserving-democracy", "honest-government"],
    "lonestarleft-meet-tj-ware": ["individual-freedoms"],
    "native-texan-authenticity": ["preserving-democracy"],
    "paradise-claims-industry-authority": ["health-care-affordability", "honest-government"],
    "tjwareforcongress-distribution-footprint": ["cost-of-living"],
    "largelossexpert-social-footprint": ["honest-government"],
    "cbs-texas-flood-response": ["preserving-democracy"],
    "winter-storm-response": ["cost-of-living"],
    "term-limits-pledge": ["honest-government"]
  };

  return unique(anchorSlugs.flatMap((slug) => boardMap[slug] ?? []));
}

function inferFeederSites(boardSlugs: string[], normalized: string) {
  const issueBoards = listIssueContentBoards();
  const feederSites = issueBoards
    .filter((board) => boardSlugs.includes(board.slug))
    .flatMap((board) => board.feederSiteSlugs);

  const cityMatches = Object.entries(CITY_PRIORITY_FEEDERS)
    .filter(([city]) => normalized.includes(city))
    .map(([, feeder]) => feeder);

  return unique([...feederSites, ...cityMatches]).filter((slug) =>
    FEEDER_SITES.some((site) => site.tenantSlug === slug)
  );
}

function inferOperatorKits(anchorSlugs: string[], boardSlugs: string[]) {
  const issueBoards = listIssueContentBoards();
  const boardKits = issueBoards
    .filter((board) => boardSlugs.includes(board.slug))
    .map((board) => board.operatorKitSlug)
    .filter((slug): slug is string => Boolean(slug));

  const anchorKits = OPERATOR_KITS.filter((kit) => anchorSlugs.includes(kit.anchorSlug)).map((kit) => kit.slug);

  return unique([...boardKits, ...anchorKits]);
}

function inferSuggestedOutputs(boardSlugs: string[]) {
  const issueBoards = listIssueContentBoards();

  return unique(
    issueBoards
      .filter((board) => boardSlugs.includes(board.slug))
      .flatMap((board) => board.suggestedOutputs)
  ).slice(0, 6);
}

function inferRiskFlags(normalized: string, boardSlugs: string[]) {
  const risks: string[] = [];

  if (ADMIN_ONLY_PATTERNS.some((pattern) => normalized.includes(pattern))) {
    risks.push("Contains opposition-research or verification language that should stay admin-only until sourced.");
  }

  if (normalized.includes("war") || normalized.includes("iran")) {
    risks.push("Keep foreign-policy language disciplined and constitutional; avoid speculative motive claims.");
  }

  if (boardSlugs.includes("honest-government")) {
    risks.push("Anti-corruption pages must stay evidence-backed and avoid unsupported accusations.");
  }

  if (boardSlugs.includes("individual-freedoms")) {
    risks.push("Rights pages should stay broad and high-trust, not slogan-heavy or caricatured.");
  }

  return unique(risks);
}

function inferVisibility(normalized: string, anchorCount: number, boardCount: number): SourceRoutingResult["recommendedVisibility"] {
  if (ADMIN_ONLY_PATTERNS.some((pattern) => normalized.includes(pattern))) {
    return "admin-only";
  }

  if (anchorCount > 0 || boardCount > 0) {
    return "publishable";
  }

  return "operator-kit";
}

export function routeSourceSubmission(input: SourceSubmissionInput): SourceRoutingResult {
  const normalized = normalizeSubmission(input);
  const anchors = matchAnchors(input, normalized);
  const directBoards = matchIssueBoards(normalized).map((board) => board.slug);
  const anchorBoards = inferBoardsFromAnchors(anchors.map((anchor) => anchor.slug));
  const matchedIssueBoards = unique([...directBoards, ...anchorBoards]);
  const matchedFeederSites = inferFeederSites(matchedIssueBoards, normalized);
  const matchedAnchorSlugs = anchors.map((anchor) => anchor.slug);
  const matchedOperatorKits = inferOperatorKits(matchedAnchorSlugs, matchedIssueBoards);
  const suggestedOutputs = inferSuggestedOutputs(matchedIssueBoards);
  const riskFlags = inferRiskFlags(normalized, matchedIssueBoards);
  const recommendedVisibility = inferVisibility(normalized, matchedAnchorSlugs.length, matchedIssueBoards.length);

  const rationale = [
    matchedIssueBoards.length > 0
      ? `Matched issue lanes: ${matchedIssueBoards.join(", ")}.`
      : "No canonical issue-board keyword match yet.",
    matchedAnchorSlugs.length > 0
      ? `Matched source anchors: ${matchedAnchorSlugs.join(", ")}.`
      : "No existing source anchor matched directly.",
    matchedFeederSites.length > 0
      ? `Suggested feeder deployment targets: ${matchedFeederSites.join(", ")}.`
      : "No feeder deployment target inferred yet."
  ];

  return {
    input,
    matchedIssueBoards,
    matchedFeederSites,
    matchedAnchorSlugs,
    matchedOperatorKits,
    recommendedVisibility,
    suggestedOutputs,
    riskFlags,
    rationale
  };
}

export function parseSourceSubmissionBatch(batchText: string): ParsedSourceSubmissionRow[] {
  return batchText
    .split(/\r?\n/)
    .map((line, index) => ({ line: line.trim(), lineNumber: index + 1 }))
    .filter((row) => row.line.length > 0)
    .map((row) => {
      const parts = row.line.split("|").map((part) => part.trim());
      const [url, title, source, notes] = parts;

      if (!url) {
        return {
          ...row,
          valid: false,
          input: null,
          error: "Missing URL."
        };
      }

      try {
        new URL(url);
      } catch {
        return {
          ...row,
          valid: false,
          input: null,
          error: "Invalid URL."
        };
      }

      return {
        ...row,
        valid: true,
        input: {
          url,
          title: title || undefined,
          source: source || undefined,
          notes: notes || undefined
        },
        error: null
      };
    });
}

export function routeSourceSubmissionBatch(batchText: string) {
  const rows = parseSourceSubmissionBatch(batchText);
  const routed = rows
    .filter((row): row is ParsedSourceSubmissionRow & { input: SourceSubmissionInput } => row.valid && !!row.input)
    .map((row) => ({
      lineNumber: row.lineNumber,
      result: routeSourceSubmission(row.input)
    }));

  return {
    rows,
    routed,
    summary: {
      rowCount: rows.length,
      validCount: rows.filter((row) => row.valid).length,
      invalidCount: rows.filter((row) => !row.valid).length,
      publishableCount: routed.filter((row) => row.result.recommendedVisibility === "publishable").length,
      operatorKitCount: routed.filter((row) => row.result.recommendedVisibility === "operator-kit").length,
      adminOnlyCount: routed.filter((row) => row.result.recommendedVisibility === "admin-only").length
    }
  };
}

export function listSeededSourceRoutingExamples() {
  const seededInputs: SourceSubmissionInput[] = [
    {
      url: "https://www.lonestarleft.com/p/tx24-is-sitting-right-there",
      title: "TX24 Is Sitting Right There",
      source: "Lone Star Left"
    },
    {
      url: "https://paradiseclaims.com/paradise-claims-wts-2021",
      title: "Paradise Claims WTS 2021",
      source: "Paradise Claims"
    },
    {
      url: "https://electtj.com/about-tj",
      title: "Native Texan authenticity and Fort Worth roots",
      source: "Campaign record"
    },
    {
      url: "https://example.com/no-new-war-texas-voters",
      title: "Stop another endless war. Congress decides war.",
      source: "draft input"
    }
  ];

  return seededInputs.map(routeSourceSubmission);
}

export function getSourceRoutingSnapshot() {
  const examples = listSeededSourceRoutingExamples();

  return {
    exampleCount: examples.length,
    publishableCount: examples.filter((item) => item.recommendedVisibility === "publishable").length,
    operatorKitCount: examples.filter((item) => item.recommendedVisibility === "operator-kit").length,
    adminOnlyCount: examples.filter((item) => item.recommendedVisibility === "admin-only").length
  };
}
