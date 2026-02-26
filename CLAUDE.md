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
  - `.card-hover-lift` — Card interaction with lift + border color shift
  - `.glass-card` — Glassmorphism card (backdrop-blur + border)
  - `.smooth-interaction` — Micro-interaction (scale on hover/active)
  - `.geometric-bg` — Animated geometric pattern background

### Fonts
- **Body:** Archivo (`--font-archivo`) — Clean, modern sans-serif
- **Headings:** Space Grotesk (`--font-space-grotesk`) — Bold, distinctive
- Both loaded via `next/font/google` in `layout.tsx`.

### Colors (CSS Variables)
- **Light mode:** `--background: #FAFAFA`, `--foreground: #09090B`, `--primary: #2563EB`
- **Dark mode:** `--background: #18181B`, `--foreground: #FAFAFA`, `--primary: #3B82F6`
- Always reference via Tailwind (`bg-background`, `text-foreground`, `text-primary`).
- Never hardcode hex values in components.

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
