"use client";

import { MdxRemoteRender } from "@/components/mdx";
import type { Post } from "@/lib/mdx";
import { formatDate, createSlug } from "@/lib/utils";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { motion, useScroll } from "framer-motion";
import { ArrowLeft, Calendar, Check, Clock, Share2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { TocDesktop, TocMobile } from "./toc";

const ShareButton = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="h-9 w-9 flex items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-200"
  >
    {children}
  </button>
);

export default function BlogPostClient({ post }: { post: Post }) {
  const [readingTime, setReadingTime] = useState("5 min");
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const words = post.content.split(/\s+/).length;
    setReadingTime(`${Math.ceil(words / 200)} min read`);
  }, [post.content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "0% 0% -70% 0%" }
    );
    const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toc = (() => {
    const headers = post.content.match(/(#{1,6})\s+(.*?)$/gm) || [];
    const usedIds = new Set<string>();
    return headers.map((header) => {
      const level = (header.match(/^#+/) || [""])[0].length;
      let text = header
        .replace(/^#+\s+/, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/`(.*?)`/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .trim();
      text = text
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      let id = createSlug(text);
      if (usedIds.has(id)) {
        let n = 1;
        while (usedIds.has(`${id}-${n}`)) n++;
        id = `${id}-${n}`;
      }
      usedIds.add(id);
      return { text, id, level };
    });
  })();

  const handleTocClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
  };

  const share = (url: string) => window.open(url, "_blank");
  const pageUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  return (
    <div className="min-h-screen">
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* ── Main column ──────────────────────────── */}
            <motion.div
              className="lg:col-span-8 lg:col-start-2"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              ref={articleRef}
            >
              {/* Back */}
              <motion.div variants={fadeIn} className="mb-10">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
                  All articles
                </Link>
              </motion.div>

              {/* Header */}
              <motion.header variants={fadeIn} className="mb-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-3 py-1 rounded-full border border-border/50 text-muted-foreground bg-muted/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-tight tracking-tight mb-5 text-foreground">
                  {post.frontmatter.title}
                </h1>

                {/* Description */}
                {post.frontmatter.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-7 max-w-2xl">
                    {post.frontmatter.description}
                  </p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-t border-border/30 pt-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary/60" />
                    {formatDate(post.frontmatter.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary/60" />
                    {post.frontmatter.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary/60" />
                    {readingTime}
                  </span>
                </div>
              </motion.header>

              {/* Hero image */}
              {post.frontmatter.image && (
                <motion.div
                  variants={fadeIn}
                  className="mb-10 rounded-2xl overflow-hidden border border-border/20"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  </div>
                </motion.div>
              )}

              {/* Mobile TOC */}
              <motion.div variants={fadeIn} className="lg:hidden">
                <TocMobile toc={toc} activeId={activeId} onItemClick={handleTocClick} />
              </motion.div>

              {/* Article */}
              <motion.article
                variants={fadeIn}
                className="prose prose-base dark:prose-invert max-w-none
                  prose-headings:scroll-mt-28 prose-headings:font-extrabold prose-headings:tracking-tight
                  prose-p:text-muted-foreground prose-p:leading-[1.8]
                  prose-li:text-muted-foreground
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-muted/20 prose-pre:border prose-pre:border-border/30
                  prose-blockquote:border-l-primary/40 prose-blockquote:bg-muted/20 prose-blockquote:rounded-r-lg prose-blockquote:py-3 prose-blockquote:not-italic
                  prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline hover:prose-a:underline-offset-4
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-border/20
                  prose-hr:border-0 prose-hr:h-px prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-border prose-hr:to-transparent"
              >
                <MdxRemoteRender mdxSource={post.serializedContent} mdxScope={{}} />
              </motion.article>

              {/* Share */}
              <motion.div variants={fadeIn} className="mt-16 pt-10 border-t border-border/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xs font-mono tracking-[0.16em] uppercase text-muted-foreground/60 mb-1">Share</p>
                    <p className="text-sm font-semibold">Enjoyed this article?</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShareButton label="Share on LinkedIn" onClick={() => share(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl())}`)}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/></svg>
                    </ShareButton>
                    <ShareButton label="Share on X" onClick={() => share(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl())}&text=${encodeURIComponent(post.frontmatter.title)}`)}>
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </ShareButton>
                    <ShareButton label="Share on WhatsApp" onClick={() => share(`https://wa.me/?text=${encodeURIComponent(post.frontmatter.title + " " + pageUrl())}`)}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/></svg>
                    </ShareButton>
                    <ShareButton
                      label="Copy link"
                      onClick={() => {
                        navigator.clipboard.writeText(pageUrl());
                        toast.success("Link copied!");
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </ShareButton>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── TOC Sidebar (desktop) ─────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:block lg:col-span-3"
            >
              <TocDesktop toc={toc} activeId={activeId} onItemClick={handleTocClick} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
