# Portfolio Website Documentation Index

This directory owns durable project knowledge. `AGENTS.md` stays a short instruction entry point, and `CLAUDE.md` links to it. Paths in topic documents refer to the repository root unless stated otherwise.

## Start here

| Task | Read before editing |
|---|---|
| Routes, modules or data flow | [Architecture](architecture.md) |
| Components, types, dependencies or routine development | [Development conventions](development.md) |
| Styling, fonts, colors or animations | [Design system](design-system.md) |
| Experience, project or profile copy | [Portfolio content guide](content-guide.md) |
| Blog publishing or MDX behavior | [Blog system](blog.md) |
| Product scope and requirements | [Requirements](../REQUIREMENTS.md) |
| Setup and running the project | [README](../README.md) |

Read this index, choose the owner, then read only the relevant document or section. UI component work normally needs both development and design guidance. Blog work also needs the content guide when writing about experience or projects.

## Source-of-truth map

| Information | Owner | Documentation role |
|---|---|---|
| Shared agent instructions | [AGENTS.md](../AGENTS.md) | Entry point and essential constraints |
| Product scope | [REQUIREMENTS.md](../REQUIREMENTS.md) | Keep requirements in their existing owner |
| Routes and implementation | `src/app/`, `src/components/`, `src/lib/` | Architecture explains structure; code owns behavior |
| Portfolio facts and core types | `src/constants/data.ts`, `src/types/index.ts` | Content guide governs presentation, not invented facts |
| Blog content | `src/content/blog/` | Blog guide describes authoring and rendering |
| Design tokens | `src/app/globals.css` | Design guide explains their intended use |
| Commands and dependencies | `package.json` | Development guide explains usage |

## Maintenance

Keep each rule or explanation in one owning document. Link to it from this index and other consumers. Verify paths and commands against the working tree. Do not create empty roadmap, design or decision files just to match another repository's layout; add them when needed and register them here. Preserve historical evidence when introducing a replacement.
