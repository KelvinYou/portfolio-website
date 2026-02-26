---
name: design-system
description: >
  Hyper-Minimalist Neo-Brutalism meets Apple Spatial Design — the visual bible for this portfolio.
  Use this skill's design tokens and patterns whenever modifying styles, creating components,
  redesigning sections, or making ANY visual decision. Must be consulted before writing CSS classes
  or Tailwind utilities. Covers color palette, glassmorphism, spotlight effect, typography, spacing,
  and interactive states.
user-invocable: false
version: "1.0.0"
---

# Design System — Hyper-Minimalist Neo-Brutalism x Apple Spatial Design

## Philosophy

1. **Void-first.** The page is pitch black. Content floats in it like Apple's spatial UI.
2. **One accent, used surgically.** Neon Cyan (`#00F0FF`) appears ONLY on hover glows, active states, and focus rings. Never in resting state.
3. **Glass, not solid.** Cards are translucent surfaces with backdrop blur — never opaque backgrounds.
4. **The spotlight follows you.** Mouse-tracking radial gradient reveals cards from darkness on hover.
5. **Brutalist type, spatial layout.** Headings are massive, tight-tracked, raw. Layouts use generous whitespace.

---

## Color Palette (STRICTLY ENFORCED)

### Base — Monochromatic
| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| Background | `#000000` | `bg-black` | Page background — pitch black |
| Foreground | `#E8E8E8` | `text-[#E8E8E8]` | Primary text — warm off-white |
| Muted text | `#737373` | `text-neutral-500` | Secondary/body text |
| Card surface | `rgba(255,255,255,0.03)` | `bg-white/[0.03]` | Card backgrounds |
| Border | `rgba(255,255,255,0.08)` | `ring-white/10` | Subtle borders |

### Accent — Neon Cyan (the ONLY saturated color)
| Usage | Value | Tailwind |
|-------|-------|----------|
| Hover glow | `rgba(0,240,255,0.06)` | In radial-gradient only |
| Active border | `rgba(0,240,255,0.2)` | `ring-[#00F0FF]/20` |
| Focus ring | `#00F0FF` | `outline-[#00F0FF]` |
| CTA button | `rgba(0,240,255,0.5)` | `bg-[#00F0FF]/50` |
| Hover text | `#00F0FF` | `hover:text-[#00F0FF]` |

### Hard Rules
- **NEVER** use accent color in resting/default state
- **NEVER** introduce a second saturated color
- **NEVER** use opaque white/gray backgrounds — always `bg-white/5` or lower
- Links: `text-[#E8E8E8]` at rest → `text-[#00F0FF]` on hover only

---

## Glassmorphism Patterns

### Base Glass Card
```
bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 rounded-2xl
```

### Glass Card with Hover Upgrade
```
bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 rounded-2xl
transition-all duration-500
hover:bg-white/[0.06] hover:ring-[#00F0FF]/20
```

### BentoCard with Mouse-Tracking Spotlight
The signature interaction. Uses `onMouseMove` to position a radial gradient:
```
radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0,240,255,0.06), transparent 40%)
```
Applied as an absolutely-positioned overlay, `opacity-0` at rest, `group-hover:opacity-100` on hover.

---

## Typography

### Fonts
- **Headings:** Space Grotesk (`font-heading`) — bold, brutalist
- **Body:** Archivo (`font-sans`) — clean, legible

### Type Scale
| Element | Size | Tracking | Weight |
|---------|------|----------|--------|
| Hero title | `text-6xl md:text-7xl lg:text-8xl xl:text-9xl` | `-0.05em` | `font-bold` |
| Section heading | `text-4xl md:text-5xl lg:text-6xl` | `-0.03em` | `font-bold` |
| Card title | `text-xl md:text-2xl` | `-0.02em` | `font-semibold` |
| Body | `text-base` (16px) | `0` | `font-normal` |
| Label/caption | `text-xs uppercase` | `tracking-[0.2em]` | `font-medium` |

### Color Rules
- Headings: `text-[#E8E8E8]` — bright on black
- Body: `text-neutral-500` — recedes into void
- Accent text: ONLY on hover — `group-hover:text-[#00F0FF]`

---

## Spacing & Layout (Apple Spatial)

| Element | Value |
|---------|-------|
| Section vertical padding | `py-32 md:py-40` (128-160px) |
| Container | `max-w-7xl mx-auto px-6 md:px-8` |
| Bento grid gaps | `gap-4 md:gap-6` |
| Card internal padding | `p-6 md:p-8` |
| Heading-to-content gap | `mb-16 md:mb-24` |

---

## Interactive States

### Hover
- Cards: Spotlight glow + border upgrade to `ring-[#00F0FF]/20` + `bg-white/[0.06]`
- Links: `text-[#E8E8E8]` → `text-[#00F0FF]` (300ms transition)
- Buttons: Glow shadow `shadow-[0_0_20px_rgba(0,240,255,0.15)]`
- Icons: `opacity-50` → `opacity-100` + `text-[#00F0FF]`

### Focus Visible
```
outline-2 outline-[#00F0FF] outline-offset-2 ring-4 ring-[#00F0FF]/20
```

### Active/Pressed
```
active:scale-[0.98] transition-transform duration-100
```

---

## Backgrounds

- Page: `bg-black` — pure #000000
- Ambient grid (optional): `bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]`
- Gradient orbs (optional): Fixed-position radial gradients at `accent/5` for depth

---

## Responsive

| Breakpoint | Layout |
|------------|--------|
| Default | Mobile — single column stacked |
| `md:` (768px) | Tablet — 2-column Bento |
| `lg:` (1024px) | Desktop — full Bento layout |
| `xl:` (1280px) | Large — max readability |

- Touch targets: 44x44px minimum on mobile
- Font: 16px minimum (prevents iOS zoom)
- Spotlight effect: Disabled on touch devices (no hover)

---

## Status Badge Colors

| Status | Classes |
|--------|---------|
| Completed | `bg-emerald-500/20 text-emerald-400` |
| In Progress | `bg-[#00F0FF]/20 text-[#00F0FF]` |
| Maintaining | `bg-violet-500/20 text-violet-400` |
| Focusing | `bg-amber-500/20 text-amber-400` |
