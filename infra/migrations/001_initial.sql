create extension if not exists "pgcrypto";

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists tenant_domains (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  domain text not null unique,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  key text not null unique
);

create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  tenant_id uuid references tenants(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  session_token text not null unique,
  expires_at timestamptz not null
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  first_name text,
  last_name text,
  city text,
  zip text,
  created_at timestamptz not null default now()
);

create table if not exists contact_identities (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacts(id) on delete cascade,
  kind text not null,
  hashed_value text not null,
  last4 text,
  unique (contact_id, kind, hashed_value)
);

create table if not exists consents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  contact_id uuid not null references contacts(id) on delete cascade,
  channel text not null,
  status text not null,
  text_shown text not null,
  source_url text not null,
  source_domain text not null,
  user_agent text not null,
  proof_timestamp timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists opt_outs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  phone_hash text not null,
  keyword text not null,
  scope text not null default 'tenant',
  created_at timestamptz not null default now()
);

create table if not exists segments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists segment_rules (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references segments(id) on delete cascade,
  rule_json jsonb not null
);

create table if not exists segment_memberships (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references segments(id) on delete cascade,
  contact_id uuid not null references contacts(id) on delete cascade,
  materialized_at timestamptz not null default now(),
  unique (segment_id, contact_id)
);

create table if not exists messaging_senders (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  kind text not null,
  external_sid text,
  phone_number text,
  created_at timestamptz not null default now()
);

create table if not exists tcr_registrations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  sender_id uuid references messaging_senders(id) on delete set null,
  brand_id text,
  campaign_id text,
  use_case text,
  status text,
  created_at timestamptz not null default now()
);

create table if not exists campaign_verify_tokens (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  encrypted_token text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists message_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  version integer not null,
  channel text not null,
  body text not null,
  disclaimer text not null,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  template_id uuid references message_templates(id) on delete set null,
  sender_id uuid references messaging_senders(id) on delete set null,
  direction text not null,
  body text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists message_events (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages(id) on delete cascade,
  provider_event text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists inbound_threads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  last_message_at timestamptz
);

create table if not exists shortlinks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  slug text not null unique,
  destination_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists click_events (
  id uuid primary key default gen_random_uuid(),
  shortlink_id uuid not null references shortlinks(id) on delete cascade,
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  title text not null,
  body text not null,
  review_state text not null,
  created_at timestamptz not null default now()
);

create table if not exists content_assets (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  asset_type text not null,
  url text,
  is_altered boolean not null default false,
  is_deepfake boolean not null default false,
  altered_label_attached boolean not null default false
);

create table if not exists content_provenance (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  source_url text not null,
  citation_note text
);

create table if not exists content_similarity (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  compared_item_id uuid references content_items(id) on delete set null,
  similarity_score numeric(6, 5) not null,
  blocked boolean not null default false
);

create table if not exists experiments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  status text not null
);

create table if not exists experiment_variants (
  id uuid primary key default gen_random_uuid(),
  experiment_id uuid not null references experiments(id) on delete cascade,
  name text not null,
  allocation integer not null
);

create table if not exists assignments (
  id uuid primary key default gen_random_uuid(),
  experiment_variant_id uuid not null references experiment_variants(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists conversion_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  event_name text not null,
  contact_id uuid references contacts(id) on delete set null,
  value numeric(12, 2),
  created_at timestamptz not null default now()
);

create table if not exists creators (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  display_name text not null,
  status text not null
);

create table if not exists creator_briefs (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references creators(id) on delete cascade,
  brief_text text not null,
  created_at timestamptz not null default now()
);

create table if not exists creator_links (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references creators(id) on delete cascade,
  shortlink_id uuid references shortlinks(id) on delete set null,
  destination_url text not null
);

create table if not exists creator_submissions (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references creators(id) on delete cascade,
  status text not null,
  submitted_at timestamptz not null default now()
);

create table if not exists volunteers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  status text not null
);

create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  title text not null
);

create table if not exists shift_signups (
  id uuid primary key default gen_random_uuid(),
  shift_id uuid not null references shifts(id) on delete cascade,
  volunteer_id uuid not null references volunteers(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  location text
);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists relational_invites (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  volunteer_id uuid references volunteers(id) on delete set null,
  invitee_hash text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id) on delete set null,
  actor_user_id uuid references users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists embeddings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  embedding jsonb not null
);

