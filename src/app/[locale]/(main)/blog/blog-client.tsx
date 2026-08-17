"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useBlogViews } from "@/components/blog/blog-data-provider";
import { WritingRow } from "@/components/blog/writing-row";
import { fadeIn, staggerContainer } from "@/lib/animations";
import type { PostIndexEntry } from "@/lib/mdx";
import { BlogFilters, type Topic } from "./blog-filters";
import { BlogPageHeader } from "./blog-page-header";

/** A tag has to group this many posts before it is offered as a topic. */
const MIN_TOPIC_POSTS = 2;

/** How many tags a year's note names. */
const NOTE_TOPICS = 2;

export function BlogClient({ posts }: { posts: PostIndexEntry[] }) {
  const t = useTranslations("blog");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const viewsBySlug = useBlogViews();

  const topics = useMemo<Topic[]>(() => {
    const counts = countTags(posts);
    return [...counts.entries()]
      .filter(([, count]) => count >= MIN_TOPIC_POSTS)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (topic && !post.tags.includes(topic)) return false;
      if (!q) return true;

      return [post.title, post.description, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [posts, query, topic]);

  // Measured against the whole archive rather than the current result set, so
  // a bar means the same length before and after a filter is applied. Scaling
  // to the filtered maximum would make a short note look long the moment it
  // became the longest thing on screen.
  const longestUnits = useMemo(
    () => posts.reduce((max, post) => Math.max(max, post.readingUnits), 0),
    [posts],
  );

  const years = useMemo(() => groupByYear(filtered), [filtered]);

  return (
    <div className="max-w-5xl">
      <BlogPageHeader />

      <BlogFilters
        query={query}
        onQueryChange={setQuery}
        topics={topics}
        activeTopic={topic}
        onTopicChange={setTopic}
        total={posts.length}
        matches={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="border-t border-border py-20 text-center">
          <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            {t("empty_title")}
          </p>
          <p className="mx-auto mt-3 max-w-[40ch] text-sm text-muted-foreground">
            {t("empty_body")}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTopic(null);
            }}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {t("clear")}
          </button>
        </div>
      ) : (
        years.map(([year, entries], index) => (
          <YearGroup
            key={year}
            year={year}
            posts={entries}
            longestUnits={longestUnits}
            viewsBySlug={viewsBySlug}
            // Only the first group has an entrance. Every group used to fade in
            // on scroll, which meant seven of twelve posts were at opacity 0 on
            // load — and twelve individually-fading rows is scattered motion
            // rather than a moment. The rest of the ledger is simply there.
            animateOnLoad={index === 0}
          />
        ))
      )}
    </div>
  );
}

function YearGroup({
  year,
  posts,
  longestUnits,
  viewsBySlug,
  animateOnLoad,
}: {
  year: number;
  posts: PostIndexEntry[];
  longestUnits: number;
  viewsBySlug: Map<string, number>;
  animateOnLoad: boolean;
}) {
  const t = useTranslations("blog");
  const locale = useLocale();

  // Derived from the posts rather than written per year, which would go stale
  // every January. Intl.ListFormat rather than joining on "and" so the note
  // reads correctly in all three locales.
  const note = useMemo(() => {
    const dominant = [...countTags(posts).entries()]
      .filter(([, count]) => count >= MIN_TOPIC_POSTS)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, NOTE_TOPICS)
      .map(([tag]) => titleCaseTag(tag));

    if (dominant.length === 0) return null;

    const list = new Intl.ListFormat(locale, {
      style: "long",
      type: "conjunction",
    }).format(dominant);

    return t("year_note", { topics: list });
  }, [posts, locale, t]);

  return (
    // A `div`, not a `section`: globals.css carries a bare `section { padding:
    // 6rem/8rem }` rule outside any cascade layer, so it beats Tailwind's
    // layered utilities and `py-0` cannot undo it.
    <div className="mt-16 first:mt-0 md:mt-20 md:first:mt-0">
      <motion.header
        className="mb-8 md:mb-10"
        initial={animateOnLoad ? "hidden" : false}
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="tabular-nums">{year}</span>
          <span className="mx-2 text-muted-foreground/40" aria-hidden="true">
            /
          </span>
          <span className="tabular-nums">{posts.length}</span>
        </h2>
        {note && (
          <p className="mt-4 max-w-[54ch] font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
            {note}
          </p>
        )}
      </motion.header>

      <motion.ul
        variants={staggerContainer}
        initial={animateOnLoad ? "hidden" : false}
        animate="visible"
        className="border-b border-border"
      >
        {posts.map((post) => (
          <WritingRow
            key={post.slug}
            post={post}
            longestUnits={longestUnits}
            views={viewsBySlug.get(post.slug)}
          />
        ))}
      </motion.ul>
    </div>
  );
}

/**
 * Tags are cased inconsistently across four years of frontmatter — "System
 * Design" next to "personal website" — and the year note reads them as prose,
 * where the mismatch shows. A tag that already contains a capital was cased
 * deliberately (`Next.js`, `TypeScript`) and is left exactly as written.
 */
function titleCaseTag(tag: string): string {
  if (/[A-Z]/.test(tag)) return tag;
  return tag.replace(/\b\p{Ll}/gu, (letter) => letter.toUpperCase());
}

function countTags(posts: PostIndexEntry[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

/** Newest year first; posts inside a year keep the newest-first order they arrive in. */
function groupByYear(posts: PostIndexEntry[]): [number, PostIndexEntry[]][] {
  const groups = new Map<number, PostIndexEntry[]>();

  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    const bucket = groups.get(year);
    if (bucket) bucket.push(post);
    else groups.set(year, [post]);
  }

  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}
