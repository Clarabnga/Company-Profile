# Implementation Tasks from PRD

## 1. Project Goal & Philosophy
- [x] Goal: Modern company profile website focused on recruitment (60% recruitment / 40% company profile).
- [x] No backend, no auth, no HRIS, no API integration (mock data only).
- [x] Philosophy: Simple, Professional, Easy, Fast, Human. Understandable in 5 seconds.
- [x] Deliverable: Next.js 15, React 19, TS, Tailwind CSS v4, shadcn/ui, next-intl, Lucide Icons.

## 2. Website Structure & Multi-Language
- [x] Main Company Website (`/`)
- [x] Branch Website (`/[branch]` e.g. `/bali`)
- [x] Reusable architecture for future branches.
- [x] Multi-Language (ID as default, EN supported).
- [x] Routes: `/id`, `/en`, `/id/bali`, `/en/bali`.
- [x] Language switcher in header.
- [x] Translate ALL visible content.

## 3. SEO Structure
- [x] Complete SEO structure (Metadata API, OpenGraph, Twitter Card).
- [x] robots.txt & sitemap.xml
- [x] canonical URL & hreflang
- [x] JSON-LD (Organization Schema, LocalBusiness Schema, JobPosting Schema, Breadcrumb Schema).
- [x] Mobile SEO (Semantic HTML, Image alt, Accessible headings, fast loading).
- [x] Demo deployment constraint: `noindex, nofollow` (Configured via env for easy switch).

## 4. Design Direction & Typography
- [x] Vibe: Clean, Professional, Corporate, Human, Friendly (Option B selected: Modern Recruitment).
- [x] Color Palette: Deep Navy (Primary), Warm White & Neutral Gray (Secondary), Muted Green (Accent).
- [x] Typography: Inter or Plus Jakarta Sans. Large readable typography. Comfortable spacing.
- [x] Responsive: Mobile first (360px, 390px, 768px, 1024px, 1440px).

## 5. Layout & Navigation
- [x] Header: Logo, Beranda, Tentang Kami, Layanan, Lowongan, Kontak, Language Switch, CTA "Lihat Lowongan". Sticky header. Simple mobile menu.
- [x] Footer: Logo, Navigation, Social Media, Privacy, Copyright.
- [x] Floating Button: WhatsApp at Bottom Right.

## 6. Homepage Features
- [x] Hero: Headline, Trust text ("Pendaftaran tidak dipungut biaya"), CTA (Lihat Lowongan), Secondary CTA (Tentang Kami).
- [x] Quick Highlights: 3 Cards (Proses Mudah, Informasi Jelas, Tim Rekrutmen Responsif).
- [x] Featured Vacancies: 3 Cards (e.g. Security Officer, Team Leader, Operational Staff). Include Location, Employment Type, Short Desc, 3 Requirements, Detail button, Apply button.
- [x] Services: Security Service, Operational Outsourcing, Facility Support, Recruitment, Training.
- [x] Coverage Map: Map, Highlight Bali, mention Jakarta, Jatim, Jateng, Sumatera.

## 7. Vacancy Detail Page
- [x] Dedicated page (`/[locale]/[branch]/lowongan/[slug]`).
- [x] Sections: Description, Responsibilities, Requirements, Recruitment Steps, Anti Fraud Notice, Apply Button.

## 8. Application Form & Success Page
- [x] Form Fields: Nama, WhatsApp, Domisili, Position (preserved), Age, Education, Experience, Agreement checkbox.
- [x] Validation: Required fields, messages in ID/EN. Prevent empty submissions.
- [x] No DB/API. Simulate short submission state.
- [x] Success Page: Large icon, thank you message, WhatsApp info, Back to Vacancies, Back to Homepage buttons.

## 9. Contact & FAQ & About
- [x] FAQ Section (How to apply, Fee, HR contact time, Required documents).
- [x] About / Contact details if integrated in Homepage/Layout.

## 10. Dummy Admin Preview
- [x] Specific Page (`/[locale]/admin-preview`). No auth, no backend.
- [x] Clean Table: Applicant Name, Position, WhatsApp, City, Application Date, Status.
- [x] Mock data only.

## 11. Code Quality & Deliverables
- [x] Reusable components. Clean folder structure.
- [x] Subtle Motion (hover, fade, small transitions).
- [x] Accessibility: Semantic HTML, Keyboard support, Focus state, Contrast, ARIA, Labels, Validation.
- [x] README.md with Installation Guide, Folder Structure, Mock Data, and explanation of why Option B was selected.


## Presentation Readiness Revision

### Critical routing and SEO
- [x] Give every valid ID/EN application and success route localized, vacancy-aware metadata
- [x] Return a real localized 404 response for unknown paths and vacancy slugs
- [x] Set the document language correctly for Indonesian and English
- [x] Add canonical and equivalent-language alternates to every public route
- [x] Mark application, success, admin preview, and error routes as noindex
- [x] Remove admin preview and non-public application routes from sitemap
- [x] Verify Organization, Bali LocalBusiness, JobPosting, and Breadcrumb structured data

### Presentation content
- [x] Replace `.example`, old telephone numbers, old addresses, and weak social/contact values centrally
- [x] Remove map-placeholder, demo, mock, frontend-only, and technical submission language from public UI
- [x] Add grounded company screening, briefing, supervision, evaluation, and branch-coordination content
- [x] Add Bali-specific hospitality, villas, retail, offices, events, residential, and facility positioning
- [x] Polish Indonesian and English terminology consistently
- [x] Improve candidate guidance and success-page next steps

### Information hierarchy and visual polish
- [x] Move featured vacancies and recruitment process immediately after homepage trust highlights
- [x] Reduce homepage repetition and keep detailed story/services on their dedicated pages
- [x] Make vacancy cards faster to scan and visually prioritize Apply
- [x] Reorder vacancy details and add a non-obstructive mobile apply action
- [x] Replace map placeholder with a presentable location panel and directions link
- [x] Vary section composition while retaining the Modern Recruitment identity

### Contact, mobile, and accessibility
- [x] Encode localized WhatsApp messages and centralize formatted phone values
- [x] Validate all social, email, office, and external links with safe attributes
- [x] Review 360, 390, 768, 1024, and 1440 layouts for overflow and overlap
- [x] Review menu focus, accordions, headings, labels, errors, contrast, alt text, and reduced motion

### Verification and delivery
- [x] Run ESLint, strict TypeScript, and production build
- [x] Audit all valid vacancy slugs in ID and EN, including refresh-safe application/success routes
- [x] Confirm prohibited public placeholder/developer terms are absent
- [x] Update README, commit, push, and verify the Vercel redeployment

