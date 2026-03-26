export type MediaAnchorTheme =
  | "candidate-contrast"
  | "community-action"
  | "consumer-advocacy"
  | "cross-partisan"
  | "disaster-leadership"
  | "distribution-footprint"
  | "district-strategy"
  | "industry-authority"
  | "institutional-reform";

export type MediaAnchor = {
  slug: string;
  title: string;
  source: string;
  url: string;
  publishedAt?: string;
  theme: MediaAnchorTheme;
  leverageAngle: string;
  contentUses: string[];
  verifiedTakeaways: string[];
  approvedContrastAngles: string[];
  prohibitedUses: string[];
  targetEntities: string[];
};

export type ContrastRail = {
  slug: string;
  title: string;
  strategicUse: string;
  proofRequirement: string;
  approvedLanguage: string[];
  prohibitedLanguage: string[];
};

export type OperatorKit = {
  slug: string;
  title: string;
  objective: string;
  anchorSlug: string;
  audience: string;
  recommendedFormats: string[];
  landingPageAngles: string[];
  operatorNotes: string[];
  complianceNotes: string[];
};

export type ResearchLeadStatus = "lead" | "collecting-evidence" | "verified" | "hold";

export type ResearchLead = {
  slug: string;
  title: string;
  status: ResearchLeadStatus;
  visibility: "admin-only";
  subject: string;
  hypothesis: string;
  evidenceTargets: string[];
  publishRule: string;
};

export const MEDIA_ANCHORS: MediaAnchor[] = [
  {
    slug: "lonestarleft-tx24-sitting-right-there",
    title: "TX24 Is Sitting Right There",
    source: "Lone Star Left",
    url: "https://www.lonestarleft.com/p/tx24-is-sitting-right-there",
    publishedAt: "2026-03-25",
    theme: "district-strategy",
    leverageAngle:
      "This is the clearest recent outside analysis of the runoff choice: a flippable district where execution, trust, and candidate fit matter as much as policy checklists.",
    contentUses: [
      "runoff contrast page",
      "district strategy explainer",
      "why TJ can win TX-24 page",
      "operator brief for volunteers and digital surrogates",
      "city-specific persuasion landers"
    ],
    verifiedTakeaways: [
      "The piece argues TX-24 is flippable if Democrats execute well in both persuasion and turnout.",
      "It frames the district as suburban, educated, high-income, and sensitive to tone, trust, and day-to-day issues.",
      "It describes Kevin Burge as structured, policy-heavy, and system-fluent.",
      "It describes TJ Ware as relational, outside-in, and shaped by lived experience and direct fights.",
      "It identifies trust and execution as the central decision point in the runoff."
    ],
    approvedContrastAngles: [
      "TJ is the grounded, lived-experience candidate for a persuasion-and-turnout district.",
      "TJ brings firsthand crisis, VA, small-business, and consumer-advocacy experience rather than only platform fluency.",
      "In a late-deciding suburban district, relational trust and real-world credibility are strategic assets."
    ],
    prohibitedUses: [
      "Do not convert the article into unsupported personal attacks or armchair psychology.",
      "Do not claim opponent resume inflation or title misrepresentation unless verified by direct source evidence.",
      "Do not rewrite the article into near-duplicate SEO spam."
    ],
    targetEntities: [
      "Kevin Burge",
      "TX-24",
      "Irving",
      "Carrollton",
      "Grapevine",
      "Keller",
      "Southlake"
    ]
  },
  {
    slug: "lonestarleft-meet-tj-ware",
    title: "Meet The Candidates: TJ Ware For Texas Congressional District 24",
    source: "Lone Star Left",
    url: "https://www.lonestarleft.com/p/meet-the-candidates-tj-ware-for-texas",
    publishedAt: "2025-12-06",
    theme: "candidate-contrast",
    leverageAngle:
      "This is a high-value biography and issue-position source that makes TJ look serious, human, and multi-dimensional in a third-party voice.",
    contentUses: [
      "biography page",
      "thought leadership page",
      "veterans and service page",
      "issue-response landers",
      "surrogate briefing deck"
    ],
    verifiedTakeaways: [
      "The article highlights TJ's Marine service, VA recovery story, pilot training, small-business work, and policyholder advocacy.",
      "It ties TJ's worldview to war, recovery, disaster response, and direct exposure to corporate abuse.",
      "It positions TJ as a reform candidate running against fear-based politics and stale status quo thinking."
    ],
    approvedContrastAngles: [
      "TJ has an unusually broad operating record spanning service, business, advocacy, and consumer fights.",
      "TJ can speak to veteran care, disaster response, and corporate accountability from firsthand experience.",
      "TJ's record supports a reform-and-results narrative, not just a branding narrative."
    ],
    prohibitedUses: [
      "Do not present third-party praise as a formal endorsement if it is not one.",
      "Do not strip context from issue answers to make claims the source does not support."
    ],
    targetEntities: ["TJ Ware", "VA", "small business", "disaster response", "consumer protection"]
  },
  {
    slug: "native-texan-authenticity",
    title: "Native Texan authenticity and Fort Worth roots",
    source: "Campaign-supplied candidate record",
    url: "https://electtj.com/about-tj",
    theme: "candidate-contrast",
    leverageAngle:
      "Fort Worth birth and Texas roots give TJ a clean authenticity lane that can be used immediately, while the broader 'only native Texan in the race' contrast stays gated until opponent birthplace records are verified.",
    contentUses: [
      "about page authenticity module",
      "Texas roots landing page",
      "Fort Worth and Tarrant persuasion page",
      "contrast opener for local-vs-outsider framing",
      "volunteer talking points"
    ],
    verifiedTakeaways: [
      "TJ is a native Texan born in Fort Worth.",
      "TJ can credibly speak as someone from North Texas rather than as an imported political figure.",
      "The native-Texan frame pairs naturally with district trust, local familiarity, and authenticity."
    ],
    approvedContrastAngles: [
      "Born in Fort Worth, raised in Texas, and rooted in the same state this district calls home.",
      "TJ offers a homegrown North Texas perspective rather than a generic political résumé.",
      "Texas roots reinforce TJ's credibility when talking about district identity and local stakes."
    ],
    prohibitedUses: [
      "Do not say TJ is the only native Texan in the race until each opponent birthplace is verified from reliable sources.",
      "Do not turn regional contrast into xenophobic or caricatured language.",
      "Do not use birthplace as a substitute for issue proof or accomplishments."
    ],
    targetEntities: ["Fort Worth", "native Texan", "North Texas", "Texas roots"]
  },
  {
    slug: "tjwareforcongress-distribution-footprint",
    title: "#TJWareForCongress search and distribution footprint",
    source: "Public web footprint",
    url: "https://www.reddit.com/r/Dallas/comments/1le7tln",
    publishedAt: "2025-06-18",
    theme: "distribution-footprint",
    leverageAngle:
      "This shows an existing public footprint tied to the TJWareForCongress handle, city-level entity spread, and a field-organizing message around meeting voters directly.",
    contentUses: [
      "city-level SEO clustering",
      "distribution playbook",
      "field-organizing narrative page",
      "operator tag and hashtag guide",
      "feeder-site prioritization"
    ],
    verifiedTakeaways: [
      "Public web results already connect TJWareForCongress with multiple TX-24 city names.",
      "The message about meeting 10K people provides a usable field-and-listening narrative.",
      "Public posts around the hashtag point people back to ElectTJ.com and TJWareForCongress handles."
    ],
    approvedContrastAngles: [
      "TJ already has a district-spanning, people-first campaign narrative that can be localized by city.",
      "The campaign's digital footprint can be organized around listening, turnout, and local relevance instead of generic national copy."
    ],
    prohibitedUses: [
      "Do not present Reddit comments or social chatter as endorsements.",
      "Do not use Google search result pages themselves as durable citation targets.",
      "Do not mass-clone low-value city pages from the same post."
    ],
    targetEntities: [
      "TJWareForCongress",
      "Irving",
      "Carrollton",
      "Grapevine",
      "Colleyville",
      "Roanoke",
      "Bedford",
      "Hurst",
      "Keller",
      "Southlake"
    ]
  },
  {
    slug: "largelossexpert-social-footprint",
    title: "Large Loss Expert social and commentary footprint",
    source: "2021 Training / public profile references",
    url: "https://2021training.com/tj-ware/",
    theme: "distribution-footprint",
    leverageAngle:
      "Public training and profile pages tie TJ to the Large Loss Expert brand, TikTok handle, and a broad speaking/commentary footprint that can transfer into campaign authority pages.",
    contentUses: [
      "social proof page",
      "creator strategy brief",
      "commentary style guide",
      "authority transfer page"
    ],
    verifiedTakeaways: [
      "Public profile references connect TJ to the @largelossexpert TikTok handle.",
      "The profile shows TJ using multi-platform commentary around insurance, storms, and advocacy.",
      "The footprint supports a strong short-form video and commentary identity even when direct TikTok crawl access is limited."
    ],
    approvedContrastAngles: [
      "TJ already knows how to communicate in short-form, public-facing formats.",
      "TJ has a real commentary muscle built outside campaign consultants and political boilerplate."
    ],
    prohibitedUses: [
      "Do not claim exact TikTok metrics without direct platform evidence.",
      "Do not present third-party profile blurbs as comprehensive campaign biography."
    ],
    targetEntities: ["Large Loss Expert", "TikTok", "short-form video", "commentary"]
  },
  {
    slug: "paradise-claims-industry-authority",
    title: "Paradise Claims industry authority and awards stack",
    source: "Paradise Claims / Restoration Domination / Insurance Claim Experts",
    url: "https://paradiseclaims.com/paradise-claims-wts-2021",
    theme: "industry-authority",
    leverageAngle:
      "This is the strongest current proof stack for TJ as an operator, educator, speaker, award winner, and industry authority whose accomplishments predate the campaign.",
    contentUses: [
      "accomplishments page",
      "speaker and authority lander",
      "small-business credibility page",
      "world-class professional record page",
      "operator contrast page"
    ],
    verifiedTakeaways: [
      "Paradise Claims publicly promoted TJ as a featured panelist, main-stage speaker, and breakout session host at Win The Storm 2021.",
      "Restoration Domination describes TJ as The Large Loss Expert and highlights the use of Facebook groups to build authority and referrals.",
      "Insurance Claim Experts says TJ has managed hundreds of millions in claims, contributed to insurance regulation advocacy, and earned multiple industry awards and recognition.",
      "Public source material consistently ties TJ to Paradise Claims, large-loss expertise, and insurance-accountability leadership."
    ],
    approvedContrastAngles: [
      "TJ's professional authority was earned in the field, in business, and on industry stages before this race.",
      "TJ brings a level of operator credibility and domain expertise that most candidates never build.",
      "TJ can be framed as a world-class practitioner who has already led, spoken, taught, and delivered results."
    ],
    prohibitedUses: [
      "Do not inflate award names or counts beyond the public sources.",
      "Do not treat every business-site claim as independently verified without corroboration.",
      "Do not overstate regulatory roles beyond what the cited profiles support."
    ],
    targetEntities: [
      "Paradise Claims",
      "Large Loss Expert",
      "Win The Storm",
      "Facebook groups",
      "insurance claims",
      "awards"
    ]
  },
  {
    slug: "cbs-texas-flood-response",
    title: "Keller man leads national nonprofit's disaster response for victims, first responders in Texas Hill Country",
    source: "CBS Texas",
    url: "https://www.cbsnews.com/texas/news/keller-man-leads-national-nonprofit-disaster-response-texas-hill-country/",
    publishedAt: "2025-07-08",
    theme: "disaster-leadership",
    leverageAngle:
      "Use this as a high-trust anchor for TJ as a hands-on crisis responder, not just a commentator.",
    contentUses: [
      "homepage credibility strip",
      "leadership contrast page",
      "veterans and disaster response feeder pages",
      "earned media outreach"
    ],
    verifiedTakeaways: [
      "TJ has recent third-party coverage tied to direct disaster response leadership.",
      "The story supports a leadership-under-pressure frame grounded in service rather than punditry."
    ],
    approvedContrastAngles: [
      "TJ shows up in emergencies and difficult field conditions.",
      "TJ has recent mainstream local media validation tied to action, not self-description."
    ],
    prohibitedUses: [
      "Do not overstate the scope of the nonprofit work beyond what the article supports."
    ],
    targetEntities: ["Keller", "Hill Country", "first responders", "disaster recovery"]
  },
  {
    slug: "usdr-survivor-story",
    title: "TJ Ware Survivor Story",
    source: "United Survivors Disaster Relief",
    url: "https://unitedsurvivorsrelief.org/tj-ware-survivor-story/",
    theme: "disaster-leadership",
    leverageAngle:
      "This supports the long-form biography rail: Marine service, PTSD recovery, business building, and survivor-focused relief work.",
    contentUses: [
      "about page expansion",
      "veterans trust page",
      "thought-leadership biography page",
      "speaker/introduction copy"
    ],
    verifiedTakeaways: [
      "The piece supports a survivor-to-advocate arc.",
      "It provides context for resilience, empathy, and long-horizon service."
    ],
    approvedContrastAngles: [
      "TJ's life story supports a resilience and credibility message.",
      "TJ speaks about pain, recovery, and public service from lived experience."
    ],
    prohibitedUses: [
      "Do not sensationalize trauma or imply medical facts the source does not state."
    ],
    targetEntities: ["veterans", "survivors", "North Texas families"]
  },
  {
    slug: "matt-long-show",
    title: "TJ on the Matt Long Show",
    source: "Audacy / Matt Long Show",
    url: "https://www.audacy.com/podcast/the-matt-long-show-a4ad9",
    theme: "cross-partisan",
    leverageAngle:
      "Shows TJ can cross ideological lines and hold his own outside friendly partisan ecosystems.",
    contentUses: [
      "bipartisan credibility page",
      "moderate-voter feeder pages",
      "contrast content around independence"
    ],
    verifiedTakeaways: [
      "TJ has media exposure outside strictly aligned partisan channels.",
      "The appearance supports independence and communication range."
    ],
    approvedContrastAngles: [
      "TJ is comfortable speaking across political lines.",
      "TJ can engage persuadable voters without sounding canned."
    ],
    prohibitedUses: [
      "Do not imply endorsement from hosts or audiences unless explicitly stated."
    ],
    targetEntities: ["moderates", "independents", "swing voters"]
  },
  {
    slug: "term-limits-pledge",
    title: "TJ Ware pledges to support term limits on Congress",
    source: "U.S. Term Limits",
    url: "https://www.termlimits.com/",
    theme: "institutional-reform",
    leverageAngle:
      "Supports a reformer / anti-career-politician / citizen-legislator lane distinct from boilerplate national messaging.",
    contentUses: [
      "reform page",
      "anti-corruption page",
      "contrast page on originality and institutional change"
    ],
    verifiedTakeaways: [
      "TJ has taken a public position on term limits.",
      "The pledge supports a reform, anti-career-politician lane."
    ],
    approvedContrastAngles: [
      "TJ is willing to back institutional change that limits entrenched power.",
      "TJ can be framed as a citizen-legislator rather than a career ladder climber."
    ],
    prohibitedUses: [
      "Do not imply the pledge alone proves broader support or endorsements not in evidence."
    ],
    targetEntities: ["term limits", "citizen legislature", "government reform"]
  },
  {
    slug: "insurance-fraud-media",
    title: "Insurance fraud and policyholder advocacy appearances",
    source: "Various podcasts and YouTube interviews",
    url: "https://electtj.com/media",
    theme: "consumer-advocacy",
    leverageAngle:
      "Use the repeated industry appearances to establish TJ as a domain expert, operator, and policy thinker with real-world stakes.",
    contentUses: [
      "thought-leadership page",
      "consumer protection page",
      "small business and accountability feeder pages"
    ],
    verifiedTakeaways: [
      "TJ has a repeated public footprint in policyholder and insurance-accountability media.",
      "The collection helps establish depth, not just one-off appearances."
    ],
    approvedContrastAngles: [
      "TJ has issue depth grounded in real disputes affecting families and businesses.",
      "TJ's expertise comes from fighting through messy systems, not observing them from a distance."
    ],
    prohibitedUses: [
      "Do not describe all appearances as equal independent endorsements.",
      "Do not make legal or fraud allegations beyond what the cited source supports."
    ],
    targetEntities: ["consumer protection", "insurance reform", "small business"]
  },
  {
    slug: "winter-storm-response",
    title: "Winter Storm response coverage",
    source: "NBC DFW / ElectTJ media archive",
    url: "https://electtj.com/media",
    theme: "community-action",
    leverageAngle:
      "Supports a documented pattern of showing up in hard situations instead of just talking politics online.",
    contentUses: [
      "community action page",
      "crisis leadership contrast",
      "local city issue pages"
    ],
    verifiedTakeaways: [
      "TJ's media archive includes severe-weather response coverage and community-help framing.",
      "The pattern reinforces usefulness and responsiveness."
    ],
    approvedContrastAngles: [
      "TJ is action-oriented in local crises.",
      "TJ's record includes practical community support, not just national messaging."
    ],
    prohibitedUses: [
      "Do not claim official response roles or titles the coverage does not establish."
    ],
    targetEntities: ["winter storm", "North Texas homeowners", "utility failures"]
  }
];

export const CONTRAST_RAILS: ContrastRail[] = [
  {
    slug: "district-fit-execution",
    title: "District-fit and execution rail",
    strategicUse:
      "Frame TJ as the candidate whose tone, story, and lived experience better fit a late-deciding suburban persuasion-and-turnout district.",
    proofRequirement:
      "Must anchor in district analysis, public interviews, or side-by-side candidate material that directly supports the claim.",
    approvedLanguage: [
      "grounded in district reality",
      "persuasion-ready",
      "trust-and-execution candidate",
      "closer to the ground"
    ],
    prohibitedLanguage: [
      "mind-reader claims about motive",
      "psychological diagnoses",
      "unsupported electability certainties"
    ]
  },
  {
    slug: "originality-gap",
    title: "Originality and thought leadership gap",
    strategicUse:
      "Contrast TJ's documented proposals, interviews, and industry/policy thinking against opponents who sound interchangeable.",
    proofRequirement:
      "Must anchor in public proposals, interviews, authored ideas, or issue-specific media appearances.",
    approvedLanguage: [
      "documented thought leadership",
      "distinct voice",
      "specific lived-experience perspective"
    ],
    prohibitedLanguage: ["name-calling", "unsupported claims of incompetence"]
  },
  {
    slug: "public-record-gap",
    title: "Public-facing accomplishment gap",
    strategicUse:
      "Show TJ's visible track record of media appearances, disaster response, advocacy, business leadership, and cross-sector meetings.",
    proofRequirement:
      "Use only documented appearances, photos, interviews, articles, or source-backed campaign records.",
    approvedLanguage: ["visible record", "documented accomplishments", "public-facing results"],
    prohibitedLanguage: ["invented meetings", "inflated titles", "vague bragging"]
  },
  {
    slug: "crisis-leadership-gap",
    title: "Crisis-tested leadership gap",
    strategicUse:
      "Emphasize TJ's direct action in storms, disaster recovery, and difficult field conditions.",
    proofRequirement:
      "Must be supported by media coverage, nonprofit records, or direct documented deployments.",
    approvedLanguage: ["crisis-tested", "action under pressure", "shows up in hard conditions"],
    prohibitedLanguage: ["hero mythology not supported by sources"]
  },
  {
    slug: "institutional-seriousness-gap",
    title: "Institutional seriousness gap",
    strategicUse:
      "Frame TJ as someone engaging policy, reform, attorneys general, lawmakers, and regulatory systems, not just campaign slogans.",
    proofRequirement:
      "Use meetings, public speaking, policy advocacy, board roles, and documented reforms.",
    approvedLanguage: ["institutional seriousness", "regulatory fluency", "reform credibility"],
    prohibitedLanguage: ["claims of official power or appointments without proof"]
  },
  {
    slug: "title-claim-verification",
    title: "Resume/title verification rail",
    strategicUse:
      "If opponents overstate jobs, titles, or advisory roles, handle it only as sourced verification content.",
    proofRequirement:
      "Do not publish until supported by direct sources, archived bios, official role descriptions, or documented contradictions.",
    approvedLanguage: ["verification", "role description", "source-backed resume check"],
    prohibitedLanguage: ["calling someone a liar without documentary proof"]
  }
];

export const OPERATOR_KITS: OperatorKit[] = [
  {
    slug: "runoff-trust-contrast",
    title: "Runoff trust contrast kit",
    objective:
      "Help operators and surrogates explain why TJ fits the trust-and-execution moment in TX-24 without drifting into personal attacks.",
    anchorSlug: "lonestarleft-tx24-sitting-right-there",
    audience: "Late-deciding suburban Democratic and persuadable voters",
    recommendedFormats: [
      "city-specific feeder page",
      "letter to editor draft",
      "local Facebook or Nextdoor commentary outline",
      "volunteer talking sheet"
    ],
    landingPageAngles: [
      "Why TX-24 needs a grounded candidate, not a rehearsed one",
      "The candidate who understands what broken systems do to real families",
      "Trust, tone, and turnout in Irving, Keller, and Carrollton"
    ],
    operatorNotes: [
      "Lead with district conditions and what voters are juggling: property taxes, schools, health care costs, trust in government.",
      "Use the article's framing of TJ as outside-in and relational only as an attributed, source-backed characterization.",
      "Pair contrast with proof from TJ's public record so the page does not read as pure attack content."
    ],
    complianceNotes: [
      "Do not quote the article at length.",
      "Do not use personal insults, personality speculation, or unsupported claims about opponent titles.",
      "Include campaign disclosure where required."
    ]
  },
  {
    slug: "distribution-footprint-kit",
    title: "Hashtag and distribution footprint kit",
    objective:
      "Turn TJ's existing public web footprint into a disciplined city-level SEO and feeder-site deployment plan.",
    anchorSlug: "tjwareforcongress-distribution-footprint",
    audience: "SEO operators, feeder-site builders, volunteer amplifiers, and digital surrogates",
    recommendedFormats: [
      "city-specific feeder page",
      "hashtag guidance memo",
      "commentary link-back brief",
      "supporter amplification script"
    ],
    landingPageAngles: [
      "TJ is meeting North Texas where it lives",
      "From Irving to Keller, this campaign is showing up",
      "A district-wide listening campaign, not a generic message blast"
    ],
    operatorNotes: [
      "Use repeated city names as entity-cluster seeds, not as a license to spam low-value pages.",
      "Connect local pages back to one high-quality issue or accomplishment angle per city.",
      "Treat social footprint as discoverability support, not standalone persuasion proof."
    ],
    complianceNotes: [
      "No fake personas, sockpuppets, or automated commenting.",
      "Human-operated placement only.",
      "Use editorially relevant links back to issue-specific campaign pages."
    ]
  },
  {
    slug: "texas-roots-kit",
    title: "Native Texan authenticity kit",
    objective:
      "Turn TJ's Fort Worth birth and Texas roots into a disciplined authenticity and local-trust message for TX-24.",
    anchorSlug: "native-texan-authenticity",
    audience: "Local voters, persuadable suburban households, volunteers, and surrogates",
    recommendedFormats: [
      "Texas roots landing page",
      "about-page module",
      "city-specific authenticity intro block",
      "surrogate talking sheet"
    ],
    landingPageAngles: [
      "Born in Fort Worth. Built in Texas.",
      "A native Texan for TX-24",
      "North Texas deserves one of its own"
    ],
    operatorNotes: [
      "Lead with rootedness and local familiarity, then quickly connect that to service, business, and issue credibility.",
      "Use this as a trust opener, not as the whole persuasion case.",
      "Once opponent birth records are documented, this kit can support a stronger local-versus-outsider contrast page."
    ],
    complianceNotes: [
      "The broader 'only native Texan in the race' line stays gated until opponents are verified.",
      "Keep language confident and local, not exclusionary."
    ]
  },
  {
    slug: "industry-authority-kit",
    title: "Paradise Claims authority transfer kit",
    objective:
      "Translate TJ's Paradise Claims, Large Loss Expert, speaker, and awards footprint into campaign trust and professional-credibility assets.",
    anchorSlug: "paradise-claims-industry-authority",
    audience: "High-information voters, donors, editors, coalition partners, and persuasion audiences",
    recommendedFormats: [
      "accomplishments page",
      "credibility explainer",
      "speaker-and-operator landing page",
      "supporter FAQ",
      "donor proof page"
    ],
    landingPageAngles: [
      "A candidate who has already led at scale",
      "Why TJ's professional authority matters in Congress",
      "From Paradise Claims to public service: operator credibility in TX-24"
    ],
    operatorNotes: [
      "Use industry authority as proof of discipline, competence, leadership, and thought leadership, not as random resume stuffing.",
      "Connect awards, speaker roles, and claims expertise back to families, businesses, and consumer protection.",
      "This kit is one of the best ways to support your argument that TJ is far more accomplished professionally than a generic political opponent."
    ],
    complianceNotes: [
      "Quote only what the sources support.",
      "Do not invent award names or totals.",
      "Keep the connection to public service clear so the page feels relevant, not self-congratulatory."
    ]
  },
  {
    slug: "accomplishment-proof-kit",
    title: "Accomplishment and credibility kit",
    objective:
      "Turn TJ's media record, advocacy work, and field leadership into linked pages that build authority before the ask.",
    anchorSlug: "lonestarleft-meet-tj-ware",
    audience: "Donors, volunteers, editorial gatekeepers, and high-information voters",
    recommendedFormats: [
      "biography lander",
      "earned-media page",
      "issue expertise page",
      "surrogate briefing memo"
    ],
    landingPageAngles: [
      "TJ Ware has already done the work",
      "A candidate with a record, not just a resume",
      "Why TJ's story reads differently in TX-24"
    ],
    operatorNotes: [
      "Use this kit to support accomplishment-heavy pages and rebut the idea that TJ is only a story candidate.",
      "Connect service, business, advocacy, and consumer-protection work into one coherent credibility narrative."
    ],
    complianceNotes: [
      "Keep every accomplishment tied to a source or owned campaign record.",
      "Do not imply endorsement from every media appearance."
    ]
  }
];

export const RESEARCH_LEADS: ResearchLead[] = [
  {
    slug: "district-channel-access-blockade",
    title: "District channel access and group-moderation disparity",
    status: "collecting-evidence",
    visibility: "admin-only",
    subject: "Local Democratic ecosystem",
    hypothesis:
      "Campaign-related posts or access may be getting treated differently across district-aligned groups or gatekeepers.",
    evidenceTargets: [
      "Rejected or ignored post screenshots with timestamps",
      "Moderator rules compared to actual moderation behavior",
      "Message threads requesting clarification or equal treatment",
      "Examples of comparable posts approved for other candidates or aligned actors"
    ],
    publishRule:
      "Do not accuse named individuals of coordinated suppression until the moderation pattern is documented and corroborated."
  },
  {
    slug: "opponent-birthplace-verification",
    title: "Opponent birthplace and Texas-roots verification",
    status: "collecting-evidence",
    visibility: "admin-only",
    subject: "Kevin Burge and Beth Van Duyne",
    hypothesis:
      "TJ may be the only native Texan in the race, but the contrast should only go public after opponent birthplace details are verified from durable sources.",
    evidenceTargets: [
      "Archived campaign biography pages",
      "Official bios or candidate filings",
      "Interviews or videos where each candidate states birthplace or upbringing",
      "Credible news profiles that explicitly mention birthplace"
    ],
    publishRule:
      "Do not publish the 'only native Texan in the race' claim until the opponent birthplaces are verified and documented."
  },
  {
    slug: "kevin-burge-title-description-verification",
    title: "Kevin Burge White House title-description verification",
    status: "collecting-evidence",
    visibility: "admin-only",
    subject: "Kevin Burge",
    hypothesis:
      "Public-facing narrative may have shifted from analyst/intelligence-role descriptions toward a more elevated 'advisor' description.",
    evidenceTargets: [
      "Archived campaign biography pages",
      "Videos or podcasts where he describes the role in his own words",
      "Official job-title references or staff directories",
      "Social posts or print interviews from different dates showing wording changes"
    ],
    publishRule:
      "Do not publish any accusation of lying or title inflation until the wording change is documented with direct source comparison."
  }
];

export function getSourceIntelSnapshot() {
  const articleAnchors = MEDIA_ANCHORS.filter((anchor) =>
    anchor.source.toLowerCase().includes("lone star left")
  ).length;

  return {
    anchorCount: MEDIA_ANCHORS.length,
    contrastRailCount: CONTRAST_RAILS.length,
    operatorKitCount: OPERATOR_KITS.length,
    researchLeadCount: RESEARCH_LEADS.length,
    distributionAnchorCount: MEDIA_ANCHORS.filter((anchor) => anchor.theme === "distribution-footprint").length,
    industryAuthorityAnchorCount: MEDIA_ANCHORS.filter((anchor) => anchor.theme === "industry-authority")
      .length,
    districtStrategyAnchorCount: MEDIA_ANCHORS.filter((anchor) => anchor.theme === "district-strategy")
      .length,
    articleAnchorCount: articleAnchors
  };
}

export function getAnchorBySlug(slug: string) {
  return MEDIA_ANCHORS.find((anchor) => anchor.slug === slug);
}
