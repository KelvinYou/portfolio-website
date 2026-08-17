import GithubSlugger from "github-slugger";

/**
 * Derived facts about a post's markdown: how long it takes to read, and what
 * its outline is. Both are computed on the server so the listing and the
 * reading rail never need the post body shipped to the browser.
 */

/** Latin prose, words per minute. */
const WORDS_PER_MINUTE = 200;

/**
 * CJK characters per minute. Two posts here are written in Chinese, which has
 * no spaces — splitting on whitespace counts a 2,000-character essay as a
 * handful of "words" and reports it as a one-minute read. Counted separately
 * against a per-character rate instead.
 */
const CJK_PER_MINUTE = 350;

/** Hiragana/Katakana, CJK ext-A, CJK unified, Hangul. */
const CJK = /[\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]/g;

/**
 * Markdown minus fenced code. Everything downstream needs this: a `# WRONG`
 * comment inside a Python sample is not a heading, and a 200-line code listing
 * is not read at prose speed.
 */
export function stripCodeFences(markdown: string): string {
  const out: string[] = [];
  let fence: string | null = null;

  for (const line of markdown.split("\n")) {
    const marker = line.match(/^\s*(```+|~~~+)/)?.[1];

    if (fence) {
      // Only a marker of the same kind and at least the same length closes it.
      if (marker && marker[0] === fence[0] && marker.length >= fence.length) {
        fence = null;
      }
      continue;
    }

    if (marker) {
      fence = marker;
      continue;
    }

    out.push(line);
  }

  return out.join("\n");
}

/** Markdown inline syntax removed, so word counts measure prose and not punctuation. */
function toPlainText(markdown: string): string {
  return stripCodeFences(markdown)
    .replace(/<[^>]+>/g, " ") // JSX and raw HTML (iframes, etc.)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links keep their label
    .replace(/`([^`]*)`/g, "$1")
    .replace(/[*_~>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type ReadingExtent = {
  /** Weighted count used only to size one post against another. */
  units: number;
  minutes: number;
};

export function measureReading(markdown: string): ReadingExtent {
  const text = toPlainText(markdown);
  const cjk = text.match(CJK)?.length ?? 0;
  const latin = text.replace(CJK, " ").split(/\s+/).filter(Boolean).length;

  const minutes = latin / WORDS_PER_MINUTE + cjk / CJK_PER_MINUTE;

  return {
    // Normalised to Latin-word equivalents so the extent bar compares an
    // English post and a Chinese one on the same axis.
    units: Math.round(latin + cjk * (WORDS_PER_MINUTE / CJK_PER_MINUTE)),
    minutes: Math.max(1, Math.round(minutes)),
  };
}

export type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * The post outline, matching the ids that rehype-slug puts on the rendered
 * headings. Two things make that match load-bearing:
 *
 *  - Every heading is slugged, in document order, even the ones the rail does
 *    not show. GithubSlugger dedupes by appending a counter, so skipping an h1
 *    here would shift the suffix on a later duplicate and break its anchor.
 *  - h1 is excluded from the rail itself: several posts repeat their title as
 *    an h1, and a rail whose first entry is the title the reader is looking at
 *    tells them nothing.
 */
export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];

  for (const line of stripCodeFences(markdown).split("\n")) {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2]
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(\*|_)(.*?)\1/g, "$2")
      .replace(/`([^`]*)`/g, "$1")
      .trim();

    const id = slugger.slug(text);

    if (level === 2 || level === 3) {
      entries.push({ id, text, level });
    }
  }

  return entries;
}
