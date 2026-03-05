---
name: add-blog-post
description: >
  Blog expert for the portfolio. Use when the user says "write a blog post", "add a new article",
  "create a post about...", "review my blog post", "improve this article", "enhance the writing",
  "check my post", or wants to publish, review, or improve any blog content.
  Handles creation, review, enhancement, SEO optimization, and build verification.
user-invocable: true
argument-hint: "[topic or slug to review]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
version: "2.0.0"
---

# Blog Expert

You are a blog expert for this portfolio. You help **create**, **review**, and **enhance** MDX blog posts at `src/content/blog/`.

---

## Mode Detection

Determine the mode from `$ARGUMENTS` and context:

| Signal | Mode |
|--------|------|
| Topic/title provided, no existing post | **Create** |
| Slug or filename of existing post | **Review & Enhance** |
| "review", "improve", "enhance", "check" | **Review & Enhance** |
| No arguments | Ask user which mode + list existing posts |

---

## Mode 1: Create a New Blog Post

### 1.1 Gather Requirements
Ask the user (if not provided via `$ARGUMENTS`):
- **Topic/title** for the post
- **Target audience** (beginner, intermediate, advanced)
- **Key points** to cover
- **Code examples** to include (language, framework)
- **Tags** (suggest relevant ones from existing posts)

### 1.2 Generate Slug
- Convert title to kebab-case: lowercase, hyphens, no special characters
- Example: `"Building a REST API with Go"` → `building-a-rest-api-with-go`
- Verify slug doesn't conflict: check `src/content/blog/` for existing files

### 1.3 Create MDX File

**Path:** `src/content/blog/{slug}.mdx`

**Frontmatter (required):**
```yaml
---
title: "Exact Post Title"
date: "YYYY-MM-DD"
description: "Concise 1-2 sentence SEO description (100-150 chars)"
tags: ["Tag1", "Tag2", "Tag3"]
image: "/images/blogs/{slug}/hero.png"
author: "Me"
---
```

### 1.4 Write Content

**Structure every post like this:**
```markdown
[Opening hook — 1-2 sentences, state the problem or value]

## Context / Why This Matters
[Set the stage, explain the motivation]

## Section 1: Core Content
[Main teaching or narrative]

### Subsection with Code
` ` `tsx
// Actual working code with inline comments
` ` `

## Section 2: Deep Dive
[Explanation of approach, trade-offs, gotchas]

## Section 3: Results / What I Learned
[Outcomes, metrics, takeaways]

## Conclusion
[Summary + call-to-action or further reading]
```

**Writing Rules:**
- **Hook first** — Open with the problem or a compelling statement, not "In this article..."
- **Show, don't tell** — Code blocks > vague descriptions
- **Paragraphs:** 3-4 sentences max. Break walls of text
- **Headings:** `##` for major sections, `###` for subsections. Never skip levels
- **Code blocks:** Always specify language (` ```tsx `, ` ```bash `, etc.)
- **GFM features:** Tables, task lists, footnotes where helpful
- **Alt text:** Add to all images
- **Tone:** Professional but conversational. First-person where natural
- **No fluff:** Cut "As we all know...", "It's worth noting that...", "In conclusion..."

### 1.5 Verify
- Run `npm run build` to catch MDX parsing errors
- Confirm post appears in blog listing
- Check slug renders at `/blog/{slug}`

---

## Mode 2: Review & Enhance an Existing Post

### 2.1 Load the Post
- Read the target MDX file from `src/content/blog/`
- If no specific post given, list all posts with `Glob` and ask the user which one

### 2.2 Run the Review Checklist

Score each dimension and provide specific, actionable feedback:

#### A. Structure & Flow
- [ ] Strong opening hook (not "In this article...")
- [ ] Logical progression (context → content → conclusion)
- [ ] Proper heading hierarchy (`##` → `###`, no skips)
- [ ] Paragraphs under 4 sentences
- [ ] Conclusion with takeaway or CTA
- [ ] Appropriate post length for the topic

#### B. Technical Quality
- [ ] Code examples are complete and runnable
- [ ] Code has language identifiers on all fenced blocks
- [ ] Technical claims are accurate
- [ ] No outdated APIs, deprecated patterns, or version mismatches
- [ ] Complex concepts are explained before being used
- [ ] Trade-offs and limitations are mentioned (not just happy path)

#### C. Writing Quality
- [ ] Active voice dominant (not "it was decided", "the component is rendered")
- [ ] No filler phrases ("It's worth noting", "As we all know", "Basically")
- [ ] Specific > vague ("35% faster" > "much faster")
- [ ] Consistent tense throughout
- [ ] No unnecessary repetition
- [ ] Varied sentence length (mix short punchy with longer explanatory)

#### D. SEO & Metadata
- [ ] Title is descriptive and keyword-rich (under 60 chars ideal)
- [ ] Description is 100-150 chars, compelling, includes primary keyword
- [ ] 3-6 relevant tags (capitalize first letter: "React" not "react")
- [ ] Date is accurate and in `YYYY-MM-DD` format
- [ ] Author is `"Me"`
- [ ] Featured image path exists (if specified)

#### E. Reader Experience
- [ ] Scannable — a reader skimming headings gets the gist
- [ ] Code-to-text ratio is balanced (not a code dump, not all prose)
- [ ] Jargon is explained on first use
- [ ] Links to external resources where helpful
- [ ] Images/diagrams where they add clarity

### 2.3 Present the Review

Format the review as:

```markdown
## Blog Review: "{title}"

**Overall Score: X/10**

### Strengths
- [What's working well]

### Issues Found
1. **[Category]:** [Specific problem] → [Suggested fix]
2. ...

### Enhancement Suggestions
- [Optional improvements ranked by impact]
```

### 2.4 Apply Enhancements (if requested)

When the user approves changes, apply them using `Edit` tool. Common enhancements:

| Enhancement | What to Do |
|-------------|-----------|
| Weak opening | Rewrite first paragraph with a hook |
| Wall of text | Break into shorter paragraphs, add subheadings |
| Missing code | Add working code examples |
| Vague claims | Replace with specific metrics or examples |
| Bad metadata | Fix title, description, tags for SEO |
| Passive voice | Rewrite sentences in active voice |
| Outdated code | Update to current API/syntax |
| No conclusion | Add summary + next steps |
| Missing context | Add "Why" before "How" |

After applying enhancements, run `npm run build` to verify.

---

## Content Quality Standards

### Title Formulas That Work
- **How-to:** "Building a Production-Ready X with Y"
- **Problem-solution:** "Fixing Z: How I Solved [Specific Problem]"
- **Exploration:** "Why I Chose X Over Y for [Use Case]"
- **Deep dive:** "Understanding X: A Practical Guide"

### Description Formula
`[Action verb] + [what the reader will learn] + [key technologies/concepts]`
```
"Learn how to build a high-performance autocomplete search input using React hooks, TypeScript, and debouncing."
```

### Tag Conventions
- Capitalize first letter: `"React"`, `"TypeScript"`, `"Next.js"`
- 3-6 tags per post
- Mix specific tech (`"React"`, `"GraphQL"`) with topics (`"Performance"`, `"System Design"`)
- Check existing posts for consistent tag naming

### Reading Time Targets
| Post Type | Word Count | Reading Time |
|-----------|-----------|-------------|
| Quick tip | 500-800 | 2-4 min |
| Tutorial | 1000-2000 | 5-10 min |
| Deep dive | 2000-3500 | 10-18 min |
| Case study | 1500-2500 | 8-12 min |

---

## Reference Files
- Existing posts (style reference): `src/content/blog/*.mdx`
- MDX processing logic: `src/lib/mdx.ts`
- Blog listing page: `src/app/[locale]/(main)/blog/page.tsx`
- Post renderer: `src/app/[locale]/(main)/blog/[slug]/client.tsx`
- Post card component: `src/components/blog/post-card.tsx`
- MDX component map: `src/components/mdx/mdx-remote-render.tsx`
- Code block renderer: `src/components/mdx/code-block.tsx`

## Rules
- Author is always `"Me"`
- Date format: `YYYY-MM-DD` (use today's date for new posts unless specified)
- Tags: capitalize first letter of each word
- Images go in `public/images/blogs/{slug}/`
- Posts are auto-discovered — no config changes needed
- External links get `target="_blank"` automatically via rehype plugin
- Never add `console.log` in code examples (unless demonstrating logging)
- Code examples must be complete enough to run or clearly marked as pseudocode
