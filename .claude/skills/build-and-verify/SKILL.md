---
name: build-and-verify
description: >
  Run build checks, linting, and dev server verification. Make sure to use this skill
  after completing ANY code changes to verify nothing is broken. Also use when the user says
  "check if it builds", "run the build", "verify everything works", "any errors?", or
  "start the dev server".
user-invocable: true
allowed-tools: Bash
version: "1.0.0"
---

# Build & Verify

Run after completing any code changes. Catches errors before the user sees them.

## Step 1 — Kill Existing Servers
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null
```

## Step 2 — Production Build (catches all errors)
```bash
npm run build
```
Validates:
- TypeScript type errors
- Unused imports/variables
- MDX parsing errors
- Missing dependencies
- Invalid page/layout exports
- Static generation failures (blog posts)

## Step 3 — Lint
```bash
npm run lint
```
Checks ESLint (`next/core-web-vitals`, `next/typescript`) and Prettier formatting.

## Step 4 — Start Dev Server
```bash
npm run dev
```
Uses Turbopack. Verify:
- Homepage loads without hydration errors
- All sections render
- Navigation works
- Blog pages load
- Theme switching works

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Module not found: '@/...'` | Bad import path | Verify path exists under `src/` |
| `'X' is not assignable to type 'Y'` | Type mismatch | Check `src/types/index.ts` |
| `Text content does not match` | Hydration mismatch | Wrap dynamic content in `useEffect` |
| `'use client' must be at the top` | Directive not on line 1 | Move `"use client"` before imports |
| `Image is missing width/height` | Next.js Image requirement | Use `fill` with parent `relative` |
| `Cannot find module` | Missing dependency | Run `npm install` |

## Bundle Analysis (optional)
```bash
npm run build:analytics
```
Opens the bundle analyzer to check for bloated dependencies or duplicate modules.

## Reference
- Next.js config: `next.config.ts`
- TypeScript: `tsconfig.json`
- ESLint: `eslint.config.mjs`
- PostCSS: `postcss.config.mjs`
