# Beyondsoft blog illustrations

- [Status: OK]
- Created: 2026-11-08
- Source article: `src/content/blog/beyondsoft.mdx`.
- Generation: built-in imagegen; exact prompts in `prompts.json`.
- Style: paper background, ink typography, orange mechanism emphasis, matte 3D objects and soft lighting.
- Language: English, matching the article. No social account identity.
- Typography: generated sans-serif lettering, flattened into the images; no exact installed font family is claimed. Labels remain available as text in the prompts and article alt text.

## Exports

| Asset under `public/images/blogs/beyondsoft/` | Dimensions | Purpose |
| --- | --- | --- |
| `hero-v2.webp` | 1920 × 1080 | Separate apps on one shared browser runtime |
| `shared-cascade.webp` | 1536 × 1024 | One global selector reaches two simultaneously mounted apps |
| `thread-work.webp` | 1536 × 1024 | Infinite scroll limits mounted rows; a Worker moves parsing and reshaping off the main thread. Hand-authored from `source/thread-work.svg` (rsvg-convert → cwebp -q 90), not generated |

**2026-11-08 correction:** the generated `thread-work` showed "500K rows", virtualization and debounced filter bursts — template claims the owner never confirmed. It was replaced with an SVG drawn only from confirmed facts (100K+ rows, infinite scroll, Web Worker for parse + reshape). `source/thread-work.png` is the superseded generation, kept for reference; its prompt is marked `superseded` in `prompts.json`. The SVG is flat, not matte 3D, so it differs in finish from the other two exports.

The hero is fitted inside a 16:9 canvas with paper-colour side padding to preserve all lettering in the existing cover container. WebP conversion uses quality 90. The previous hero and team photographs are retained.

## Accuracy and verification

- Inspected all three generated images: labels, connectors, hierarchy and illustration depth.
- CSS illustration is a conceptual example. `16px` is illustrative, not a production setting recovered from the author's work.
- Worker illustration is a conceptual sequence, not a benchmark or scaled timeline. Filter debouncing is separate from the Worker lane; only parsing and reshaping are assigned to the Worker.
- Article alt text and captions preserve the mechanism and these qualifications as accessible text.
- Compiled the changed MDX and checked local HTTP delivery of the three assets and article image references.
- Observed the new hero in the local article in Chrome. Full responsive and mobile verification was not performed.

These are flattened raster illustrations. The prompts and article captions are editable; the lettering and sculpted artwork inside each export are not separate editable layers.
