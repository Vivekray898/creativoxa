-- ============================================================================
-- Creativoxa CMS — 007: internal-linking fixes
-- ============================================================================
-- /tools and /disclaimer were reachable only via the sitemap, which is a weak
-- signal that a page exists. This adds both to the footer navigation so every
-- page links to them, matching `SITE_INDEX` and `FOOTER_LEGAL` in
-- lib/cms/defaults.ts.
--
-- Idempotent: `navigation_items` has no unique constraint on (location, href),
-- so each insert is guarded by an explicit not-exists check rather than an
-- `on conflict` clause that could never match.
-- ============================================================================

insert into public.navigation_items (location, label, href, sort_order, visible, open_in_new_tab)
select v.location, v.label, v.href, v.sort_order, true, false
from (values
  ('footer-company'::text, 'Free Tools'::text, '/tools'::text,       5),
  ('footer-legal',           'Disclaimer',      '/disclaimer',  4)
) as v(location, label, href, sort_order)
where not exists (
  select 1 from public.navigation_items n
  where n.location = v.location and n.href = v.href
);

-- Keep an existing row in step with the labels used in code, so an editor who
-- already added these links by hand doesn't end up with two spellings.
update public.navigation_items
   set label = case href
                when '/tools' then 'Free Tools'
                when '/disclaimer' then 'Disclaimer'
              end,
       visible = true,
       updated_at = now()
 where (location, href) in (
   ('footer-company', '/tools'),
   ('footer-legal', '/disclaimer')
 );