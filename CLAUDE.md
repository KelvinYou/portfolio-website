# CLAUDE.md — Portfolio Website

> This file is the single source of truth for AI agents working on this codebase.
> Read this ENTIRELY before making any changes.

---

## Project Overview

**What:** Personal portfolio website for Kelvin You — Frontend Engineer.
**Stack:** Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4
**Deploy:** Vercel at `kelvinyou.vercel.app`
**Dev server:** `npm run dev` (uses Turbopack)

---

## Critical Rules

1. **Never touch `.env` files** without explicit permission.
2. **Never mock data** outside of test files. All dev/prod data lives in `src/constants/data.ts`.
3. **Never create files > 300 lines.** Refactor into smaller modules at that point.
4. **Always iterate on existing patterns** before introducing new ones.
5. **Don't add unrelated changes.** Stay focused on the task scope.
6. **Always kill existing dev servers** before starting new ones.
7. **After making changes, start the dev server** so the user can test immediately.

---

## Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Main layout group (navbar + footer)
│   │   ├── page.tsx              # Homepage — renders all sections
│   │   ├── projects/             # /projects listing page
│   │   ├── resume/               # /resume PDF viewer
│   │   └── products-services/    # /products-services page
│   ├── (admin)/                  # Admin routes (MDX editor)
│   ├── blog/                     # Blog routes (outside main layout)
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual post (ISR: 3600s)
│   ├── api/                      # API routes
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
│   ├── pdf-renderer/             # Resume PDF viewer
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
│   └── blog/                     # MDX blog posts (7 articles)
├── lib/
│   ├── utils.ts                  # cn(), formatDate(), slug generation, etc.
│   ├── animations.ts             # Framer Motion variants (fadeIn, staggerContainer, slideIn, scaleIn)
│   └── mdx.ts                    # MDX processing (getPostBySlug, getAllPosts)
└── types/
    ├── index.ts                  # Core types (NavItem, Experience, Project, Education, Skill)
    └── gallery.ts                # Gallery types
```

---

## Key Conventions

### TypeScript
- Strict mode enabled.
- Path alias: `@/*` maps to `./src/*`.
- All component props must be typed with interfaces, not inline types.
- Export types from `src/types/index.ts`.

### Components
- **Client components:** Must have `"use client"` directive at top.
- **Server components:** Default. Used for data fetching (blog pages, listings).
- **Naming:** PascalCase for components, kebab-case for file names.
- **Pattern:** Named exports (not default exports) for all components.
  ```tsx
  // CORRECT
  export function MyComponent() { ... }
  export const MyComponent = React.memo(function MyComponent() { ... });

  // WRONG
  export default function MyComponent() { ... }
  ```
- **Props pattern:** Destructure props in function signature.
- **Memoization:** Use `React.memo` for cards/list items that receive props.

### Styling
- **Framework:** Tailwind CSS v4 with CSS variables.
- **Class merging:** Always use `cn()` from `@/lib/utils` for conditional classes.
- **Design tokens:** Defined as CSS custom properties in `globals.css` `:root` and `.dark`.
- **Shadcn/ui:** Style `new-york`. Add new primitives via `npx shadcn@latest add <component>`.
- **Custom classes in globals.css:**
  - `.section-heading` / `.section-subheading` — Section typography
  - `.hero-heading` — Hero-specific large type
  - `.card-hover-lift` — Card interaction with lift + cyan border glow
  - `.glass-card` — Glassmorphism card (backdrop-blur + border)
  - `.smooth-interaction` — Micro-interaction (scale on hover/active)
  - `.btn-bold-hover` — Button with bold hover states and cyan glow

### Fonts
- **Body:** Archivo (`--font-archivo`) — Clean, modern sans-serif
- **Headings:** Space Grotesk (`--font-space-grotesk`) — Bold, distinctive
- Both loaded via `next/font/google` in `layout.tsx`.

### Colors (CSS Variables)
- **Light mode:** `--background: #FAFAFA`, `--foreground: #09090B`, `--primary: #00F0FF`
- **Dark mode:** `--background: #000000` (pure black, void-first), `--foreground: #E8E8E8`, `--primary: #00F0FF`
- Always reference via Tailwind (`bg-background`, `text-foreground`, `text-primary`).
- Never hardcode hex values in components.
- **Design System:** Hyper-Minimalist Neo-Brutalism x Apple Spatial Design
  - Accent color: `#00F0FF` (neon cyan) - use ONLY on hover/active states
  - Glassmorphism: `bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10`
  - Mouse spotlight: `radial-gradient(600px circle, rgba(0,240,255,0.06), transparent 40%)`

### Animations
- **Library:** Framer Motion v12.
- **Shared variants:** Import from `@/lib/animations` — `fadeIn`, `staggerContainer`, `slideIn`, `scaleIn`.
- **Scroll-triggered:** Use `whileInView="visible"` with `viewport={defaultViewport}`.
- **Pattern:**
  ```tsx
  <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeIn}>
    {/* content */}
  </motion.div>
  ```
- **Timing:** 0.4–0.6s duration, "easeOut" easing, 0.2s stagger between children.
- **Rule:** Animations trigger once (`once: true`) with `-100px` margin.

### Icons
- **Library:** lucide-react (500+ icons).
- **Registry:** `src/components/icons.tsx` maps string keys to Lucide components.
- **Usage:** Import directly from `lucide-react` in components.

### Data Management
- **All portfolio data** lives in `src/constants/data.ts`. This is the single source of truth.
- **Structure:** `personalInfo`, `experiences[]`, `educations[]`, `projects[]`, `skills{}`.
- **Adding a project:** Add to the `projects` array in `data.ts`. The homepage shows `projects.slice(0, 3)`.
- **Adding an experience:** Add to the `experiences` array (newest first).
- **Project statuses:** `"Focusing"` | `"In Progress"` | `"Maintaining"` | `"Completed"`

### Experience Data Best Practices (Senior Engineer Focus)

**Philosophy:** Every word must answer "Why should we hire you?" If it doesn't, cut it.

#### Content Guidelines

**1. Descriptions (One-line impact statements)**
```typescript
// GOOD: Scale + specificity
"Building enterprise property management SaaS. 500+ properties, 10K+ maintenance tickets monthly."
"Analytics platform for Tencent, MiHoYo (Genshin Impact). Millions of events/day."

// BAD: Generic, no scale
"Leading frontend architecture for a property management platform."
"Worked on analytics features for game companies."
```

**Rules:**
- Keep under 100 characters
- Lead with scale: user count, data volume, transaction volume
- Be specific: name technologies, name companies
- Use active voice: "Building", "Shipped", "Fixed"
- Drop filler: "Responsible for", "Helped with", "Worked on"

**2. Responsibilities (3 bullets max, metrics-driven)**
```typescript
// GOOD: Specific + metrics + outcome
"Component library with compound patterns, TypeScript generics. 40% faster dev velocity, 60KB bundle reduction."
"Performance: Virtual scrolling (500K rows), Web Workers for parsing. Sub-3s loads at 60fps."
"Fixed connection pool bug causing peak-hour failures. HikariCP + JMX monitoring → 99.9% uptime."

// BAD: Task lists without impact
"Built component library using React and TypeScript."
"Improved application performance through various optimizations."
"Fixed bugs and improved system stability."
```

**Rules:**
- Each bullet: **What you built + How you built it + Measurable outcome**
- Include percentages: "35% faster", "40% fewer bugs", "60% smaller bundles"
- Include scale: "500K rows", "1M+ users", "10K+ items"
- Name specific tools/patterns: "Apollo Client", "compound patterns", "HikariCP"
- Under 100 characters per bullet
- No generic verbs: Avoid "helped", "assisted", "contributed to"

**3. Company Names (Context over formality)**
```typescript
// GOOD: Adds context
"Beyondsoft (Tencent)"
"Finexus (Fintech)"
"Techtics (Web3)"

// BAD: Legal entity names
"Beyondsoft (Malaysia) Sdn. Bhd."
"Finexus International Sdn. Bhd."
"Techtics Blockchain PLT"
```

**4. Skills (7-8 max, most impactful first)**
```typescript
// GOOD: Specific, current, impactful
skills: ["React", "TypeScript", "GraphQL", "Apollo Client", "Zustand", "Material UI", "Storybook"]

// BAD: Too many, includes basics
skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Git", "GitHub", "VS Code", "npm", "Webpack"]
```

**Rules:**
- Order by impact: frameworks first, then specialized tools
- Remove universal tools: Git, npm, VS Code
- Keep to technologies used in responsibilities
- Max 8 skills per role

**5. Projects (Concise, scale-focused)**
```typescript
// GOOD
{
  title: "LessenPro",
  description: "Scheduling engine, vendor coordination, maintenance tracking. 500+ properties managed.",
  techStacks: ["React", "TypeScript", "GraphQL", "Material UI", "Apollo Client"]
}

// BAD: Verbose
{
  title: "LessenPro - Property Management SaaS Platform",
  description: "A comprehensive enterprise SaaS platform for property management that includes scheduling, vendor workflows, and dashboards.",
  techStacks: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "GraphQL", ...]
}
```

#### Character Limits (Strict)
- Description: **80-100 chars max**
- Each responsibility bullet: **80-120 chars max**
- Skills array: **7-8 items max**
- Project description: **80-100 chars max**

#### Language Style

**Active voice:**
```diff
- "Was responsible for building..."
+ "Built..."

- "Helped improve performance..."
+ "Performance: Virtual scrolling, Web Workers. Sub-3s loads."

- "Worked on component library..."
+ "Component library with compound patterns. 40% faster dev."
```

**Specificity:**
```diff
- "Improved performance"
+ "35% faster initial loads, 60% smaller bundles"

- "Built dashboards"
+ "Analytics dashboards processing 500K-row datasets at 60fps"

- "Used React hooks"
+ "Custom hooks (usePaginatedQuery, useOptimisticMutation)"
```

**Conciseness:**
```diff
- "Implemented virtual scrolling using react-window library for rendering massive tables with more than 500,000 rows"
+ "Virtual scrolling (500K rows), Web Workers for parsing"

- "Established comprehensive testing standards including Jest unit tests and integration tests for critical user paths"
+ "Jest standards, mandatory reviews. 40% fewer bugs."
```

#### Role Prioritization

**Full-time roles:** Full detail (3 bullets, projects, all context)
**Internships:** Condensed (2-3 bullets, key learnings, metrics)
**Old roles (3+ years):** Consider removing if not adding value for senior-level hiring

#### What to Remove

**❌ Remove these:**
- Generic statements: "Worked with team", "Collaborated with stakeholders"
- Process descriptions: "Participated in daily standups", "Created tickets in Jira"
- Obvious tasks: "Fixed bugs", "Wrote unit tests" (unless with specific impact)
- Over-explanation: Don't explain what React is, what GraphQL does, etc.
- First jobs if 3+ years old and not relevant to senior roles

**✅ Keep these:**
- Specific metrics: percentages, user counts, performance numbers
- Architecture decisions: "Chose X over Y because Z"
- Scale indicators: data volume, user counts, transaction rates
- Technical depth: specific libraries, patterns, optimizations
- Business impact: cost savings, revenue generated, time saved

#### Personal Summary Guidelines

```typescript
// GOOD: Concise, metrics, differentiation
`Frontend Engineer who ships fast without breaking things. Built dashboards
serving 1M+ users at Tencent/MiHoYo scale. 3+ years specializing in performance
(35% faster loads), architecture (GraphQL layers), and scale (500K-row tables at 60fps).

0→1 startups + enterprise experience. I know when to move fast and when to architect for growth.

Currently building SaaS with Next.js + Supabase. Exploring system design patterns.`

// BAD: Verbose, generic
`I am a passionate Frontend Engineer with extensive experience in building
modern web applications. I have worked with various technologies and frameworks
including React, TypeScript, and many others. I am always eager to learn new
things and improve my skills. I believe in writing clean code and creating
great user experiences.`
```

**Rules:**
- Paragraph 1: Hook + scale + years + expertise areas with metrics
- Paragraph 2: Unique positioning (startup + enterprise, niche expertise)
- Paragraph 3: Current work + learning direction
- Total: 300-400 characters
- Remove: "passionate", "extensive experience", "eager to learn", generic personality statements

#### Examples of Good vs. Bad

**Full-time Role:**
```typescript
// ✅ GOOD
{
  title: "Frontend Engineer",
  company: "Simpletruss",
  description: "Building enterprise property management SaaS. 500+ properties, 10K+ maintenance tickets monthly.",
  responsibilities: [
    "Component library with compound patterns, TypeScript generics. 40% faster dev velocity, 60KB bundle reduction.",
    "GraphQL layer: Apollo Client, 80% cache hit rate, custom hooks. Type-safe, zero prop-drilling.",
    "Performance: Code splitting, virtualization for 10K+ rows. 35% faster initial loads."
  ],
  skills: ["React", "TypeScript", "GraphQL", "Apollo Client", "Zustand", "Material UI", "Storybook"]
}

// ❌ BAD
{
  title: "Frontend Engineer",
  company: "Simpletruss Sdn Bhd",
  description: "Responsible for leading the frontend architecture team and working on various features for our property management platform.",
  responsibilities: [
    "Built and maintained React component library using best practices and modern patterns.",
    "Worked with the team to implement GraphQL integration and improve data fetching strategies.",
    "Collaborated with designers and backend engineers to deliver features on time.",
    "Participated in code reviews and helped improve code quality across the team.",
    "Optimized application performance using various techniques and tools."
  ],
  skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "GraphQL", "REST API", "Git", "GitHub", "Jira", "Figma"]
}
```

**Internship:**
```typescript
// ✅ GOOD
{
  title: "Blockchain Engineer Intern",
  company: "Techtics (Web3)",
  description: "Ethereum dApp during 2020 DeFi boom. Smart contracts, gas optimization, MetaMask.",
  responsibilities: [
    "Solidity contracts: Reentrancy guards, gas estimation UI. Deployed to mainnet.",
    "Gas optimization: IPFS storage, batched transactions. 65K → 38K gas (40% savings).",
    "jQuery → React: 5K lines → 40 components, Redux state. 60% fewer bugs."
  ],
  skills: ["React", "TypeScript", "Solidity", "MetaMask", "Node.js", "Express", "Redux"]
}

// ❌ BAD
{
  title: "Software Engineer (Intern)",
  company: "Techtics Blockchain PLT",
  description: "Internship position where I learned about blockchain technology and worked on various projects related to Ethereum and decentralized applications.",
  responsibilities: [
    "Learned Solidity programming language and wrote smart contracts for various use cases.",
    "Helped migrate the legacy codebase from jQuery to modern React framework.",
    "Assisted senior developers with implementing features and fixing bugs.",
    "Attended team meetings and participated in code reviews.",
    "Gained experience with Web3 technologies including MetaMask and Ethereum."
  ],
  skills: ["HTML", "CSS", "JavaScript", "React", "jQuery", "Solidity", "Blockchain", "Ethereum", "Web3", "Git"]
}
```

### Blog System
- **Content:** MDX files in `src/content/blog/`.
- **Frontmatter:** `title`, `date`, `description`, `tags[]`, `image?`, `author`.
- **Processing:** `gray-matter` for frontmatter, `next-mdx-remote` for rendering.
- **Static generation:** `generateStaticParams()` pre-renders all slugs at build time.
- **ISR:** Blog posts revalidate every 3600s (1 hour).
- **Plugins:** remark-gfm, rehype-slug, rehype-external-links.

### Section Components Pattern
Every homepage section follows this pattern:
```tsx
"use client";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";

export function XxxSection() {
  return (
    <section id="xxx" className="...">
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

## Common Tasks

### Add a new homepage section
1. Create `src/components/sections/xxx-section.tsx` following the section pattern above.
2. Add the component to `src/app/(main)/page.tsx` in the desired order.
3. Add a nav item in `src/constants/navItems.ts` if it should appear in navigation.

### Add a new UI primitive
```bash
npx shadcn@latest add <component-name>
```
This auto-generates into `src/components/ui/`. Do NOT manually create Shadcn components.

### Add a new blog post
1. Create `src/content/blog/my-post-slug.mdx`.
2. Add frontmatter: `title`, `date` (YYYY-MM-DD), `description`, `tags`, `author`.
3. Write content in MDX (supports GFM, code blocks, images).
4. The post auto-appears on `/blog` — no config changes needed.

### Update portfolio data
Edit `src/constants/data.ts`. The types in `src/types/index.ts` enforce the schema.

### Build & verify
```bash
npm run build          # Production build (catches type errors, unused imports)
npm run lint           # ESLint check
npm run build:analytics # Build with bundle size analysis
```

---

## What NOT To Do

- **Don't install new animation libraries.** Framer Motion handles everything.
- **Don't add a CSS-in-JS library.** Tailwind CSS is the only styling solution.
- **Don't create global state management.** No Redux/Zustand needed — data is static.
- **Don't modify Shadcn/ui components** in `src/components/ui/` directly (they get overwritten on update).
- **Don't use `export default`.** Always use named exports.
- **Don't hardcode colors.** Use CSS variables via Tailwind (`text-primary`, `bg-background`).
- **Don't add `console.log` in production code.**
- **Don't create separate CSS/SCSS files.** Everything goes through Tailwind or `globals.css`.
- **Don't duplicate animation variants.** Import from `@/lib/animations`.
- **Don't skip the `"use client"` directive** on components that use hooks, event handlers, or Framer Motion.

---

## Dependencies Reference

| Category | Packages |
|----------|----------|
| Framework | next@16, react@19, typescript@5 |
| Styling | tailwindcss@4, tailwind-merge, clsx, class-variance-authority |
| Animation | framer-motion@12, react-type-animation |
| UI Primitives | @radix-ui/* (via shadcn/ui), lucide-react |
| Blog/MDX | next-mdx-remote, gray-matter, remark-gfm, rehype-slug |
| Theme | next-themes |
| PDF | @react-pdf/renderer |
| Date | dayjs |
| Notifications | sonner |
