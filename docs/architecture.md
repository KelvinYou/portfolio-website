# Architecture

Paths in this document are relative to the repository root.

## Project Overview

**What:** Personal portfolio website for Kelvin You — AI-native Software Engineer; formal employer titles remain as recorded in `src/constants/data.ts`.
**Stack:** Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4
**Deploy:** Vercel at `kelvinyou.vercel.app`
**Dev server:** `npm run dev` (uses Turbopack)

## Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # next-intl locale segment (en / zh / ms)
│   │   ├── (main)/               # Main layout group (navbar + footer)
│   │   │   ├── page.tsx          # Homepage — renders all sections
│   │   │   ├── projects/         # /projects listing page
│   │   │   ├── blog/             # Blog listing + [slug] (force-static, build-time)
│   │   │   └── products-services/# /products-services page
│   │   └── (admin)/mdx-editor/   # Admin route (MDX editor)
│   ├── resume/route.tsx          # /resume — serves the PDF directly (unprefixed, English only)
│   ├── api/                      # API routes (mdx-files, og)
│   ├── globals.css               # Global styles + CSS variables + design tokens
│   ├── layout.tsx                # Root layout (fonts, metadata, ThemeProvider)
│   ├── robots.ts                 # SEO: robots.txt
│   └── sitemap.ts                # SEO: sitemap.xml
├── components/
│   ├── sections/                 # Homepage section components
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── experiences-section.tsx
│   │   ├── educations-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── contact-section.tsx
│   │   └── footer-section.tsx
│   ├── ui/                       # Shadcn/ui primitives (DO NOT manually edit)
│   ├── layout/                   # Navbar, footer
│   ├── blog/                     # Blog-specific (post-card, related-links)
│   ├── gallery/                  # Gallery grid, lightbox
│   ├── experience/               # Experience card
│   ├── products-services/        # Products/services feature
│   ├── mdx/                      # MDX rendering components
│   ├── project-card.tsx          # Project card with dialog
│   ├── theme-provider.tsx        # next-themes wrapper
│   ├── theme-toggle.tsx          # Light/dark/system toggle
│   ├── icons.tsx                 # Icon registry (lucide-react)
│   └── error-boundary.tsx        # React error boundary
├── constants/
│   ├── data.ts                   # ALL portfolio data (personal info, experiences, projects, skills, education)
│   ├── navItems.ts               # Navigation items config
│   └── index.ts                  # Re-exports
├── content/
│   └── blog/                     # MDX blog posts (30 at last count)
├── lib/
│   ├── utils.ts                  # cn(), formatDate(), slug generation, etc.
│   ├── animations.ts             # Framer Motion variants (fadeIn, staggerContainer, slideIn, scaleIn)
│   └── mdx.ts                    # MDX processing (getPostBySlug, getAllPosts)
└── types/
    ├── index.ts                  # Core types (NavItem, Experience, Project, Education, Skill)
    └── gallery.ts                # Gallery types
```
