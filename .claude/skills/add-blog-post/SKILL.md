---
name: add-blog-post
description: >
  Create a new MDX blog post in the portfolio. Use when the user says "write a blog post",
  "add a new article", "create a post about...", or wants to publish any written content.
  Handles frontmatter, slug generation, MDX formatting, and build verification.
user-invocable: true
argument-hint: "[topic]"
allowed-tools: Read, Write, Glob, Grep, Bash
version: "1.0.0"
---

# Add Blog Post

Create a new MDX blog post at `src/content/blog/{slug}.mdx`.

## Workflow

### 1. Gather Requirements
Ask the user (if not provided via `$ARGUMENTS`):
- **Topic/title** for the post
- **Key points** to cover
- **Code examples** to include (language, framework)
- **Tags** (suggest relevant ones from existing posts)

### 2. Generate Slug
- Convert title to kebab-case: lowercase, hyphens, no special characters
- Example: `"Building a REST API with Go"` → `building-a-rest-api-with-go`
- Verify slug doesn't conflict: check `src/content/blog/` for existing files

### 3. Create MDX File

**Path:** `src/content/blog/{slug}.mdx`

**Frontmatter (required):**
```yaml
---
title: "Exact Post Title"
date: "YYYY-MM-DD"
description: "Concise 1-2 sentence SEO description"
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/{slug}.jpg"
author: "Kelvin You"
---
```

### 4. Write Content

**Structure:**
- Opening paragraph — hook the reader, state the problem
- `## Section Headings` for major parts
- `### Subsections` for breakdowns
- Code blocks with language identifiers: ` ```tsx `, ` ```bash `, etc.
- Keep paragraphs to 3-4 sentences
- Use GFM: tables, task lists, footnotes where helpful
- Add alt text to all images

**Tone:** Professional but approachable. First-person where natural.

### 5. Verify
- Run `npm run build` to catch MDX parsing errors
- Confirm post appears in blog listing
- Check slug renders at `/blog/{slug}`

## Rules
- Author is always `"Kelvin You"`
- Date format: `YYYY-MM-DD` (use today's date unless specified)
- Tags: lowercase
- Images go in `public/images/blog/`
- Posts are auto-discovered — no config changes needed
- External links get `target="_blank"` automatically via rehype plugin

## Reference Files
- Existing posts (for style reference): `src/content/blog/*.mdx`
- MDX processing logic: `src/lib/mdx.ts`
- Blog listing page: `src/app/blog/page.tsx`
- Post renderer: `src/app/blog/[slug]/client.tsx`
- MDX components: `src/components/mdx/`
