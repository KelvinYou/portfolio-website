# Design System

Paths in this document are relative to the repository root.

## Blog reading treatment

Blog routes use a restrained editorial treatment within the existing theme:
one centered reading column, the body sans-serif face for article headings,
normal-case secondary labels, and borders only where they separate content.
Keep navigation secondary to the article or archive. The outline is disclosed on
request. Article galleries expose labeled thumbnails and a “View all” overview
so visual minimalism does not hide available content; image controls stay outside
the artwork. Blog content does not use page-entry opacity animations. This
treatment is scoped to the blog; homepage section layouts retain their existing
visual direction. [Blog system](blog.md) owns the interaction details.

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
