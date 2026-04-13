"use client";

import { PostCard } from "@/components/blog/post-card";
import type { Post } from "@/lib/mdx";
import { motion } from "framer-motion";
import { LayoutGrid, List as ListIcon, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

type SortOption = "newest" | "oldest";
type ViewMode = "grid" | "list";

export default function BlogClient({ posts: initialPosts }: { posts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const allTags = Array.from(
    new Set(initialPosts.flatMap((p) => p.frontmatter.tags || []))
  ).sort();

  useEffect(() => {
    let filtered = [...initialPosts];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.frontmatter.title.toLowerCase().includes(q) ||
          p.frontmatter.description?.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTags.every((tag) => p.frontmatter.tags?.includes(tag))
      );
    }
    filtered.sort((a, b) =>
      sortOption === "newest"
        ? new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        : new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime()
    );
    setPosts(filtered);
  }, [initialPosts, searchQuery, selectedTags, sortOption]);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasFilters = !!(searchQuery || selectedTags.length > 0);
  const [featured, ...rest] = posts;

  return (
    <div>
      {/* ── Editorial Masthead ─────────────────────────────── */}
      <div className="border-b border-border/30 mb-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-primary/70 mb-5 flex items-center gap-3">
            <span className="h-px w-6 bg-primary/40 inline-block" />
            Personal Journal
          </p>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none mb-6 text-foreground">
            Writings
          </h1>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed">
            Notes on frontend engineering, product building, and the occasional deep dive.
          </p>
        </motion.div>
      </div>

      {/* ── Controls ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4 mb-10"
      >
        {/* Search + view toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-lg bg-muted/40 border border-border/40 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-all placeholder:text-muted-foreground/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-0.5 p-1 rounded-lg bg-muted/40 border border-border/40">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all duration-150 ${
                viewMode === "grid"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all duration-150 ${
                viewMode === "list"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="List view"
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tag chips */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 font-medium ${
                  selectedTags.includes(tag)
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        )}

        <p className="text-[11px] text-muted-foreground/60 font-mono">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
          {hasFilters && " found"}
        </p>
      </motion.div>

      {/* ── Posts ──────────────────────────────────────────── */}
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <p className="text-3xl font-bold mb-3">Nothing found</p>
          <p className="text-muted-foreground text-sm mb-8">Try different search terms or remove filters</p>
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            Clear all filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* Featured hero (grid mode, first post) */}
          {viewMode === "grid" && featured && (
            <div className="mb-8">
              <PostCard post={featured} index={0} viewMode="grid" featured />
            </div>
          )}

          {/* Articles grid / list */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                : "flex flex-col gap-4"
            }
          >
            {(viewMode === "grid" ? rest : posts).map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                index={viewMode === "grid" ? i + 1 : i}
                viewMode={viewMode}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
