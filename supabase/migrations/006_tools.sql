-- ============================================================================
-- Creativoxa CMS — 006: free tools registry
-- ============================================================================
-- The /tools pages read their catalogue from this table. The interactive tool
-- components stay in code (lib/tools-registry.ts); each row only names which
-- component to render, so adding a tool to the menu never needs a deploy.
--
-- Idempotent: safe to run more than once.
-- ============================================================================

create table if not exists public.tools (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text,
  -- Component key in lib/tools-registry.ts (falls back to the slug).
  component   text,
  category    text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.tools enable row level security;

drop policy if exists tools_public_read on public.tools;
create policy tools_public_read on public.tools
  for select to anon, authenticated using (true);

grant select on public.tools to anon, authenticated;

-- Seed rows matching the current registry exactly (no invented tools).
insert into public.tools (slug, name, description, component, category, sort_order)
values
  ('word-counter', 'Word & SEO Counter',
   'Professional real-time text analysis for SEO and content length.',
   'WordCounter', 'Content', 1),
  ('image-compressor', 'Ultra Image Compressor',
   'Lossless browser-based compression to boost your page speed scores.',
   'ImageCompressor', 'Performance', 2),
  ('unit-converter', 'Digital Unit Converter',
   'Convert between pixels, REM, and EM for modern responsive design.',
   'UnitConverter', 'Developer', 3)
on conflict (slug) do update
set name        = excluded.name,
    description = excluded.description,
    component   = excluded.component,
    category    = excluded.category,
    sort_order  = excluded.sort_order;
