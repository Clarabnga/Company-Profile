# Garda Karya Nusantara — PRD & Frontend Revision Guide

**Version:** 2.0  
**Status:** Final Revision Guide  
**Purpose:** Single source of truth untuk revisi UI/UX frontend berdasarkan feedback Kak Adam  
**Implementation Phase:** Frontend mockup / prototype  
**Backend:** Tidak termasuk  
**Form Integration:** Dummy submission only  
**Primary Reference:** Wireframe Garda Karya Nusantara yang sudah dibuat sebelumnya  

---

# 1. Project Objective

Website Garda Karya Nusantara harus direvisi agar terlihat sebagai website perusahaan outsourcing profesional dengan fokus utama B2B.

Website tidak boleh terlihat seperti:
- job portal utama,
- template generik,
- hasil AI tanpa refinement,
- framework kosong,
- mobile layout yang hanya diperbesar ke desktop.

Website harus terlihat:
- profesional,
- premium,
- corporate,
- terpercaya,
- matang secara visual,
- jelas urutan informasinya,
- nyaman dilihat pada desktop dan mobile.

---

# 2. Product Positioning

## Main Domain

Main domain berfungsi untuk:
- memperkenalkan Garda Karya Nusantara,
- menampilkan layanan perusahaan,
- membangun kepercayaan,
- menjelaskan cakupan operasional,
- menghasilkan inquiry B2B,
- mengarahkan calon klien ke konsultasi.

## Career

Career berfungsi sebagai area terpisah untuk:
- melihat lowongan,
- membuka detail pekerjaan,
- memilih cabang,
- melakukan dummy application,
- memahami proses rekrutmen.

## Branch Pages

Halaman cabang dapat memiliki proporsi konten berbeda.

Contoh:
- halaman cabang corporate-heavy lebih fokus layanan dan kontak,
- halaman cabang recruitment-heavy seperti Bali dapat lebih fokus lowongan aktif.

---

# 3. Core Feedback Kak Adam

## 3.1 Main Domain Harus B2B First

Main domain tidak boleh menampilkan career sebagai fokus pertama.

Urutan konten utama harus:

```text
Company Value
↓
Services
↓
Trust
↓
Industries
↓
Operational Process
↓
Coverage / Branches
↓
Career Preview
↓
Contact
```

Career hanya menjadi secondary path.

## 3.2 Desktop Harus Dioptimalkan Secara Khusus

Desktop tidak boleh menjadi mobile layout yang diperbesar.

Desktop harus:
- menggunakan ruang horizontal,
- memakai komposisi dua kolom,
- memiliki visual balance,
- memiliki section dengan variasi layout,
- menghindari terlalu banyak konten sempit di tengah,
- memiliki ukuran hero yang proporsional,
- menggunakan container dan grid yang konsisten.

Wireframe sebelumnya tetap digunakan sebagai struktur dasar, tetapi layout desktop harus diperbaiki agar terlihat dirancang khusus untuk desktop.

## 3.3 Information Hierarchy Harus Jelas

Setiap halaman harus memiliki urutan informasi yang mudah dipahami.

User harus langsung tahu:
1. halaman ini tentang apa,
2. siapa targetnya,
3. manfaatnya apa,
4. apa yang harus dilakukan berikutnya.

Setiap section harus memiliki:
- eyebrow atau label bila diperlukan,
- heading,
- supporting text,
- content utama,
- CTA jika relevan.

Jangan menyajikan informasi yang terlihat terpotong, menggantung, atau membuat user bertanya-tanya.

## 3.4 Eye Flow Harus Natural

Flow ideal homepage:

```text
Logo / Navigation
↓
Headline
↓
Supporting Copy
↓
Primary CTA
↓
Hero Visual
↓
Trust Indicators
↓
Services
↓
Why Choose Us
↓
Industries
↓
Operational Process
↓
Branches
↓
Career Preview
↓
Final CTA
↓
Footer
```

Gunakan:
- perbedaan ukuran heading,
- alignment,
- contrast,
- whitespace,
- warna section,
- directional visual,
- card grouping,

untuk membantu user mengikuti flow.

## 3.5 Jangan Ada Area Kosong yang Terlihat Belum Selesai

Whitespace tetap penting, tetapi jangan sampai terlihat seperti konten hilang.

Jika suatu section terlalu kosong, gunakan salah satu:
- supporting illustration,
- photograph,
- statistic,
- quote,
- small CTA,
- visual divider,
- background treatment,
- relevant card.

Jangan mengisi ruang kosong dengan elemen acak. Setiap elemen tetap harus punya fungsi.

## 3.6 Alignment Harus Presisi

Semua layout wajib menggunakan grid.

Periksa:
- left edge heading,
- left edge paragraph,
- card alignment,
- button alignment,
- baseline text,
- column widths,
- gap antar elemen,
- footer column alignment,
- section container alignment.

Jangan mengandalkan perkiraan mata saja.

## 3.7 Section Harus Memiliki Visual Rhythm

Hindari semua section menggunakan background putih yang sama.

Gunakan ritme seperti:

```text
White
↓
Navy / Dark
↓
White
↓
Soft Gray
↓
White
↓
Muted Green / Brand Accent
↓
Dark Footer
```

Rules:
- jangan terlalu banyak warna,
- jangan memakai warna ungu,
- jangan menggunakan default Tailwind palette secara mentah,
- warna harus terasa brand-specific,
- warna section membantu membedakan kelompok informasi.

## 3.8 Hindari AI-Generated Look

Hindari:
- warna ungu generik,
- gradient berlebihan,
- semua card terlihat sama,
- terlalu banyak rounded rectangle,
- placeholder tanpa isi,
- icon generik tanpa fungsi,
- spacing acak,
- layout terlalu simetris dan monoton,
- copy generik.

Gunakan desain yang lebih intentional:
- variasi layout,
- hierarchy,
- believable dummy content,
- relevant imagery,
- consistent alignment,
- controlled color usage,
- meaningful micro-interaction.

## 3.9 Navigation dan Footer Harus Jelas

Navigation harus memiliki:
- Home,
- About,
- Services,
- Industries,
- Career,
- Branches,
- Contact,
- language toggle,
- CTA konsultasi.

State wajib:
- default,
- hover,
- active,
- focus.

Footer wajib memiliki:
- company summary,
- main navigation,
- services,
- branches,
- career,
- contact,
- legal links.

## 3.10 Language Toggle Tidak Boleh Menggeser Layout

Saat user mengganti bahasa:
- layout tidak boleh shift,
- navbar tidak boleh berantakan,
- CTA tidak boleh berpindah drastis,
- width harus dipersiapkan untuk bahasa dengan teks lebih panjang,
- text wrapping harus diperiksa.

## 3.11 Animation Harus Halus

Gunakan untuk:
- accordion,
- dropdown,
- filter result,
- language switch,
- card hover,
- button hover,
- modal,
- mobile navigation.

Rules:
- durasi 150–300ms,
- gunakan ease-out,
- jangan berlebihan,
- hormati reduced-motion preference.

---

# 4. Homepage Revision Specification

## Navbar

Requirements:
- sticky,
- logo kiri,
- menu tengah atau kanan,
- CTA konsultasi paling menonjol,
- language toggle stabil,
- active state jelas,
- hover state terlihat,
- mobile menggunakan drawer.

## Hero

**Headline example:**

> Solusi Outsourcing Profesional untuk Operasional Bisnis yang Lebih Efisien

**Supporting text example:**

> Garda Karya Nusantara membantu perusahaan mendapatkan tenaga kerja terlatih, terstruktur, dan sesuai kebutuhan operasional.

**Primary CTA:** Konsultasi Kebutuhan SDM  
**Secondary CTA:** Lihat Layanan

Desktop layout:

```text
Left 40–45%
- Eyebrow
- Headline
- Description
- CTA Group
- Trust Detail

Right 55–60%
- Large Corporate Image
- Supporting Statistic Card
- Supporting Service Card
```

Mobile layout:

```text
Headline
Description
CTA
Image
Trust Detail
```

Requirements:
- hero tidak boleh seperti job landing page,
- visual harus corporate,
- jangan memakai placeholder kosong,
- gunakan believable dummy image/content,
- no purple,
- CTA utama terlihat tanpa scroll.

## Trust Section

Tampilkan maksimal 3–4 indikator.

Contoh dummy:
- 10+ Tahun Pengalaman,
- 500+ Personel Terkelola,
- 8 Area Operasional,
- 20+ Mitra Perusahaan.

Tandai angka dummy agar diganti sebelum production.

## Services Section

Services:
- Security,
- Cleaning Service,
- Driver,
- Warehouse Staff,
- Office Support,
- Hospitality.

Layout:
- 1 featured service + supporting cards,
- asymmetric grid,
- atau image-led cards.

Jangan selalu 3 card identik.

## Why Choose Us

Gunakan kombinasi:
- image,
- numbered reasons,
- supporting statement.

## Industries

Contoh:
- Retail,
- Hospitality,
- Warehouse,
- Property,
- Manufacturing,
- Corporate Office.

## Operational Process

```text
Consultation
↓
Requirement Mapping
↓
Candidate Selection
↓
Deployment
↓
Monitoring
```

Connector harus penuh, jelas, dan tidak terlihat seperti error.

## Branches

Gunakan:
- map visual,
- branch cards,
- region chips,
- coverage statistics,
- CTA branch.

Jangan menyisakan area kosong besar.

## Career Preview

Rules:
- maksimal 3 job cards,
- diletakkan setelah konten B2B,
- CTA: Lihat Semua Lowongan,
- tidak menggunakan filter lengkap,
- tidak boleh mendominasi visual.

## Final CTA

Contoh:

> Diskusikan Kebutuhan Tenaga Kerja Perusahaan Anda

CTA:
- Konsultasi Sekarang
- Optional WhatsApp

## Footer

Gunakan dark navy.

Pastikan:
- alignment rapi,
- Home tersedia,
- hover terlihat,
- active/focus state tersedia,
- contact mudah ditemukan.

---

# 5. Career Page Specification

Required sections:
- career hero,
- search,
- filter,
- featured jobs,
- latest jobs,
- recruitment process,
- candidate FAQ,
- branch links.

Rules:
- tetap satu brand,
- boleh lebih candidate-friendly,
- tidak boleh terasa seperti website berbeda,
- filter harus smooth,
- empty state harus jelas.

---

# 6. Job Detail Specification

Required:
- job title,
- branch,
- location,
- employment type,
- responsibilities,
- qualifications,
- benefits,
- apply CTA,
- related jobs.

Desktop:
- content left,
- apply card right.

Mobile:
- sticky apply button,
- single column.

Apply form menggunakan dummy submission.

---

# 7. Branch Page Specification

## Corporate Branch

Prioritas:
- services,
- coverage,
- branch information,
- consultation.

## Recruitment Branch

Prioritas:
- active jobs,
- local job categories,
- apply CTA,
- recruitment process.

## Bali

Boleh menggunakan treatment khusus, tetapi:
- tidak memakai warna yang keluar dari brand,
- tetap konsisten dengan main website,
- section dapat diselingi warna berbeda,
- informasi lokal harus terlihat lengkap.

---

# 8. Dummy Form Rules

Pada fase mockup:
- tidak ada backend,
- tidak ada Google Form,
- tidak ada Google Sheets,
- tidak ada n8n,
- tidak ada API,
- tidak ada database.

Form hanya:

```text
Input Validation
↓
Loading State
↓
Success State
```

Data tidak disimpan.

---

# 9. Responsive Rules

## Desktop
- bukan mobile yang diperbesar,
- gunakan 12-column grid,
- manfaatkan horizontal space,
- visual dan text harus seimbang.

## Tablet
- 8-column grid,
- card dapat 2 kolom.

## Mobile
- single-column,
- minimum tap target 44–48px,
- sticky CTA tidak menutupi konten,
- text tidak terlalu kecil,
- navigation drawer mudah ditutup.

---

# 10. Design Tokens Direction

## Colors
- Navy: `#102A43`
- Indigo: `#1E3A5F`
- Green Accent: `#3F7D63`
- Orange Accent: `#D9973A`
- Soft Background: `#F7F5EF`
- Gray Background: `#F3F4F6`
- Dark Text: `#111827`
- Border: `#E5E7EB`

Do not use purple.

## Typography
- Heading: Plus Jakarta Sans
- Body: Inter
- Body minimum: 16px

## Radius
- Buttons: 10–14px
- Cards: 16–20px
- Avoid excessive pill shapes

## Shadow
- subtle only,
- use border and contrast first.

---

# 11. Interaction States

Setiap interactive component wajib memiliki:
- default,
- hover,
- active,
- focus,
- disabled,
- loading jika relevan.

Components:
- navbar link,
- footer link,
- button,
- card,
- accordion,
- dropdown,
- filter,
- language toggle,
- form input,
- upload field.

---

# 12. Revision Checklist

## Positioning
- [ ] Homepage jelas fokus B2B.
- [ ] Career hanya secondary path.
- [ ] Branch dapat menyesuaikan local purpose.

## Desktop
- [ ] Desktop bukan hasil scale mobile.
- [ ] Horizontal space dimanfaatkan.
- [ ] Hero terlihat matang.
- [ ] Section memiliki variasi layout.

## Layout
- [ ] Semua edge align.
- [ ] Grid konsisten.
- [ ] Tidak ada area kosong mencurigakan.
- [ ] Section memiliki visual rhythm.
- [ ] Tidak ada horizontal overflow.

## Visual
- [ ] Tidak memakai purple.
- [ ] Tidak terlihat seperti default Tailwind.
- [ ] Dummy content believable.
- [ ] Image relevan.
- [ ] Card tidak monoton.

## Navigation
- [ ] Home tersedia.
- [ ] Hover jelas.
- [ ] Active state jelas.
- [ ] Language toggle tidak menggeser layout.
- [ ] Footer lengkap.

## Interaction
- [ ] Animation smooth.
- [ ] Accordion smooth.
- [ ] Filter result smooth.
- [ ] Focus state terlihat.
- [ ] Loading state tersedia.

## Form
- [ ] Dummy submit bekerja.
- [ ] Validasi frontend bekerja.
- [ ] Success state tampil.
- [ ] Tidak ada external integration.

## Mobile
- [ ] Mobile diperiksa terpisah.
- [ ] CTA tidak menutup content.
- [ ] Navigation mudah digunakan.
- [ ] Typography readable.
- [ ] Card spacing rapi.

---

# 13. Definition of Done

Revisi dianggap selesai ketika:
1. Website terasa corporate-first.
2. User memahami positioning dalam 5–10 detik.
3. Career tidak mendominasi homepage.
4. Desktop terlihat didesain khusus.
5. Mobile tetap usable.
6. Tidak ada section yang terlihat unfinished.
7. Alignment konsisten.
8. Section flow terasa natural.
9. Navigation state jelas.
10. Language toggle stabil.
11. Motion halus.
12. Dummy form berjalan.
13. Seluruh checklist revisi terpenuhi.
14. Wireframe sebelumnya tetap menjadi struktur dasar.
15. Implementasi tidak keluar dari scope mockup frontend.

---

# 14. Implementation Note

Gunakan wireframe Garda Karya Nusantara yang sudah dibuat sebelumnya sebagai dasar struktur halaman.

Jangan mengganti seluruh arsitektur tanpa alasan.

Yang harus dilakukan:
- refine,
- improve hierarchy,
- improve layout,
- improve spacing,
- improve visual balance,
- improve desktop responsiveness,
- improve interaction states,
- implement feedback Kak Adam.

PRD ini adalah single source of truth selama proses revisi.
