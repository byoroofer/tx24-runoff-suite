type MessageRecord = {
  tenantId: string;
  to: string;
  body: string;
  channel: string;
  senderId: string;
};

type ClickRecord = {
  slug: string;
  targetUrl: string;
  createdAt: string;
};

type ConversionRecord = {
  tenantSlug: string;
  eventName: string;
  value?: number;
  createdAt: string;
};

const suppressed = new Set<string>();
const messages: MessageRecord[] = [];
const clicks: ClickRecord[] = [];
const conversions: ConversionRecord[] = [];
const auditLogs: Array<{ action: string; detail: string; createdAt: string }> = [];

export function markSuppressed(phone: string) {
  suppressed.add(phone);
  auditLogs.push({
    action: "opt_out",
    detail: `Suppressed ${phone}`,
    createdAt: new Date().toISOString()
  });
}

export function isSuppressed(phone: string): boolean {
  return suppressed.has(phone);
}

export function recordMessage(message: MessageRecord) {
  messages.push(message);
}

export function listMessages(): MessageRecord[] {
  return messages;
}

export function recordClick(slug: string, targetUrl: string) {
  clicks.push({
    slug,
    targetUrl,
    createdAt: new Date().toISOString()
  });
}

export function listClicks() {
  return clicks;
}

export function recordConversion(input: { tenantSlug: string; eventName: string; value?: number }) {
  conversions.push({
    ...input,
    createdAt: new Date().toISOString()
  });
}

export function listConversions() {
  return conversions;
}

export function recordAudit(action: string, detail: string) {
  auditLogs.push({ action, detail, createdAt: new Date().toISOString() });
}

export function listAuditLogs() {
  return auditLogs;
}
