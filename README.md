# PT Garda Karya Nusantara — Modern Recruitment Website

A production-oriented, frontend-only company profile and recruitment experience for an Indonesian security and outsourcing company. Recruitment is the primary journey: visitors can understand the company, filter vacancies, review a role, submit a short validated form, and reach the Bali recruiter through WhatsApp.

## Design direction

Option B — Modern Recruitment was selected because most visitors arrive on Android phones and need an obvious, low-friction route to a vacancy. The visual system uses deep navy, warm off-white, muted green, readable type, realistic local illustration placeholders, large controls, restrained motion, and concise Indonesian business language.

## Technology

- Next.js 15.5.20 App Router and React 19
- TypeScript with strict checking
- Tailwind CSS 4 plus a custom responsive design system
- `next-intl` locale middleware/provider
- Lucide React icons
- Next.js Metadata API, sitemap, robots, and JSON-LD
- Vercel-compatible, with no backend or database

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`; `/` redirects to `/id`.

Verification commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Environment

Copy `.env.example` to `.env.local` when needed:

```env
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_ALLOW_INDEXING=false
```

The site emits `noindex, nofollow` unless `NEXT_PUBLIC_ALLOW_INDEXING` is exactly `true`. Set the deployed Vercel URL as `NEXT_PUBLIC_SITE_URL`, verify all content and contacts, then enable indexing for an approved production deployment. No real domain is hardcoded.

## Routes

| Indonesian | English |
|---|---|
| `/id` | `/en` |
| `/id/tentang-kami` | `/en/about` |
| `/id/layanan` | `/en/services` |
| `/id/kontak` | `/en/contact` |
| `/id/kebijakan-privasi` | `/en/privacy-policy` |
| `/id/admin-preview` | `/en/admin-preview` |
| `/id/bali` | `/en/bali` |
| `/id/bali/lowongan` | `/en/bali/careers` |
| `/id/bali/lowongan/[slug]` | `/en/bali/careers/[slug]` |
| `/id/bali/lamar/[slug]` | `/en/bali/apply/[slug]` |
| `/id/bali/lamar/[slug]/berhasil` | `/en/bali/apply/[slug]/success` |

Unknown locales, paths, and vacancy slugs receive a useful not-found state. The language switch maps equivalent route names and preserves vacancy slugs.

## Project structure

```text
src/
├── app/                 # Root redirect, localized catch-all, metadata, sitemap, robots
├── components/Site.tsx  # Shared page sections and interactive recruitment UI
├── data/site.ts         # Typed company, branch, vacancy, FAQ, service and preview data
├── i18n/                # next-intl request and routing configuration
└── middleware.ts        # Locale routing
messages/                # ID and EN next-intl message catalogs
public/images/           # Stable local illustration placeholders
```

## Editing content

Company contact values live once in `src/data/site.ts` under `company.contacts`. Update the company description, story, vision, mission, and contacts there.

To add a vacancy, append a fully typed `Vacancy` object to `vacancies`, use a readable unique slug, add that slug to the relevant branch's `vacancySlugs`, and verify both locale values. Detail, apply, success, metadata, sitemap, filters, and related-job UI derive from this data.

To add a future branch such as Jakarta, add a typed object to `branches`. The branch model already includes identity, active state, localized hero/SEO content, contacts, services, coverage, vacancy associations, and gallery. Bali route composition can then be parameterized for the new branch or moved to a future subdomain without changing vacancy records.

Replace files in `public/images` with approved workplace photography and retain the same paths, or update branch/image references in the data. Preserve meaningful localized `alt` text and appropriate dimensions.

## Localization

`next-intl` validates `id` and `en`, defaults root traffic to Indonesian, and supplies locale context. Structured content uses strongly typed `{id, en}` values so both page versions share components and data rather than duplicate trees. Route-name equivalence is handled by the language switcher.

## Vercel deployment

1. Import this repository as a Vercel project.
2. Keep the project root at the repository root.
3. Add both public environment variables.
4. Deploy and verify ID/EN routes, form navigation, WhatsApp messages, sitemap, and robots output.
5. Keep indexing disabled for review deployments; enable it only for the approved public deployment.

## Frontend-only limitations and next steps

Applications are validated and simulated in browser memory, then redirected; they are not stored, uploaded, emailed, or sent to an API. The admin preview is fictional presentation data with frontend filters only. WhatsApp links open a chat but use no WhatsApp API. A production phase should add a secured recruitment API, encrypted database, retention controls, consent logging, rate limiting, upload scanning if files are later required, recruiter workflow integration, monitoring, and a company-approved legal privacy policy.
