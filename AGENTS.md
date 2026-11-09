# Portfolio Website — Agent Instructions

This file owns shared agent instructions. `CLAUDE.md` links here; maintain one copy.

## Read order

1. Read [docs/INDEX.md](docs/INDEX.md) and select the documents relevant to the task.
2. Read those documents before editing their area; detailed conventions apply there.
3. Use the owning source files for current behavior, dependencies and content.

## Project

Personal portfolio for Kelvin You. Next.js App Router, React, TypeScript and Tailwind CSS; deployed on Vercel. Product scope remains in [REQUIREMENTS.md](REQUIREMENTS.md).

## Critical rules

- Never touch `.env` files without explicit permission.
- Never mock data outside tests. Portfolio data belongs in `src/constants/data.ts`.
- Keep new files under 300 lines; split modules when necessary.
- Follow existing patterns and keep changes within the requested scope.
- Before starting a dev server, stop existing project dev servers.
- After application changes, start the dev server for user testing. Documentation-only changes need no server.

## Commands

Run from the repository root; [package.json](package.json) owns the command definitions.

- `npm run dev` — development server.
- `npm run typecheck` — TypeScript validation.
- `npm run lint` — ESLint.
- `npm run build` — production build.
- `npm run build:analytics` — bundle analysis.

## Documentation ownership

Keep detailed architecture, development, design and content guidance under `docs/`, indexed by [docs/INDEX.md](docs/INDEX.md). Update the owning document when behavior changes; do not copy its body into this file. Add plans or decisions only when there is material work to record.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
