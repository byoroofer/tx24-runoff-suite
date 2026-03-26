import { TEXAS_DISCLOSURE_REQUIRED_PHRASE } from "../constants/compliance";

export function buildDisclosureText(input: {
  paidForBy: string;
  authorizedBy: string;
  websiteUrl?: string;
}): string {
  const parts = [
    TEXAS_DISCLOSURE_REQUIRED_PHRASE,
    `Paid for by ${input.paidForBy}.`,
    `Authorized by ${input.authorizedBy}.`
  ];

  if (input.websiteUrl) {
    parts.push(`Disclosure details: ${input.websiteUrl}`);
  }

  return parts.join(" ");
}

