export type SeoEntity = {
  slug: string;
  name: string;
  kind: "person" | "city" | "issue";
  angle: string;
  relatedTerms: string[];
};

export type PlacementTarget = {
  slug: string;
  label: string;
  channel:
    | "local-news-comments"
    | "community-forums"
    | "coalition-blogs"
    | "letters-to-editor"
    | "guest-columns";
  operatorMode: "human-only";
  disclosureRequired: boolean;
  linkBackAllowed: "editorial-only" | "when-relevant";
};

export type PlacementBrief = {
  title: string;
  summary: string;
  operatorMode: "human-only";
  requiredDisclosure: string;
  recommendedCTA: string;
  talkingPoints: string[];
  sourceHandling: string[];
};

export const SEO_ENTITIES: SeoEntity[] = [
  {
    slug: "kevin-burge",
    name: "Kevin Burge",
    kind: "person",
    angle:
      "Use only for source-backed contrast around district fit, public record, and campaign execution differences.",
    relatedTerms: ["Kevin Burge TX-24", "Kevin Burge congress", "compare candidates TX-24"]
  },
  {
    slug: "taylor-rehmet",
    name: "Taylor Rehmet",
    kind: "person",
    angle: "Map overlapping local political networks and issue narratives where relevant and sourced.",
    relatedTerms: ["Taylor Rehmet Texas", "Taylor Rehmet policy", "North Texas politics"]
  },
  {
    slug: "beth-van-duyne",
    name: "Beth Van Duyne",
    kind: "person",
    angle: "Build accountability and district-consequence pages tied to public record and TX-24 frustration.",
    relatedTerms: ["Beth Van Duyne TX-24", "Beth Van Duyne record", "TX-24 accountability"]
  },
  {
    slug: "steve-bannon",
    name: "Steve Bannon",
    kind: "person",
    angle: "Use only when a source-backed narrative ties national influence or ecosystem framing to local race dynamics.",
    relatedTerms: ["Steve Bannon influence", "national political operatives", "local race national ties"]
  },
  {
    slug: "paradise-claims",
    name: "Paradise Claims",
    kind: "person",
    angle:
      "Use Paradise Claims as an authority-transfer entity supporting TJ's operator, entrepreneur, and industry-leadership credibility.",
    relatedTerms: ["Paradise Claims", "Paradise Claims TJ Ware", "Paradise Claims awards"]
  },
  {
    slug: "large-loss-expert",
    name: "Large Loss Expert",
    kind: "person",
    angle:
      "Use the Large Loss Expert brand to support speaker credibility, thought leadership, and short-form commentary authority.",
    relatedTerms: ["Large Loss Expert", "TJ Ware large loss expert", "Large Loss Expert TikTok"]
  },
  {
    slug: "greg-abbott",
    name: "Greg Abbott",
    kind: "person",
    angle: "Tie state-level failures and priorities to district-level consequence pages where relevant and sourced.",
    relatedTerms: ["Greg Abbott North Texas", "Abbott public education", "Abbott grid failures"]
  },
  {
    slug: "ted-cruz",
    name: "Ted Cruz",
    kind: "person",
    angle: "Use as a shorthand for failed statewide Republican priorities when tied to documented events and voter memory.",
    relatedTerms: ["Ted Cruz Texas storms", "Ted Cruz TX-24", "Ted Cruz accountability"]
  },
  {
    slug: "irving",
    name: "Irving",
    kind: "city",
    angle: "Localize pages around cost of living, schools, growth pressure, diversity, and political trust.",
    relatedTerms: ["Irving TX politics", "Irving cost of living", "Irving congressional race"]
  },
  {
    slug: "coppell",
    name: "Coppell",
    kind: "city",
    angle: "Use family, schools, and quality-of-life framing tied to district decisions.",
    relatedTerms: ["Coppell issues", "Coppell families", "Coppell TX-24"]
  },
  {
    slug: "carrollton",
    name: "Carrollton",
    kind: "city",
    angle: "Build city-level pages around turnout, trust, commuter issues, and practical governance.",
    relatedTerms: ["Carrollton TX voters", "Carrollton runoff", "Carrollton issues"]
  },
  {
    slug: "farmers-branch",
    name: "Farmers Branch",
    kind: "city",
    angle: "Tie affordability, neighborhood change, and representation to a district-level contrast message.",
    relatedTerms: ["Farmers Branch TX politics", "Farmers Branch voters", "Farmers Branch TX-24"]
  },
  {
    slug: "grapevine",
    name: "Grapevine",
    kind: "city",
    angle: "Lean into small-business, family, and community-identity angles with a trust-heavy persuasion frame.",
    relatedTerms: ["Grapevine TX issues", "Grapevine runoff", "Grapevine congressional race"]
  },
  {
    slug: "bedford",
    name: "Bedford",
    kind: "city",
    angle: "Use community competence, public services, and district representation messaging.",
    relatedTerms: ["Bedford TX voters", "Bedford turnout", "Bedford TX-24"]
  },
  {
    slug: "hurst",
    name: "Hurst",
    kind: "city",
    angle: "Build pages around practical concerns, service delivery, and middle-class pressure points.",
    relatedTerms: ["Hurst TX issues", "Hurst runoff", "Hurst congressional race"]
  },
  {
    slug: "euless",
    name: "Euless",
    kind: "city",
    angle: "Use commuter, cost, and public-school angles with a local-service frame.",
    relatedTerms: ["Euless TX voters", "Euless issues", "Euless TX-24"]
  },
  {
    slug: "colleyville",
    name: "Colleyville",
    kind: "city",
    angle: "Build higher-trust persuasion pages focused on competent government and stability.",
    relatedTerms: ["Colleyville TX politics", "Colleyville runoff", "Colleyville congressional race"]
  },
  {
    slug: "southlake",
    name: "Southlake",
    kind: "city",
    angle: "Use education, public tone, and community future framing without caricature.",
    relatedTerms: ["Southlake TX politics", "Southlake issues", "Southlake TX-24"]
  },
  {
    slug: "keller",
    name: "Keller",
    kind: "city",
    angle: "Connect Keller-specific pages to TJ's visible local footprint, disaster response, and trust-building record.",
    relatedTerms: ["Keller TX politics", "Keller issues", "Keller congressional race"]
  },
  {
    slug: "roanoke",
    name: "Roanoke",
    kind: "city",
    angle: "Use growth, mobility, and community representation messaging with turnout hooks.",
    relatedTerms: ["Roanoke TX politics", "Roanoke turnout", "Roanoke TX-24"]
  },
  {
    slug: "north-fort-worth",
    name: "North Fort Worth",
    kind: "city",
    angle: "Localize service, family economics, and turnout urgency in a practical North Fort Worth voice.",
    relatedTerms: ["North Fort Worth TX-24", "North Fort Worth runoff", "North Fort Worth voters"]
  },
  {
    slug: "small-business",
    name: "Small Business",
    kind: "issue",
    angle: "Frame TJ as the operator candidate who understands job creation, disaster recovery friction, and local business pressure.",
    relatedTerms: ["small business TX-24", "North Texas business climate", "TJ Ware small business"]
  },
  {
    slug: "no-new-war",
    name: "No New War",
    kind: "issue",
    angle:
      "Frame foreign-policy restraint around family impact, constitutional limits, and putting American interests first.",
    relatedTerms: ["no new war TX-24", "North Texas anti war voters", "Congress decides war"]
  },
  {
    slug: "constitutional-war-powers",
    name: "Constitutional War Powers",
    kind: "issue",
    angle:
      "Build pages that argue Congress decides war and no president should get an open-ended blank check.",
    relatedTerms: ["constitutional war powers", "Congress decides war", "war powers reform"]
  },
  {
    slug: "preserving-democracy",
    name: "Preserving Democracy",
    kind: "issue",
    angle:
      "Use democratic stability, checks and balances, and restoring public trust as a practical local message.",
    relatedTerms: ["preserving democracy TX-24", "democracy and trust", "North Texas democracy voters"]
  },
  {
    slug: "rule-of-law",
    name: "Rule of Law",
    kind: "issue",
    angle:
      "Tie courts, DOJ credibility, and constitutional guardrails to daily trust in government rather than abstract theory.",
    relatedTerms: ["rule of law TX-24", "courts and trust", "judicial legitimacy Texas"]
  },
  {
    slug: "cost-of-living",
    name: "Cost of Living",
    kind: "issue",
    angle: "Anchor affordability pages in property taxes, groceries, insurance, housing, and family budget pressure.",
    relatedTerms: ["TX-24 affordability", "North Texas inflation", "cost of living congress"]
  },
  {
    slug: "property-taxes",
    name: "Property Taxes",
    kind: "issue",
    angle: "Use suburb-specific pressure points around housing cost and tax strain.",
    relatedTerms: ["TX-24 property taxes", "North Texas property tax pressure", "suburban Texas taxes"]
  },
  {
    slug: "public-education",
    name: "Public Education",
    kind: "issue",
    angle: "Build school-focused persuasion pages tied to families, trust, and long-term community health.",
    relatedTerms: ["TX-24 schools", "North Texas public education", "suburban school issues"]
  },
  {
    slug: "health-care",
    name: "Health Care Costs",
    kind: "issue",
    angle: "Frame health care around cost pressure, access, and personal consequences for families and veterans.",
    relatedTerms: ["TX-24 health care", "North Texas medical costs", "health care affordability"]
  },
  {
    slug: "individual-freedoms",
    name: "Individual Freedoms",
    kind: "issue",
    angle:
      "Group abortion rights, privacy, bodily autonomy, speech, religious liberty, and due process under a broad freedom frame.",
    relatedTerms: ["individual freedoms TX-24", "North Texas personal liberty", "freedom voters TX-24"]
  },
  {
    slug: "privacy-and-autonomy",
    name: "Privacy and Autonomy",
    kind: "issue",
    angle:
      "Use privacy, personal autonomy, and due process as kitchen-table trust issues rather than niche legal arguments.",
    relatedTerms: ["privacy rights TX-24", "bodily autonomy Texas", "due process voters"]
  },
  {
    slug: "reproductive-rights",
    name: "Reproductive Rights",
    kind: "issue",
    angle: "Use rights-and-freedom framing with district-specific persuasion language.",
    relatedTerms: ["TX-24 reproductive rights", "North Texas abortion rights", "women voters TX-24"]
  },
  {
    slug: "book-bans",
    name: "Book Bans",
    kind: "issue",
    angle: "Tie school and freedom concerns to competence, moderation, and local control.",
    relatedTerms: ["book bans TX-24", "North Texas school politics", "suburban moderation Texas"]
  },
  {
    slug: "government-competence",
    name: "Government Competence",
    kind: "issue",
    angle: "Build pages around practical problem-solving over culture-war theater.",
    relatedTerms: ["competent government TX-24", "North Texas representation", "practical politics Texas"]
  },
  {
    slug: "honest-government",
    name: "Honest Government",
    kind: "issue",
    angle:
      "Use ethics, transparency, and competence to build a clean-government case that feels practical, not preachy.",
    relatedTerms: ["honest government TX-24", "clean government reform", "ethical politics North Texas"]
  },
  {
    slug: "anti-corruption",
    name: "Anti-Corruption Reform",
    kind: "issue",
    angle:
      "Create accountability pages around insider politics, stock trading bans, transparency, and anti-self-dealing reform.",
    relatedTerms: ["anti corruption TX-24", "stock trading ban congress", "political ethics reform Texas"]
  },
  {
    slug: "disaster-response",
    name: "Disaster Response",
    kind: "issue",
    angle: "Link TJ's response record to district readiness, responsiveness, and usefulness.",
    relatedTerms: ["Texas disaster response leadership", "North Texas storm recovery", "TJ Ware disaster response"]
  },
  {
    slug: "consumer-protection",
    name: "Consumer Protection",
    kind: "issue",
    angle: "Tie insurance accountability and corporate abuse to an anti-ripoff, pro-family economic message.",
    relatedTerms: ["consumer protection TX-24", "insurance accountability Texas", "TJ Ware policyholder"]
  },
  {
    slug: "insurance-claims",
    name: "Insurance Claims",
    kind: "issue",
    angle:
      "Tie claims expertise, policyholder advocacy, and insurance-system abuse into a serious competence and anti-ripoff frame.",
    relatedTerms: ["insurance claims expert", "policyholder advocate Texas", "TJ Ware insurance claims"]
  },
  {
    slug: "thought-leadership",
    name: "Thought Leadership",
    kind: "issue",
    angle:
      "Build pages that show TJ as a speaker, educator, and operator with original ideas rather than generic campaign rhetoric.",
    relatedTerms: ["TJ Ware speaker", "TJ Ware thought leadership", "TJ Ware awards"]
  },
  {
    slug: "turnout",
    name: "Turnout",
    kind: "issue",
    angle: "Tie urgency pages to election dates, early-vote mechanics, and supporter mobilization.",
    relatedTerms: ["TX-24 early voting", "runoff turnout", "May 26 2026 election"]
  }
];

export const PLACEMENT_TARGETS: PlacementTarget[] = [
  {
    slug: "local-news-comments",
    label: "Local News Comments",
    channel: "local-news-comments",
    operatorMode: "human-only",
    disclosureRequired: true,
    linkBackAllowed: "when-relevant"
  },
  {
    slug: "community-forums",
    label: "Community Forums",
    channel: "community-forums",
    operatorMode: "human-only",
    disclosureRequired: true,
    linkBackAllowed: "when-relevant"
  },
  {
    slug: "coalition-blogs",
    label: "Coalition Blogs",
    channel: "coalition-blogs",
    operatorMode: "human-only",
    disclosureRequired: true,
    linkBackAllowed: "editorial-only"
  },
  {
    slug: "letters-to-editor",
    label: "Letters to the Editor",
    channel: "letters-to-editor",
    operatorMode: "human-only",
    disclosureRequired: true,
    linkBackAllowed: "editorial-only"
  },
  {
    slug: "guest-columns",
    label: "Guest Columns",
    channel: "guest-columns",
    operatorMode: "human-only",
    disclosureRequired: true,
    linkBackAllowed: "editorial-only"
  }
];

export function getSeoCampaignMap() {
  const people = SEO_ENTITIES.filter((item) => item.kind === "person").length;
  const cities = SEO_ENTITIES.filter((item) => item.kind === "city").length;
  const issues = SEO_ENTITIES.filter((item) => item.kind === "issue").length;

  return {
    entityCount: SEO_ENTITIES.length,
    peopleCount: people,
    cityCount: cities,
    issueCount: issues,
    placementTargetCount: PLACEMENT_TARGETS.length
  };
}

export function buildPlacementBrief(input: {
  city: string;
  issue: string;
  entity: string;
  targetLabel: string;
  mainSiteUrl: string;
}): PlacementBrief {
  return {
    title: `${input.city} ${input.issue} response brief`,
    summary: `Help human operators place sourced commentary tied to ${input.city}, ${input.issue}, and ${input.entity}, while routing interested readers to the main campaign site when editorially relevant.`,
    operatorMode: "human-only",
    requiredDisclosure:
      "If campaign-affiliated or compensated, identify the relationship and include political advertising/disclosure language where required.",
    recommendedCTA: `If relevant, link to ${input.mainSiteUrl} with a source-backed, issue-specific page rather than a generic homepage blast.`,
    talkingPoints: [
      `Anchor the commentary in a real local angle for ${input.city}.`,
      `Tie the issue to TJ's documented accomplishments, meetings, or professional record where sourced.`,
      `Use ${input.entity} only in factual, source-backed contrast or context.`,
      "Adapt language to the platform and audience instead of copy-pasting one script everywhere."
    ],
    sourceHandling: [
      "Lead with original synthesis, not scraped or lightly rewritten source text.",
      "Quote sparingly and link to primary sources when possible.",
      "Do not use automated posting or fake personas.",
      "Do not attack people with claims you cannot prove in public.",
      `Placement target: ${input.targetLabel}.`
    ]
  };
}
