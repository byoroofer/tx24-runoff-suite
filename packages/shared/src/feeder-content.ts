import type { FeederSite, LandingSection } from "./feeder-sites";

export type NarrativeBlock = {
  title: string;
  body: string;
};

export type FeederNarrative = {
  siteLabel: string;
  publicationTitle: string;
  deck: string;
  perspective: string;
  proofStrip: string[];
  issueFrame: NarrativeBlock[];
  whyTj: NarrativeBlock[];
  actionPlan: string[];
  editorialNote: string;
};

type SiteNarrativeOverride = {
  publicationTitle: string;
  deck: string;
  perspective: string;
  proofStrip: string[];
  issueFrame: NarrativeBlock[];
  whyTj: NarrativeBlock[];
  actionPlan: string[];
  editorialNote: string;
};

const THEME_LABELS: Record<FeederSite["theme"], string> = {
  economic: "Issue briefing",
  service: "Field and trust report",
  family: "Community guide",
  turnout: "Runoff action desk"
};

const SITE_NARRATIVE_OVERRIDES: Record<string, SiteNarrativeOverride> = {
  "tx24-affordability-watch": {
    publicationTitle: "TX-24 Cost of Living Brief",
    deck:
      "A focused issue page for North Texas families who feel squeezed by groceries, housing, health care, and basic bills.",
    perspective:
      "This page treats affordability as the main trust test in the district. It is built to move economic frustration into a concrete case for TJ and then into action.",
    proofStrip: ["Working-family economics", "District-specific pressure points", "Direct route to action"],
    issueFrame: [
      {
        title: "The pressure is local",
        body:
          "Families in Irving, Euless, Grapevine, and Coppell are not arguing over abstractions. They are deciding what gets cut, what gets delayed, and what bills can wait."
      },
      {
        title: "Voters want seriousness",
        body:
          "A runoff audience is smaller and more attentive. These voters respond to competence, focus, and a message that sounds like it came from the district, not from a national playbook."
      },
      {
        title: "Affordability is a conversion lane",
        body:
          "The goal is not to make a generic economic complaint. The goal is to turn cost pressure into signups, volunteer action, and support for a better representative."
      }
    ],
    whyTj: [
      {
        title: "Operator, not slogan merchant",
        body:
          "TJ’s edge is that he can talk about broken systems like someone who has had to navigate them in the real world, not just brand against them."
      },
      {
        title: "Built for district-level persuasion",
        body:
          "This message is stronger when it stays practical: lower pressure on families, cleaner accountability, and steadier representation."
      }
    ],
    actionPlan: [
      "Read the affordability case",
      "Join the campaign list for issue updates",
      "Move from interest to volunteer or turnout action"
    ],
    editorialNote:
      "Use cost-of-living language that is concrete, local, and disciplined. Avoid generic anti-Washington filler."
  },
  "health-care-affordability-tx24": {
    publicationTitle: "TX-24 Health Care Cost Guide",
    deck:
      "A feeder site built around premiums, deductibles, prescriptions, and the daily stress families feel when coverage becomes unaffordable.",
    perspective:
      "Health care is not a niche policy lane here. It is one of the clearest ways voters experience cost pressure and government failure at the same time.",
    proofStrip: ["Coverage stress", "Premium and deductible pressure", "Working-family focus"],
    issueFrame: [
      {
        title: "Health care is a kitchen-table issue",
        body:
          "Families do not experience health care as a white paper. They experience it as a premium notice, a prescription bill, or a choice they never should have to make."
      },
      {
        title: "Affordability and coverage belong together",
        body:
          "The strongest frame is not just policy detail. It is showing that health care costs are one of the main reasons families feel squeezed."
      },
      {
        title: "The district deserves a sharper advocate",
        body:
          "This page should make it easy for voters to connect health care affordability directly to representation, turnout, and campaign support."
      }
    ],
    whyTj: [
      {
        title: "Plain-English credibility",
        body:
          "TJ’s argument works best when it sounds like someone who understands system failure from lived work, not like a consultant reading issue bullets."
      },
      {
        title: "Better conversion path",
        body:
          "Use health care concern to pull supporters into the main funnel without letting the page drift into generic national rhetoric."
      }
    ],
    actionPlan: [
      "Connect health care costs to the broader affordability case",
      "Capture email and SMS permission from issue-motivated visitors",
      "Route supporters into early-vote and volunteer asks"
    ],
    editorialNote:
      "Lead with cost and consequence. Keep jargon low and credibility high."
  },
  "honest-government-tx24": {
    publicationTitle: "TX-24 Honest Government Review",
    deck:
      "A reform and anti-corruption feeder built for voters who are tired of insider games, weak ethics, and performative politics.",
    perspective:
      "This lane works when it feels practical. Voters should come away thinking TJ is more serious, more transparent, and less captured by the usual machinery.",
    proofStrip: ["Reform case", "Competence and ethics", "Insider contrast"],
    issueFrame: [
      {
        title: "Corruption is an everyday issue",
        body:
          "For many voters, corruption means self-dealing, unserious leadership, and a feeling that regular people are not represented honestly."
      },
      {
        title: "Competence is part of clean government",
        body:
          "This page should make clear that honest government is not just about ethics rules. It is also about whether the people in office are actually capable."
      },
      {
        title: "Reform needs a messenger who looks credible",
        body:
          "The strongest reform case is not loud. It is coherent, well-sourced, and tied to local frustrations with insider behavior."
      }
    ],
    whyTj: [
      {
        title: "A cleaner contrast",
        body:
          "TJ should be framed as more independent, more accomplished, and less manufactured than the other options in the race."
      },
      {
        title: "Sharper accountability story",
        body:
          "The page should connect anti-corruption anger to concrete asks: signup, support, and turnout."
      }
    ],
    actionPlan: [
      "Frame ethics as competence plus transparency",
      "Use sourced contrast, not vague mudslinging",
      "Move reform-minded visitors into action"
    ],
    editorialNote:
      "This is a high-trust contrast lane. Keep the tone controlled and evidence-based."
  },
  "preserving-democracy-tx24": {
    publicationTitle: "TX-24 Rule of Law Desk",
    deck:
      "A democracy and rule-of-law feeder for voters worried about courts, legitimacy, institutional trust, and the damage done by cynical politics.",
    perspective:
      "This lane works when it sounds grounded and local. The goal is to make democracy feel practical, not abstract.",
    proofStrip: ["Courts and trust", "Institutional stability", "Sober accountability"],
    issueFrame: [
      {
        title: "Trust is broken",
        body:
          "Voters do not need to be constitutional scholars to understand that institutions look weaker, more politicized, and less trustworthy than they should."
      },
      {
        title: "Rule of law has local consequences",
        body:
          "A district page can connect national institutional damage to everyday confidence, fairness, and whether government still looks legitimate."
      },
      {
        title: "This message requires discipline",
        body:
          "The strongest version is calm and serious. It should read like a credible civic argument, not a social-media rant."
      }
    ],
    whyTj: [
      {
        title: "More grounded than the field",
        body:
          "TJ’s advantage here is the ability to sound practical and accountable instead of rehearsed or excessively partisan."
      },
      {
        title: "Built for higher-information voters",
        body:
          "This is a strong persuasion lane for people who want stability, competence, and institutional seriousness."
      }
    ],
    actionPlan: [
      "Translate institutional trust into a district-level stakes argument",
      "Use courts and DOJ credibility carefully and concretely",
      "Push supporters into turnout and list growth"
    ],
    editorialNote:
      "Keep this page steady and sober. It should feel like a serious civic publication."
  },
  "individual-freedoms-tx24": {
    publicationTitle: "TX-24 Freedom and Privacy Guide",
    deck:
      "A rights-focused feeder site organized around bodily autonomy, privacy, due process, and the basic expectation that government should not run private life.",
    perspective:
      "This page should unify several rights issues under one coherent freedom frame without sounding scattered or culture-war obsessed.",
    proofStrip: ["Privacy and due process", "Bodily autonomy", "Personal liberty"],
    issueFrame: [
      {
        title: "Freedom has to feel real",
        body:
          "This message is strongest when it sounds like day-to-day life: private choices, personal dignity, and whether government knows its limits."
      },
      {
        title: "A broad frame outperforms one-note rhetoric",
        body:
          "By holding privacy, due process, and bodily autonomy together, the page feels larger and more durable than a narrow one-issue microsite."
      },
      {
        title: "The district case matters",
        body:
          "North Texas voters should be able to see how representation in this race affects real freedom in practice."
      }
    ],
    whyTj: [
      {
        title: "Calmer, more credible tone",
        body:
          "TJ should come across as steady and rights-grounded, not overheated. That builds trust with persuadable voters."
      },
      {
        title: "Clear path to action",
        body:
          "Use the page to move from values alignment into concrete campaign participation."
      }
    ],
    actionPlan: [
      "Use rights language that stays readable and human",
      "Tie privacy and due process to trust in representation",
      "Convert agreement into supporter capture"
    ],
    editorialNote:
      "Stay broad enough to feel durable, but specific enough to feel real."
  },
  "no-new-iran-war-tx24": {
    publicationTitle: "TX-24 War Powers Watch",
    deck:
      "A feeder lane for voters who oppose another endless conflict and want Congress to take constitutional responsibility seriously.",
    perspective:
      "This message should be framed around restraint, cost, risk, and constitutional war powers, not imported internet conspiracy framing.",
    proofStrip: ["Constitutional restraint", "Risk and cost", "Americans first"],
    issueFrame: [
      {
        title: "Escalation is not abstract",
        body:
          "Families understand that open-ended conflict means cost, instability, and the possibility that someone else’s vague strategy becomes everyone’s burden."
      },
      {
        title: "Congressional responsibility matters here",
        body:
          "This is a strong lane for a congressional race because it puts representation and constitutional duty at the center."
      },
      {
        title: "Restraint can be persuasive",
        body:
          "The page should read as sober, constitutional, and disciplined rather than ideological for its own sake."
      }
    ],
    whyTj: [
      {
        title: "A stronger constitutional frame",
        body:
          "TJ should be positioned as more serious about Congress doing its actual job instead of echoing whichever line is currently circulating."
      },
      {
        title: "Local consequence over remote spectacle",
        body:
          "The case should return to North Texas families, not drift into pundit performance."
      }
    ],
    actionPlan: [
      "Lead with restraint and constitutional duty",
      "Keep the tone serious and risk-focused",
      "Use anti-war sentiment as a turnout and signup bridge"
    ],
    editorialNote:
      "Do not overheat this page. Seriousness is the asset."
  },
  "early-vote-tx24": {
    publicationTitle: "TX-24 Early Vote Bulletin",
    deck:
      "A turnout-first feeder built to turn urgency into actual action before the window closes.",
    perspective:
      "This is an operations page disguised as a publication page. It should feel energetic, clear, and impossible to misunderstand.",
    proofStrip: ["Calendar urgency", "List growth", "Turnout conversion"],
    issueFrame: [
      {
        title: "The calendar is the message",
        body:
          "Everything on this page should reinforce that runoffs are won by the side that turns attention into actual voting behavior."
      },
      {
        title: "Clarity beats decoration",
        body:
          "A turnout page should be simple, mobile-first, and direct about dates, next steps, and where supporters fit."
      },
      {
        title: "This is where momentum becomes real",
        body:
          "The purpose is not persuasion alone. It is reminders, volunteer action, and turnout discipline."
      }
    ],
    whyTj: [
      {
        title: "A cleaner route to action",
        body:
          "TJ’s runoff story gets stronger when supporters feel there is a practical path to help, not just a slogan to repeat."
      },
      {
        title: "Action language over decorative politics",
        body:
          "The page should look like a campaign that knows exactly what it needs from the voter."
      }
    ],
    actionPlan: [
      "Make dates impossible to miss",
      "Push users into reminders, volunteer shifts, and direct turnout asks",
      "Reduce every section to one clear next step"
    ],
    editorialNote:
      "This page should feel operational, not ornamental."
  },
  "native-texans-for-tx24": {
    publicationTitle: "Native Texans for TX-24",
    deck:
      "A local-authenticity feeder focused on Texas roots, North Texas trust, and a candidate who actually feels tied to the district.",
    perspective:
      "This lane is about belonging and legitimacy. It should make TJ feel native to the district’s temperament, not imported from somewhere else.",
    proofStrip: ["Born in Fort Worth", "North Texas rooted", "District authenticity"],
    issueFrame: [
      {
        title: "Authenticity is a political asset",
        body:
          "In a district this competitive, local identity matters because voters are constantly judging who actually feels grounded here."
      },
      {
        title: "The point is trust, not nostalgia",
        body:
          "The message should move from Texas roots into present-day credibility, usefulness, and representation."
      },
      {
        title: "Local identity should lead to action",
        body:
          "This page works when it turns that feeling of familiarity into signups, turnout, and deeper engagement."
      }
    ],
    whyTj: [
      {
        title: "Fort Worth-born legitimacy",
        body:
          "This is a clean way to frame TJ as native, local, and harder to dismiss as generic campaign product."
      },
      {
        title: "A more human trust lane",
        body:
          "Use biography and district belonging to open the door, then route users into the substantive record."
      }
    ],
    actionPlan: [
      "Lead with Texas roots and district identity",
      "Bridge authenticity to accomplishment and policy",
      "Use the page as a trust-to-turnout funnel"
    ],
    editorialNote:
      "Keep this authentic and grounded. It should feel local, not scripted."
  },
  "paradise-claims-authority": {
    publicationTitle: "TJ Ware Leadership Record",
    deck:
      "A credibility-heavy feeder showing professional scale, thought leadership, consumer-protection expertise, and why TJ looks more accomplished than a typical first-time candidate.",
    perspective:
      "This page should feel premium, sourced, and editorial. It needs to make accomplishment legible without sounding boastful or sloppy.",
    proofStrip: ["Operator credibility", "Industry authority", "Consumer-protection record"],
    issueFrame: [
      {
        title: "Authority matters in a congressional race",
        body:
          "Voters do not need celebrity. They need a reason to believe a candidate can operate at a serious level and handle complexity."
      },
      {
        title: "The record should do the work",
        body:
          "Speaker roles, awards, policyholder advocacy, and operating scale build a more persuasive case than generic campaign adjectives."
      },
      {
        title: "Use accomplishment as a trust builder",
        body:
          "The point is not résumé inflation. The point is to show that TJ is demonstrably more seasoned and more useful than the alternatives."
      }
    ],
    whyTj: [
      {
        title: "A stronger accomplishment case",
        body:
          "This lane is especially useful against opponents who sound more scripted than accomplished."
      },
      {
        title: "High-information conversion",
        body:
          "Use this page to win over donors, validators, and skeptical voters who want evidence."
      }
    ],
    actionPlan: [
      "Show receipts, not adjectives",
      "Use the page for media, donor, and validator persuasion",
      "Connect authority to why TJ should win now"
    ],
    editorialNote:
      "This page needs polish and proof. Avoid vague self-praise."
  }
};

function buildFallbackNarrative(site: FeederSite, landing: LandingSection): FeederNarrative {
  const proofStrip = [
    site.priorityIssues[0] ?? "Issue focus",
    site.localCities[0] ?? "District focus",
    site.funnelGoal
  ];

  return {
    siteLabel: THEME_LABELS[site.theme],
    publicationTitle: site.name,
    deck: site.headline,
    perspective: site.message,
    proofStrip,
    issueFrame: [
      {
        title: "Why this lane exists",
        body: landing.supportingText
      },
      {
        title: "District focus",
        body: `This page is optimized around ${site.localCities.join(", ")} and speaks to voters motivated by ${site.priorityIssues.join(", ")}.`
      },
      {
        title: "Conversion objective",
        body: site.funnelGoal
      }
    ],
    whyTj: [
      {
        title: "Why TJ",
        body:
          "The message should make TJ feel like the more credible, more useful, and more grounded choice for a district that needs sharper representation."
      },
      {
        title: "Why this page matters",
        body:
          "A feeder page should not just describe an issue. It should move a voter toward the main campaign with clearer intent."
      }
    ],
    actionPlan: [
      landing.ctaLabel,
      "Review the main campaign path",
      "Move from issue interest to supporter action"
    ],
    editorialNote:
      "Keep the tone precise, sourced, and conversion-oriented. The page should feel like a real publication surface, not a generic template."
  };
}

function withLandingContext(site: FeederSite, landing: LandingSection, base: FeederNarrative): FeederNarrative {
  return {
    ...base,
    deck: `${base.deck} Current focus: ${landing.headline}`,
    perspective: `${base.perspective} This page is currently emphasizing ${landing.eyebrow.toLowerCase()} as the most useful conversion path.`,
    proofStrip: [...base.proofStrip, landing.eyebrow],
    actionPlan: [landing.ctaLabel, ...base.actionPlan.filter((item) => item !== landing.ctaLabel)].slice(0, 3)
  };
}

export function buildFeederNarrative(site: FeederSite, landing: LandingSection): FeederNarrative {
  const override = SITE_NARRATIVE_OVERRIDES[site.tenantSlug];
  const base = override
    ? {
        siteLabel: THEME_LABELS[site.theme],
        ...override
      }
    : buildFallbackNarrative(site, landing);

  return withLandingContext(site, landing, base);
}
