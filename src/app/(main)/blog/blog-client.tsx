"use client";

import { PostCard } from "@/components/blog/post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { Post } from "@/lib/mdx";
import { motion } from "framer-motion";
import {
  Filter,
  LayoutGrid,
  List as ListIcon,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type SortOption = "newest" | "oldest" | "az" | "za";
type ViewMode = "grid" | "list";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BlogClient({ posts: initialPosts }: { posts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchFocused, setSearchFocused] = useState(false);

  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(initialPosts.flatMap((post) => post.frontmatter.tags || [])),
  ).sort();

  // Sort and filter posts based on current filters
  useEffect(() => {
    let filtered = [...initialPosts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.frontmatter.title.toLowerCase().includes(query) ||
          post.frontmatter.description?.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query),
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.every(
          (tag) => post.frontmatter.tags && post.frontmatter.tags.includes(tag),
        ),
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      if (sortOption === "newest") {
        return (
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
        );
      }
      if (sortOption === "oldest") {
        return (
          new Date(a.frontmatter.date).getTime() -
          new Date(b.frontmatter.date).getTime()
        );
      }
      if (sortOption === "az") {
        return a.frontmatter.title.localeCompare(b.frontmatter.title);
      }
      if (sortOption === "za") {
        return b.frontmatter.title.localeCompare(a.frontmatter.title);
      }
      return 0;
    });

    setPosts(filtered);
  }, [initialPosts, searchQuery, selectedTags, sortOption]);

  // Toggle a tag in the filter
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortOption("newest");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="text-center mb-16"
      >
        <motion.div variants={fadeInUp}>
          <div className="inline-block p-1.5 px-3 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary inline mr-1" />
            <span className="text-xs font-medium">Tech Blog</span>
          </div>
          <h1 className="md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            My Blog
          </h1>
          <p className="text-muted-foreground mx-auto mb-8">
            Thoughts, insights, and guides on web development, design, and
            modern technologies. Browse through my articles to learn something
            new or find solutions to common challenges.
          </p>
        </motion.div>

        {/* Search and filter controls */}
        <motion.div className="flex flex-col gap-4 mx-auto" variants={fadeInUp}>
          <div className="w-full flex flex-col gap-4">
            {/* Search input - full width on all screens */}
            <motion.div
              className="relative w-full"
              animate={
                searchFocused
                  ? {
                      scale: 1.01,
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }
                  : {}
              }
              transition={{ duration: 0.2 }}
            >
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${searchFocused ? "text-primary" : "text-muted-foreground"} h-4 w-4 transition-colors`}
              />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-card"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              )}
            </motion.div>

            {/* Control buttons - responsive layout */}
            <div className="flex flex-wrap gap-2 justify-between">
              {/* Filter controls - grow to use available space */}
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className={`flex items-center gap-1.5 transition-colors ${isFiltersOpen ? "bg-muted border-primary/40" : ""}`}
                >
                  <Filter
                    className={`h-4 w-4 ${isFiltersOpen ? "text-primary" : ""}`}
                  />
                  <span className="hidden sm:inline">Filters</span>
                  {selectedTags.length > 0 && (
                    <span className="ml-1 text-xs py-0.5 px-1.5 rounded-full bg-primary/10">
                      {selectedTags.length}
                    </span>
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1.5"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="hidden sm:inline">Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[160px]">
                    <DropdownMenuItem
                      onClick={() => setSortOption("newest")}
                      className={
                        sortOption === "newest" ? "bg-muted font-medium" : ""
                      }
                    >
                      Newest first
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortOption("oldest")}
                      className={
                        sortOption === "oldest" ? "bg-muted font-medium" : ""
                      }
                    >
                      Oldest first
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setSortOption("az")}
                      className={
                        sortOption === "az" ? "bg-muted font-medium" : ""
                      }
                    >
                      A-Z
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortOption("za")}
                      className={
                        sortOption === "za" ? "bg-muted font-medium" : ""
                      }
                    >
                      Z-A
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground text-sm"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* View mode buttons */}
              <div className="flex items-center rounded-md border border-border/40 overflow-hidden h-9">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-full w-9 rounded-none"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-full w-9 rounded-none"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tag filters */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isFiltersOpen ? 1 : 0,
              height: isFiltersOpen ? "auto" : 0,
              marginTop: isFiltersOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            {allTags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Badge
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Results summary */}
      <motion.div
        className="mb-6 text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Showing {posts.length} {posts.length === 1 ? "article" : "articles"}
        {selectedTags.length > 0 && (
          <>
            {" "}
            filtered by{" "}
            <span className="font-medium text-foreground">
              {selectedTags.join(", ")}
            </span>
          </>
        )}
        {searchQuery && (
          <>
            {" "}
            containing{" "}
            <span className="font-medium text-foreground">
              &quot;{searchQuery}&quot;
            </span>
          </>
        )}
      </motion.div>

      {/* Blog posts grid/list */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl mb-2">No articles found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
          {(selectedTags.length > 0 || searchQuery) && (
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <motion.div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {posts.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
