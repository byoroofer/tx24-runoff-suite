import { STOP_KEYWORDS } from "../constants/compliance";

export function normalizeBody(body: string): string {
  return body.trim().toUpperCase();
}

export function extractStopKeyword(body: string): string | null {
  const normalized = normalizeBody(body);
  return STOP_KEYWORDS.find((keyword) => normalized === keyword) ?? null;
}

export function shouldSuppressFromInbound(body: string): boolean {
  return extractStopKeyword(body) !== null;
}

