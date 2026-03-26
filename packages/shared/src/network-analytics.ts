import { FEEDER_SITES, type FeederSiteTheme } from "./feeder-sites";

export type FeederPerformance = {
  tenantSlug: string;
  clicks: number;
  signups: number;
  volunteers: number;
  donations: number;
  events: number;
  conversionRate: number;
  donationRate: number;
};

export type LaunchWave = "launch-first" | "launch-second" | "hold";

export type LaunchWaveItem = {
  tenantSlug: string;
  name: string;
  audience: string;
  launchWave: LaunchWave;
  rationale: string;
};

const BASELINE_PERFORMANCE: FeederPerformance[] = [
  {
    tenantSlug: "tx24-affordability-watch",
    clicks: 428,
    signups: 61,
    volunteers: 9,
    donations: 18,
    events: 4,
    conversionRate: 14.3,
    donationRate: 4.2
  },
  {
    tenantSlug: "health-care-affordability-tx24",
    clicks: 246,
    signups: 37,
    volunteers: 6,
    donations: 11,
    events: 3,
    conversionRate: 15,
    donationRate: 4.5
  },
  {
    tenantSlug: "honest-government-tx24",
    clicks: 194,
    signups: 28,
    volunteers: 5,
    donations: 8,
    events: 2,
    conversionRate: 14.4,
    donationRate: 4.1
  },
  {
    tenantSlug: "individual-freedoms-tx24",
    clicks: 221,
    signups: 33,
    volunteers: 6,
    donations: 9,
    events: 4,
    conversionRate: 14.9,
    donationRate: 4.1
  },
  {
    tenantSlug: "preserving-democracy-tx24",
    clicks: 173,
    signups: 24,
    volunteers: 5,
    donations: 6,
    events: 2,
    conversionRate: 13.9,
    donationRate: 3.5
  },
  {
    tenantSlug: "no-new-iran-war-tx24",
    clicks: 148,
    signups: 19,
    volunteers: 4,
    donations: 5,
    events: 2,
    conversionRate: 12.8,
    donationRate: 3.4
  },
  {
    tenantSlug: "early-vote-tx24",
    clicks: 311,
    signups: 48,
    volunteers: 17,
    donations: 10,
    events: 12,
    conversionRate: 15.4,
    donationRate: 3.2
  },
  {
    tenantSlug: "native-texans-for-tx24",
    clicks: 236,
    signups: 36,
    volunteers: 7,
    donations: 9,
    events: 5,
    conversionRate: 15.3,
    donationRate: 3.8
  },
  {
    tenantSlug: "paradise-claims-authority",
    clicks: 205,
    signups: 27,
    volunteers: 3,
    donations: 12,
    events: 2,
    conversionRate: 13.2,
    donationRate: 5.9
  },
  {
    tenantSlug: "irving-turnout-network",
    clicks: 188,
    signups: 29,
    volunteers: 10,
    donations: 5,
    events: 7,
    conversionRate: 15.4,
    donationRate: 2.7
  }
];

const LAUNCH_WAVE_MAP: Record<string, { launchWave: LaunchWave; rationale: string }> = {
  "tx24-affordability-watch": {
    launchWave: "launch-first",
    rationale: "Broadest voter pain point and still the strongest seeded signup performer."
  },
  "health-care-affordability-tx24": {
    launchWave: "launch-first",
    rationale: "Health care is one of the cleanest working-family pressure points and deserves its own lane."
  },
  "honest-government-tx24": {
    launchWave: "launch-first",
    rationale: "Anti-corruption is broad, durable, and gives TJ a serious reform case without sounding generic."
  },
  "individual-freedoms-tx24": {
    launchWave: "launch-first",
    rationale: "Freedom, privacy, and bodily autonomy create a persuasive rights lane with strong suburban reach."
  },
  "preserving-democracy-tx24": {
    launchWave: "launch-first",
    rationale: "Democracy, courts, and the rule of law give the network a higher-trust institutional message."
  },
  "no-new-iran-war-tx24": {
    launchWave: "launch-second",
    rationale: "Powerful but narrower lane; best framed around constitutional war powers, risk, and American interests."
  },
  "early-vote-tx24": {
    launchWave: "launch-first",
    rationale: "Directly tied to the calendar and one of the fastest routes to measurable conversion."
  },
  "native-texans-for-tx24": {
    launchWave: "launch-first",
    rationale: "Texas roots is a distinctive emotional trust frame no generic issue site can replace."
  },
  "paradise-claims-authority": {
    launchWave: "launch-first",
    rationale: "Turns TJ's strongest accomplishment stack into donor, media, and credibility assets."
  },
  "tx24-consumer-protection": {
    launchWave: "launch-second",
    rationale: "Strong authority-driven accountability lane, but it can follow the core affordability and health care push."
  },
  "north-texas-veterans": {
    launchWave: "launch-second",
    rationale: "Trust-heavy and useful, but better after the first issue stack is moving."
  },
  "moms-for-tx24": {
    launchWave: "launch-second",
    rationale: "Good suburban trust concept, but the broader freedoms and health-care lanes are stronger first."
  },
  "educators-for-tx24": {
    launchWave: "launch-second",
    rationale: "Credible and useful, but it needs more depth than the first-wave sites."
  },
  "keller-community-action": {
    launchWave: "launch-second",
    rationale: "Excellent local proof site, but it works best after the sharper issue and identity lanes are established."
  },
  "irving-turnout-network": {
    launchWave: "launch-first",
    rationale: "Irving is too important to leave abstract; this turns city-level interest into real turnout pressure."
  },
  "carrollton-families-first": {
    launchWave: "hold",
    rationale: "Useful local variation, but lower-priority than the stronger issue-led and city-turnout lanes."
  },
  "north-fort-worth-turnout": {
    launchWave: "hold",
    rationale: "Worth building later, but it overlaps stronger roots, Keller, and early-vote turnout surfaces."
  },
  "grapevine-colleyville-growth": {
    launchWave: "hold",
    rationale: "Still reads more generic than the sharper issue, authority, identity, and turnout concepts."
  }
};

export function getBaselinePerformance() {
  return BASELINE_PERFORMANCE;
}

export function getPerformanceSummary() {
  const totals = BASELINE_PERFORMANCE.reduce(
    (acc, item) => {
      acc.clicks += item.clicks;
      acc.signups += item.signups;
      acc.volunteers += item.volunteers;
      acc.donations += item.donations;
      acc.events += item.events;
      return acc;
    },
    {
      clicks: 0,
      signups: 0,
      volunteers: 0,
      donations: 0,
      events: 0
    }
  );

  return {
    ...totals,
    averageConversionRate: Number(
      (BASELINE_PERFORMANCE.reduce((sum, item) => sum + item.conversionRate, 0) /
        BASELINE_PERFORMANCE.length).toFixed(1)
    ),
    highestPerformer: [...BASELINE_PERFORMANCE].sort((a, b) => b.signups - a.signups)[0]?.tenantSlug ?? null
  };
}

export function rankFeederSites() {
  return FEEDER_SITES.map((site) => {
    const metric = BASELINE_PERFORMANCE.find((item) => item.tenantSlug === site.tenantSlug);

    return {
      tenantSlug: site.tenantSlug,
      name: site.name,
      audience: site.audience,
      launchStatus: site.launchStatus,
      launchPriority: site.launchPriority,
      funnelGoal: site.funnelGoal,
      clicks: metric?.clicks ?? 0,
      signups: metric?.signups ?? 0,
      volunteers: metric?.volunteers ?? 0,
      donations: metric?.donations ?? 0,
      conversionRate: metric?.conversionRate ?? 0
    };
  }).sort((a, b) => b.signups - a.signups);
}

export function getLaunchWavePlan(): LaunchWaveItem[] {
  const waveOrder: Record<LaunchWave, number> = {
    "launch-first": 0,
    "launch-second": 1,
    hold: 2
  };

  return FEEDER_SITES.map((site) => {
    const plan = LAUNCH_WAVE_MAP[site.tenantSlug] ?? {
      launchWave: "hold" as LaunchWave,
      rationale: "No launch recommendation has been assigned yet."
    };

    return {
      tenantSlug: site.tenantSlug,
      name: site.name,
      audience: site.audience,
      launchWave: plan.launchWave,
      rationale: plan.rationale
    };
  }).sort((a, b) => waveOrder[a.launchWave] - waveOrder[b.launchWave] || a.name.localeCompare(b.name));
}

export function getLaunchWaveSnapshot() {
  const plan = getLaunchWavePlan();

  return {
    launchFirstCount: plan.filter((item) => item.launchWave === "launch-first").length,
    launchSecondCount: plan.filter((item) => item.launchWave === "launch-second").length,
    holdCount: plan.filter((item) => item.launchWave === "hold").length
  };
}

export type FeederSiteProposalInput = {
  audience: string;
  theme: FeederSiteTheme;
  funnelGoal: string;
  priority: "high" | "medium" | "low";
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildRecommendedLandingMix(input: FeederSiteProposalInput) {
  const combined = `${input.audience} ${input.funnelGoal}`.toLowerCase();

  if (combined.includes("war") || combined.includes("iran") || combined.includes("troop")) {
    return ["war-powers", "america-first", "turnout"];
  }

  if (combined.includes("democracy") || combined.includes("court") || combined.includes("rule of law")) {
    return ["democracy", "courts", "turnout"];
  }

  if (
    combined.includes("freedom") ||
    combined.includes("privacy") ||
    combined.includes("autonomy") ||
    combined.includes("rights")
  ) {
    return ["freedoms", "privacy", "turnout"];
  }

  if (
    combined.includes("health") ||
    combined.includes("coverage") ||
    combined.includes("medical") ||
    combined.includes("care")
  ) {
    return ["health-care", "affordability", "turnout"];
  }

  if (
    combined.includes("corruption") ||
    combined.includes("ethics") ||
    combined.includes("clean government") ||
    combined.includes("honest government")
  ) {
    return ["clean-government", "accountability", "turnout"];
  }

  if (
    combined.includes("affordability") ||
    combined.includes("cost") ||
    combined.includes("housing") ||
    combined.includes("groceries")
  ) {
    return ["affordability", "operator", "turnout"];
  }

  if (input.theme === "turnout") {
    return ["turnout", "texas-roots", "affordability"];
  }

  if (input.theme === "service") {
    return ["veterans", "community-action", "turnout"];
  }

  if (input.theme === "family") {
    return ["families", "schools", "turnout"];
  }

  return ["affordability", "operator", "turnout"];
}

export function buildFeederSiteProposal(input: FeederSiteProposalInput) {
  const baseSlug = slugify(input.audience);

  return {
    tenantSlug: `${baseSlug}-tx24`,
    suggestedName: `${input.audience} for TX-24`,
    suggestedDomain: `${baseSlug.replace(/-+/g, "")}tx24.com`,
    headline: `A ${input.audience}-focused feeder site built to support the TX-24 runoff funnel.`,
    message:
      "This proposal creates a focused acquisition surface that routes issue-specific visitors into the main campaign site with tracked attribution.",
    theme: input.theme,
    funnelGoal: input.funnelGoal,
    priority: input.priority,
    recommendedLandingMix: buildRecommendedLandingMix(input)
  };
}
