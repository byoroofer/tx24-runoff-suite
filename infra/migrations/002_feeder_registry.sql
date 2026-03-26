create table if not exists feeder_site_profiles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null unique references tenants(id) on delete cascade,
  audience text not null,
  headline text not null,
  message text not null,
  theme text not null,
  launch_status text not null,
  launch_priority text not null,
  funnel_goal text not null,
  local_cities jsonb not null default '[]'::jsonb,
  priority_issues jsonb not null default '[]'::jsonb,
  contrast_figures jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists feeder_landing_pages (
  id uuid primary key default gen_random_uuid(),
  feeder_site_profile_id uuid not null references feeder_site_profiles(id) on delete cascade,
  slug text not null,
  eyebrow text not null,
  headline text not null,
  supporting_text text not null,
  target_path text not null,
  cta_label text not null,
  proof_points jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (feeder_site_profile_id, slug)
);

create table if not exists editorial_tasks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  feeder_landing_page_id uuid references feeder_landing_pages(id) on delete cascade,
  status text not null,
  source_rail_slug text not null,
  owner_lane text not null,
  copy_goal text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_editorial_tasks_tenant_status
  on editorial_tasks (tenant_id, status);
