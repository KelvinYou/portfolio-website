---
name: create-component
description: >
  Create a new reusable UI component following the project's design system and code conventions.
  Use when the user says "create a component", "build a reusable...", "make a card component",
  "I need a component for...", or when a new visual element is needed that doesn't exist yet.
  Always consult the design-system skill for visual patterns.
user-invocable: true
argument-hint: "[component-name]"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
version: "1.0.0"
---

# Create Component

Build a new reusable component following project conventions.

**IMPORTANT:** Consult the `design-system` skill before making any visual decisions.

## Classification — Where Does It Go?

| Type | Location | Example |
|------|----------|---------|
| Shadcn/ui primitive | Run `npx shadcn@latest add <name>` | button, dialog, tabs |
| Small generic reusable | `src/components/ui/` | `section-header.tsx`, `status-badge.tsx` |
| Feature-specific | `src/components/` | `project-card.tsx` |
| Feature module (multi-file) | `src/components/{feature}/` | `gallery/`, `experience/` |

**Check Shadcn first:** Before creating a generic primitive, verify it doesn't already exist at https://ui.shadcn.com/docs/components.

## Component Template

```tsx
"use client"; // ONLY if using hooks, event handlers, or Framer Motion

import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MyComponent({
  title,
  description,
  className,
  children,
}: MyComponentProps) {
  return (
    <div className={cn("base-classes-here", className)}>
      {/* content */}
    </div>
  );
}
```

## Checklist

**Structure:**
- [ ] Named export (`export function`, never `export default`)
- [ ] Props interface defined above the component
- [ ] `className` prop accepted and merged with `cn()`
- [ ] `"use client"` directive only if component uses client-side features
- [ ] `React.memo()` wrapper for list-item components receiving props

**Styling (design system compliant):**
- [ ] Tailwind utility classes only — no inline styles except dynamic values
- [ ] Colors via design tokens: `text-[#E8E8E8]`, `text-neutral-500`, `bg-white/[0.03]`
- [ ] Glass effect: `backdrop-blur-md bg-white/[0.03] ring-1 ring-white/10 rounded-2xl`
- [ ] Accent (`#00F0FF`) used ONLY on hover/active/focus states
- [ ] Responsive: mobile-first with `sm:`, `md:`, `lg:`, `xl:` breakpoints

**Interactions:**
- [ ] Hover state present on all interactive elements
- [ ] Focus-visible: `outline-2 outline-[#00F0FF] outline-offset-2`
- [ ] Active: `active:scale-[0.98]` for pressable elements
- [ ] Transitions: `transition-all duration-300` (or `duration-500` for cards)

**Animation (if animated):**
```tsx
import { motion } from "framer-motion";
import { fadeIn, defaultViewport } from "@/lib/animations";

<motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeIn}>
```

**Quality:**
- [ ] Under 300 lines — extract sub-components if larger
- [ ] Semantic HTML (proper heading levels, landmarks, lists)
- [ ] ARIA labels on interactive elements without visible text
- [ ] Touch targets: 44x44px minimum on mobile
- [ ] TypeScript compiles: `npm run build`

## BentoCard Pattern (Spotlight Effect)

The signature component for this project. Use for any card that needs the mouse-tracking spotlight:

```tsx
"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
}

export function BentoCard({ className, children }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setSpotlightStyle({
      background: `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(0,240,255,0.06), transparent 40%)`,
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlightStyle({})}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10",
        "transition-all duration-500 hover:ring-[#00F0FF]/20 hover:bg-white/[0.06]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={spotlightStyle}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
```

## Reference Files
- Utility (`cn`): `src/lib/utils.ts`
- Animation variants: `src/lib/animations.ts`
- Types: `src/types/index.ts`
- Example — small reusable: `src/components/ui/section-header.tsx`
- Example — feature card: `src/components/project-card.tsx`
- Example — feature module: `src/components/gallery/`
- Design system: `.claude/skills/design-system/SKILL.md`
