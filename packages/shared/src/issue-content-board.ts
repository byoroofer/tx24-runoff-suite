import { FEEDER_SITES, listEditorialQueueRows } from "./feeder-sites";

export type IssueContentBoard = {
  slug: string;
  title: string;
  strategicFrame: string;
  whyNow: string;
  feederSiteSlugs: string[];
  anchorSlug: string;
  operatorKitSlug: string | null;
  publishTargets: string[];
  suggestedOutputs: string[];
  localCities: string[];
  contrastFigures: string[];
  landingPageCount: number;
  activeTaskCount: number;
  publishedTaskCount: number;
};

type IssueContentBoardDefinition = Omit<
  IssueContentBoard,
  "localCities" | "contrastFigures" | "landingPageCount" | "activeTaskCount" | "publishedTaskCount"
>;

const ISSUE_CONTENT_BOARD_DEFINITIONS: IssueContentBoardDefinition[] = [
  {
    slug: "cost-of-living",
    title: "Cost of Living for Working Families",
    strategicFrame:
      "Own the broadest working-family pain point with pages about housing, groceries, insurance, and everyday squeeze.",
    whyNow:
      "This is the most durable feeder lane and should stay at the center of both persuasion and turnout.",
    feederSiteSlugs: ["tx24-affordability-watch", "health-care-affordability-tx24", "irving-turnout-network"],
    anchorSlug: "tjwareforcongress-distribution-footprint",
    operatorKitSlug: "distribution-footprint-kit",
    publishTargets: ["feeder landing pages", "city explainers", "letters to editor", "commentary placements"],
    suggestedOutputs: [
      "Irving cost-of-living explainer",
      "Working-family affordability contrast page",
      "Health care as cost pressure landing page"
    ]
  },
  {
    slug: "health-care-affordability",
    title: "Health Care Affordability and Coverage",
    strategicFrame:
      "Treat health care as a cost-of-living issue with emotional weight instead of a buried policy subtopic.",
    whyNow:
      "This gives the network a second major kitchen-table lane that supports family, suburban, and turnout audiences.",
    feederSiteSlugs: ["health-care-affordability-tx24", "moms-for-tx24", "tx24-consumer-protection"],
    anchorSlug: "paradise-claims-industry-authority",
    operatorKitSlug: "industry-authority-kit",
    publishTargets: ["feeder landing pages", "policy explainers", "donor persuasion pages", "community forum responses"],
    suggestedOutputs: [
      "Premiums and deductibles explainer",
      "Health care affordability page for families",
      "Coverage pressure and working-family budget page"
    ]
  },
  {
    slug: "honest-government",
    title: "Honest Government / Anti-Corruption Reform",
    strategicFrame:
      "Use ethics, transparency, stock-trading bans, and insider accountability to make reform feel practical and serious.",
    whyNow:
      "This is one of the cleanest ways to separate TJ from consultant-made politics and insider networks.",
    feederSiteSlugs: ["honest-government-tx24", "preserving-democracy-tx24", "tx24-consumer-protection"],
    anchorSlug: "lonestarleft-tx24-sitting-right-there",
    operatorKitSlug: "runoff-trust-contrast",
    publishTargets: ["reform landers", "earned-media briefs", "op-ed drafts", "contrast explainers"],
    suggestedOutputs: [
      "Honest government reform page",
      "Anti-corruption contrast explainer",
      "Transparency and competence opinion draft"
    ]
  },
  {
    slug: "individual-freedoms",
    title: "Individual Freedoms",
    strategicFrame:
      "Bundle privacy, bodily autonomy, personal liberty, speech, and due process into one high-trust freedom frame.",
    whyNow:
      "This gives the network a broader rights lane than a single-issue abortion page and works better across suburban audiences.",
    feederSiteSlugs: ["individual-freedoms-tx24", "moms-for-tx24", "educators-for-tx24"],
    anchorSlug: "lonestarleft-meet-tj-ware",
    operatorKitSlug: "accomplishment-proof-kit",
    publishTargets: ["rights landers", "suburban persuasion pages", "letters to editor", "guest columns"],
    suggestedOutputs: [
      "Individual freedoms explainer",
      "Privacy and autonomy landing page",
      "Freedom and family trust commentary pack"
    ]
  },
  {
    slug: "preserving-democracy",
    title: "Preserving Democracy / Courts / Rule of Law",
    strategicFrame:
      "Make democracy, courts, and the rule of law feel like everyday trust questions, not abstract elite language.",
    whyNow:
      "This is the institutional-seriousness lane that helps the campaign sound prepared, sober, and credible.",
    feederSiteSlugs: ["preserving-democracy-tx24", "honest-government-tx24", "native-texans-for-tx24"],
    anchorSlug: "lonestarleft-tx24-sitting-right-there",
    operatorKitSlug: "runoff-trust-contrast",
    publishTargets: ["institutional trust pages", "rule-of-law explainers", "earned opinion pieces", "forum commentary"],
    suggestedOutputs: [
      "Preserving democracy explainer",
      "Courts and rule-of-law page",
      "Rebuild trust in government commentary brief"
    ]
  },
  {
    slug: "no-new-war",
    title: "No New Iran War / Constitutional War Powers",
    strategicFrame:
      "Frame restraint around Congress deciding war, American interests first, and protecting families from another endless conflict.",
    whyNow:
      "This is a sharp but narrower lane, so it should stay disciplined and constitutional instead of drifting into loose theory.",
    feederSiteSlugs: ["no-new-iran-war-tx24", "north-texas-veterans", "early-vote-tx24"],
    anchorSlug: "tjwareforcongress-distribution-footprint",
    operatorKitSlug: "distribution-footprint-kit",
    publishTargets: ["issue landers", "constitutional explainers", "letters to editor", "human-operated commentary kits"],
    suggestedOutputs: [
      "Congress decides war page",
      "America first, no endless war landing page",
      "War powers turnout bridge page"
    ]
  }
];

export function listIssueContentBoards(): IssueContentBoard[] {
  const editorial = listEditorialQueueRows();

  return ISSUE_CONTENT_BOARD_DEFINITIONS.map((definition) => {
    const sites = FEEDER_SITES.filter((site) => definition.feederSiteSlugs.includes(site.tenantSlug));
    const siteTasks = editorial.filter((task) => definition.feederSiteSlugs.includes(task.tenantSlug));

    return {
      slug: definition.slug,
      title: definition.title,
      strategicFrame: definition.strategicFrame,
      whyNow: definition.whyNow,
      feederSiteSlugs: [...definition.feederSiteSlugs],
      anchorSlug: definition.anchorSlug,
      operatorKitSlug: definition.operatorKitSlug,
      publishTargets: [...definition.publishTargets],
      suggestedOutputs: [...definition.suggestedOutputs],
      localCities: [...new Set(sites.flatMap((site) => site.localCities))],
      contrastFigures: [...new Set(sites.flatMap((site) => site.contrastFigures))],
      landingPageCount: sites.reduce((sum, site) => sum + site.landingPages.length, 0),
      activeTaskCount: siteTasks.filter((task) => task.status !== "published").length,
      publishedTaskCount: siteTasks.filter((task) => task.status === "published").length
    };
  });
}

export function getIssueContentBoardSnapshot() {
  const boards = listIssueContentBoards();

  return {
    boardCount: boards.length,
    totalLandingPages: boards.reduce((sum, board) => sum + board.landingPageCount, 0),
    totalActiveTasks: boards.reduce((sum, board) => sum + board.activeTaskCount, 0),
    totalPublishedTasks: boards.reduce((sum, board) => sum + board.publishedTaskCount, 0)
  };
}
