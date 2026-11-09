# Blog System

Paths in this document are relative to the repository root.

### Blog System
- **Content:** MDX files in `src/content/blog/`.
- **Frontmatter:** `title`, `date`, `description`, `tags[]`, `image?`, `author`.
- **Processing:** `gray-matter` for frontmatter, `next-mdx-remote` for rendering.
- **Static generation:** `generateStaticParams()` pre-renders all slugs at build time.
- **Static only:** `[slug]/page.tsx` is `force-static`. Posts live in the repo, so content changes only on rebuild; there is no ISR/revalidate.
- **Plugins:** remark-gfm, rehype-slug, rehype-external-links.

## Reading interface

The index uses a centered, single-column archive with date, reading time, title
and summary. Search and a single topic selector retain their state in the URL.
The topic filter uses the shared Shadcn/Radix `Select` primitive, including its
label, focus ring, themed popup and selected indicator; do not substitute an
unstyled native select. Its trigger and options have a minimum 44px target.
Year headings group entries; reading-length bars, per-row tag lists and entrance
animations are omitted.

Articles use the existing sans-serif body face for their headings, a bounded
reading column, and an optional outline disclosure near the introduction. Text is
visible in the initial server-rendered page without waiting for entrance motion.
Unavailable comments do not add an empty section. Existing image, code, sharing
and adjacent-post behavior stays available with restrained styling.

`ArticleCarousel` is an optional MDX component registered in
`src/components/mdx/mdx-components.tsx`. Its `items` use the existing `GalleryItem`
shape. The gallery shows an uncropped main image, current title and count,
previous/next controls, and a labeled thumbnail strip with a visible current
selection. “View all” opens an overview grid for direct access to any image.
Mobile uses native horizontal scrolling with scroll snapping; the thumbnail
strip also scrolls to reveal additional pages. There is no automatic advance.

Selecting the main image or “Enlarge image” opens a lazily loaded PhotoSwipe
reader. It initially fits the whole image, supports zoom, double-tap and pinch,
keyboard navigation and Escape, and restores focus on close. Viewer changes
synchronize the inline gallery. Image links retain original-image fallback.
PhotoSwipe's visual tokens are scoped to `.article-image-viewer` in `globals.css`.
Alternative text accompanies each image, and the current title/count is announced.
Source prompts and private evidence are not part of the public image directory.

Interaction references: [NN/g mobile carousels](https://www.nngroup.com/articles/mobile-carousels/),
[Baymard thumbnails](https://baymard.com/research-articles/always-use-thumbnails-additional-images),
[W3C carousel guidance](https://www.w3.org/WAI/tutorials/carousels/),
and [PhotoSwipe zoom](https://photoswipe.com/adjusting-zoom-level/).
The thumbnail research is from ecommerce; applying it to article discovery is a
design judgment, not a claim of measured blog engagement improvement.
