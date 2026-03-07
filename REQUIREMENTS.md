# Requirements Document — Portfolio Website

> **Project:** Kelvin You — Personal Portfolio Website
> **Version:** 2.0
> **Last Updated:** 2026-03-07
> **Domain:** https://kelvinyou.vercel.app
> **Status:** Production (Maintaining)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Stakeholders](#2-stakeholders)
3. [Technical Stack](#3-technical-stack)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Page Requirements](#6-page-requirements)
7. [Component Architecture](#7-component-architecture)
8. [Data Requirements](#8-data-requirements)
9. [API Requirements](#9-api-requirements)
10. [SEO Requirements](#10-seo-requirements)
11. [Internationalization Requirements](#11-internationalization-requirements)
12. [Design System Requirements](#12-design-system-requirements)
13. [Animation Requirements](#13-animation-requirements)
14. [Performance Requirements](#14-performance-requirements)
15. [Accessibility Requirements](#15-accessibility-requirements)
16. [Security Requirements](#16-security-requirements)
17. [Deployment Requirements](#17-deployment-requirements)
18. [Content Requirements](#18-content-requirements)
19. [Future Considerations](#19-future-considerations)

---

## 1. Project Overview

### 1.1 Purpose

A personal portfolio website for Kelvin You, a Frontend Engineer, to showcase professional experience, projects, skills, education, blog posts, and products/services. The site serves as a digital resume and professional brand.

### 1.2 Goals

- **Professional Presence:** Establish a polished online identity targeting senior engineering roles
- **Content Platform:** Publish technical blog posts in MDX format
- **Project Showcase:** Display personal and professional projects with details
- **Lead Generation:** Offer products/services (templates, SaaS) with pricing
- **Multi-language Reach:** Support English, Chinese (中文), and Malay (Bahasa Melayu)

### 1.3 Target Audience

- Hiring managers and technical recruiters
- Fellow engineers and tech community members
- Potential clients for products/services
- General visitors exploring the portfolio

---

## 2. Stakeholders

| Role | Name | Responsibility |
|------|------|----------------|
| Owner / Developer | Kelvin You | Full-stack development, content creation, deployment |

---

## 3. Technical Stack

### 3.1 Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | App Router, SSR/SSG/ISR, API routes |
| React | 19 | UI component library |
| TypeScript | 5 | Type safety, strict mode enabled |
| Tailwind CSS | 4 | Utility-first CSS framework |

### 3.2 Key Dependencies

| Category | Packages |
|----------|----------|
| UI Primitives | Radix UI (via Shadcn/ui, style: `new-york`), lucide-react |
| Animation | framer-motion v12, react-type-animation |
| Blog/MDX | next-mdx-remote v6, gray-matter, remark-gfm, rehype-slug, rehype-external-links |
| i18n | next-intl v4 |
| Theme | next-themes |
| PDF Rendering | @react-pdf/renderer |
| Date Formatting | dayjs |
| Notifications | sonner |
| Analytics | @vercel/analytics, @vercel/speed-insights |
| Fonts | Archivo (body), Space Grotesk (headings) — via next/font/google |
| Admin Editor | @mdxeditor/editor, @monaco-editor/react, @tiptap/* |

### 3.3 Dev Tooling

| Tool | Purpose |
|------|---------|
| Turbopack | Dev server bundler (`next dev --turbo`) |
| ESLint 9 | Linting (flat config) |
| Prettier | Code formatting |
| @next/bundle-analyzer | Bundle size analysis |
| PostCSS | Tailwind CSS processing |

### 3.4 Infrastructure

| Service | Purpose |
|---------|---------|
| Vercel | Hosting, deployment, edge functions |
| Vercel Analytics | Page view and event tracking |
| Vercel Speed Insights | Core Web Vitals monitoring |

---

## 4. Functional Requirements

### FR-01: Homepage

The homepage SHALL render the following sections in order:

| # | Section | Component | Description |
|---|---------|-----------|-------------|
| 1 | Hero | `HeroSection` | Full-screen intro with name, title, animated typing, 3D card, social links, stats |
| 2 | About | `AboutSection` | Profile image with spotlight effect, stats counters, tech badges, company logos, CTAs |
| 3 | Experience | `ExperiencesSection` | Work history cards with mouse spotlight, responsibilities, projects, skills |
| 4 | Education | `EducationsSection` | Timeline layout with degree cards, achievements, certificate links |
| 5 | Projects | `ProjectsSection` | Grid of top 3 projects with "See All" link |
| 6 | Contact | `ContactSection` | Contact heading with social links (full-card variant) |

### FR-02: Blog System

- **FR-02.1:** The system SHALL render MDX blog posts from `src/content/blog/`
- **FR-02.2:** The blog listing page SHALL support search, tag filtering, sort options, and grid/list view modes
- **FR-02.3:** Individual posts SHALL display reading time, table of contents (TOC), and a copy-link button
- **FR-02.4:** Posts SHALL use ISR with a 3600-second revalidation interval
- **FR-02.5:** Posts SHALL be statically generated at build time via `generateStaticParams()`
- **FR-02.6:** MDX content SHALL support GFM syntax, syntax-highlighted code blocks, optimized images, and inline `Gallery` components
- **FR-02.7:** Heading elements (h1–h6) SHALL auto-generate anchor IDs for TOC linking
- **FR-02.8:** The system SHALL generate an RSS 2.0 feed at `/feed.xml`

### FR-03: Projects

- **FR-03.1:** The `/projects` page SHALL list all projects with filtering capabilities
- **FR-03.2:** Each project card SHALL open a dialog showing full details (description, tech stack, links, related blog posts)
- **FR-03.3:** Projects SHALL display status badges: `Focusing`, `In Progress`, `Maintaining`, `Completed`
- **FR-03.4:** The homepage SHALL show the first 3 projects from the `projects` array

### FR-04: Resume

- **FR-04.1:** The `/resume` page SHALL render a PDF resume using `@react-pdf/renderer`
- **FR-04.2:** A download option SHALL be available
- **FR-04.3:** A "Resume" button SHALL appear in the navbar (desktop only)

### FR-05: Products & Services

- **FR-05.1:** The `/products-services` page SHALL display template products with pricing:
  - Dashboard Pro ($79) — 50+ components, 10+ pages
  - Landing Suite ($59) — 5 landing pages, SEO-optimized
- **FR-05.2:** The page SHALL display SaaS pricing tiers for PTIB tuition management:
  - Starter ($29/mo, 50 students)
  - Professional ($79/mo, 200 students, highlighted)
  - Enterprise ($199/mo, unlimited, contact sales)
- **FR-05.3:** A monthly/annual billing toggle SHALL adjust pricing display
- **FR-05.4:** A feature comparison table SHALL compare all SaaS tiers (12 features)

### FR-06: Navigation

- **FR-06.1:** A fixed navbar SHALL display 7 navigation items: Home, About, Experience, Education, Projects, Contact, Blog
- **FR-06.2:** The navbar SHALL be responsive:
  - <1024px: 3 visible items + "More" dropdown
  - <1280px: 5 visible items + "More" dropdown
  - ≥1280px: All 7 items visible
- **FR-06.3:** A scroll progress bar SHALL display at the bottom of the navbar (gradient: blue → purple → pink)
- **FR-06.4:** Active section detection SHALL use IntersectionObserver with visibility scoring
- **FR-06.5:** The navbar background SHALL transition from transparent to glassmorphism on scroll
- **FR-06.6:** A mobile hamburger menu SHALL trigger a slide-out drawer

### FR-07: Theme System

- **FR-07.1:** The system SHALL support three theme modes: Light, Dark, System
- **FR-07.2:** Theme switching SHALL use the `class` attribute strategy via `next-themes`
- **FR-07.3:** A theme toggle (Sun/Moon dropdown) SHALL be available in the navbar
- **FR-07.4:** Default theme SHALL be `system`

### FR-08: Admin MDX Editor

- **FR-08.1:** An MDX editor SHALL be available at `/mdx-editor` in development mode only
- **FR-08.2:** The editor SHALL redirect to `/` in production
- **FR-08.3:** The editor SHALL support full CRUD for MDX blog files via `/api/mdx-files`

### FR-09: Gallery

- **FR-09.1:** A gallery component SHALL support responsive image/video grids
- **FR-09.2:** A full-screen lightbox with navigation SHALL be available
- **FR-09.3:** Mobile swipe indicators SHALL be displayed
- **FR-09.4:** The Gallery component SHALL be usable inline in MDX content

### FR-10: Social Links

- **FR-10.1:** Social links SHALL appear in two variants:
  - `icon-only` — used in the hero section
  - `full-card` — used in the contact section
- **FR-10.2:** Links SHALL include: GitHub, LinkedIn, Email, Personal Website

---

## 5. Non-Functional Requirements

### NFR-01: Performance

- **NFR-01.1:** Lighthouse score SHALL be 95+ across all metrics
- **NFR-01.2:** First Contentful Paint SHALL be under 2 seconds
- **NFR-01.3:** Bundle size SHALL be optimized (code splitting, tree shaking, Turbopack)
- **NFR-01.4:** Images SHALL be optimized using Next.js `<Image>` with lazy loading
- **NFR-01.5:** Critical CSS SHALL be inlined (critters)
- **NFR-01.6:** Blog posts SHALL use ISR (3600s) to reduce rebuild times

### NFR-02: Responsiveness

- **NFR-02.1:** The site SHALL be fully responsive across mobile, tablet, and desktop
- **NFR-02.2:** Breakpoints SHALL follow Tailwind defaults: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- **NFR-02.3:** Navigation SHALL adapt between mobile drawer and desktop nav

### NFR-03: Browser Compatibility

- **NFR-03.1:** The site SHALL support modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- **NFR-03.2:** Cross-browser CSS SHALL be ensured via PostCSS/Tailwind

### NFR-04: Code Quality

- **NFR-04.1:** TypeScript strict mode SHALL be enabled
- **NFR-04.2:** All component props SHALL be typed with interfaces
- **NFR-04.3:** Named exports SHALL be used (no `export default`)
- **NFR-04.4:** ESLint + Prettier SHALL enforce consistent code style
- **NFR-04.5:** No file SHALL exceed 300 lines
- **NFR-04.6:** No `console.log` in production code

### NFR-05: Maintainability

- **NFR-05.1:** Shadcn/ui components SHALL NOT be manually edited (managed via CLI)
- **NFR-05.2:** All portfolio data SHALL live in a single source of truth (`src/constants/data.ts`)
- **NFR-05.3:** Animation variants SHALL be centralized in `src/lib/animations.ts`
- **NFR-05.4:** Path aliases (`@/*`) SHALL be used for all imports

---

## 6. Page Requirements

### 6.1 Route Map

| Route | Layout | Rendering | Description |
|-------|--------|-----------|-------------|
| `/` | Main (navbar + footer) | Server | Homepage with all sections |
| `/blog` | Main | Server | Blog listing with search/filter |
| `/blog/[slug]` | Main | Static + ISR (3600s) | Individual blog post |
| `/projects` | Main | Server | Full project listing |
| `/resume` | Main | Server | PDF resume viewer |
| `/products-services` | Main | Server | Products & Services landing |
| `/mdx-editor` | Admin | Server (dev-only) | MDX blog editor |
| `/zh/*`, `/ms/*` | Main | Server | Localized variants of all pages |

### 6.2 API Routes

| Endpoint | Method(s) | Description |
|----------|-----------|-------------|
| `/api/og` | GET | Dynamic OG image generation (1200x630) |
| `/api/posts` | GET | Returns all blog posts as JSON |
| `/api/mdx-files` | GET, POST, PUT, DELETE | CRUD for MDX blog files |
| `/feed.xml` | GET | RSS 2.0 feed |

### 6.3 Generated Routes

| Route | Purpose |
|-------|---------|
| `/sitemap.xml` | XML sitemap with i18n alternates |
| `/robots.txt` | Crawler rules (allow all) |

---

## 7. Component Architecture

### 7.1 Component Patterns

- **Client Components:** Must include `"use client"` directive. Used for interactivity, hooks, Framer Motion
- **Server Components:** Default. Used for data fetching, static content
- **Naming:** PascalCase for components, kebab-case for filenames
- **Exports:** Named exports only (`export function X`, not `export default`)
- **Props:** Destructured in function signature, typed with interfaces
- **Memoization:** `React.memo` for cards/list items receiving props

### 7.2 Component Inventory

| Category | Count | Location |
|----------|-------|----------|
| Section Components | 7 | `src/components/sections/` |
| Layout Components | 8+ | `src/components/layout/` |
| Base Components | 3 | `src/components/base/` |
| UI Primitives (Shadcn) | 12 | `src/components/ui/` |
| Custom UI Components | 5 | `src/components/ui/` |
| Blog Components | 2 | `src/components/blog/` |
| MDX Components | 3 | `src/components/mdx/` |
| Gallery Components | 5 | `src/components/gallery/` |
| Products/Services | 10+ | `src/components/products-services/` |
| Standalone Components | 6 | `src/components/` |

### 7.3 Section Component Pattern

Every homepage section SHALL follow this structure:

```tsx
"use client";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";

export function XxxSection() {
  return (
    <section id="xxx">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeIn}>
          <h2 className="section-heading">Title</h2>
          <p className="section-subheading">Subtitle</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport}>
          {/* Grid content */}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 8. Data Requirements

### 8.1 Data Source

All portfolio data lives in `src/constants/data.ts`. No external database or CMS.

### 8.2 Data Models

#### PersonalInfo

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Display name |
| title | string | Yes | Professional title |
| fullname | string | Yes | Legal full name |
| contact.email | string | Yes | Email address |
| contact.phone | string | Yes | Phone number |
| contact.linkedin | string | Yes | LinkedIn URL |
| contact.github | string | Yes | GitHub URL |
| contact.personalWebsite | string | Yes | Portfolio URL |
| contact.location | string | Yes | City, Country |
| profilePicture | string | Yes | Profile image path |
| memoji | string | Yes | Memoji image path |
| summary | string | Yes | Professional summary (300-400 chars) |

#### Experience

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Job title |
| company | string | Yes | Company name (with context) |
| companyUrl | string | No | Company website URL |
| location | string | Yes | Work location |
| type | string | Yes | "Full-time" or "Internship" |
| startDate | string | Yes | Start date (YYYY-M-D) |
| endDate | string | No | End date (undefined = current) |
| description | string | Yes | One-line impact statement (80-100 chars) |
| responsibilities | string[] | Yes | 3 max, metrics-driven bullets (80-120 chars each) |
| skills | string[] | Yes | 7-8 max, most impactful first |
| logo | string | Yes | Company logo path |
| projects | Project[] | No | Related projects |
| blogSlugs | string[] | No | Related blog post slugs |

#### Project

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Project name |
| description | string | Yes | Brief description (80-100 chars for experience projects) |
| image | string | No | Project screenshot path |
| github | string | No | GitHub repository URL |
| demo | string | No | Live demo URL |
| status | string | No | "Focusing" / "In Progress" / "Maintaining" / "Completed" |
| techStacks | string[] | Yes | Technologies used |
| date | string | No | Project date |
| blogSlugs | string[] | No | Related blog post slugs |

#### Education

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| degree | string | Yes | Degree title |
| institution | string | Yes | Institution name |
| location | string | Yes | Location |
| startDate | string | Yes | Start date |
| endDate | string | Yes | End date |
| description | string | Yes | Coursework description |
| achievements | string[] | Yes | Notable achievements |
| logo | string | Yes | Institution logo path |
| cgpa | string | Yes | GPA value |
| institutionUrl | string | Yes | Institution website |
| certificateUrl | string | No | Certificate PDF path |
| transcriptUrl | string | No | Transcript PDF path |
| techStacks | string[] | Yes | Technologies learned |

#### Skills

| Field | Type | Description |
|-------|------|-------------|
| languages | string[] | Programming languages |
| frameworks | string[] | Frameworks and libraries |
| databases | string[] | Database technologies |
| tools | string[] | Development tools |

#### Blog Post Frontmatter

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Post title |
| date | string | Yes | Publication date (YYYY-MM-DD) |
| description | string | Yes | Post description/excerpt |
| tags | string[] | Yes | Topic tags |
| image | string | No | Cover image path |
| author | string | Yes | Author name |

### 8.3 Current Data Counts

| Entity | Count |
|--------|-------|
| Experiences | 4 (2 full-time, 2 internships) |
| Projects | 9 |
| Education entries | 2 |
| Skill categories | 4 |
| Blog posts | 7 |
| Certifications | 4 |

---

## 9. API Requirements

### 9.1 OG Image Generation (`/api/og`)

- **Method:** GET
- **Parameters:** `title`, `date`, `tags` (query string)
- **Response:** 1200x630 PNG image
- **Design:** Black background, neon cyan accent line, grid pattern, title, date, tags, author avatar
- **Runtime:** Node.js

### 9.2 Posts API (`/api/posts`)

- **Method:** GET
- **Response:** JSON array of all blog posts
- **Caching:** `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`

### 9.3 MDX Files API (`/api/mdx-files`)

- **Methods:** GET, POST, PUT, DELETE
- **Purpose:** Full CRUD for MDX blog files
- **Access:** Development mode only (admin editor)

### 9.4 RSS Feed (`/feed.xml`)

- **Method:** GET
- **Response:** RSS 2.0 XML
- **Content:** All blog posts with title, link, guid, description, pubDate, author, categories
- **Caching:** `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`

---

## 10. SEO Requirements

### SEO-01: Metadata

- **SEO-01.1:** Every page SHALL include `title`, `description`, `keywords`, `authors`
- **SEO-01.2:** OpenGraph metadata SHALL include: title, description, url, siteName, images (1200x630), type
- **SEO-01.3:** Twitter card metadata SHALL use `summary_large_image` format
- **SEO-01.4:** Canonical URLs SHALL be set via `alternates.canonical`

### SEO-02: Structured Data (JSON-LD)

| Page | Schema Type | Key Fields |
|------|-------------|------------|
| Root Layout | `Person` | name, url, sameAs (LinkedIn, GitHub), jobTitle, worksFor |
| Blog Listing | `Blog` | Blog metadata |
| Blog Post | `Article` | Article metadata via OpenGraph |
| Projects | `Portfolio` | Portfolio metadata |
| Resume | `Resume` | Resume metadata |

### SEO-03: Crawling & Indexing

- **SEO-03.1:** `robots.txt` SHALL allow all user agents to crawl `/`
- **SEO-03.2:** `sitemap.xml` SHALL include all static and dynamic pages
- **SEO-03.3:** Sitemap entries SHALL include `alternates.languages` for `en`, `zh`, `ms`, and `x-default`
- **SEO-03.4:** Priority values: homepage (1.0), blog listing (0.9), projects (0.8), resume (0.7), blog posts (0.6)

### SEO-04: Dynamic OG Images

- **SEO-04.1:** Blog posts SHALL generate dynamic OG images via `/api/og`
- **SEO-04.2:** Images SHALL be 1200x630 pixels with branded design

---

## 11. Internationalization Requirements

### i18n-01: Supported Locales

| Locale | Language | URL Prefix |
|--------|----------|------------|
| `en` | English | None (default, `as-needed` prefix) |
| `zh` | Chinese (中文) | `/zh/` |
| `ms` | Bahasa Melayu | `/ms/` |

### i18n-02: Implementation

- **i18n-02.1:** `next-intl` v4 SHALL handle all translations
- **i18n-02.2:** Translation files SHALL live in `src/messages/{locale}.json`
- **i18n-02.3:** Middleware SHALL route requests to the correct locale
- **i18n-02.4:** URL prefix strategy SHALL be `as-needed` (English has no prefix)
- **i18n-02.5:** A language switcher dropdown SHALL appear in the navbar

### i18n-03: Translation Coverage

The following namespaces SHALL be translated:

| Namespace | Keys |
|-----------|------|
| `nav` | Navigation item labels |
| `hero` | Hero section content |
| `sections` | About, Experience, Education, Projects, Skills, Contact sections |
| `common` | Shared labels and buttons |
| `footer` | Footer content |
| `language` | Language selector labels |

### i18n-04: Content

- **i18n-04.1:** UI strings (labels, headings, buttons) SHALL be translated
- **i18n-04.2:** Portfolio data (experiences, projects, descriptions) remains in English only
- **i18n-04.3:** Blog posts MAY be written in any supported language (Chinese posts are supported)

---

## 12. Design System Requirements

### DS-01: Design Philosophy

**Hyper-Minimalist Neo-Brutalism meets Apple Spatial Design** — "Void-First" aesthetic with pure black dark mode.

### DS-02: Color Palette

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `#FAFAFA` | `#000000` (pure black) |
| Foreground | `#000000` | `#FFFFFF` |
| Card | `#FFFFFF` | `#000000` |
| Primary (Accent) | `#00F0FF` (neon cyan) | `#00F0FF` |
| Primary Foreground | `#000000` | `#000000` |
| Secondary | `#3F3F46` | `#27272A` |
| Muted | `#F4F4F5` | `#18181B` |
| Muted Foreground | `#A1A1AA` | `#A1A1AA` |
| Border | `#E4E4E7` | `rgba(255,255,255,0.1)` |
| Ring | `#00F0FF` | `#00F0FF` |
| Border Radius | `0.5rem` | `0.5rem` |

**Rule:** Primary cyan (`#00F0FF`) SHALL only be used on hover/active states, never as a resting-state fill.

### DS-03: Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Body | Archivo | 300-700 | All body text |
| Headings | Space Grotesk | 300-700 | All headings, hero text |
| Monospace | Space Grotesk | — | Code blocks |

| Class | Size Range | Properties |
|-------|-----------|------------|
| `.hero-heading` | 5xl–8xl | Space Grotesk, -0.04em tracking, 1.05 line-height |
| `.section-heading` | 4xl–6xl | Space Grotesk, -0.03em tracking, 1.1 line-height |
| `.section-subheading` | lg–xl | Archivo, muted foreground, centered, max-w-3xl |

### DS-04: Card Styles

| Class | Description |
|-------|-------------|
| `.glass-card` | `backdrop-blur-xl`, `bg-background/70`, `border-border/50`, inner glow |
| `.card-hover-lift` | Lifts 8px on hover, neon cyan border, glow box-shadow |

**Glassmorphism pattern:** `bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10`

### DS-05: Interactive States

| Class | Behavior |
|-------|----------|
| `.smooth-interaction` | `scale-105` on hover, `scale-95` on active, 200ms ease-out |
| `.btn-bold-hover` | `translateY(-2px)` + box-shadow on hover |

### DS-06: Special Effects

| Effect | Implementation |
|--------|---------------|
| Mouse Spotlight | `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,240,255,0.06), transparent 40%)` |
| Grid Background | `.bg-grid-pattern` — SVG inline grid |
| Float Animation | `.animate-float` — 4s Y-axis oscillation (-5px) |
| Shimmer | `.animate-shimmer` — 2s sweep (used on Resume button) |

### DS-07: Color Usage Rules

- **SHALL** reference colors via CSS variables / Tailwind classes (`bg-background`, `text-primary`)
- **SHALL NOT** hardcode hex values in components
- **SHALL** define all custom properties in `globals.css` under `:root` and `.dark`

---

## 13. Animation Requirements

### ANIM-01: Animation Library

Framer Motion v12 SHALL be the sole animation library. No additional animation libraries SHALL be installed.

### ANIM-02: Shared Variants

All shared animation variants SHALL be defined in `src/lib/animations.ts`:

| Variant | Description | Duration |
|---------|-------------|----------|
| `fadeIn` | Opacity 0→1, Y 20→0 | 0.6s |
| `fadeInWithDelay(delay)` | Configurable delay fadeIn | 0.6s |
| `staggerContainer` | Opacity 0→1, stagger children by 0.2s | — |
| `slideIn(direction, distance)` | Directional slide (left/right/up/down) | 0.5s |
| `scaleIn` | Opacity 0→1, scale 0.9→1 | 0.4s |
| `pageTransition` | Enter: Y 8→0, Exit: Y 0→-8 | 0.3s |

### ANIM-03: Scroll-Triggered Animations

- **ANIM-03.1:** Section animations SHALL trigger once (`once: true`) with `-100px` margin
- **ANIM-03.2:** `defaultViewport = { once: true, margin: "-100px" }` SHALL be used
- **ANIM-03.3:** Pattern: `initial="hidden" whileInView="visible" viewport={defaultViewport}`

### ANIM-04: Timing Standards

- Duration: 0.4–0.6 seconds
- Easing: `easeOut`
- Stagger delay: 0.2 seconds between children

### ANIM-05: Special Animations

| Animation | Component | Description |
|-----------|-----------|-------------|
| 3D Card Tilt | HeroSection | Mouse parallax via `useMotionValue` + `useTransform` (±7deg) |
| Type Animation | HeroSection | Cycling titles every 2.5s |
| Animated Counter | AboutSection | `useSpring` + `useInView` for stat numbers |
| Timeline Grow | EducationsSection | Line grows from height 0→100% over 1.5s |
| Magnetic Button | MagneticButton | Spring-based (stiffness:300, damping:20) mouse-proximity pull |
| Skill Ring | SkillRing | SVG `strokeDashoffset` animation on scroll |
| Page Transition | PageTransition | `AnimatePresence mode="wait"` keyed to pathname |

---

## 14. Performance Requirements

### PERF-01: Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 95+ |

### PERF-02: Core Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### PERF-03: Optimization Strategies

- **PERF-03.1:** Code splitting via Next.js dynamic imports
- **PERF-03.2:** Image optimization via `next/image` (WebP/AVIF, lazy loading)
- **PERF-03.3:** Font optimization via `next/font/google` (self-hosted, preloaded)
- **PERF-03.4:** Bundle analysis via `@next/bundle-analyzer`
- **PERF-03.5:** ISR for blog posts (avoid full rebuilds)
- **PERF-03.6:** Static generation where possible (`force-static`)
- **PERF-03.7:** Turbopack for development performance
- **PERF-03.8:** Vercel Speed Insights for production monitoring

---

## 15. Accessibility Requirements

### A11Y-01: Standards

- **A11Y-01.1:** Semantic HTML elements SHALL be used (section, nav, main, article, etc.)
- **A11Y-01.2:** All images SHALL have descriptive `alt` text
- **A11Y-01.3:** Interactive elements SHALL be keyboard-accessible
- **A11Y-01.4:** Color contrast ratios SHALL meet WCAG 2.1 AA standards
- **A11Y-01.5:** `VisuallyHidden` component SHALL be used for screen-reader-only text
- **A11Y-01.6:** Focus management SHALL be handled for modals/dialogs (via Radix UI)

---

## 16. Security Requirements

### SEC-01: Environment Variables

- **SEC-01.1:** `.env` files SHALL NOT be modified without explicit permission
- **SEC-01.2:** Sensitive values SHALL NOT be committed to version control

### SEC-02: Admin Routes

- **SEC-02.1:** The MDX editor (`/mdx-editor`) SHALL only be accessible in development mode
- **SEC-02.2:** The admin layout SHALL redirect to `/` when `NODE_ENV !== "development"`

### SEC-03: External Links

- **SEC-03.1:** External links in blog posts SHALL use `target="_blank"` via `rehype-external-links`
- **SEC-03.2:** External links SHALL include `rel="noopener noreferrer"` (default from rehype plugin)

### SEC-04: Input Validation

- **SEC-04.1:** API routes SHALL validate input parameters
- **SEC-04.2:** MDX content SHALL be sanitized during rendering

---

## 17. Deployment Requirements

### DEPLOY-01: Platform

- **DEPLOY-01.1:** The site SHALL be deployed to Vercel
- **DEPLOY-01.2:** Domain: `kelvinyou.vercel.app`
- **DEPLOY-01.3:** Automatic deployments SHALL trigger on pushes to `main` branch

### DEPLOY-02: Build

- **DEPLOY-02.1:** `npm run build` SHALL complete without errors
- **DEPLOY-02.2:** `npm run lint` SHALL pass without warnings
- **DEPLOY-02.3:** TypeScript type checking SHALL pass in strict mode
- **DEPLOY-02.4:** Build output SHALL be verified with bundle analysis when needed

### DEPLOY-03: Environment

- **DEPLOY-03.1:** Production environment SHALL use Node.js runtime for API routes
- **DEPLOY-03.2:** Vercel Analytics and Speed Insights SHALL be active in production

---

## 18. Content Requirements

### CONTENT-01: Blog Posts

| # | Slug | Title | Language | Tags |
|---|------|-------|----------|------|
| 1 | `personal-website` | Why I Created My Personal Website | EN | portfolio, web development |
| 2 | `beyondsoft` | Scaling Frontend at Tencent | EN | Architecture, React, Performance |
| 3 | `nextjs-seo` | Next.js SEO: Meta Tags Setup | EN | nextjs, seo, web development |
| 4 | `bbk-business-summarize` | 从千万级老板的分享看创业初期的生存与成长逻辑 | ZH | 创业, 商业模式 |
| 5 | `fl-b40-to-t20` | From B40 to T20 | EN | Income, Journey |
| 6 | `instagram-feed` | Designing an Instagram Feed | EN | system design, interview |
| 7 | `autocomplete-search` | Building a Production-Ready Autocomplete | EN | React, TypeScript, Performance |

### CONTENT-02: Experience Data

| # | Role | Company | Type | Period |
|---|------|---------|------|--------|
| 1 | Frontend Engineer | Simpletruss | Full-time | Jun 2024 – Present |
| 2 | Frontend Developer | Beyondsoft (Tencent) | Full-time | Jul 2023 – Jun 2024 |
| 3 | Java Engineer Intern | Finexus (Fintech) | Internship | Feb 2023 – Jul 2023 |
| 4 | Blockchain Engineer Intern | Techtics (Web3) | Internship | Oct 2020 – Jan 2021 |

### CONTENT-03: Projects

| # | Title | Status | Key Tech |
|---|-------|--------|----------|
| 1 | PTIB - Tuition Center Management SaaS | In Progress | Next.js, Supabase, Stripe |
| 2 | Personal Website | Maintaining | Next.js, Tailwind, Shadcn |
| 3 | Zync - Meeting Scheduling SaaS | Focusing | React, NestJS, Supabase, Redis |
| 4 | Travel Guide: Tourist App | Completed | Flutter, Firebase |
| 5 | Restaurant Landing | Completed | React, Bootstrap |
| 6 | Automated Market-Making System | Completed | React, Solidity, Ethereum |
| 7 | Edge Detection System | Completed | Python, Dask, Threading |
| 8 | Donation System | Completed | Java |
| 9 | Travel Guide: Admin App | Completed | Flutter, Firebase |

---

## 19. Future Considerations

These items are observations from the current codebase that may warrant future attention:

1. **Skills Section:** Translation keys exist for a standalone skills section (`skills_title`, etc.) but no `SkillsSection` component is rendered on the homepage. Skills are currently displayed within `AboutSection`. Consider implementing a dedicated section or removing unused translations.

2. **SkillRing Component:** `src/components/ui/skill-ring.tsx` exists but appears unused. Consider integrating it into a skills section or removing it.

3. **Footer Duplication:** Both `src/components/sections/footer-section.tsx` and `src/components/layout/footer.tsx` exist. The layout footer (with i18n) is the one in use; the section footer appears to be legacy.

4. **Products/Services Metadata:** The page metadata contains `"Your Name"` placeholder instead of "Kelvin You".

5. **Blog-Project Linking:** Some blog posts (e.g., `autocomplete-search`) are not cross-referenced via `blogSlugs` in the projects array.

6. **Certifications Display:** `certifications` data exists in `data.ts` but has no visible rendering on any page.

7. **Local Animation Variants:** Several components define animation variants locally instead of importing from `lib/animations.ts` (blog pages, education section, products/services). Consider centralizing.

8. **i18n for Blog:** Blog content is not dynamically translated — posts are written in a single language each. Consider adding locale-specific blog routing if multi-language blog content grows.

---

*Generated from codebase analysis on 2026-03-07.*
