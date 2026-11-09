"use client";

import { useTranslations } from "next-intl";
import { Suspense, useMemo } from "react";
import { WritingRow } from "@/components/blog/writing-row";
import type { PostIndexEntry } from "@/lib/mdx";
import { BlogFilters, type Topic } from "./blog-filters";
import { BlogPageHeader } from "./blog-page-header";
import { useBlogFilters } from "./use-blog-filters";

export interface BlogClientProps {
  posts: PostIndexEntry[];
}
export interface BlogIndexProps extends BlogClientProps {
  query: string;
  topic: string | null;
  onQueryChange: (value: string) => void;
  onTopicChange: (tag: string | null) => void;
  onClear: () => void;
}
function noop() {}

export function BlogClient({ posts }: BlogClientProps) {
  return (
    <Suspense
      fallback={
        <BlogIndex
          posts={posts}
          query=""
          topic={null}
          onQueryChange={noop}
          onTopicChange={noop}
          onClear={noop}
        />
      }
    >
      <FilteredBlogIndex posts={posts} />
    </Suspense>
  );
}

function FilteredBlogIndex({ posts }: BlogClientProps) {
  const { query, setQuery, topic, setTopic, clear } = useBlogFilters();
  return (
    <BlogIndex
      posts={posts}
      query={query}
      topic={topic}
      onQueryChange={setQuery}
      onTopicChange={setTopic}
      onClear={clear}
    />
  );
}

function BlogIndex({
  posts,
  query,
  topic,
  onQueryChange,
  onTopicChange,
  onClear,
}: BlogIndexProps) {
  const t = useTranslations("blog");
  const topics = useMemo<Topic[]>(() => {
    const counts = new Map<string, number>();
    for (const post of posts)
      for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    return [...counts]
      .filter(([, count]) => count >= 2)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (post) =>
        (!topic || post.tags.includes(topic)) &&
        (!q ||
          [post.title, post.description, ...post.tags]
            .join(" ")
            .toLowerCase()
            .includes(q)),
    );
  }, [posts, query, topic]);
  const years = useMemo(() => {
    const groups = new Map<number, PostIndexEntry[]>();
    for (const post of filtered) {
      const year = new Date(post.date).getFullYear();
      groups.set(year, [...(groups.get(year) ?? []), post]);
    }
    return [...groups].sort(([a], [b]) => b - a);
  }, [filtered]);

  return (
    <div className="mx-auto max-w-[46rem]">
      <BlogPageHeader />
      <BlogFilters
        query={query}
        onQueryChange={onQueryChange}
        topics={topics}
        activeTopic={topic}
        onTopicChange={onTopicChange}
        total={posts.length}
        matches={filtered.length}
      />
      {filtered.length === 0 ? (
        <div className="py-12">
          <h2 className="font-sans text-xl font-semibold tracking-tight">
            {t("empty_title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("empty_body")}
          </p>
          <button
            type="button"
            onClick={onClear}
            className="mt-4 min-h-11 text-sm underline underline-offset-4"
          >
            {t("clear")}
          </button>
        </div>
      ) : (
        years.map(([year, entries]) => (
          <div key={year} className="mb-12 sm:mb-16">
            <h2 className="mb-1 font-sans text-sm font-medium text-muted-foreground">
              {year}
            </h2>
            <ul>
              {entries.map((post) => (
                <WritingRow key={post.slug} post={post} />
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
