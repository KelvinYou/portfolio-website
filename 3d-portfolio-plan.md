# 3D Portfolio Integration Plan

## Goal

Integrate Bruno Simon's `folio-2025` (Three.js + Vite) as a `/3d` route inside the existing
Next.js portfolio — reachable at `kelvinyou.vercel.app/3d` — with Kelvin's own data.

---

## Two Approaches

### Option A — iframe (already proven working)

The Vite project builds to static files, which are copied to `public/3d/` and served via
a full-screen Next.js page that iframes `/3d/index.html`.

**Pros:**
- Works today (already tested — `/3d` returns 200)
- Zero webpack complexity
- Bruno's WASM / KTX2 / WebGPU pipeline stays intact
- Trivial to update: rebuild folio-3d → copy dist → done

**Cons:**
- Two separate build steps
- `public/3d/` (~hundreds of MB of assets) must be committed or built on CI
- iframe feels like a workaround (even though it's architecturally correct)

---

### Option B — React component inside Next.js (user's preference)

Copy Bruno's JS source files into `src/three-portfolio/`, fix compatibility shims, and
mount the Three.js game via `useEffect` in a `"use client"` component.

**Pros:**
- Single codebase, single build
- Code lives in `src/` like everything else
- No iframe

**Cons (honest):**
- Significant up-front migration work
- Fragile: Bruno's code was designed for Vite — not webpack
- End result looks and behaves identically to Option A

---

## Chosen Approach: Option B

---

## Implementation Steps

### Step 1 — Copy static assets

```
folio-3d/static/  →  portfolio-website/public/folio/
```

All GLBs, KTX2 textures, sounds, fonts, draco/, basis/, ui/ go under `/folio/` to avoid
collisions with existing portfolio assets (`/images/`, `/blogs/`, etc.).

**Size warning:** ~400–600 MB. Must be committed to git or generated in CI.

---

### Step 2 — Copy JS source files

```
folio-3d/sources/Game/   →  src/three-portfolio/
folio-3d/sources/data/   →  src/three-portfolio/data/
folio-3d/sources/threejs-override.js  →  src/three-portfolio/
```

No file renames. Internal relative imports stay valid.

---

### Step 3 — Patch `import.meta.env` (8 occurrences, 6 files)

Vite-specific env vars are not available in Next.js. Replace each occurrence with a
hardcoded value or `process.env.NEXT_PUBLIC_*`.

| File | Variable | Replacement |
|------|----------|-------------|
| `Game/Game.js` | `VITE_COMPRESSED` | `'true'` |
| `Game/Game.js` | `VITE_PLAYER_SPAWN` | `'landing'` |
| `Game/Server.js` | `VITE_SERVER_URL` | `''` |
| `Game/Audio.js` | `VITE_MUSIC` | `undefined` |
| `Game/World/Whispers.js` | `VITE_WHISPERS_COUNT` | `undefined` |
| `Game/Cycles/DayCycles.js` | `VITE_DAY_CYCLE_PROGRESS` | `null` |
| `Game/Cycles/YearCycles.js` | `VITE_YEAR_CYCLE_PROGRESS` | `null` |

---

### Step 4 — Patch asset base path in `ResourcesLoader.js`

All asset URLs are relative (e.g. `terrain/terrain-compressed.glb`). In a browser these
resolve relative to the current page URL. For a page at `/3d`:

```
terrain/terrain-compressed.glb  →  resolves to  /terrain/terrain-compressed.glb  ❌
```

Fix: add a static `BASE_PATH = '/folio/'` to `ResourcesLoader.js` and prefix every
`loader.load()` call and `setTranscoderPath` / `setDecoderPath` calls.

```js
// ResourcesLoader.js
static BASE_PATH = '/folio/'

// setTranscoderPath('./basis/')  →  setTranscoderPath(ResourcesLoader.BASE_PATH + 'basis/')
// setDecoderPath('./draco/')     →  setDecoderPath(ResourcesLoader.BASE_PATH + 'draco/')
// loader.load(path, ...)         →  loader.load(ResourcesLoader.BASE_PATH + path, ...)
```

---

### Step 5 — Configure Next.js webpack for WASM

Rapier3D (physics library) uses WebAssembly. Add to `next.config.ts`:

```ts
webpack: (config) => {
  config.experiments = { ...config.experiments, asyncWebAssembly: true }
  return config
}
```

---

### Step 6 — Handle compiled CSS

The folio UI (menus, overlays, buttons) is styled with Stylus, compiled by Vite.
Strategy: build `folio-3d` once locally, copy `dist/assets/index-*.css` into
`src/three-portfolio/folio.css`, import it inside the React component with
`import './folio.css'`. This CSS only applies on the `/3d` page.

Risk: class name collisions with portfolio global styles (`.menu`, `.overlay`).
Mitigation: the `/3d` page has no layout (no navbar/footer), so conflicts are unlikely.

---

### Step 7 — Create the React component

`src/components/three-portfolio/ThreePortfolio.tsx`

```tsx
"use client"
import { useEffect, useRef } from "react"
import "./folio.css"   // scoped to this component's page

export function ThreePortfolio() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    // Inject the .game div structure Bruno's Game.js expects
    // then dynamically import Game to avoid SSR
    let cleanup: (() => void) | undefined

    import("@/three-portfolio/Game/Game").then(({ Game }) => {
      const game = new Game(rootRef.current!)
      cleanup = () => game.destroy?.()
    })

    return () => cleanup?.()
  }, [])

  return (
    <div ref={rootRef} className="game" style={{ width: "100vw", height: "100vh" }}>
      {/* Full DOM structure from folio-2025/sources/index.html goes here */}
      <canvas className="js-canvas" />
      {/* ... touch buttons, menu, map trigger, modals, etc. */}
    </div>
  )
}
```

The full JSX structure (~200 lines) is a direct conversion of `folio-2025/sources/index.html`
body content.

---

### Step 8 — Create the `/3d` page

`src/app/3d/page.tsx` — outside `[locale]` group, no layout (no navbar/footer).

```tsx
import dynamic from "next/dynamic"

const ThreePortfolio = dynamic(
  () => import("@/components/three-portfolio/ThreePortfolio").then(m => m.ThreePortfolio),
  { ssr: false }
)

export default function ThreeDPage() {
  return <ThreePortfolio />
}
```

`ssr: false` is required — Three.js / WebGPU / document queries cannot run on the server.

Also update `src/middleware.ts` matcher to exclude `/3d`:

```ts
matcher: ["/((?!api|_next|_vercel|feed\\.xml|3d|.*\\..*).*)"]
```

---

### Step 9 — Data migration (separate task, after Step 8 works)

Once the 3D experience loads correctly with Bruno's original data:

1. Update `src/three-portfolio/data/projects.js` with Kelvin's projects
2. Update `src/three-portfolio/data/social.js` with Kelvin's social links
3. Copy Kelvin's project images (PNG) to `public/folio/projects/images/`
4. Patch `ProjectsArea.js` to detect `.png` extension and use `TextureLoader` instead of
   `KTX2Loader` for those files

A `scripts/sync-3d-data.mts` script can automate reading `constants/data.ts` and
writing the folio data files — run with `tsx scripts/sync-3d-data.mts`.

---

## Files Created / Modified

| Action | Path |
|--------|------|
| Create | `src/three-portfolio/**` (copied from folio-3d/sources/Game + data) |
| Create | `src/three-portfolio/folio.css` (from folio-3d build output) |
| Create | `src/components/three-portfolio/ThreePortfolio.tsx` |
| Create | `src/app/3d/page.tsx` |
| Create | `public/folio/**` (copied from folio-3d/static) |
| Modify | `src/three-portfolio/ResourcesLoader.js` (BASE_PATH) |
| Modify | `src/three-portfolio/Game.js` (import.meta.env × 2) |
| Modify | `src/three-portfolio/Server.js` (import.meta.env × 1) |
| Modify | `src/three-portfolio/Audio.js` (import.meta.env × 1) |
| Modify | `src/three-portfolio/World/Whispers.js` (import.meta.env × 1) |
| Modify | `src/three-portfolio/Cycles/DayCycles.js` (import.meta.env × 1) |
| Modify | `src/three-portfolio/Cycles/YearCycles.js` (import.meta.env × 1) |
| Modify | `next.config.ts` (asyncWebAssembly) |
| Modify | `src/middleware.ts` (exclude /3d) |

---

## Known Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| WASM loading fails in Next.js webpack | Medium | `asyncWebAssembly: true` + test locally |
| CSS class collisions with portfolio | Low | `/3d` page has no shared layout |
| `three/webgpu` requires browser globals (WebGPU API) | Low | Already true in original — same browsers |
| Unexpected `import.meta` usage beyond the 8 known occurrences | Low | `grep -r import.meta` before starting |
| Asset size bloating git repo | High | Use `.gitignore` + CI build step for `public/folio/` |
| `Game.destroy()` not implemented — memory leak on unmount | Medium | Audit Game.js for cleanup; scope to full-page usage |

---

## Open Questions Before Starting

1. **Asset storage:** Commit `public/folio/` to git (~500MB), or build on CI?
   - Recommended: add a `prebuild:3d` script and exclude from git (add to `.gitignore`)

2. **Data sync:** Manual update of folio data files, or automated script?
   - Recommended: automated `scripts/sync-3d-data.mts`

3. **Deployment:** Is `folio-3d/` present on the Vercel build environment?
   - Recommended: move `folio-3d` inside `portfolio-website/` as `folio-3d/` subdir,
     add `folio-3d/` to `.gitignore` if assets are large, or commit compressed assets only
