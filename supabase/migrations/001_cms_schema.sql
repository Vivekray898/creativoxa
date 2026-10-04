-- ============================================================================
-- Creativoxa CMS — 001: schema
-- ============================================================================
-- Run this file first in the Supabase SQL editor (Database → SQL editor → New
-- query → paste → Run). Every statement is idempotent, so re-running is safe.
--
-- The database controls *content*. Layout, components, animation and styling
-- stay in code — see supabase/README.md.
-- ============================================================================

create extension if not exists "pgcrypto";

-- Shared updated_at trigger ---------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- profiles — CMS users (mirrors auth.users, one row per user)
-- ============================================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'editor' check (role in ('admin', 'editor')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Create a profile automatically for every new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for accounts that already exist (nobody gets stranded).
insert into public.profiles (id, email, full_name)
select u.id,
       u.email,
       split_part(coalesce(u.email, ''), '@', 1)
from auth.users u
on conflict (id) do nothing;

-- ============================================================================
-- service_categories
-- ============================================================================
create table if not exists public.service_categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  label        text not null,
  description  text,
  sort_order   integer not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================================
-- services — one row per public service page (/services/<slug>)
-- ============================================================================
-- Nested, repeated content lives in jsonb *content* columns. That keeps the
-- schema small without inventing a page-builder: the values are typed arrays of
-- { title, body } / { step, title, body } blocks that the service page renders.
create table if not exists public.services (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique,
  category_id            uuid references public.service_categories (id) on delete set null,
  name                   text not null,
  short_title            text not null,
  category_label         text,
  excerpt                text not null default '',
  hero_headline          text,
  hero_subline           text,
  problem_title          text,
  problem_body           text,
  what_we_do             jsonb not null default '[]'::jsonb,
  how_it_works           jsonb not null default '[]'::jsonb,
  deliverables           jsonb not null default '[]'::jsonb,
  who_its_for            jsonb not null default '[]'::jsonb,
  icon                   text,
  image_url              text,
  featured               boolean not null default false,
  published              boolean not null default false,
  sort_order             integer not null default 0,
  seo_title              text,
  seo_description        text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  constraint services_what_we_do_is_array      check (jsonb_typeof(what_we_do) = 'array'),
  constraint services_how_it_works_is_array    check (jsonb_typeof(how_it_works) = 'array'),
  constraint services_deliverables_is_array    check (jsonb_typeof(deliverables) = 'array'),
  constraint services_who_its_for_is_array     check (jsonb_typeof(who_its_for) = 'array')
);

-- ============================================================================
-- industries
-- ============================================================================
create table if not exists public.industries (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  name               text not null,
  short_description  text,
  description        text,
  icon               text,
  image_url          text,
  featured           boolean not null default false,
  published          boolean not null default false,
  sort_order         integer not null default 0,
  seo_title          text,
  seo_description    text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ============================================================================
-- case_studies — the /work section
-- ============================================================================
-- Narrative columns stay nullable on purpose: a project can be published with
-- only what is genuinely known, and the public page hides empty sections rather
-- than inventing results.
create table if not exists public.case_studies (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  client_name     text,
  industry        text,
  summary         text not null default '',
  challenge       text,
  approach        text,
  solution        text,
  outcome         text,
  featured_image  text,
  url             text,
  services        jsonb not null default '[]'::jsonb,
  featured        boolean not null default false,
  published       boolean not null default false,
  sort_order      integer not null default 0,
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint case_studies_services_is_array check (jsonb_typeof(services) = 'array')
);

-- ============================================================================
-- testimonials — hidden on the public site until real ones exist
-- ============================================================================
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  role        text,
  quote       text not null,
  photo_url   text,
  published   boolean not null default false,
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================================
-- faqs — homepage questions (category 'homepage') and per-service questions
-- ============================================================================
create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  category    text not null default 'general',
  service_id  uuid references public.services (id) on delete cascade,
  published   boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================================
-- insights — articles behind /insights
-- ============================================================================
create table if not exists public.insights (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  excerpt         text not null default '',
  content         text not null default '',
  featured_image  text,
  author          text,
  category        text not null default 'Insights',
  published       boolean not null default false,
  published_at    timestamptz not null default now(),
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Carry over any existing rows from the previous `posts` table (guarded: it is
-- skipped when the table or columns differ, and never raises).
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'posts'
  ) then
    begin
      execute $mig$
        insert into public.insights
          (slug, title, excerpt, content, featured_image, author, category, published, published_at, created_at, updated_at)
        select p.slug,
               p.title,
               coalesce(p.excerpt, ''),
               coalesce(p.content, ''),
               p.cover_image,
               p.author,
               coalesce(p.category, 'Insights'),
               true,
               coalesce(p.published_at, now()),
               coalesce(p.published_at, now()),
               now()
        from public.posts p
        where p.slug is not null
        on conflict (slug) do nothing
      $mig$;
      raise notice 'Migrated rows from posts → insights.';
    exception when others then
      raise notice 'Skipped posts → insights migration (%)', sqlerrm;
    end;
  end if;
end $$;

-- ============================================================================
-- homepage_settings — single row (id is always true)
-- ============================================================================
create table if not exists public.homepage_settings (
  id                            boolean primary key default true check (id),
  hero_badge                    text,
  hero_title                    text,
  hero_description              text,
  hero_primary_cta              text,
  hero_primary_url              text,
  hero_secondary_cta            text,
  hero_secondary_url            text,
  hero_image                    text,
  hero_note                     text,
  services_section_title        text,
  services_section_description  text,
  industries_section_title      text,
  industries_section_description text,
  process_section_title         text,
  process_section_description   text,
  work_section_title            text,
  work_section_description      text,
  insights_section_title        text,
  insights_section_description  text,
  final_cta_title               text,
  final_cta_description         text,
  final_cta_label               text,
  updated_at                    timestamptz not null default now()
);

-- ============================================================================
-- page_sections — enables/disables and orders homepage sections
-- ============================================================================
create table if not exists public.page_sections (
  id           uuid primary key default gen_random_uuid(),
  page_slug    text not null default 'home',
  section_key  text not null,
  label        text not null,
  enabled      boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (page_slug, section_key)
);

-- ============================================================================
-- navigation_items — header and footer links
-- ============================================================================
create table if not exists public.navigation_items (
  id                uuid primary key default gen_random_uuid(),
  location          text not null check (
                      location in ('header', 'header-services', 'footer-services',
                                   'footer-company', 'footer-legal')
                    ),
  label             text not null,
  href              text not null,
  -- Optional supporting line, used by the header services dropdown.
  description       text,
  parent_id         uuid references public.navigation_items (id) on delete cascade,
  sort_order        integer not null default 0,
  visible           boolean not null default true,
  open_in_new_tab   boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  -- Only internal paths and absolute http(s) URLs are allowed.
  constraint navigation_items_href_format check (href ~ '^(/[^ ]*|https?://\S+)$')
);

-- ============================================================================
-- site_settings — single row (id is always true)
-- ============================================================================
create table if not exists public.site_settings (
  id                        boolean primary key default true check (id),
  company_name              text not null default 'Creativoxa',
  tagline                   text,
  email                     text,
  phone                     text,
  whatsapp                  text,
  address_street            text,
  address_city              text,
  address_region            text,
  address_postal_code       text,
  address_country           text default 'IN',
  gstin                     text,
  socials                   jsonb not null default '{}'::jsonb,
  footer_description        text,
  copyright_text            text,
  default_seo_title         text,
  default_seo_description   text,
  og_image                  text,
  updated_at                timestamptz not null default now()
);

-- ============================================================================
-- enquiries — preserved from the existing site, extended for admin management
-- ============================================================================
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'enquiries'
  ) then
    alter table public.enquiries add column if not exists business    text;
    alter table public.enquiries add column if not exists website     text;
    alter table public.enquiries add column if not exists service     text;
    alter table public.enquiries add column if not exists budget      text;
    alter table public.enquiries add column if not exists status      text not null default 'new';
    alter table public.enquiries add column if not exists notes       text;
    alter table public.enquiries add column if not exists form_source text;
    alter table public.enquiries add column if not exists created_at  timestamptz not null default now();
    alter table public.enquiries add column if not exists updated_at  timestamptz not null default now();

    if not exists (
      select 1 from pg_constraint where conname = 'enquiries_status_check'
    ) then
      alter table public.enquiries
        add constraint enquiries_status_check
        check (status in ('new', 'contacted', 'qualified', 'closed'));
    end if;
  else
    -- Fresh project: create the table the site has always expected.
    create table public.enquiries (
      id           uuid primary key default gen_random_uuid(),
      name         text not null,
      email        text not null,
      phone        text,
      business     text,
      website      text,
      service      text,
      budget       text,
      message      text,
      form_source  text,
      status       text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
      notes        text,
      created_at   timestamptz not null default now(),
      updated_at   timestamptz not null default now()
    );
  end if;
end $$;

-- ============================================================================
-- Indexes for the queries the public site and admin actually run
-- ============================================================================
create index if not exists services_published_order_idx      on public.services (published, sort_order);
create index if not exists services_category_idx             on public.services (category_id);
create index if not exists service_categories_pub_order_idx  on public.service_categories (published, sort_order);
create index if not exists industries_published_order_idx    on public.industries (published, sort_order);
create index if not exists case_studies_published_order_idx  on public.case_studies (published, sort_order);
create index if not exists case_studies_featured_idx         on public.case_studies (featured) where published;
create index if not exists testimonials_published_order_idx  on public.testimonials (published, sort_order);
create index if not exists faqs_published_order_idx          on public.faqs (published, sort_order);
create index if not exists faqs_category_idx                 on public.faqs (category);
create index if not exists faqs_service_idx                  on public.faqs (service_id);
create index if not exists insights_published_idx            on public.insights (published, published_at desc);
create index if not exists nav_items_location_order_idx      on public.navigation_items (location, sort_order);
create index if not exists page_sections_page_order_idx       on public.page_sections (page_slug, sort_order);
create index if not exists enquiries_created_idx             on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx              on public.enquiries (status);

-- ============================================================================
-- updated_at triggers
-- ============================================================================
do $$
declare
  t text;
  names text[] := array[
    'profiles', 'service_categories', 'services', 'industries', 'case_studies',
    'testimonials', 'faqs', 'insights', 'homepage_settings', 'page_sections',
    'navigation_items', 'site_settings', 'enquiries'
  ];
begin
  foreach t in array names loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      t
    );
  end loop;
end $$;
