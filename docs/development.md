# Development Conventions

Paths and commands are relative to the repository root.

### TypeScript
- Strict mode enabled.
- Path alias: `@/*` maps to `./src/*`.
- All component props must be typed with interfaces, not inline types.
- Export types from `src/types/index.ts`.

### Components
- **Client components:** Must have `"use client"` directive at top.
- **Server components:** Default. Used for data fetching (blog pages, listings).
- **Naming:** PascalCase for components, kebab-case for file names.
- **Pattern:** Use named exports for reusable components. Keep the default exports required by Next.js file conventions, including pages and layouts.
  ```tsx
  // CORRECT
  export function MyComponent() { ... }
  export const MyComponent = React.memo(function MyComponent() { ... });

  // Avoid for reusable components; framework entry points are exempt.
  export default function MyComponent() { ... }
  ```
- **Props pattern:** Destructure props in function signature.
- **Memoization:** Use `React.memo` for cards/list items that receive props.

## Common Tasks

### Add a new homepage section
1. Create `src/components/sections/xxx-section.tsx` following the section pattern above.
2. Add the component to `src/app/[locale]/(main)/page.tsx` in the desired order.
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

## What NOT To Do

- **Don't install new animation libraries.** Framer Motion handles everything.
- **Don't add a CSS-in-JS library.** Tailwind CSS is the only styling solution.
- **Don't create global state management.** No Redux/Zustand needed — data is static.
- **Don't modify Shadcn/ui components** in `src/components/ui/` directly (they get overwritten on update).
- **Exports:** Follow the Components rule above; Next.js framework entry points retain their required default exports.
- **Don't hardcode colors.** Use CSS variables via Tailwind (`text-primary`, `bg-background`).
- **Don't add `console.log` in production code.**
- **Don't create separate CSS/SCSS files.** Everything goes through Tailwind or `globals.css`.
- **Don't duplicate animation variants.** Import from `@/lib/animations`.
- **Don't skip the `"use client"` directive** on components that use hooks, event handlers, or Framer Motion.

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
