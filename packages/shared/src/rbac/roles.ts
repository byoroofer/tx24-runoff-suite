export const RBAC_ROLES = [
  "superadmin",
  "admin",
  "compliance",
  "operator",
  "editor",
  "analyst",
  "volunteer_manager"
] as const;

export type Role = (typeof RBAC_ROLES)[number];

const roleCapabilities: Record<Role, string[]> = {
  superadmin: ["*"],
  admin: ["publish", "send_messages", "override_compliance", "manage_users"],
  compliance: ["review_altered_media", "override_compliance", "review_disclosures"],
  operator: ["send_messages", "manage_segments", "manage_templates"],
  editor: ["edit_content", "submit_for_review"],
  analyst: ["view_dashboards", "run_exports"],
  volunteer_manager: ["manage_events", "manage_shifts", "manage_relational_invites"]
};

export function hasCapability(role: Role, capability: string): boolean {
  return roleCapabilities[role].includes("*") || roleCapabilities[role].includes(capability);
}

