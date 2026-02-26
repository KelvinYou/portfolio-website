# Blog Post Reference

## Existing Post Frontmatter Examples

```yaml
---
title: "Building a Production-Ready Autocomplete Search Component in React"
date: "2024-12-28"
description: "Learn how to build a performant, accessible autocomplete search component in React with debouncing, keyboard navigation, and highlighted matching text."
tags: ["react", "typescript", "search", "ui-components"]
image: "/images/blog/autocomplete-search.jpg"
author: "Kelvin You"
---
```

## MDX Features Available

### Code Blocks
Use triple backticks with language identifier:
````
```tsx
function Example() {
  return <div>Hello</div>;
}
```
````

### GFM Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### Images
```markdown
![Alt text](/images/blog/image-name.jpg)
```
Images in `public/images/blog/` are auto-served at root path.

### Headings (auto-generate IDs via rehype-slug)
```markdown
## My Section        → id="my-section"
### My Subsection    → id="my-subsection"
```

### External Links
Automatically get `target="_blank" rel="noopener noreferrer"` via rehype-external-links plugin.

## Content Directory
All posts: `src/content/blog/*.mdx`

## Processing Pipeline
1. `gray-matter` parses frontmatter from MDX
2. `next-mdx-remote` serializes MDX with plugins
3. Plugins: `remark-gfm`, `rehype-slug`, `rehype-external-links`
4. Custom components in `src/components/mdx/` (code blocks, images)
