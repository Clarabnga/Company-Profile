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

