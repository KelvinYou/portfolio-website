# Blog Expert Reference

## Existing Posts Inventory

| Slug | Title | Date | Type | Tags |
|------|-------|------|------|------|
| `autocomplete-search` | Building a Production-Ready Autocomplete Search Component in React | 2025-05-20 | Tutorial | React, TypeScript, Tailwind CSS, Hooks |
| `instagram-feed` | Cracking the Frontend System Design Interview: Designing an Instagram Feed | 2025-12-25 | Deep Dive | Frontend, System Design, Interview |
| `beyondsoft` | Scaling Frontend at Tencent: My First Year as a Frontend Engineer | 2024-06-04 | Case Study | System Architecture, React, Performance |
| `nextjs-seo` | Next.js SEO: Setting up meta tags for SEO of my portfolio website | 2025-03-09 | Tutorial | Next.js, SEO, Web Development |
| `personal-website` | Why I Created My Personal Website | 2025-03-06 | Personal | Personal Website, Portfolio |
| `bbk-business-summarize` | — | — | — | — |
| `fl-b40-to-t20` | — | — | — | — |

---

## Frontmatter Schema

```yaml
---
title: "Descriptive, keyword-rich title (under 60 chars ideal)"
date: "YYYY-MM-DD"
description: "Compelling 1-2 sentence summary, 100-150 chars, includes primary keyword"
tags: ["Capitalized", "Tag Names", "3-6 Tags"]
image: "/images/blogs/{slug}/hero.png"
author: "Me"
---
```

### Field Rules
- **title:** Under 60 chars ideal. No clickbait. Include primary keyword
- **date:** ISO format `YYYY-MM-DD`. Use today's date for new posts
- **description:** 100-150 chars. Action verb + what reader learns + key tech
- **tags:** 3-6 tags, capitalize first letter (`"React"` not `"react"`)
- **image:** Path to `public/images/blogs/{slug}/hero.png` (1200x630 for OG)
- **author:** Always `"Me"`

---

## Post Type Templates

### Tutorial (step-by-step, code-heavy)

Best for: How-to guides, building something from scratch.

```markdown
[1-2 sentence hook: state the problem and why it matters]

[Optional: bullet list of challenges this solves]

---

## The Tech Stack
[Table or bullet list of tools used]

---

## Step 1: [Foundation/Setup]
[Explain the concept, then show code]

` ` `tsx
// Complete, runnable code with inline comments
` ` `

---

## Step 2: [Core Logic]
[Build on previous step]

` ` `tsx
// Code that extends Step 1
` ` `

---

## Step 3: [Integration/Polish]
[Connect the pieces]

` ` `tsx
// Final integration code
` ` `

---

## Bonus: [Advanced Enhancement]
[Optional: extra feature or optimization]

---

## Conclusion
[Checklist of what was built, each prefixed with a checkmark emoji]
[One sentence on extensibility or next steps]
```

**Reference post:** `autocomplete-search.mdx`

---

### Deep Dive / System Design (architecture-focused)

Best for: Interview prep, system design breakdowns, architecture decisions.

```markdown
## Phase 1: Scope (Clarify Requirements)
[Functional + non-functional requirements as bullet lists]

---

## Phase 2: API Contract
[TypeScript interfaces for the data model]

` ` `typescript
interface ApiResponse {
  data: Item[];
  meta: { cursor: string; hasMore: boolean };
}
` ` `

---

## Phase 3: High-Level Architecture
[Data flow diagram or description]
![Architecture](/images/blogs/{slug}/architecture.png)

---

## Phase 4: Technical Challenges
### 1. [Challenge Name]
**The Problem:** [1 sentence]
**The Solution:** [Technique + library]
**Implementation:** [Code or explanation]

### 2. [Challenge Name]
[Same pattern]

---

## Phase 5: Trade-offs
| Decision | Trade-off | Mitigation |
|----------|-----------|------------|
| Choice A | Downside  | How to handle |

---

## Final Summary
[Framework or mnemonic to remember key points]
```

**Reference post:** `instagram-feed.mdx`

---

### Case Study / Experience (narrative + technical)

Best for: Work experience stories, project retrospectives, career reflections.

```markdown
## The Mission
[2-3 sentences: company, role, scale of impact]

---

## The Tech Stack
| Domain | Technologies |
|--------|-------------|
| Core   | React, TypeScript |
| Arch   | Micro-frontends |

---

## Challenge 1: [Technical Challenge]
**The Problem:** [Context]
**My Solution:** [What you did + measurable outcome]

---

## Challenge 2: [Process/Communication Challenge]
[Same pattern — show soft skills alongside technical]

---

## Challenge 3: [Performance/Scale Challenge]
**Optimization Strategy:**
1. [Step + tool]
2. [Step + tool]
3. [Step + result]

---

## Key Wins
- [Metric-driven accomplishment]
- [Metric-driven accomplishment]
- [Metric-driven accomplishment]

---

## Closing Thoughts
[1-2 sentences on what you learned]
[Forward-looking statement]

---

## Photo Gallery (optional)
<Gallery items={[...]} columns={3} showTitles={true} />
```

**Reference post:** `beyondsoft.mdx`

---

### Short Post / Personal (opinion, reflection)

Best for: Quick thoughts, motivations, announcements.

```markdown
[Opening statement — personal and direct]

## Why [Topic]
- **Reason 1** — Explanation
- **Reason 2** — Explanation
- **Reason 3** — Explanation

[Optional: small code snippet for flavor]

[Closing: 1-2 sentences, forward-looking]
```

**Reference post:** `personal-website.mdx`

---

## MDX Features Available

### Code Blocks
Always specify language. Supported: `tsx`, `typescript`, `javascript`, `bash`, `css`, `json`, `yaml`, `sql`, `python`, `go`, `rust`, `solidity`.

````markdown
```tsx
function Example() {
  return <div>Hello</div>;
}
```
````

- Line numbers auto-shown for 5+ lines
- Copy button auto-added
- Syntax highlighting with theme-aware colors (dark/light)

### GFM Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```
Tables get hover effects and primary-color header backgrounds.

### Images
```markdown
![Alt text](/images/blogs/{slug}/image-name.png)
```
- Rendered as Next.js `Image` (auto-optimized)
- Store in `public/images/blogs/{slug}/`
- Hero images: 1200x630px (OG-compliant)

### Gallery Component (JSX in MDX)
```jsx
<Gallery
  items={[
    {
      id: "1",
      type: "image",
      src: "/images/blogs/{slug}/photo.png",
      alt: "Description",
      title: "Photo Title",
      description: "Context about the photo",
      width: 1200,
      height: 800,
      metadata: {
        dateCreated: "Month Year",
        location: "Place"
      }
    }
  ]}
  columns={3}
  showTitles={true}
  showDescriptions={true}
  gap="lg"
/>
```

### Headings (auto-generate IDs via rehype-slug)
```markdown
## My Section        → id="my-section"
### My Subsection    → id="my-subsection"
```
Used for Table of Contents (auto-generated on the post page).

### Inline Formatting
- `**bold**` for key terms and emphasis
- `*italic*` for titles, foreign words
- `` `inline code` `` for function names, variables, file paths
- `[Link text](url)` — external links auto-get `target="_blank"`

### Blockquotes
```markdown
> Key insight or important callout
```
Rendered with gradient left border and muted background.

### Horizontal Rules
```markdown
---
```
Use between major sections for visual separation (consistent with existing posts).

---

## Writing Quality Checklist

### Structure
- [ ] Strong opening hook (problem statement or bold claim, NOT "In this article...")
- [ ] Clear heading hierarchy (`##` sections, `###` subsections, no skips)
- [ ] Sections separated with `---` horizontal rules
- [ ] Paragraphs under 4 sentences
- [ ] Conclusion summarizes key points

### Technical Content
- [ ] Code blocks are complete and runnable (or clearly marked as pseudocode)
- [ ] Language identifier on every code fence
- [ ] Code has inline comments explaining non-obvious parts
- [ ] Technical claims backed by specifics (metrics, library names)
- [ ] Trade-offs acknowledged, not just happy path

### Writing Style
- [ ] Active voice: "Built..." not "Was responsible for..."
- [ ] Specific: "35% faster" not "much faster"
- [ ] No filler: cut "It's worth noting", "Basically", "As we all know"
- [ ] Mix of short punchy sentences and longer explanatory ones
- [ ] First-person where natural, professional but conversational

### SEO & Metadata
- [ ] Title under 60 chars, keyword-rich
- [ ] Description 100-150 chars with primary keyword
- [ ] 3-6 capitalized tags
- [ ] Date in YYYY-MM-DD format
- [ ] Author is "Me"

---

## Processing Pipeline

1. `gray-matter` parses YAML frontmatter from `.mdx` files
2. `next-mdx-remote` v6 serializes MDX content with plugins:
   - `remark-gfm` — tables, strikethrough, task lists
   - `rehype-slug` — auto-generate heading IDs for TOC
   - `rehype-external-links` — `target="_blank"` on external links
3. Custom component map in `src/components/mdx/mdx-remote-render.tsx` styles all elements
4. `src/components/mdx/code-block.tsx` handles syntax highlighting (Prism-based, theme-aware)
5. Reading time calculated at ~200 words/minute

## Content Directory

All posts: `src/content/blog/*.mdx`
Blog images: `public/images/blogs/{slug}/`
