"use client";

import type { Post } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: Post;
  index: number;
  viewMode: "grid" | "list";
  featured?: boolean;
}

export function PostCard({ post, index, viewMode, featured = false }: PostCardProps) {
  const { frontmatter, slug } = post;
  const isList = viewMode === "list";
  const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href={`/blog/${slug}`} className="group block">
          <article className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-card">
            {/* Hero image area */}
            <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card">
              {frontmatter.image && (
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
              {/* Cyan accent glow on hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-primary/80">
                  Featured
                </span>
                <span className="h-px w-8 bg-primary/40" />
                {frontmatter.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-sm text-white/60 border border-white/[0.10]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors duration-300 max-w-3xl">
                {frontmatter.title}
              </h2>

              {frontmatter.description && (
                <p className="text-white/50 max-w-2xl line-clamp-2 text-sm md:text-base mb-5 hidden sm:block">
                  {frontmatter.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-white/35 text-xs font-medium">
                <span>{formatDate(frontmatter.date)}</span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {readingTime} min read
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-white/50 group-hover:text-primary transition-colors duration-200">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35), ease: "easeOut" }}
      className={isList ? "w-full" : "h-full"}
    >
      <Link href={`/blog/${slug}`} className="group block h-full">
        <article
          className={`h-full overflow-hidden rounded-xl border border-border/40 bg-card
            hover:border-primary/25 hover:shadow-[0_0_24px_rgba(0,240,255,0.04)]
            transition-all duration-300 ${isList ? "flex" : "flex flex-col"}`}
        >
          {/* Thumbnail / placeholder */}
          <div
            className={`relative overflow-hidden bg-muted/30 flex-shrink-0
              ${isList ? "w-36 sm:w-44" : "aspect-video"}`}
          >
            {frontmatter.image ? (
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/60 to-card">
                <span className="text-4xl font-bold text-primary/[0.06] font-mono select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-4 md:p-5">
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {frontmatter.tags?.slice(0, isList ? 3 : 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="font-bold leading-snug text-sm md:text-[15px] mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {frontmatter.title}
            </h3>

            {frontmatter.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-auto">
                {frontmatter.description}
              </p>
            )}

            <div className="flex items-center gap-2.5 mt-4 pt-3.5 border-t border-border/40 text-[11px] text-muted-foreground">
              <span>{formatDate(frontmatter.date, "short")}</span>
              <span className="opacity-30">·</span>
              <span>{readingTime} min</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-200" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
