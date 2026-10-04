-- ============================================================================
-- Creativoxa CMS — 002: Row Level Security
-- ============================================================================
-- Run after 001. Idempotent.
--
-- Model:
--   • anon          → reads published content only. No write access anywhere.
--   • authenticated → reads published content; staff (see is_staff) can write.
--   • admin         → full access, including deletes and site settings.
--
-- enquiries has NO public policy at all: the website submits through the
-- `submit_enquiry` function below, which runs as its definer and can only ever
-- insert a validated row. That is why no service-role key is needed anywhere.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Authorisation helpers
-- ---------------------------------------------------------------------------
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'editor')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Published content tables: public read of published rows, staff write
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
  names text[] := array[
    'service_categories', 'services', 'industries', 'case_studies',
    'testimonials', 'faqs', 'insights'
  ];
begin
  foreach t in array names loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists %I on public.%I', t || '_public_read', t);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (published = true)',
      t || '_public_read', t
    );

    -- Staff must also see unpublished rows, otherwise the dashboard could not
    -- list drafts. Permissive policies OR together, so this only widens access
    -- for signed-in staff.
    execute format('drop policy if exists %I on public.%I', t || '_staff_read', t);
    execute format(
      'create policy %I on public.%I for select to authenticated using (public.is_staff())',
      t || '_staff_read', t
    );

    -- Editors may add and edit content…
    execute format('drop policy if exists %I on public.%I', t || '_staff_insert', t);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (public.is_staff())',
      t || '_staff_insert', t
    );

    execute format('drop policy if exists %I on public.%I', t || '_staff_update', t);
    execute format(
      'create policy %I on public.%I for update to authenticated using (public.is_staff()) with check (public.is_staff())',
      t || '_staff_update', t
    );

    -- …but only admins may delete.
    execute format('drop policy if exists %I on public.%I', t || '_admin_delete', t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using (public.is_admin())',
      t || '_admin_delete', t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Site-wide settings, homepage copy, page sections, navigation
-- ---------------------------------------------------------------------------
alter table public.homepage_settings enable row level security;
drop policy if exists homepage_settings_public_read on public.homepage_settings;
create policy homepage_settings_public_read on public.homepage_settings
  for select to anon, authenticated using (true);
drop policy if exists homepage_settings_staff_update on public.homepage_settings;
create policy homepage_settings_staff_update on public.homepage_settings
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists homepage_settings_staff_insert on public.homepage_settings;
create policy homepage_settings_staff_insert on public.homepage_settings
  for insert to authenticated with check (public.is_staff());

alter table public.site_settings enable row level security;
drop policy if exists site_settings_public_read on public.site_settings;
create policy site_settings_public_read on public.site_settings
  for select to anon, authenticated using (true);
drop policy if exists site_settings_admin_update on public.site_settings;
create policy site_settings_admin_update on public.site_settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists site_settings_admin_insert on public.site_settings;
create policy site_settings_admin_insert on public.site_settings
  for insert to authenticated with check (public.is_admin());

alter table public.page_sections enable row level security;
-- Staff need to read disabled sections too, so the public policy is additive.
drop policy if exists page_sections_public_read on public.page_sections;
create policy page_sections_public_read on public.page_sections
  for select to anon using (enabled = true);
drop policy if exists page_sections_staff_read on public.page_sections;
create policy page_sections_staff_read on public.page_sections
  for select to authenticated using (public.is_staff());
drop policy if exists page_sections_staff_write on public.page_sections;
create policy page_sections_staff_write on public.page_sections
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists page_sections_staff_insert on public.page_sections;
create policy page_sections_staff_insert on public.page_sections
  for insert to authenticated with check (public.is_staff());
drop policy if exists page_sections_admin_delete on public.page_sections;
create policy page_sections_admin_delete on public.page_sections
  for delete to authenticated using (public.is_admin());

alter table public.navigation_items enable row level security;
drop policy if exists navigation_items_public_read on public.navigation_items;
create policy navigation_items_public_read on public.navigation_items
  for select to anon using (visible = true);
drop policy if exists navigation_items_staff_read on public.navigation_items;
create policy navigation_items_staff_read on public.navigation_items
  for select to authenticated using (public.is_staff());
drop policy if exists navigation_items_staff_insert on public.navigation_items;
create policy navigation_items_staff_insert on public.navigation_items
  for insert to authenticated with check (public.is_staff());
drop policy if exists navigation_items_staff_update on public.navigation_items;
create policy navigation_items_staff_update on public.navigation_items
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists navigation_items_admin_delete on public.navigation_items;
create policy navigation_items_admin_delete on public.navigation_items
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- profiles — readable by the owner and by admins; only admins may write
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select to authenticated using (id = auth.uid());

drop policy if exists profiles_admin_read on public.profiles;
create policy profiles_admin_read on public.profiles
  for select to authenticated using (public.is_admin());

drop policy if exists profiles_admin_write on public.profiles;
create policy profiles_admin_write on public.profiles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists profiles_admin_insert on public.profiles;
create policy profiles_admin_insert on public.profiles
  for insert to authenticated with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- enquiries — staff only. No public read, no public insert.
-- ---------------------------------------------------------------------------
alter table public.enquiries enable row level security;

drop policy if exists enquiries_staff_read on public.enquiries;
create policy enquiries_staff_read on public.enquiries
  for select to authenticated using (public.is_staff());

drop policy if exists enquiries_staff_update on public.enquiries;
create policy enquiries_staff_update on public.enquiries
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists enquiries_admin_delete on public.enquiries;
create policy enquiries_admin_delete on public.enquiries
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- submit_enquiry — the only public write path into the database
-- ---------------------------------------------------------------------------
-- SECURITY DEFINER, so it bypasses RLS (which is what lets the site submit an
-- enquiry without any privileged key). It performs its own validation, applies
-- a light abuse guard, and can only ever INSERT one row.
create or replace function public.submit_enquiry(
  p_name        text,
  p_email       text,
  p_phone       text default null,
  p_business    text default null,
  p_website     text default null,
  p_service     text default null,
  p_budget      text default null,
  p_message     text default null,
  p_form_source text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id      uuid;
  v_recent  integer;
  v_email   text := lower(btrim(coalesce(p_email, '')));
  v_name    text := btrim(coalesce(p_name, ''));
begin
  if length(v_name) < 2 then
    raise exception 'invalid_name';
  end if;

  if v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'invalid_email';
  end if;

  if length(coalesce(p_message, '')) > 5000 then
    raise exception 'message_too_long';
  end if;

  -- Abuse guard: at most 3 submissions per email address per 10 minutes.
  select count(*) into v_recent
  from public.enquiries e
  where e.email = v_email
    and e.created_at > now() - interval '10 minutes';

  if v_recent >= 3 then
    raise exception 'rate_limited';
  end if;

  insert into public.enquiries (
    name, email, phone, business, website, service, budget, message, form_source, status
  )
  values (
    v_name,
    v_email,
    nullif(btrim(coalesce(p_phone, '')), ''),
    nullif(btrim(coalesce(p_business, '')), ''),
    nullif(btrim(coalesce(p_website, '')), ''),
    nullif(btrim(coalesce(p_service, '')), ''),
    nullif(btrim(coalesce(p_budget, '')), ''),
    nullif(btrim(coalesce(p_message, '')), ''),
    nullif(btrim(coalesce(p_form_source, '')), ''),
    'new'
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_enquiry(text, text, text, text, text, text, text, text, text) from public;
grant execute on function public.submit_enquiry(text, text, text, text, text, text, text, text, text)
  to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Grants (RLS above still decides which *rows* each role can touch)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select on
  public.service_categories, public.services, public.industries, public.case_studies,
  public.testimonials, public.faqs, public.insights, public.homepage_settings,
  public.page_sections, public.navigation_items, public.site_settings
  to anon, authenticated;

grant insert, update, delete on
  public.service_categories, public.services, public.industries, public.case_studies,
  public.testimonials, public.faqs, public.insights, public.homepage_settings,
  public.page_sections, public.navigation_items, public.site_settings
  to authenticated;

grant select, update, delete on public.enquiries to authenticated;
grant select on public.profiles to authenticated;

-- Remove the old public write path to enquiries (the previous site inserted
-- directly from the browser with the anon key).
revoke insert, update, delete, select on public.enquiries from anon;
