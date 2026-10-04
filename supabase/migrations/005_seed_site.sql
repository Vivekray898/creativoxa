-- ============================================================================
-- Creativoxa CMS — 005: seed site structure
-- ============================================================================
-- Run after 004. Idempotent.
--
-- Existing content moved out of lib/data/content.ts, lib/data/projects.ts,
-- lib/site.ts and the homepage components. Nothing is invented: case studies
-- carry only what is genuinely known (no challenge/outcome narrative until real
-- results are documented), and no testimonials are seeded at all.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Industries (lib/data/content.ts)
-- ---------------------------------------------------------------------------
insert into public.industries (slug, name, short_description, icon, featured, published, sort_order) values
  ('local-businesses', $t$Local Businesses$t$, $t$Shops, services and showrooms that live on nearby customers.$t$, 'pin', true, true, 1),
  ('retail', $t$Retail$t$, $t$Stores that need visibility online and footfall offline.$t$, 'building', true, true, 2),
  ('healthcare', $t$Healthcare$t$, $t$Clinics and practices where trust decides the first call.$t$, 'heart', true, true, 3),
  ('education', $t$Education$t$, $t$Coaching centres and institutions competing for admissions.$t$, 'graduation', true, true, 4),
  ('hospitality', $t$Hospitality$t$, $t$Hotels, restaurants and cafés that sell experience.$t$, 'users', true, true, 5),
  ('professional-services', $t$Professional Services$t$, $t$Consultants, agencies and firms that sell expertise.$t$, 'briefcase', true, true, 6),
  ('real-estate', $t$Real Estate$t$, $t$Developers and agents with long decision cycles and high-value leads.$t$, 'map', false, true, 7),
  ('e-commerce', $t$E-commerce$t$, $t$Stores that need traffic, product visibility and repeat buyers.$t$, 'cursor', false, true, 8),
  ('manufacturing-trade', $t$Manufacturing & Trade$t$, $t$Suppliers who sell through IndiaMART and industry channels.$t$, 'layers', false, true, 9),
  ('startups-growing-businesses', $t$Startups & Growing Businesses$t$, $t$Teams that need to build presence without waste.$t$, 'bolt', false, true, 10)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Case studies / work (lib/data/projects.ts — all live sites)
-- ---------------------------------------------------------------------------
insert into public.case_studies (slug, title, client_name, industry, summary, featured_image, url, services, featured, published, sort_order) values
  ('safar-tour',
   $t$Safar Tour$t$, $t$Safar Tour$t$, $t$Tourism$t$,
   $t$A tour operator's website with enquiry-focused destination pages and a simple booking journey.$t$,
   '/work/safartour.png', $t$https://safartour.in/$t$,
   $j$["Website","Booking System","SEO"]$j$::jsonb, true, true, 1),
  ('sana-clothing',
   $t$Sana Clothing$t$, $t$Sana Clothing$t$, $t$E-commerce$t$,
   $t$An online clothing store with a clean catalogue and a checkout path built for mobile shoppers.$t$,
   '/work/sana.png', $t$https://sanaclothing.com/$t$,
   $j$["Website","E-commerce"]$j$::jsonb, false, true, 2),
  ('markqent',
   $t$Markqent$t$, $t$Markqent$t$, $t$B2B Services$t$,
   $t$A corporate website that presents services clearly and routes visitor interest into enquiry channels.$t$,
   '/work/markqent.png', $t$https://markqent.com/$t$,
   $j$["Website","Marketing"]$j$::jsonb, false, true, 3),
  ('spice-lounge',
   $t$Spice Lounge$t$, $t$Spice Lounge$t$, $t$Hospitality$t$,
   $t$A restaurant website covering menu, reservations and location, tuned for local search visibility.$t$,
   '/work/spice.png', $t$https://spice-lounge.eu/$t$,
   $j$["Website","Local Presence"]$j$::jsonb, false, true, 4),
  ('greenace',
   $t$GreenAce$t$, $t$GreenAce$t$, $t$Real Estate$t$,
   $t$A property developer's lead-generation site with project pages and a short enquiry form.$t$,
   '/work/greenace.png', $t$https://greenacedeveloper.com/$t$,
   $j$["Landing Page","Lead Generation"]$j$::jsonb, false, true, 5),
  ('loanzaar',
   $t$Loanzaar$t$, $t$Loanzaar$t$, $t$Financial Services$t$,
   $t$A loan-services website that explains products simply and captures enquiries with clear next steps.$t$,
   '/work/loanzaar.png', $t$https://loanzaar.in/$t$,
   $j$["Website","Lead Generation"]$j$::jsonb, false, true, 6),
  ('raju-machines',
   $t$Raju Machines$t$, $t$Raju Machines$t$, $t$Industrial Machinery$t$,
   $t$A machinery catalogue website that makes product ranges easy to browse and easy to enquire about.$t$,
   '/work/rmachine.png', $t$https://rmachinetool.com/$t$,
   $j$["Website","Catalogue"]$j$::jsonb, false, true, 7),
  ('greater-wellness',
   $t$Greater Wellness Pilates$t$, $t$Greater Wellness Pilates$t$, $t$Health & Fitness$t$,
   $t$A pilates studio website with class information and booking-oriented enquiry paths.$t$,
   '/work/greater.png', $t$https://www.greaterwellnesspilates.au/$t$,
   $j$["Website","Local Presence"]$j$::jsonb, false, true, 8)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Homepage FAQs (lib/data/content.ts)
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from public.faqs) then
    insert into public.faqs (question, answer, category, service_id, published, sort_order) values
      ($t$What does Creativoxa actually do?$t$, $t$We help businesses build and manage their digital presence: advertising on Google and Meta, SEO and local search, social media, websites, and ongoing digital management. The common thread is that everything is planned around business goals, not isolated deliverables.$t$, 'homepage', null, true, 1),
      ($t$How do we start working together?$t$, $t$Send an enquiry or message us directly. We start with a conversation about your business and goals, then come back with a practical recommendation — what we'd do first, what it costs, and what to expect. No obligation attached.$t$, 'homepage', null, true, 2),
      ($t$What size of business do you work with?$t$, $t$Mostly small and growing businesses — local companies, retailers, service firms and manufacturers — who need professional digital marketing without enterprise-agency complexity or pricing.$t$, 'homepage', null, true, 3),
      ($t$Do you work with businesses outside Siliguri?$t$, $t$Yes. We're based in Siliguri and work with businesses across India and, in some cases, internationally. Location matters less than fit — a clear goal and a willingness to work as partners.$t$, 'homepage', null, true, 4),
      ($t$How much do your services cost?$t$, $t$It depends on scope — channels, volume and goals. After a short discovery conversation we quote a fixed monthly fee or a fixed project price, so you know the full cost before committing. No hidden add-ons.$t$, 'homepage', null, true, 5),
      ($t$Am I locked into a long contract?$t$, $t$No. Our ongoing services work on a rolling monthly basis with a 30-day notice period. We'd rather earn the next month than trap you in a year.$t$, 'homepage', null, true, 6);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- Homepage copy (hero, section headings, final CTA)
-- ---------------------------------------------------------------------------
-- The `*…*` convention marks the phrase that renders in the accent colour.
insert into public.homepage_settings (
  id, hero_badge, hero_title, hero_description,
  hero_primary_cta, hero_primary_url, hero_secondary_cta, hero_secondary_url, hero_note,
  services_section_title, services_section_description,
  industries_section_title, industries_section_description,
  process_section_title, process_section_description,
  work_section_title, work_section_description,
  insights_section_title, insights_section_description,
  final_cta_title, final_cta_description, final_cta_label
) values (
  true,
  $t$Digital growth partner$t$,
  $t$Digital marketing that turns attention into business.$t$,
  $t$Creativoxa plans and manages your advertising, search presence, social media, website and listings as one connected system — so a customer who finds you once finds a business worth contacting.$t$,
  $t$Start a Project$t$, $t$/contact$t$,
  $t$Explore Our Services$t$, $t$/services$t$,
  $t$Based in Siliguri, working with businesses across India.$t$,
  $t$Everything you need to build a *stronger digital presence.*$t$,
  $t$Five areas of work, planned as one system. Start with what matters most now — expand as the business grows.$t$,
  $t$Different businesses. *Different digital strategies.*$t$,
  $t$We don't claim to be specialists in every industry. We claim something more useful: we take the time to understand how your business wins customers — then build the digital presence around that.$t$,
  $t$From first conversation to *ongoing growth.*$t$,
  $t$A process simple enough to follow and disciplined enough to repeat. You always know what stage you're in and what happens next.$t$,
  $t$Digital work for *real businesses.*$t$,
  $t$Every project below is live. Each started with a business problem — visibility, enquiries, or a website that wasn't pulling its weight.$t$,
  $t$Notes on digital marketing *that works.*$t$,
  $t$Practical writing on search, ads, websites and the digital habits of growing businesses.$t$,
  $t$Let's work out what your business actually needs.$t$,
  $t$Tell us where your business is, what you're trying to achieve, and where your digital presence stands today. We'll come back with a practical recommendation — what we'd do first, what it costs, and what to expect.$t$,
  $t$Start a Conversation$t$
) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Homepage sections (order + enable/disable)
-- ---------------------------------------------------------------------------
insert into public.page_sections (page_slug, section_key, label, enabled, sort_order) values
  ('home', 'hero',        $t$Hero$t$,                          true, 1),
  ('home', 'trust-strip', $t$Platforms we manage$t$,           true, 2),
  ('home', 'what-we-do',  $t$Positioning statement$t$,         true, 3),
  ('home', 'services',    $t$Services$t$,                      true, 4),
  ('home', 'problems',    $t$Problems we solve$t$,             true, 5),
  ('home', 'outcomes',    $t$What clients get$t$,              true, 6),
  ('home', 'work',        $t$Selected work$t$,                 true, 7),
  ('home', 'ways-to-work',$t$Ways to work together$t$,         true, 8),
  ('home', 'process',     $t$Process$t$,                       true, 9),
  ('home', 'why',         $t$Why Creativoxa$t$,                true, 10),
  ('home', 'ecosystem',   $t$Digital ecosystem$t$,             true, 11),
  ('home', 'industries',  $t$Industries$t$,                    true, 12),
  ('home', 'testimonials',$t$Testimonials (hidden until real ones are added)$t$, true, 13),
  ('home', 'insights',    $t$Insights preview$t$,              true, 14),
  ('home', 'about-teaser',$t$About teaser$t$,                  true, 15),
  ('home', 'final-cta',   $t$Final call to action$t$,          true, 16),
  ('home', 'contact',     $t$Contact block$t$,                 true, 17)
on conflict (page_slug, section_key) do nothing;

-- ---------------------------------------------------------------------------
-- Navigation (Header.tsx + Footer.tsx)
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from public.navigation_items) then
    insert into public.navigation_items (location, label, href, description, sort_order, visible, open_in_new_tab) values
      -- Header: main links
      ('header', $t$Work$t$,     '/work',     null, 1, true, false),
      ('header', $t$About$t$,    '/about',    null, 2, true, false),
      ('header', $t$Insights$t$, '/insights', null, 3, true, false),
      ('header', $t$Contact$t$,  '/contact',  null, 4, true, false),
      -- Header: services dropdown
      ('header-services', $t$Digital Marketing$t$, '/services/digital-marketing', $t$One coordinated plan across channels$t$, 1, true, false),
      ('header-services', $t$Google Ads$t$,        '/services/google-ads',        $t$Search campaigns built around enquiries$t$, 2, true, false),
      ('header-services', $t$Meta Ads$t$,          '/services/meta-ads',          $t$Facebook & Instagram advertising$t$, 3, true, false),
      ('header-services', $t$SEO$t$,               '/services/seo',               $t$Practical, honest search optimization$t$, 4, true, false),
      ('header-services', $t$Social Media$t$,      '/services/social-media',      $t$Management, content and publishing$t$, 5, true, false),
      ('header-services', $t$Web Development$t$,   '/services/web-development',   $t$Fast, conversion-focused websites$t$, 6, true, false),
      ('header-services', $t$Local Marketing$t$,   '/services/local-marketing',   $t$Google Business Profile, maps & IndiaMART$t$, 7, true, false),
      -- Footer columns
      ('footer-services', $t$Digital Marketing$t$, '/services/digital-marketing', null, 1, true, false),
      ('footer-services', $t$Google Ads$t$,        '/services/google-ads',        null, 2, true, false),
      ('footer-services', $t$Meta Ads$t$,          '/services/meta-ads',          null, 3, true, false),
      ('footer-services', $t$SEO$t$,               '/services/seo',               null, 4, true, false),
      ('footer-services', $t$Social Media$t$,      '/services/social-media',      null, 5, true, false),
      ('footer-services', $t$Web Development$t$,   '/services/web-development',   null, 6, true, false),
      ('footer-company',  $t$About$t$,    '/about',    null, 1, true, false),
      ('footer-company',  $t$Work$t$,     '/work',     null, 2, true, false),
      ('footer-company',  $t$Insights$t$, '/insights', null, 3, true, false),
      ('footer-company',  $t$Contact$t$,  '/contact',  null, 4, true, false),
      ('footer-legal',    $t$Privacy Policy$t$,  '/privacy',        null, 1, true, false),
      ('footer-legal',    $t$Terms of Service$t$, '/terms',          null, 2, true, false),
      ('footer-legal',    $t$Refund Policy$t$,    '/refund-policy',  null, 3, true, false);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- Site settings (lib/site.ts)
-- ---------------------------------------------------------------------------
insert into public.site_settings (
  id, company_name, tagline, email, phone, whatsapp,
  address_street, address_city, address_region, address_postal_code, address_country,
  gstin, socials, footer_description, copyright_text,
  default_seo_title, default_seo_description, og_image
) values (
  true,
  $t$Creativoxa$t$,
  $t$Digital marketing and growth partner for businesses — strategy, advertising, SEO, social media, websites and ongoing digital management.$t$,
  $t$contact@creativoxa.in$t$,
  $t$+91 76795 87581$t$,
  $t$https://api.whatsapp.com/send?phone=917679587581&text=Hello!%20I%27m%20interested%20in%20your%20services.$t$,
  $t$Naresh More, East Chayan Para$t$,
  $t$Siliguri$t$,
  $t$West Bengal$t$,
  $t$734006$t$,
  $t$IN$t$,
  $t$19EXRPP1056D1Z5$t$,
  $j${
    "instagram": "https://www.instagram.com/creati_voxa/",
    "facebook": "https://www.facebook.com/profile.php?id=61559772397855",
    "x": "https://x.com/creativoxa",
    "pinterest": "https://pinterest.com/Creativoxa"
  }$j$::jsonb,
  $t$Digital marketing and digital growth support for businesses — strategy, advertising, search, social and web, managed as one system.$t$,
  $t$© {year} Creativoxa. All rights reserved.$t$,
  $t$Creativoxa — Digital Marketing & Growth Partner$t$,
  $t$Creativoxa is a digital marketing and growth partner for businesses — strategy, advertising, SEO, social media, websites and ongoing digital management.$t$,
  $t$/images/creativoxa-logo-645-x-160.png$t$
) on conflict (id) do nothing;
