# Creativoxa CMS — database setup

The admin dashboard at `/admin` reads and writes a Supabase Postgres database.
Nothing in the application uses a service-role key: public reads run as `anon`
(published rows only) and every admin action runs as the signed-in user, with
Row Level Security deciding what they may do.

## 1. Apply the migrations

Open your Supabase project → **SQL Editor** → **New query**, paste one file at a
time and run it, in order:

| Order | File | What it does |
| --- | --- | --- |
| 1 | `migrations/001_cms_schema.sql` | Creates the tables, constraints and indexes. Also extends the existing `enquiries` table and migrates any rows from the old `posts` table into `insights`. |
| 2 | `migrations/002_rls_policies.sql` | Enables Row Level Security, adds the policies, and creates the `submit_enquiry` function that the public form uses. |
| 3 | `migrations/003_storage.sql` | Creates the `website-media` bucket (public read, staff write, 5 MB, images only). |
| 4 | `migrations/004_seed_services.sql` | Loads the existing service categories, the seven service pages and their FAQs. |
| 5 | `migrations/005_seed_site.sql` | Loads industries, case studies, homepage copy, section order, navigation and site settings. |
| 6 | `migrations/006_tools.sql` | Creates the tools registry powering `/tools` (optional — the page falls back to an empty state without it). |

Every file is idempotent — re-running is safe and never overwrites content you
have since edited in the admin (`on conflict do nothing`, plus emptiness guards
for the list tables).

## 2. Create the first admin user

1. **Authentication → Users → Add user** → enter the email and a strong password
   (disable "send invite" if you want to set the password directly).
2. The signup trigger creates a `profiles` row automatically with the role
   `editor`. Promote it to `admin`:

```sql
update public.profiles set role = 'admin' where email = 'you@example.com';
```

3. Sign in at `/admin/login`.

Roles:

- **admin** — everything, including deleting content and changing site settings.
- **editor** — create and edit content (services, industries, case studies,
  FAQs, testimonials, insights, homepage copy). Cannot delete or change contact
  details.

## 3. Verify security (recommended once)

Run these checks after your first sign-in. They should all behave as described.

| Check | Expected |
| --- | --- |
| Open `/admin/services` in a private window | Redirected to `/admin/login` |
| `curl "$SUPABASE_URL/rest/v1/enquiries?select=*" -H "apikey: $ANON_KEY"` | Empty array — anon has no read policy on enquiries |
| `curl -X POST "$SUPABASE_URL/rest/v1/services" -H "apikey: $ANON_KEY" -H "Content-Type: application/json" -d '{"slug":"hack","name":"x","short_title":"x"}'` | `42501 / 401` — anon cannot insert |
| `curl -X POST "$SUPABASE_URL/rest/v1/rpc/submit_enquiry" -H "apikey: $ANON_KEY" -H "Content-Type: application/json" -d '{"p_name":"Test","p_email":"test@example.com","p_message":"hello"}'` | Returns a uuid (this is the one intentional public write path) |
| `curl "$SUPABASE_URL/rest/v1/services?select=slug&published=eq.false" -H "apikey: $ANON_KEY"` | Empty array — drafts are invisible to the public |

## 4. What lives in the database vs. code

**In the database (editable at `/admin`):** services, service categories,
industries, case studies, testimonials, FAQs, insights, homepage copy, homepage
section order/visibility, navigation, company + contact details, social links,
footer copy, SEO defaults, media files, enquiries.

**Stays in code:** layout, components, the design system, animation, spacing,
responsive behaviour, validation and application logic. The database controls
*content*, never layout.

## 5. Notes

- Public pages are cached for 5 minutes (`revalidate = 300`). Admin changes call
  `revalidatePath`, so edited content appears within seconds.
- `insights.content` is Markdown. It is rendered and sanitised on the server
  before it reaches the browser.
- If Supabase is unreachable — or the migrations have not been applied yet — the
  public site automatically falls back to the content in `lib/data/*` instead of
  showing an empty page.
