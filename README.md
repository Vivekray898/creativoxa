# Creativoxa — Agency Website

Production website for [Creativoxa](https://www.creativoxa.com), a digital marketing and
growth partner based in Siliguri, India. The site covers the agency's services
(advertising, SEO, social media, websites, local marketing), selected work, insights,
and an enquiry pipeline.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** with a token-based design system in `app/globals.css`
- **Supabase** — blog/insights posts, tools registry, enquiry storage
- **Resend** — enquiry email notifications
- **next-themes** — light/dark mode
- Deployed on **Vercel** (Analytics + Speed Insights included)

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
```

## Environment variables

Set these in `.env.local` (and in your hosting dashboard):

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | yes | Supabase anon/publishable key |
| `RESEND_API_KEY` | yes (for enquiries) | Resend API key for email notifications |

Only publishable (anon) Supabase keys are used client-side. `RESEND_API_KEY` is
server-only and must never be exposed to the browser.

## Content architecture

All marketing copy and project data live in typed files, ready for a future CMS migration:

- `lib/site.ts` — business identity, contact details, social links (single source of truth)
- `lib/data/services.ts` — service categories + full service-page content
- `lib/data/projects.ts` — selected work / case studies
- `lib/data/content.ts` — outcomes, process, differentiators, industries, FAQs

Dynamic content from Supabase: `posts` (insights articles) and `tools` (free tools).
Enquiries are inserted into the `enquiries` table; an email notification is fired via
`/api/send-enquiry`.

## Deployment notes

- Deploys to Vercel on push to `main`.
- The sitemap (`app/sitemap.ts`) and robots (`app/robots.ts`) use the canonical
  domain configured in `lib/site.ts`.
- Legacy URLs (`/All-Services`, `/blog/*`, `/Services/...`, `/contacts`) redirect to the
  current architecture via `next.config.ts` and `middleware.ts`.
