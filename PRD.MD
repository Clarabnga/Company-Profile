# PT Security Company Website PRD

## Overview

Build a production-quality frontend for an Indonesian Security & Outsourcing company.

This project is ONLY frontend.

Do NOT build backend.

Do NOT build authentication.

Do NOT build HRIS.

Do NOT build applicant tracking.

Do NOT build automation.

Do NOT integrate any API.

Everything should work using mock data only.

The goal is to present this website to a Project Manager and client.

It should look like a real company website that is almost production-ready.

---

# Project Goal

Create a modern company profile website focused on recruitment.

This website targets:

- Security candidates
- Operational workers
- Outsourcing applicants
- Corporate clients

Approximately

60%
Recruitment

40%
Company Profile

---

# Philosophy

DO NOT over engineer.

The client explicitly wants something:

Simple.

Professional.

Easy.

Fast.

Human.

The target users are not IT people.

Many applicants only use Android phones.

Some applicants rarely use email.

Some have never registered on websites before.

The website must be understandable within 5 seconds.

---

# Technology

Use

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- next-intl
- Lucide Icons

Deployment target:

Vercel

No Laravel.

No Express.

No PHP.

No backend.

No database.

---

# Website Structure

Create:

Main Company Website

/

Branch Website

/bali

Future branches should be easy to add:

/jakarta

/jatim

/jateng

/sumatera

Do NOT hardcode Bali everywhere.

Design reusable architecture.

---

# Multi Language

Default language:

Bahasa Indonesia

Support:

English

Use next-intl.

Routes:

/id

/en

/bali/id

/bali/en

Language switcher should be available inside header.

Translate ALL visible content.

Not only menus.

---

# SEO

Build complete SEO structure.

Include

Metadata API

OpenGraph

Twitter Card

robots.txt

sitemap.xml

canonical URL

hreflang

JSON-LD

Organization Schema

LocalBusiness Schema

JobPosting Schema

Breadcrumb Schema

Mobile SEO

Semantic HTML

Image alt

Accessible headings

Fast loading

SSR

For demo deployment on Vercel use

noindex,nofollow

Make it easy to switch into production later.

---

# Design Direction

Avoid looking like an AI generated website.

Avoid

Purple gradients

Blue gradients

Cyberpunk

Glassmorphism

Huge shadows

Floating shapes

Robot illustrations

Futuristic style

Tech startup style

Dashboard feeling

Instead create

Modern

Clean

Professional

Corporate

Human

Friendly

Trustworthy

Calm

Indonesian company style

---

# Color Palette

Primary

Deep Navy

Secondary

Warm White

Neutral Gray

Accent

Muted Green

Do NOT use pure black.

Do NOT use strong blue gradients.

---

# Typography

Use

Inter

or

Plus Jakarta Sans

Large readable typography.

Comfortable spacing.

No tiny fonts.

---

# Responsive

Mobile first.

Optimize for

360px

390px

768px

1024px

1440px

Mobile experience is more important than desktop.

---

# Navigation

Header

Logo

Beranda

Tentang Kami

Layanan

Lowongan

Kontak

Language Switch

Primary CTA

"Lihat Lowongan"

Sticky header.

Simple mobile menu.

---

# Homepage

Hero

Professional Indonesian security officer photography.

Headline

Karier yang Jelas.
Lingkungan Kerja yang Terpercaya.

CTA

Lihat Lowongan

Secondary CTA

Tentang Kami

Trust text

"Pendaftaran tidak dipungut biaya."

---

# Quick Highlights

Three cards

Proses Mudah

Informasi Jelas

Tim Rekrutmen Responsif

---

# Featured Vacancies

Show cards

Security Officer

Team Leader

Operational Staff

Each card

Location

Employment Type

Short Description

3 Requirements

Detail button

Apply button

---

# Vacancy Detail

Dedicated page

Show

Description

Responsibilities

Requirements

Recruitment Steps

Anti Fraud Notice

Apply Button

Simple.

Readable.

---

# Recruitment Process

4 steps

Pilih Lowongan

Isi Data

Tim Menghubungi

Seleksi

Simple illustration.

---

# Application Form

Very short.

Fields

Nama

WhatsApp

Domisili

Position

Age

Education

Experience

Agreement checkbox

Do NOT request

Password

Email

CV

KTP

NPWP

Religion

Marriage status

Bank account

Medical information

After submit

Show

Success Page

---

# Success Page

Large success icon

Thank you message

Information

Recruitment team will contact via WhatsApp.

Buttons

Back to Vacancies

Back to Homepage

---

# About Company

Simple.

Professional.

Human.

Include

Company Story

Vision

Mission

Core Values

---

# Services

Security Service

Operational Outsourcing

Facility Support

Recruitment

Training

---

# Coverage

Show

Indonesia map

Highlight Bali

Mention

Jakarta

Jatim

Jateng

Sumatera

Bali

---

# FAQ

Simple FAQ

How to apply?

Is there any fee?

When will HR contact me?

Required documents?

---

# Contact

WhatsApp

Email

Instagram

LinkedIn

Office

Business Hours

Map Placeholder

---

# Footer

Logo

Navigation

Social Media

Privacy

Copyright

---

# Floating Button

WhatsApp

Bottom Right

Small.

Not intrusive.

---

# Dummy Admin Preview

Build ONE additional page.

Purpose:

Presentation only.

No authentication.

No backend.

No CRUD.

Just a clean table.

Columns

Applicant Name

Position

WhatsApp

City

Application Date

Status

This page demonstrates how recruitment data may look later.

Mock data only.

---

# Components

Use reusable components.

Examples

Header

Footer

Hero

Section

Card

VacancyCard

FAQ

Map

LanguageSwitcher

JobCard

RecruitmentTimeline

Contact

ApplyForm

SuccessPage

AdminPreview

---

# Motion

Very subtle.

Hover

Fade

Small transitions.

No exaggerated animations.

---

# Accessibility

Semantic HTML

Keyboard support

Focus state

Contrast

ARIA

Labels

Validation

---

# Images

Use realistic Indonesian security related placeholder images.

No military.

No weapons.

No AI generated looking people.

---

# Code Quality

Clean folder structure.

Reusable components.

Good naming.

No duplicated code.

No unnecessary libraries.

Production-ready frontend.

---

# Deliverables

Generate

Complete Next.js project

README.md

Installation Guide

Folder Structure

Mock Data

Reusable Components

Responsive Layout

SEO Ready

Production-quality frontend

Everything should run with

npm install

npm run dev

No backend required.

The result should feel like a premium company profile website created by a professional digital agency, not an AI-generated template.

# Design Exploration

Before generating the final implementation, create TWO complete design concepts.

Both concepts must implement exactly the same pages, routes, components, features, SEO structure, responsiveness, and content architecture.

The difference should only be the visual direction.

---

## OPTION A — Corporate Minimal

Reference inspiration:

ISS Indonesia

ALSOK

Large enterprise corporate websites.

Characteristics:

- Calm
- Clean
- Professional
- Spacious layout
- Conservative
- White background
- Deep navy
- Minimal accent colors
- Corporate photography
- Very trustworthy
- Executive feeling
- Suitable for enterprise clients

---

## OPTION B — Modern Recruitment

Reference inspiration:

G4S Recruitment

Modern hiring portals

Characteristics:

- Slightly more energetic
- Recruitment-focused
- Friendlier
- Larger CTA buttons
- More visual cards
- Better mobile engagement
- Softer corners
- Slightly warmer palette
- Still corporate
- Still premium

---

After generating both concepts,

evaluate them.

Compare:

- readability
- trustworthiness
- mobile usability
- recruitment experience
- accessibility
- corporate appearance

Choose the strongest concept as the final implementation.

Do NOT merge both styles.

Generate only ONE production-ready implementation after evaluation.

At the top of the README explain why the selected concept is superior for this project.