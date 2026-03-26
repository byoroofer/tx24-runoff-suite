export type LandingSection = {
  slug: string;
  eyebrow: string;
  headline: string;
  supportingText: string;
  targetPath: string;
  ctaLabel: string;
  proofPoints: string[];
};

export type EditorialTaskStatus =
  | "brief"
  | "research"
  | "writing"
  | "review"
  | "approved"
  | "published";

export type FeederSiteTheme = "economic" | "service" | "family" | "turnout";

export type FeederSite = {
  tenantSlug: string;
  name: string;
  domains: string[];
  audience: string;
  headline: string;
  message: string;
  theme: FeederSiteTheme;
  launchStatus: "ready" | "building" | "planned";
  launchPriority: "high" | "medium" | "low";
  funnelGoal: string;
  localCities: string[];
  priorityIssues: string[];
  contrastFigures: string[];
  landingPages: LandingSection[];
};

export type EditorialQueueRow = {
  id: string;
  tenantSlug: string;
  siteName: string;
  audience: string;
  theme: FeederSite["theme"];
  launchStatus: FeederSite["launchStatus"];
  launchPriority: FeederSite["launchPriority"];
  landingSlug: string;
  landingHeadline: string;
  targetPath: string;
  status: EditorialTaskStatus;
  sourceRail: string;
  copyGoal: string;
  ownerLane: string;
};

export type FeederRegistryRow = {
  tenantSlug: string;
  siteName: string;
  audience: string;
  launchStatus: FeederSite["launchStatus"];
  launchPriority: FeederSite["launchPriority"];
  localCities: string[];
  priorityIssues: string[];
  landingPageCount: number;
  publishedLandingCount: number;
  activeEditorialCount: number;
  dominantRail: string;
};

export const CANONICAL_ISSUE_STACK = [
  "No New Iran War / Constitutional War Powers",
  "Preserving Democracy / Courts / Rule of Law",
  "Individual Freedoms",
  "Cost of Living for Working Families",
  "Health Care Affordability and Coverage",
  "Honest Government / Anti-Corruption Reform"
] as const;

const economicPages: LandingSection[] = [
  {
    slug: "affordability",
    eyebrow: "Cost of living",
    headline: "North Texas families need breathing room, not more pressure.",
    supportingText:
      "Lead with working-family affordability, then route high-intent visitors into signup, survey, and donate paths.",
    targetPath: "/?utm_source=feeder&utm_medium=site&utm_campaign=affordability",
    ctaLabel: "See TJ's affordability plan",
    proofPoints: ["Lower costs", "Working-family message discipline", "Local accountability"]
  },
  {
    slug: "operator",
    eyebrow: "Operator credibility",
    headline: "A district this competitive needs competence, not vague branding.",
    supportingText:
      "Use operator credibility, business leadership, and execution language to build trust with higher-information voters.",
    targetPath: "/about-tj?utm_source=feeder&utm_medium=site&utm_campaign=operator",
    ctaLabel: "See why TJ is built for this",
    proofPoints: ["Professional authority", "Field-tested leadership", "Problem-solving frame"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "Turn cost pressure into early-vote action before the calendar closes.",
    supportingText:
      "Push motivated supporters into volunteer, event, survey, and reminder flows before election day.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=turnout",
    ctaLabel: "Take action now",
    proofPoints: ["Early-vote urgency", "List growth", "Volunteer mobilization"]
  }
];

const servicePages: LandingSection[] = [
  {
    slug: "veterans",
    eyebrow: "Veterans and service",
    headline: "Respect for service should look like action, not just rhetoric.",
    supportingText:
      "Create a district-specific message path for service families, veterans, and civic-duty voters.",
    targetPath: "/about-tj?utm_source=feeder&utm_medium=site&utm_campaign=veterans",
    ctaLabel: "Meet TJ",
    proofPoints: ["Service credibility", "Trust and stability", "High-intent audience funnel"]
  },
  {
    slug: "community-action",
    eyebrow: "Community action",
    headline: "North Texas needs someone who shows up when conditions get hard.",
    supportingText:
      "Use disaster response, recovery, and usefulness to convert trust-oriented voters into volunteers and donors.",
    targetPath: "/media?utm_source=feeder&utm_medium=site&utm_campaign=community_action",
    ctaLabel: "See TJ in action",
    proofPoints: ["Crisis-tested", "Community response", "Real-world proof"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "Trust has to turn into votes before the calendar runs out.",
    supportingText:
      "Move high-intent supporters into election reminders, events, and volunteer signups.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=service_turnout",
    ctaLabel: "Help win TX-24",
    proofPoints: ["Volunteer path", "Election calendar urgency", "Supporter activation"]
  }
];

const familyPages: LandingSection[] = [
  {
    slug: "families",
    eyebrow: "Families and households",
    headline: "The district needs steadier leadership for the people running real lives.",
    supportingText:
      "Bring in parents and household decision-makers through trust, competence, and family-budget language.",
    targetPath: "/policy?utm_source=feeder&utm_medium=site&utm_campaign=families",
    ctaLabel: "See TJ's family priorities",
    proofPoints: ["Family budgets", "Trust and stability", "Household-first message"]
  },
  {
    slug: "schools",
    eyebrow: "Schools and future",
    headline: "North Texas families deserve schools and communities focused on the future.",
    supportingText:
      "Use calmer, high-trust education framing to convert parents, suburban women, and local volunteers.",
    targetPath: "/policy?utm_source=feeder&utm_medium=site&utm_campaign=schools",
    ctaLabel: "See TJ on schools",
    proofPoints: ["Education confidence", "Suburban persuasion", "Moderate trust language"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "Parents and families cannot sit this runoff out.",
    supportingText:
      "Translate family-oriented concern into reminders, events, signups, and votes.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=family_turnout",
    ctaLabel: "Take action for TX-24",
    proofPoints: ["Reminder capture", "Volunteer ask", "Neighborhood turnout"]
  }
];

const rootsPages: LandingSection[] = [
  {
    slug: "texas-roots",
    eyebrow: "Texas roots",
    headline: "Born in Fort Worth. Built in Texas. Ready for TX-24.",
    supportingText:
      "Use local authenticity and North Texas rootedness as the trust opener, then route visitors into deeper accomplishment pages.",
    targetPath: "/about-tj?utm_source=feeder&utm_medium=site&utm_campaign=texas_roots",
    ctaLabel: "See TJ's story",
    proofPoints: ["Fort Worth roots", "Local authenticity", "North Texas trust"]
  },
  {
    slug: "local-trust",
    eyebrow: "Local trust",
    headline: "This district deserves someone who actually feels like home.",
    supportingText:
      "Build local familiarity and authenticity before moving visitors into policy or volunteer action.",
    targetPath: "/cd-24?utm_source=feeder&utm_medium=site&utm_campaign=local_trust",
    ctaLabel: "Why TX-24 matters",
    proofPoints: ["Homegrown voice", "District fit", "Community familiarity"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "North Texans need one of their own at the polls in this runoff.",
    supportingText:
      "Use identity-plus-urgency language to capture supporters for turnout actions without drifting into empty slogans.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=roots_turnout",
    ctaLabel: "Stand up for TX-24",
    proofPoints: ["Identity and turnout", "Volunteer capture", "Early-vote push"]
  }
];

const authorityPages: LandingSection[] = [
  {
    slug: "authority",
    eyebrow: "Professional authority",
    headline: "TJ has already led at a level most candidates never reach.",
    supportingText:
      "Use speaker roles, industry recognition, and operating scale to build a donor- and editor-ready authority case.",
    targetPath: "/media?utm_source=feeder&utm_medium=site&utm_campaign=authority",
    ctaLabel: "See the record",
    proofPoints: ["Speaker credibility", "Awards and recognition", "Operator proof"]
  },
  {
    slug: "consumer-protection",
    eyebrow: "Consumer protection",
    headline: "A real fighter for families against broken systems and corporate games.",
    supportingText:
      "Turn policyholder advocacy and insurance-accountability expertise into a clean anti-ripoff political message.",
    targetPath: "/policy?utm_source=feeder&utm_medium=site&utm_campaign=consumer_protection",
    ctaLabel: "See TJ's consumer-protection case",
    proofPoints: ["Anti-ripoff message", "Claims expertise", "Family-first economics"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "Authority means nothing if it does not get supporters to the polls.",
    supportingText:
      "Convert high-information respect into volunteer, donor, and turnout actions.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=authority_turnout",
    ctaLabel: "Help elect TJ",
    proofPoints: ["High-information voter funnel", "Donor path", "Turnout activation"]
  }
];

const warPowersPages: LandingSection[] = [
  {
    slug: "war-powers",
    eyebrow: "Constitutional war powers",
    headline: "Stop another endless war. Congress decides war.",
    supportingText:
      "Lead with constitutional restraint, sober national-security language, and a promise to put American interests first.",
    targetPath: "/policy?utm_source=feeder&utm_medium=site&utm_campaign=war_powers",
    ctaLabel: "See TJ on war powers",
    proofPoints: ["Congress decides war", "No blank check for escalation", "America's interests first"]
  },
  {
    slug: "america-first",
    eyebrow: "America first",
    headline: "North Texas families should not pay for another open-ended conflict.",
    supportingText:
      "Frame the issue around cost, risk, and accountability rather than imported talking points.",
    targetPath: "/cd-24?utm_source=feeder&utm_medium=site&utm_campaign=america_first",
    ctaLabel: "Why this matters in TX-24",
    proofPoints: ["Cost and risk frame", "Family consequence", "Disciplined contrast"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "If you want a voice against another endless war, this runoff matters.",
    supportingText:
      "Move anti-escalation energy into signups, reminders, and turnout action before the window closes.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=no_new_war_turnout",
    ctaLabel: "Stand up now",
    proofPoints: ["Issue-to-vote conversion", "Reminder capture", "Runoff urgency"]
  }
];

const democracyPages: LandingSection[] = [
  {
    slug: "democracy",
    eyebrow: "Preserving democracy",
    headline: "North Texas needs leaders who still believe the rules matter.",
    supportingText:
      "Use an institutional-stability frame built around preserving democracy, protecting checks and balances, and restoring trust.",
    targetPath: "/policy?utm_source=feeder&utm_medium=site&utm_campaign=democracy",
    ctaLabel: "See TJ on democracy and trust",
    proofPoints: ["Institutional trust", "Checks and balances", "Democracy protection"]
  },
  {
    slug: "courts",
    eyebrow: "Courts and rule of law",
    headline: "The rule of law only works when leaders stop treating it like a prop.",
    supportingText:
      "Make courts, DOJ credibility, and the rule of law feel local, practical, and urgent.",
    targetPath: "/media?utm_source=feeder&utm_medium=site&utm_campaign=rule_of_law",
    ctaLabel: "See TJ's accountability case",
    proofPoints: ["Rule of law", "Court legitimacy", "Rebuild public trust"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "Preserving democracy starts with showing up in this runoff.",
    supportingText:
      "Route democracy-minded visitors into turnout, volunteer, and supporter-capture flows.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=democracy_turnout",
    ctaLabel: "Protect the district",
    proofPoints: ["Turnout bridge", "Volunteer ask", "Institutional urgency"]
  }
];

const freedomPages: LandingSection[] = [
  {
    slug: "freedoms",
    eyebrow: "Individual freedoms",
    headline: "Freedom should include bodily autonomy, privacy, speech, and due process.",
    supportingText:
      "Use a broad freedoms frame that can hold abortion rights, privacy, personal liberty, and constitutional fairness together.",
    targetPath: "/policy?utm_source=feeder&utm_medium=site&utm_campaign=freedoms",
    ctaLabel: "See TJ on freedom and rights",
    proofPoints: ["Bodily autonomy", "Personal liberty", "Rights-based persuasion"]
  },
  {
    slug: "privacy",
    eyebrow: "Privacy and due process",
    headline: "Government should not get to bully, shame, or overreach into private life.",
    supportingText:
      "Position privacy, due process, and personal decision-making as kitchen-table trust issues, not abstract theory.",
    targetPath: "/about-tj?utm_source=feeder&utm_medium=site&utm_campaign=privacy",
    ctaLabel: "Why TJ's approach is different",
    proofPoints: ["Privacy", "Due process", "Calm, high-trust message"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "Rights shrink when good people sit out low-turnout elections.",
    supportingText:
      "Translate freedoms language into supporter capture, reminders, volunteer action, and turnout.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=freedoms_turnout",
    ctaLabel: "Defend your freedom",
    proofPoints: ["Issue urgency", "Reminder capture", "Volunteer action"]
  }
];

const healthCarePages: LandingSection[] = [
  {
    slug: "health-care",
    eyebrow: "Health care affordability",
    headline: "Families should not have to cut back just to stay alive and insured.",
    supportingText:
      "Lead with premiums, deductibles, prescriptions, and coverage stress to make health care feel immediate and personal.",
    targetPath: "/policy?utm_source=feeder&utm_medium=site&utm_campaign=health_care",
    ctaLabel: "See TJ on health care costs",
    proofPoints: ["Coverage and cost", "Family consequence", "Kitchen-table urgency"]
  },
  {
    slug: "affordability",
    eyebrow: "Coverage and family budgets",
    headline: "Health care is one of the biggest reasons working families feel squeezed.",
    supportingText:
      "Treat health care as a central cost-of-living issue rather than a narrow policy subtopic.",
    targetPath: "/?utm_source=feeder&utm_medium=site&utm_campaign=healthcare_affordability",
    ctaLabel: "Connect the dots on affordability",
    proofPoints: ["Cost of living", "Medical bills", "Working-family frame"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "If health care costs matter to you, this runoff cannot be an afterthought.",
    supportingText:
      "Convert health care frustration into reminders, events, signups, and turnout actions.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=healthcare_turnout",
    ctaLabel: "Take action on health care",
    proofPoints: ["Issue-to-action bridge", "Reminder capture", "Volunteer path"]
  }
];

const honestGovernmentPages: LandingSection[] = [
  {
    slug: "clean-government",
    eyebrow: "Honest government",
    headline: "Voters deserve a government that is competent, ethical, and not for sale.",
    supportingText:
      "Build a clean-government frame around ethics, transparency, competence, and anti-self-dealing.",
    targetPath: "/policy?utm_source=feeder&utm_medium=site&utm_campaign=clean_government",
    ctaLabel: "See TJ on honest government",
    proofPoints: ["Ethics and transparency", "Competence", "Not for sale"]
  },
  {
    slug: "accountability",
    eyebrow: "Anti-corruption reform",
    headline: "North Texans are tired of insiders, games, and self-dealing politics.",
    supportingText:
      "Use stock-trading bans, transparency, accountability, and cleaner government as the practical reform case.",
    targetPath: "/media?utm_source=feeder&utm_medium=site&utm_campaign=anti_corruption",
    ctaLabel: "See TJ's reform case",
    proofPoints: ["Anti-corruption", "Insider accountability", "Everyday credibility"]
  },
  {
    slug: "turnout",
    eyebrow: "Runoff urgency",
    headline: "Clean government does not happen by accident. It takes turnout.",
    supportingText:
      "Move reform-minded visitors into volunteer, supporter, and turnout flows before election day.",
    targetPath: "/take-action?utm_source=feeder&utm_medium=site&utm_campaign=clean_government_turnout",
    ctaLabel: "Help clean up TX-24",
    proofPoints: ["Reform into action", "Volunteer path", "Turnout urgency"]
  }
];

export const FEEDER_SITES: FeederSite[] = [
  {
    tenantSlug: "tx24-affordability-watch",
    name: "TX-24 Affordability Watch",
    domains: ["affordabilitytx24.com", "localhost:3101"],
    audience: "working families facing cost pressure",
    headline: "A cost-of-living feeder site built to capture issue-motivated voters.",
    message: "Lead with affordability, then route high-intent visitors into the main campaign funnel.",
    theme: "economic",
    launchStatus: "ready",
    launchPriority: "high",
    funnelGoal: "Drive affordability-interested visitors into donate and signup flows.",
    localCities: ["Irving", "Euless", "Grapevine", "Coppell"],
    priorityIssues: ["cost of living", "housing", "groceries", "working-family pressure"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne"],
    landingPages: economicPages
  },
  {
    tenantSlug: "health-care-affordability-tx24",
    name: "Health Care Affordability for TX-24",
    domains: ["healthcaretx24.com"],
    audience: "families squeezed by premiums, coverage gaps, and medical bills",
    headline: "A health-care-first feeder site built around affordability, coverage, and family stress.",
    message: "Treat health care like the cost-of-living issue it is, then convert concern into campaign action.",
    theme: "family",
    launchStatus: "building",
    launchPriority: "high",
    funnelGoal: "Convert health care concern into signups, survey responses, and support.",
    localCities: ["Irving", "Carrollton", "Bedford", "Euless"],
    priorityIssues: ["health care affordability", "coverage", "prescription costs", "family budgets"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne"],
    landingPages: healthCarePages
  },
  {
    tenantSlug: "honest-government-tx24",
    name: "Honest Government TX-24",
    domains: ["honestgovtx24.com"],
    audience: "voters angry at corruption, insiders, and political self-dealing",
    headline: "A clean-government feeder site for ethics, transparency, and competence.",
    message: "Use anti-corruption and honest-government language to separate TJ from insider politics.",
    theme: "economic",
    launchStatus: "building",
    launchPriority: "high",
    funnelGoal: "Turn anti-insider frustration into signups, donations, and volunteer commitments.",
    localCities: ["Irving", "Coppell", "Grapevine", "Southlake"],
    priorityIssues: ["honest government", "anti-corruption", "transparency", "stock trading bans"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne", "Ted Cruz"],
    landingPages: honestGovernmentPages
  },
  {
    tenantSlug: "individual-freedoms-tx24",
    name: "Individual Freedoms TX-24",
    domains: ["freedomtx24.com"],
    audience: "rights, privacy, and autonomy voters",
    headline: "A calm but high-conviction feeder site for freedom, privacy, and personal autonomy.",
    message: "Use broad freedom language to reach voters who want less overreach and more personal liberty.",
    theme: "family",
    launchStatus: "building",
    launchPriority: "high",
    funnelGoal: "Drive signups, reminders, and volunteer actions among freedom-minded voters.",
    localCities: ["Coppell", "Southlake", "Colleyville", "Irving"],
    priorityIssues: ["individual freedoms", "bodily autonomy", "privacy", "due process"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne", "Greg Abbott"],
    landingPages: freedomPages
  },
  {
    tenantSlug: "preserving-democracy-tx24",
    name: "Preserving Democracy TX-24",
    domains: ["democracytx24.com"],
    audience: "institutional-stability and rule-of-law voters",
    headline: "A feeder site for preserving democracy, protecting courts, and restoring trust.",
    message: "Use rule-of-law, court legitimacy, and trust-in-government language to make democratic stability feel local and urgent.",
    theme: "service",
    launchStatus: "building",
    launchPriority: "high",
    funnelGoal: "Convert democracy concern into turnout, signups, and issue engagement.",
    localCities: ["Irving", "Carrollton", "Farmers Branch", "Coppell"],
    priorityIssues: ["preserving democracy", "courts", "rule of law", "DOJ trust"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne", "Steve Bannon"],
    landingPages: democracyPages
  },
  {
    tenantSlug: "no-new-iran-war-tx24",
    name: "No New Iran War TX-24",
    domains: ["nowartx24.com"],
    audience: "anti-escalation and constitutional-restraint voters",
    headline: "A feeder site focused on war powers, restraint, and putting Americans first.",
    message: "Frame foreign-policy escalation around constitutional limits, cost, and the interests of North Texas families.",
    theme: "service",
    launchStatus: "planned",
    launchPriority: "medium",
    funnelGoal: "Turn anti-escalation sentiment into issue signups, reminders, and turnout action.",
    localCities: ["Irving", "Euless", "Bedford", "North Fort Worth"],
    priorityIssues: ["war powers", "no new war", "America first", "constitutional accountability"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne", "Steve Bannon"],
    landingPages: warPowersPages
  },
  {
    tenantSlug: "early-vote-tx24",
    name: "Early Vote TX-24",
    domains: ["earlyvotetx24.com"],
    audience: "runoff turnout audience",
    headline: "An urgency-first feeder site built for the early-vote window.",
    message: "Route turnout-minded visitors into action-heavy campaign flows.",
    theme: "turnout",
    launchStatus: "ready",
    launchPriority: "high",
    funnelGoal: "Pull high-intent supporters into turnout actions during the voting window.",
    localCities: ["Irving", "Euless", "Grapevine", "Carrollton", "Coppell"],
    priorityIssues: ["turnout", "voting", "registration", "accountability"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne", "Steve Bannon"],
    landingPages: servicePages
  },
  {
    tenantSlug: "native-texans-for-tx24",
    name: "Native Texans for TX-24",
    domains: ["nativetexansfortx24.com"],
    audience: "local identity and authenticity voters",
    headline: "A feeder site built around Texas roots, local trust, and North Texas authenticity.",
    message: "Use Fort Worth roots and North Texas credibility as the opening trust frame, then route into TJ's story and district pages.",
    theme: "service",
    launchStatus: "building",
    launchPriority: "high",
    funnelGoal: "Convert local-trust interest into biography reads, volunteer signups, and supporter capture.",
    localCities: ["Fort Worth", "Keller", "North Fort Worth", "Colleyville"],
    priorityIssues: ["Texas roots", "local trust", "district identity", "authenticity"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne"],
    landingPages: rootsPages
  },
  {
    tenantSlug: "paradise-claims-authority",
    name: "Paradise Claims Leadership Record",
    domains: ["paradiseclaimsleadership.com"],
    audience: "authority and accomplishment-minded voters",
    headline: "A feeder site proving TJ's professional record, speaker credibility, and operator authority.",
    message: "Build a world-class accomplishment case before asking for support.",
    theme: "economic",
    launchStatus: "building",
    launchPriority: "high",
    funnelGoal: "Move high-information visitors into donor, endorsement, and media credibility flows.",
    localCities: ["Irving", "Grapevine", "Southlake", "Fort Worth"],
    priorityIssues: ["accomplishments", "professional record", "consumer protection", "thought leadership"],
    contrastFigures: ["Kevin Burge", "Taylor Rehmet"],
    landingPages: authorityPages
  },
  {
    tenantSlug: "tx24-consumer-protection",
    name: "TX-24 Consumer Protection Watch",
    domains: ["tx24consumerwatch.com"],
    audience: "anti-ripoff and accountability voters",
    headline: "A feeder site for voters who want a fighter against corporate abuse and broken systems.",
    message: "Translate insurance-accountability expertise into a voter-friendly economic message.",
    theme: "economic",
    launchStatus: "building",
    launchPriority: "high",
    funnelGoal: "Convert accountability-minded visitors into survey, signup, and donate actions.",
    localCities: ["Irving", "Euless", "Bedford", "Hurst"],
    priorityIssues: ["consumer protection", "insurance accountability", "health care costs", "family budgets"],
    contrastFigures: ["Beth Van Duyne", "Kevin Burge"],
    landingPages: authorityPages
  },
  {
    tenantSlug: "north-texas-veterans",
    name: "North Texas Veterans for Accountability",
    domains: ["ntxveterans.com"],
    audience: "veterans and military families",
    headline: "Service-first messaging path for veterans and their families.",
    message: "Use trust-heavy service language and direct high-intent traffic to TJ's bio and action pages.",
    theme: "service",
    launchStatus: "building",
    launchPriority: "medium",
    funnelGoal: "Move trust-oriented voters into biography, volunteer, and endorsement funnels.",
    localCities: ["Carrollton", "Farmers Branch", "Las Colinas"],
    priorityIssues: ["veterans", "national security", "accountability", "service"],
    contrastFigures: ["Kevin Burge", "Steve Bannon"],
    landingPages: servicePages
  },
  {
    tenantSlug: "moms-for-tx24",
    name: "Moms for TX-24 Stability",
    domains: ["momsfortx24.com"],
    audience: "family and education voters",
    headline: "A family-confidence feeder site with calmer trust language.",
    message: "Bring in parents and household decision-makers through trust, competence, and neighborhood stability.",
    theme: "family",
    launchStatus: "building",
    launchPriority: "medium",
    funnelGoal: "Push family-oriented traffic into newsletter and community event signups.",
    localCities: ["Coppell", "Irving", "Carrollton"],
    priorityIssues: ["family budgets", "health care", "schools", "community safety"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne"],
    landingPages: familyPages
  },
  {
    tenantSlug: "educators-for-tx24",
    name: "Educators for TX-24",
    domains: ["educatorsfortx24.com"],
    audience: "teachers, parents, and education voters",
    headline: "A feeder site built around calm competence, school confidence, and long-term community health.",
    message: "Use education-forward language to bring high-trust family voters into the campaign.",
    theme: "family",
    launchStatus: "planned",
    launchPriority: "medium",
    funnelGoal: "Capture educators, parents, and school-concerned voters for events and signups.",
    localCities: ["Carrollton", "Coppell", "Irving", "Farmers Branch"],
    priorityIssues: ["public education", "book bans", "family confidence", "future readiness"],
    contrastFigures: ["Beth Van Duyne", "Greg Abbott"],
    landingPages: familyPages
  },
  {
    tenantSlug: "keller-community-action",
    name: "Keller Community Action",
    domains: ["kellercommunityaction.com"],
    audience: "community-action and crisis-response voters",
    headline: "A Keller-centered feeder site focused on usefulness, readiness, and showing up.",
    message: "Use visible local action and crisis response to convert trust-heavy audiences.",
    theme: "service",
    launchStatus: "ready",
    launchPriority: "medium",
    funnelGoal: "Move Keller-area trust into volunteer and earned-media pathways.",
    localCities: ["Keller", "Southlake", "Roanoke", "North Fort Worth"],
    priorityIssues: ["community action", "disaster response", "local leadership", "trust"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne"],
    landingPages: servicePages
  },
  {
    tenantSlug: "irving-turnout-network",
    name: "Irving Turnout Network",
    domains: ["irvingturnoutnetwork.com"],
    audience: "Irving-specific turnout audience",
    headline: "A city-specific feeder site built to turn Irving interest into runoff action.",
    message: "Use Irving-tailored language, reminders, and action blocks to drive list growth and turnout.",
    theme: "turnout",
    launchStatus: "ready",
    launchPriority: "high",
    funnelGoal: "Capture Irving-specific supporters for reminders, volunteer shifts, and voter actions.",
    localCities: ["Irving", "Las Colinas", "Valley Ranch"],
    priorityIssues: ["turnout", "cost of living", "community trust", "representation"],
    contrastFigures: ["Kevin Burge", "Beth Van Duyne"],
    landingPages: rootsPages
  },
  {
    tenantSlug: "carrollton-families-first",
    name: "Carrollton Families First",
    domains: ["carrolltonfamiliesfirst.com"],
    audience: "Carrollton parents and neighborhood voters",
    headline: "A Carrollton feeder site centered on families, schools, and practical stability.",
    message: "Bring in family voters through calmer suburban persuasion language and turn them into supporters.",
    theme: "family",
    launchStatus: "planned",
    launchPriority: "low",
    funnelGoal: "Convert family confidence into newsletter, event, and turnout actions.",
    localCities: ["Carrollton", "Farmers Branch", "Irving"],
    priorityIssues: ["schools", "family budgets", "community safety", "local trust"],
    contrastFigures: ["Beth Van Duyne", "Kevin Burge"],
    landingPages: familyPages
  },
  {
    tenantSlug: "north-fort-worth-turnout",
    name: "North Fort Worth Turnout",
    domains: ["northfortworthturnout.com"],
    audience: "North Fort Worth and Tarrant turnout audience",
    headline: "A Tarrant-focused feeder site connecting Texas roots to turnout and accountability.",
    message: "Use Tarrant energy and local identity to drive early-vote action and supporter capture.",
    theme: "turnout",
    launchStatus: "building",
    launchPriority: "low",
    funnelGoal: "Drive Tarrant-side reminder signups, volunteer shifts, and turnout actions.",
    localCities: ["North Fort Worth", "Keller", "Colleyville", "Southlake"],
    priorityIssues: ["turnout", "Texas roots", "accountability", "community action"],
    contrastFigures: ["Beth Van Duyne", "Kevin Burge", "Steve Bannon"],
    landingPages: rootsPages
  },
  {
    tenantSlug: "grapevine-colleyville-growth",
    name: "Grapevine Colleyville Growth Network",
    domains: ["grapevinecolleyvillegrowth.com"],
    audience: "growth-minded suburban homeowners and professionals",
    headline: "A feeder site for voters who want stable growth, competent government, and local credibility.",
    message: "Use economic confidence and local leadership language to attract high-information suburban households.",
    theme: "economic",
    launchStatus: "planned",
    launchPriority: "low",
    funnelGoal: "Convert suburban growth-minded traffic into signups, donor interest, and event RSVPs.",
    localCities: ["Grapevine", "Colleyville", "Southlake", "Bedford"],
    priorityIssues: ["small business", "government competence", "housing pressure", "family economics"],
    contrastFigures: ["Beth Van Duyne", "Kevin Burge", "Taylor Rehmet"],
    landingPages: economicPages
  }
];

export function resolveFeederSite(host: string): FeederSite {
  return FEEDER_SITES.find((site) => site.domains.includes(host)) ?? FEEDER_SITES[0]!;
}

export function getFeederSiteBySlug(tenantSlug?: string | null) {
  if (!tenantSlug) {
    return null;
  }

  return FEEDER_SITES.find((site) => site.tenantSlug === tenantSlug) ?? null;
}

export function resolveLandingSection(site: FeederSite, slug?: string): LandingSection {
  return site.landingPages.find((page) => page.slug === slug) ?? site.landingPages[0]!;
}

export function listFeederSiteSummary() {
  return FEEDER_SITES.map((site) => ({
    tenantSlug: site.tenantSlug,
    name: site.name,
    domains: site.domains,
    audience: site.audience,
    launchStatus: site.launchStatus,
    launchPriority: site.launchPriority,
    funnelGoal: site.funnelGoal,
    localCities: site.localCities,
    priorityIssues: site.priorityIssues,
    contrastFigures: site.contrastFigures,
    landingPageCount: site.landingPages.length
  }));
}

export function buildTrackingSlug(site: FeederSite, landing: LandingSection): string {
  return `${site.tenantSlug}-${landing.slug}`;
}

export function findTrackedLanding(trackingSlug: string) {
  for (const site of FEEDER_SITES) {
    for (const landing of site.landingPages) {
      if (buildTrackingSlug(site, landing) === trackingSlug) {
        return { site, landing };
      }
    }
  }

  return null;
}

export function listLandingFactoryRows(mainSiteUrl: string) {
  return FEEDER_SITES.flatMap((site) =>
    site.landingPages.map((landing) => ({
      tenantSlug: site.tenantSlug,
      siteName: site.name,
      launchStatus: site.launchStatus,
      launchPriority: site.launchPriority,
      audience: site.audience,
      slug: landing.slug,
      trackingSlug: buildTrackingSlug(site, landing),
      ctaLabel: landing.ctaLabel,
      localCities: site.localCities,
      priorityIssues: site.priorityIssues,
      contrastFigures: site.contrastFigures,
      targetUrl: new URL(landing.targetPath, mainSiteUrl).toString()
    }))
  );
}

function inferSourceRail(site: FeederSite, landing: LandingSection) {
  if (site.tenantSlug.includes("native-texans") || landing.slug === "texas-roots") {
    return "native-texan-authenticity";
  }

  if (
    site.tenantSlug.includes("paradise") ||
    site.tenantSlug.includes("consumer") ||
    site.tenantSlug.includes("health-care")
  ) {
    return "paradise-claims-industry-authority";
  }

  if (
    site.tenantSlug.includes("democracy") ||
    site.tenantSlug.includes("honest-government") ||
    site.tenantSlug.includes("no-new-iran-war")
  ) {
    return "lonestarleft-tx24-sitting-right-there";
  }

  if (site.tenantSlug.includes("individual-freedoms")) {
    return "lonestarleft-meet-tj-ware";
  }

  if (site.theme === "service") {
    return "cbs-texas-flood-response";
  }

  if (site.theme === "family") {
    return "lonestarleft-tx24-sitting-right-there";
  }

  if (landing.slug === "operator") {
    return "lonestarleft-meet-tj-ware";
  }

  return "tjwareforcongress-distribution-footprint";
}

function inferEditorialStatus(site: FeederSite, landingIndex: number): EditorialTaskStatus {
  if (site.launchStatus === "ready") {
    return ["published", "approved", "review"][landingIndex] as EditorialTaskStatus;
  }

  if (site.launchStatus === "building") {
    return ["writing", "research", "review"][landingIndex] as EditorialTaskStatus;
  }

  return ["brief", "research", "writing"][landingIndex] as EditorialTaskStatus;
}

function inferOwnerLane(site: FeederSite) {
  if (
    site.tenantSlug.includes("democracy") ||
    site.tenantSlug.includes("honest-government") ||
    site.tenantSlug.includes("no-new-iran-war")
  ) {
    return "issues and accountability";
  }

  if (site.theme === "service") {
    return "field and trust";
  }

  if (site.theme === "family") {
    return "suburban family persuasion";
  }

  if (site.theme === "turnout") {
    return "turnout ops";
  }

  return "economic persuasion";
}

function inferCopyGoal(site: FeederSite, landing: LandingSection) {
  if (landing.slug === "turnout") {
    return "Convert issue interest into reminders, volunteer action, and early-vote urgency.";
  }

  if (landing.slug === "authority" || landing.slug === "operator") {
    return "Build a higher-trust competence case before the ask.";
  }

  if (landing.slug === "texas-roots" || landing.slug === "local-trust") {
    return "Use local authenticity as the opener, then move visitors into deeper TJ pages.";
  }

  if (landing.slug === "war-powers" || landing.slug === "america-first") {
    return "Turn anti-escalation sentiment into a disciplined constitutional and family-interest case.";
  }

  if (landing.slug === "democracy" || landing.slug === "courts") {
    return "Make democracy, courts, and the rule of law feel local, practical, and urgent.";
  }

  if (landing.slug === "freedoms" || landing.slug === "privacy") {
    return "Use broad individual-freedom language that feels grounded instead of slogan-heavy.";
  }

  if (landing.slug === "health-care") {
    return "Treat health care as a working-family affordability issue with immediate consequences.";
  }

  if (landing.slug === "clean-government" || landing.slug === "accountability") {
    return "Translate anti-corruption anger into a cleaner, more credible reform case.";
  }

  return `Translate ${site.audience} interest into a stronger main-site conversion path.`;
}

export function listEditorialQueueRows(): EditorialQueueRow[] {
  return FEEDER_SITES.flatMap((site) =>
    site.landingPages.map((landing, index) => ({
      id: `${site.tenantSlug}:${landing.slug}`,
      tenantSlug: site.tenantSlug,
      siteName: site.name,
      audience: site.audience,
      theme: site.theme,
      launchStatus: site.launchStatus,
      launchPriority: site.launchPriority,
      landingSlug: landing.slug,
      landingHeadline: landing.headline,
      targetPath: landing.targetPath,
      status: inferEditorialStatus(site, index),
      sourceRail: inferSourceRail(site, landing),
      copyGoal: inferCopyGoal(site, landing),
      ownerLane: inferOwnerLane(site)
    }))
  );
}

export function listFeederRegistryRows(): FeederRegistryRow[] {
  const editorial = listEditorialQueueRows();

  return FEEDER_SITES.map((site) => {
    const siteTasks = editorial.filter((task) => task.tenantSlug === site.tenantSlug);

    return {
      tenantSlug: site.tenantSlug,
      siteName: site.name,
      audience: site.audience,
      launchStatus: site.launchStatus,
      launchPriority: site.launchPriority,
      localCities: site.localCities,
      priorityIssues: site.priorityIssues,
      landingPageCount: site.landingPages.length,
      publishedLandingCount: siteTasks.filter((task) => task.status === "published").length,
      activeEditorialCount: siteTasks.filter((task) => task.status !== "published").length,
      dominantRail: siteTasks[0]?.sourceRail ?? "tjwareforcongress-distribution-footprint"
    };
  });
}

export function getEditorialQueueSnapshot() {
  const queue = listEditorialQueueRows();

  return {
    taskCount: queue.length,
    briefCount: queue.filter((item) => item.status === "brief").length,
    researchCount: queue.filter((item) => item.status === "research").length,
    writingCount: queue.filter((item) => item.status === "writing").length,
    reviewCount: queue.filter((item) => item.status === "review").length,
    approvedCount: queue.filter((item) => item.status === "approved").length,
    publishedCount: queue.filter((item) => item.status === "published").length
  };
}

export function getFeederNetworkSnapshot() {
  const ready = FEEDER_SITES.filter((site) => site.launchStatus === "ready").length;
  const building = FEEDER_SITES.filter((site) => site.launchStatus === "building").length;
  const planned = FEEDER_SITES.filter((site) => site.launchStatus === "planned").length;
  const landingPages = FEEDER_SITES.reduce((sum, site) => sum + site.landingPages.length, 0);

  return {
    siteCount: FEEDER_SITES.length,
    readyCount: ready,
    buildingCount: building,
    plannedCount: planned,
    landingPageCount: landingPages,
    trackingRouteCount: landingPages
  };
}
