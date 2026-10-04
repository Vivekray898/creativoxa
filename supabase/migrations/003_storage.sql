-- ============================================================================
-- Creativoxa CMS — 003: media storage
-- ============================================================================
-- Run after 002. Idempotent.
--
-- Creates the public-read `website-media` bucket used by the admin media
-- library. Uploads are additionally validated in the admin UI, and the bucket
-- itself enforces a 5 MB limit and an image-only MIME allowlist.
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'website-media',
  'website-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update
  set public            = true,
      file_size_limit   = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Public read: the site needs to render these images.
drop policy if exists "website_media_public_read" on storage.objects;
create policy "website_media_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'website-media');

-- Staff-only writes.
drop policy if exists "website_media_staff_insert" on storage.objects;
create policy "website_media_staff_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'website-media' and public.is_staff());

drop policy if exists "website_media_staff_update" on storage.objects;
create policy "website_media_staff_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'website-media' and public.is_staff())
  with check (bucket_id = 'website-media' and public.is_staff());

-- Deletion is destructive, so it stays with admins.
drop policy if exists "website_media_admin_delete" on storage.objects;
create policy "website_media_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'website-media' and public.is_admin());
