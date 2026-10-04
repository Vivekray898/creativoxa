-- ============================================================================
-- Creativoxa CMS — 004: seed services
-- ============================================================================
-- Run after 003. Idempotent (on conflict do nothing), so it never overwrites
-- anything you have edited in the admin afterwards.
--
-- This is the site's *existing* content, moved out of lib/data/services.ts and
-- into the database. Nothing here is invented, and nothing is published that
-- was not already live on the website.
--
-- Text uses dollar-quoted literals ($t$ … $t$) so apostrophes need no escaping.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
insert into public.service_categories (slug, label, description, sort_order, published) values
  ('digital-advertising', $t$Digital Advertising$t$, $t$Paid campaigns planned around your margins — not just clicks. We set up, manage and steadily improve advertising across Meta and Google.$t$, 1, true),
  ('search-local-growth', $t$Search & Local Growth$t$, $t$Be present when people search for what you sell — in search results, on maps, and on the platforms buyers actually use.$t$, 2, true),
  ('social-media', $t$Social Media$t$, $t$A consistent, professional presence on the channels your customers check before they trust you.$t$, 3, true),
  ('web-digital', $t$Web & Digital$t$, $t$Websites that load fast, explain clearly, and turn visitors into enquiries — plus the upkeep that keeps them that way.$t$, 4, true),
  ('business-digital-management', $t$Business Digital Management$t$, $t$For owners who want one dependable partner handling the digital side of the business, end to end.$t$, 5, true)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Services
-- ---------------------------------------------------------------------------
insert into public.services (
  slug, category_id, name, short_title, category_label, excerpt,
  hero_headline, hero_subline, problem_title, problem_body,
  what_we_do, how_it_works, deliverables, who_its_for,
  icon, featured, published, sort_order, seo_title, seo_description
) values (
  'digital-marketing',
  (select id from public.service_categories c where c.slug = 'business-digital-management'),
  $t$Digital Marketing$t$,
  $t$Digital Marketing$t$,
  $t$Full-funnel digital growth$t$,
  $t$An integrated program across search, social, web and listings — planned around your business goals and managed as one system.$t$,
  $t$Digital marketing that works as one system, not five disconnected vendors.$t$,
  $t$Most businesses don't need more marketing activity — they need the pieces to work together. We plan and manage search, social, web and listings as a single program with one goal: steady, measurable growth.$t$,
  $t$When marketing happens in pieces, results leak away$t$,
  $t$Ads run on one platform, a website sits untouched, the Google profile is out of date, and nobody follows up on enquiries consistently. Each part cost money, but together they never compound. The result: spending that feels like a subscription to hope rather than an investment with a return.$t$,
  $j$[
    {"title":"One plan across every channel","body":"We start from your business goals and build a single plan that decides what happens on search, social, your website and your listings — so each channel supports the others instead of competing for budget."},
    {"title":"Execution you don't have to chase","body":"Campaigns, content, updates and fixes are handled on a schedule you agree to. You get a point of contact who knows your business, not a ticket queue."},
    {"title":"Reporting in business terms","body":"Monthly summaries cover enquiries, cost per enquiry, what was done, and what's planned next — written so a business owner can act on them, not just a marketer."}
  ]$j$::jsonb,
  $j$[
    {"step":"01","title":"Audit & goals","body":"We review your current presence and agree on what growth realistically looks like for your business."},
    {"step":"02","title":"Channel plan","body":"We decide where budget and effort go first, based on where your customers actually are."},
    {"step":"03","title":"Build & launch","body":"Campaigns, pages, profiles and content are set up properly — with tracking in place from day one."},
    {"step":"04","title":"Manage & improve","body":"We run the system month to month, cutting what doesn't work and expanding what does."}
  ]$j$::jsonb,
  $j$["Digital audit and channel plan","Campaign setup and management (Google & Meta)","SEO and Google Business Profile upkeep","Content and creative production","Website improvements and landing pages","Monthly performance summary"]$j$::jsonb,
  $j$["Businesses juggling multiple vendors with no overall strategy","Owners who want marketing handled end-to-end by one partner","Teams that need reporting tied to enquiries, not vanity metrics"]$j$::jsonb,
  $t$layers$t$, true, true, 1,
  $t$Digital Marketing Services — One Partner, One Plan$t$,
  $t$Creativoxa plans and manages SEO, ads, social media, websites and listings as one coordinated program, with reporting tied to real business enquiries.$t$
) on conflict (slug) do nothing;

insert into public.services (
  slug, category_id, name, short_title, category_label, excerpt,
  hero_headline, hero_subline, problem_title, problem_body,
  what_we_do, how_it_works, deliverables, who_its_for,
  icon, featured, published, sort_order, seo_title, seo_description
) values (
  'google-ads',
  (select id from public.service_categories c where c.slug = 'digital-advertising'),
  $t$Google Ads$t$,
  $t$Google Ads$t$,
  $t$Search & performance advertising$t$,
  $t$Search campaigns built around buying intent — structured properly, tracked end to end, and improved every month.$t$,
  $t$Appear exactly when someone searches for what you sell.$t$,
  $t$Google Ads puts you in front of people who are already looking. We build and manage campaigns that target that intent precisely — and we treat your budget like it's our own money.$t$,
  $t$Most Google Ads accounts bleed budget quietly$t$,
  $t$Broad targeting, no negative keywords, ads pointing at a homepage, and conversion tracking that doesn't work. The account looks busy, reports show clicks, and the business wonders where the money went. The platform is rarely the problem — the setup is.$t$,
  $j$[
    {"title":"Account structure that gives control","body":"Campaigns organised by service or product, ad groups with tight themes, and keyword lists that separate what you sell from what you don't. That structure is what makes optimization possible."},
    {"title":"Tracking before spending","body":"We make sure enquiry forms, calls and chats are tracked as conversions before the first rupee of ad spend. If it can't be measured, we say so."},
    {"title":"Landing pages that convert","body":"Ads work best when they land on a page that answers the search. We build or refine landing pages so the click has somewhere good to go."},
    {"title":"Month-on-month improvement","body":"Search terms are reviewed, negatives are added, bids and budgets are adjusted, and what's working gets more of the budget."}
  ]$j$::jsonb,
  $j$[
    {"step":"01","title":"Research","body":"We map how customers search for your services, including what they type and what they never type."},
    {"step":"02","title":"Structure & build","body":"Campaigns, ad groups, keywords, negatives, ads and extensions are set up with clean tracking."},
    {"step":"03","title":"Launch & learn","body":"The first weeks are for learning: we watch search terms and enquiries closely and correct fast."},
    {"step":"04","title":"Optimize","body":"From then on, monthly work tightens targeting, improves quality scores and lowers cost per enquiry."}
  ]$j$::jsonb,
  $j$["Full account build (search, and Performance Max where appropriate)","Conversion tracking setup (forms, calls, chats)","Dedicated landing pages where needed","Negative keyword and search-term management","Monthly performance summary with next actions"]$j$::jsonb,
  $j$["Service businesses that need enquiries, not impressions","Companies whose past agency spend produced clicks but no customers","Businesses with clear margins that can act quickly on incoming leads"]$j$::jsonb,
  $t$target$t$, true, true, 2,
  $t$Google Ads Management Built Around Enquiries$t$,
  $t$Creativoxa builds and manages Google Ads campaigns with clean structure, real conversion tracking and monthly optimization focused on cost per enquiry.$t$
) on conflict (slug) do nothing;

insert into public.services (
  slug, category_id, name, short_title, category_label, excerpt,
  hero_headline, hero_subline, problem_title, problem_body,
  what_we_do, how_it_works, deliverables, who_its_for,
  icon, featured, published, sort_order, seo_title, seo_description
) values (
  'meta-ads',
  (select id from public.service_categories c where c.slug = 'digital-advertising'),
  $t$Meta Ads$t$,
  $t$Meta Ads$t$,
  $t$Facebook & Instagram advertising$t$,
  $t$Facebook and Instagram campaigns that put your offer in front of the right audience — with creative that respects the scroll.$t$,
  $t$Reach the right people where they already spend their attention.$t$,
  $t$Meta Ads let you reach people before they search. Done well, they build demand and fill the pipeline. Done carelessly, they burn budget on audiences that were never going to buy.$t$,
  $t$Boosted posts are not a strategy$t$,
  $t$Boosting whatever the page posted last, targeting everyone within 20 km, and judging results by likes — it feels like marketing and costs like marketing, but it rarely produces customers. Meta's platform rewards accounts that are structured, tested and managed with intent.$t$,
  $j$[
    {"title":"Audience & offer first","body":"We start with who needs your product and what would make them act — then choose campaign objectives and placements that match, instead of defaulting to whatever is easiest."},
    {"title":"Creative built for the platform","body":"Images and copy made for how people actually use Facebook and Instagram — clear offer, quick hook, one obvious next step."},
    {"title":"Structured testing","body":"We test audiences and creative in a controlled way, keep what earns attention and enquiries, and cut what doesn't — with enough patience for the data to be meaningful."},
    {"title":"Follow-through on enquiries","body":"Messages and form leads are only valuable if someone answers them. We help set up response flows so enquiries turn into conversations."}
  ]$j$::jsonb,
  $j$[
    {"step":"01","title":"Audience & offer","body":"We define who the ads should reach and what the message should promise."},
    {"step":"02","title":"Campaign build","body":"Campaigns, ad sets, pixel events and creative are built and checked before launch."},
    {"step":"03","title":"Test","body":"Early spend goes to structured tests that find the combination of audience and creative that works."},
    {"step":"04","title":"Scale what works","body":"Budget shifts toward proven ads; new creative rotates in before fatigue sets in."}
  ]$j$::jsonb,
  $j$["Campaign strategy and build","Ad creative direction and copy","Pixel / events setup and verification","Audience testing and refinement","Monthly results summary with learnings"]$j$::jsonb,
  $j$["Retail, hospitality and consumer brands that live on local attention","Businesses that have only boosted posts and want a real structure","Teams launching offers that need visibility fast"]$j$::jsonb,
  $t$megaphone$t$, true, true, 3,
  $t$Meta Ads Management — Facebook & Instagram Campaigns$t$,
  $t$Creativoxa plans, builds and manages Meta Ads campaigns with structured audiences, platform-native creative and reporting focused on enquiries.$t$
) on conflict (slug) do nothing;

insert into public.services (
  slug, category_id, name, short_title, category_label, excerpt,
  hero_headline, hero_subline, problem_title, problem_body,
  what_we_do, how_it_works, deliverables, who_its_for,
  icon, featured, published, sort_order, seo_title, seo_description
) values (
  'seo',
  (select id from public.service_categories c where c.slug = 'search-local-growth'),
  $t$SEO$t$,
  $t$SEO$t$,
  $t$Search engine optimization$t$,
  $t$Practical SEO that makes your business easier to find — built on technical soundness, useful content and genuine local signals.$t$,
  $t$Be the business people find when they search.$t$,
  $t$Good SEO is unglamorous: a technically sound site, content that answers real questions, and signals that prove you're a real business. Compounded over months, it becomes the cheapest enquiry source you have.$t$,
  $t$SEO gets sold as magic and delivered as nothing$t$,
  $t$You've probably been promised page-one rankings by someone who never explained what they'd actually do. Real SEO is a set of specific, verifiable improvements — and it can be explained in plain language.$t$,
  $j$[
    {"title":"Technical foundation","body":"Site speed, mobile experience, indexing, structure and metadata — the unsexy basics that decide whether search engines can actually rank you."},
    {"title":"Content that serves a purpose","body":"Service pages and articles built around what your customers search for, written to be useful — not keyword-stuffed filler."},
    {"title":"Local signals","body":"Google Business Profile, local listings and consistent business information that help you win the searches that end in phone calls."},
    {"title":"Honest measurement","body":"We track rankings, traffic and — most importantly — enquiries from search, and report them without dressing them up."}
  ]$j$::jsonb,
  $j$[
    {"step":"01","title":"Audit","body":"A full review of technical health, current rankings, content and local presence."},
    {"step":"02","title":"Fix","body":"Technical and structural issues are resolved first — there's no point building on a broken base."},
    {"step":"03","title":"Build","body":"Priority pages and content are created or improved, targeting searches that can actually win you customers."},
    {"step":"04","title":"Compound","body":"SEO rewards consistency. We keep improving monthly and report progress in plain terms."}
  ]$j$::jsonb,
  $j$["Technical SEO audit and fixes","Keyword and search-demand research","Service page and content optimization","Google Business Profile management","Local listing consistency","Monthly reporting: rankings, traffic, enquiries"]$j$::jsonb,
  $j$["Local and service businesses that live on search traffic","Companies burned by SEO packages that delivered reports, not results","Teams that want SEO explained in plain language"]$j$::jsonb,
  $t$search$t$, true, true, 4,
  $t$SEO Services — Practical, Honest Search Optimization$t$,
  $t$Creativoxa provides practical SEO: technical fixes, useful content and local signals, with plain-language monthly reporting on rankings, traffic and enquiries.$t$
) on conflict (slug) do nothing;

insert into public.services (
  slug, category_id, name, short_title, category_label, excerpt,
  hero_headline, hero_subline, problem_title, problem_body,
  what_we_do, how_it_works, deliverables, who_its_for,
  icon, featured, published, sort_order, seo_title, seo_description
) values (
  'social-media',
  (select id from public.service_categories c where c.slug = 'social-media'),
  $t$Social Media$t$,
  $t$Social Media$t$,
  $t$Management & content$t$,
  $t$A consistent, professional presence on the channels your customers check before they decide to trust you.$t$,
  $t$Show up well, consistently, on the channels that matter.$t$,
  $t$When someone hears about your business, they check your profile. What they find there either supports the sale or quietly kills it. We manage your presence so it always supports it.$t$,
  $t$An abandoned profile costs more than it appears to$t$,
  $t$Outdated posts, inconsistent visuals, unanswered comments and months of silence signal neglect. Customers rarely say it out loud — they just move on to the business that looks alive.$t$,
  $j$[
    {"title":"Planning before posting","body":"A monthly content plan tied to your business calendar — offers, seasons, updates — so posts have a reason to exist beyond filling the feed."},
    {"title":"Creation & publishing","body":"Posts designed and written to a consistent standard, published on schedule, with your approval process built in."},
    {"title":"Profile housekeeping","body":"Bios, highlights, covers and business information kept accurate — the details most businesses never get back to."},
    {"title":"Response handling","body":"Comments and enquiries get timely, professional replies within an agreed scope, so nobody's question sits unanswered."}
  ]$j$::jsonb,
  $j$[
    {"step":"01","title":"Setup & audit","body":"We review your profiles and agree on channels, tone and visual direction."},
    {"step":"02","title":"Monthly plan","body":"You receive a plan each month — what will be posted and why — before anything goes live."},
    {"step":"03","title":"Publish & engage","body":"Content goes out on schedule; comments and enquiries are handled promptly."},
    {"step":"04","title":"Review","body":"A short monthly review covers what resonated and what changes for next month."}
  ]$j$::jsonb,
  $j$["Channel strategy and visual direction","Monthly content calendar","Post design and copywriting","Publishing and scheduling","Comment and inquiry handling","Monthly review"]$j$::jsonb,
  $j$["Owner-led businesses that can't keep up with posting","Brands whose current feed undersells the actual business","Teams that want approval control without doing the work themselves"]$j$::jsonb,
  $t$users$t$, true, true, 5,
  $t$Social Media Management for Growing Businesses$t$,
  $t$Creativoxa manages social media end to end: monthly content plans, professional design and copy, scheduled publishing and enquiry handling.$t$
) on conflict (slug) do nothing;

insert into public.services (
  slug, category_id, name, short_title, category_label, excerpt,
  hero_headline, hero_subline, problem_title, problem_body,
  what_we_do, how_it_works, deliverables, who_its_for,
  icon, featured, published, sort_order, seo_title, seo_description
) values (
  'web-development',
  (select id from public.service_categories c where c.slug = 'web-digital'),
  $t$Web Development$t$,
  $t$Web Development$t$,
  $t$Websites & landing pages$t$,
  $t$Fast, clear, trustworthy websites — built to explain your business well and turn visitors into enquiries.$t$,
  $t$A website that actually earns its keep.$t$,
  $t$Your website is where every other channel sends people. It has one job: help a visitor quickly understand that you're credible, and make contacting you effortless. We build for that outcome.$t$,
  $t$Most websites fail quietly$t$,
  $t$They load slowly, bury the important information, look dated next to competitors, and give visitors no confident reason to enquire. The business assumes 'the website doesn't work for us' — when the site was never built with that job in mind.$t$,
  $j$[
    {"title":"Structure before design","body":"We plan pages around the questions your customers actually ask, then design to serve that structure — so the site reads like a good conversation, not a brochure."},
    {"title":"Performance as a feature","body":"Fast loading, mobile-first layouts and clean code. Speed affects both user trust and search visibility, so it's built in from the start, not patched later."},
    {"title":"Conversion-focused details","body":"Clear service explanations, honest proof, obvious contact paths and forms that work beautifully on a phone — the small things that decide whether someone enquires."},
    {"title":"Ongoing support","body":"After launch we keep the site updated, backed up and improving — so it stays an asset rather than decaying back into a liability."}
  ]$j$::jsonb,
  $j$[
    {"step":"01","title":"Discovery","body":"We learn your business, customers and the site's specific job."},
    {"step":"02","title":"Structure & copy","body":"Page structure and key messaging are agreed before visual design starts."},
    {"step":"03","title":"Design & build","body":"Design and development happen with regular previews so you always see progress."},
    {"step":"04","title":"Launch & support","body":"We launch, monitor, and stay available for updates and improvements."}
  ]$j$::jsonb,
  $j$["Information architecture and messaging","Responsive design (desktop, tablet, mobile)","Development with modern, fast technology","On-page SEO fundamentals","Analytics and enquiry tracking","Post-launch support and maintenance options"]$j$::jsonb,
  $j$["Businesses whose current site undersells them","Companies without a website who need one done properly","Teams that need landing pages for campaigns"]$j$::jsonb,
  $t$code$t$, true, true, 6,
  $t$Website Development That Turns Visitors Into Enquiries$t$,
  $t$Creativoxa builds fast, clear, conversion-focused websites for businesses — plus landing pages, ongoing management and technical improvements.$t$
) on conflict (slug) do nothing;

insert into public.services (
  slug, category_id, name, short_title, category_label, excerpt,
  hero_headline, hero_subline, problem_title, problem_body,
  what_we_do, how_it_works, deliverables, who_its_for,
  icon, featured, published, sort_order, seo_title, seo_description
) values (
  'local-marketing',
  (select id from public.service_categories c where c.slug = 'search-local-growth'),
  $t$Local Marketing$t$,
  $t$Local Marketing$t$,
  $t$Local search & listings$t$,
  $t$Google Business Profile, maps, directories and IndiaMART — showing up for the searches that end in a phone call.$t$,
  $t$Win the searches that end in a phone call.$t$,
  $t$For most local businesses, the highest-value searches aren't vague ones — they're 'near me', maps lookups and directory visits from people ready to buy. We make sure you show up well in all of them.$t$,
  $t$Invisible on the searches that matter most$t$,
  $t$An unclaimed or half-filled Google Business Profile, wrong hours, no photos, inconsistent listings and a silent IndiaMART page. Customers searching nearby find competitors instead — and never know you existed.$t$,
  $j$[
    {"title":"Google Business Profile, done properly","body":"Claimed, verified, categorised, described and kept active with posts, photos and review responses — the profile is often your real homepage."},
    {"title":"Listings consistency","body":"Your business name, address and phone must match everywhere. We clean up directories so search engines trust the information."},
    {"title":"IndiaMART & B2B directories","body":"For manufacturers and traders, we set up and maintain marketplace presence where industrial buyers actually look."},
    {"title":"Local pages that rank","body":"Location and service pages on your site that give search engines a reason to show you for nearby searches."}
  ]$j$::jsonb,
  $j$[
    {"step":"01","title":"Audit","body":"We check how your business appears across Google, maps, directories and marketplaces today."},
    {"step":"02","title":"Fix & claim","body":"Profiles are claimed, corrected and completed — the groundwork most businesses skip."},
    {"step":"03","title":"Activate","body":"Photos, posts, products and review processes are set up and kept moving."},
    {"step":"04","title":"Maintain","body":"Monthly upkeep keeps profiles active and information accurate everywhere."}
  ]$j$::jsonb,
  $j$["Google Business Profile setup and management","Local listing cleanup and consistency","Review generation & response process","IndiaMART / directory setup and maintenance","Local service and location pages"]$j$::jsonb,
  $j$["Shops, clinics, restaurants and showrooms serving a local area","Manufacturers and traders who sell through IndiaMART","Service businesses where calls and walk-ins drive revenue"]$j$::jsonb,
  $t$pin$t$, false, true, 7,
  $t$Local Marketing — Google Business Profile, Maps & IndiaMART$t$,
  $t$Creativoxa manages Google Business Profile, local listings and IndiaMART presence so nearby customers find and contact your business first.$t$
) on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Per-service FAQs
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from public.faqs) then
    insert into public.faqs (question, answer, category, service_id, published, sort_order) values
  ($t$How is this different from hiring separate specialists?$t$, $t$Separate vendors optimize their own slice. One partner coordinates the slices — so your ads, website, SEO and social media push in the same direction, and you have one person accountable for the whole picture.$t$, 'services', (select id from public.services where slug = 'digital-marketing'), true, 1),
  ($t$What does it cost?$t$, $t$It depends on scope — the channels involved and the volume of work. After a short discovery call we quote a fixed monthly fee, so you always know what you're paying before anything starts.$t$, 'services', (select id from public.services where slug = 'digital-marketing'), true, 2),
  ($t$How soon will we see results?$t$, $t$Paid campaigns can produce enquiries within weeks once they're live. SEO and content compound over months. We tell you honestly what to expect from each channel before you commit.$t$, 'services', (select id from public.services where slug = 'digital-marketing'), true, 3),
  ($t$Do we need to change our website?$t$, $t$Not necessarily. If your current site can support the campaigns, we use it. If it would actively hurt results, we'll show you exactly why and what we'd change.$t$, 'services', (select id from public.services where slug = 'digital-marketing'), true, 4),

  ($t$How much should I budget for ads?$t$, $t$It depends on your industry and how competitive your services are locally. We'll estimate a sensible starting budget after research — and we'd rather you start smaller with clean tracking than spend big blind.$t$, 'services', (select id from public.services where slug = 'google-ads'), true, 1),
  ($t$Can you guarantee first-page positions?$t$, $t$No — anyone who guarantees that is telling you what you want to hear. Positions depend on auction dynamics we don't control. What we do control is targeting, relevance and cost per enquiry, and that's what we optimize.$t$, 'services', (select id from public.services where slug = 'google-ads'), true, 2),
  ($t$How fast do campaigns produce enquiries?$t$, $t$Usually within the first few weeks once tracking is verified. The first month is calibration; months two and three are where efficiency really improves.$t$, 'services', (select id from public.services where slug = 'google-ads'), true, 3),
  ($t$Who owns the ad account?$t$, $t$You do. We build inside your own Google Ads account, so the history, data and assets stay yours regardless of our engagement.$t$, 'services', (select id from public.services where slug = 'google-ads'), true, 4),

  ($t$What's the difference between boosting and running campaigns?$t$, $t$Boosting is a shortcut with limited control. Proper campaigns give you objective choice, structured audiences, placements, testing and tracking — which is where the real results come from.$t$, 'services', (select id from public.services where slug = 'meta-ads'), true, 1),
  ($t$How much creative do you produce?$t$, $t$We plan and direct creative and produce it with you — usually starting with a small set of variations per campaign, then expanding based on what the data shows.$t$, 'services', (select id from public.services where slug = 'meta-ads'), true, 2),
  ($t$Do Meta ads work for every business?$t$, $t$Honestly, no. They work best when there's a clear offer and a low-friction next step. We'll tell you in the first conversation whether we think they'll work for your business, and why.$t$, 'services', (select id from public.services where slug = 'meta-ads'), true, 3),
  ($t$How do you measure success?$t$, $t$By enquiries and conversations generated, not likes or reach. With the pixel and events set up properly, we can report what each campaign actually produced.$t$, 'services', (select id from public.services where slug = 'meta-ads'), true, 4),

  ($t$How long does SEO take?$t$, $t$Meaningful movement usually takes 3–6 months; strong results take longer. It compounds — which is exactly why businesses that stick with it pull ahead of competitors that keep starting over.$t$, 'services', (select id from public.services where slug = 'seo'), true, 1),
  ($t$Can you guarantee #1 rankings?$t$, $t$No, and nobody honestly can. Search engines don't sell positions and no agency controls them. We can guarantee the quality of the work and show you exactly what was done each month.$t$, 'services', (select id from public.services where slug = 'seo'), true, 2),
  ($t$What's included in the audit?$t$, $t$Technical health, site structure, content quality, backlink profile basics, local presence and your current visibility for the searches that matter to your business.$t$, 'services', (select id from public.services where slug = 'seo'), true, 3),
  ($t$Do you also write the content?$t$, $t$Yes — we plan it, write it and optimize it, working from your knowledge of the business so it's accurate as well as search-friendly.$t$, 'services', (select id from public.services where slug = 'seo'), true, 4),

  ($t$Which platforms do you manage?$t$, $t$Primarily Instagram and Facebook, plus other channels where they make sense for your audience. We'd rather do two channels well than five badly.$t$, 'services', (select id from public.services where slug = 'social-media'), true, 1),
  ($t$Do I get to approve posts?$t$, $t$Yes. You see the monthly plan and approve before publishing. Over time most clients reduce their involvement as trust builds — that's your choice, not a requirement.$t$, 'services', (select id from public.services where slug = 'social-media'), true, 2),
  ($t$Can you also run ads on these channels?$t$, $t$Yes — that's our Meta Ads service, and it works best on top of an organic presence that already looks professional.$t$, 'services', (select id from public.services where slug = 'social-media'), true, 3),
  ($t$What if we already have brand assets?$t$, $t$Even better. We work within your brand guidelines, and improve them where they need improving.$t$, 'services', (select id from public.services where slug = 'social-media'), true, 4),

  ($t$How long does a website take?$t$, $t$A typical business website takes 3–6 weeks from kickoff to launch, depending on content readiness and feedback speed. Larger builds take longer — we agree the timeline before starting.$t$, 'services', (select id from public.services where slug = 'web-development'), true, 1),
  ($t$What technology do you use?$t$, $t$Modern frameworks (like Next.js) chosen for speed, security and maintainability — plus platform solutions like Shopify where e-commerce calls for them. We pick the tool that fits the job, not the trend.$t$, 'services', (select id from public.services where slug = 'web-development'), true, 2),
  ($t$Can you update our existing site instead?$t$, $t$Sometimes. If the foundation is sound, improving what exists is cheaper. If it's fighting you, we'll show you honestly why a rebuild is the better investment.$t$, 'services', (select id from public.services where slug = 'web-development'), true, 3),
  ($t$Who hosts it and who owns it?$t$, $t$You own the domain, content and final product. We handle technical setup and can manage hosting — with everything in accounts you control.$t$, 'services', (select id from public.services where slug = 'web-development'), true, 4),

  ($t$Is Google Business Profile management really that important?$t$, $t$For local businesses it's usually the single highest-impact digital asset. It appears in maps and local results — precisely where ready-to-buy customers look first.$t$, 'services', (select id from public.services where slug = 'local-marketing'), true, 1),
  ($t$Can you remove bad reviews?$t$, $t$No one can legitimately remove genuine reviews. We help you respond professionally and build a flow of genuine positive reviews, which matters far more over time.$t$, 'services', (select id from public.services where slug = 'local-marketing'), true, 2),
  ($t$Do you handle IndiaMART enquiries too?$t$, $t$We set up and maintain the presence and the response structure; the sales conversation stays with your team unless you've asked us to handle lead handling as part of full digital management.$t$, 'services', (select id from public.services where slug = 'local-marketing'), true, 3),
  ($t$How is this different from SEO?$t$, $t$Local marketing focuses on maps, profiles and listings — the fastest route to visibility for location-based searches. SEO is broader and covers your website's organic visibility. Most local businesses need both, in that order.$t$, 'services', (select id from public.services where slug = 'local-marketing'), true, 4);
  end if;
end $$;
