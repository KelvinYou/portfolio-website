---
name: redesign-section
description: >
  Redesign or restyle a specific section of the portfolio website. Use when the user says
  "redesign the hero", "make the projects section look like...", "update the contact section",
  "restyle the about page", or requests any visual/layout changes to an existing section.
  Always consult the design-system skill before making visual decisions.
user-invocable: true
argument-hint: "[section-name]"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
version: "1.0.0"
---

# Redesign Section

Restyle or restructure a homepage section or page component.

**IMPORTANT:** Before making any visual decision, load and follow the `design-system` skill. Every color, spacing value, and interaction pattern must comply with the Hyper-Minimalist Neo-Brutalism x Apple Spatial Design system.

## Section Inventory

| Section | File | Data Source |
|---------|------|-------------|
| Hero | `src/components/sections/hero-section.tsx` | `personalInfo` from `data.ts` |
| About | `src/components/sections/about-section.tsx` | `personalInfo` |
| Experiences | `src/components/sections/experiences-section.tsx` | `experiences[]` |
| Education | `src/components/sections/educations-section.tsx` | `educations[]` |
| Projects | `src/components/sections/projects-section.tsx` | `projects[]` |
| Skills | `src/components/sections/skills-section.tsx` | `skills{}` |
| Contact | `src/components/sections/contact-section.tsx` | `personalInfo.contact` |
| Footer | `src/components/sections/footer-section.tsx` | `personalInfo` |

## Workflow

### 1. Read Current Implementation
Read the target section file and understand:
- What data it consumes from `src/constants/data.ts`
- Current layout structure and responsive behavior
- Existing animations and interactions
- The section's `id` attribute (used for scroll navigation — **never change it**)

### 2. Redesign Within the Design System

**Required patterns:**
- Background: `bg-black` (page void) — sections don't have their own backgrounds
- Container: `max-w-7xl mx-auto px-6 md:px-8`
- Section spacing: `py-32 md:py-40`
- Cards: `bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 rounded-2xl`
- Text: `text-[#E8E8E8]` for headings, `text-neutral-500` for body
- Accent: `#00F0FF` on hover/active ONLY

**Animation pattern:**
```tsx
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";

<motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeIn}>
```

### 3. Section Template
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";

export function XxxSection() {
  return (
    <section id="xxx" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#E8E8E8]" style={{ letterSpacing: "-0.03em" }}>
            Section Title
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-neutral-500">
            Section description.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Items */}
        </motion.div>
      </div>
    </section>
  );
}
```

### 4. Verify
- `npm run dev` — check all breakpoints (mobile, tablet, desktop)
- Dark mode compatibility (site is already dark-first)
- Hover/focus/active states present on all interactive elements
- Section `id` preserved for navigation scroll
- File stays under 300 lines — extract sub-components if needed

## Rules
- Use `cn()` from `@/lib/utils` for conditional classes
- All animations from `@/lib/animations` — never define inline variants
- Container: `max-w-7xl mx-auto px-6 md:px-8`
- Never remove a section's `id` attribute
- Mobile-first: default → `sm:` → `md:` → `lg:` → `xl:`
- Touch targets: 44x44px minimum on mobile
- Max 300 lines per file

## Reference Files
- All sections: `src/components/sections/*.tsx`
- Homepage composition: `src/app/(main)/page.tsx`
- Global styles: `src/app/globals.css`
- Animation variants: `src/lib/animations.ts`
- Portfolio data: `src/constants/data.ts`
- Design system skill: `.claude/skills/design-system/SKILL.md`
