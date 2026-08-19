"use client";

import { AdjacentPosts } from "@/components/blog/adjacent-posts";
import { Comments } from "@/components/blog/comments";
import { ShareRow } from "@/components/blog/share-row";
import { ViewCounter } from "@/components/blog/view-counter";
import type { TocEntry } from "@/lib/blog-content";
import type { Post, PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { motion, useScroll } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TocDesktop, TocMobile } from "./toc";

/** Matches the article column's `scroll-mt` so a clicked heading clears the fixed navbar. */
const HEADING_OFFSET_PX = 112;

/**
 * The reading chrome: header, outline rail, share row, onward links. The
 * article itself arrives as `children`, already rendered by the server
 * component — this file never sees the post body.
 */
export function BlogPostClient({
  frontmatter,
  slug,
  toc,
  readingMinutes,
  previous,
  next,
  children,
}: {
  frontmatter: Post["frontmatter"];
  slug: string;
  toc: TocEntry[];
  readingMinutes: number;
  previous: PostMeta | null;
  next: PostMeta | null;
  children: React.ReactNode;
}) {
  const t = useTranslations("blog");
  const { scrollYProgress } = useScroll();
  const activeId = useActiveHeading(toc);

  return (
    <div className="min-h-screen">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        {/* One measure for the whole column, so the header rule, the share
            divider and the onward links all end where the text does — the
            reading width used to be set on the article alone and no two
            hairlines on the page lined up.

            40rem is 73 characters at 17px Open Sans, measured in the browser
            rather than estimated. The old layout ran to about 90. */}
        <div className="mx-auto flex max-w-[62rem] flex-col gap-14 lg:flex-row lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="min-w-0 lg:max-w-[40rem] lg:flex-1"
          >
            <motion.div variants={fadeIn}>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft
                  className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                {t("back")}
              </Link>
            </motion.div>

            <motion.header
              variants={fadeIn}
              className="mt-10 border-b border-border pb-10"
            >
              {/* One mono line of facts instead of four icon-and-label pairs.
                  The author pair is gone: this is a single-author site, so the
                  name repeated on every post carried no information — the
                  BlogPosting JSON-LD states it for machines instead. */}
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>{formatDate(frontmatter.date)}</span>
                <Dot />
                <span className="tabular-nums">
                  {t("minutes", { count: readingMinutes })}
                </span>
                <ViewCounter slug={slug} />
              </p>

              <h1 className="mt-6 max-w-[26ch] font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {frontmatter.title}
              </h1>

              {frontmatter.description && (
                <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
                  {frontmatter.description}
                </p>
              )}

              {frontmatter.tags.length > 0 && (
                <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {frontmatter.tags.join(" · ")}
                </p>
              )}
            </motion.header>

            {frontmatter.image && (
              <motion.div
                variants={fadeIn}
                className="relative mt-10 aspect-video overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 48rem, 100vw"
                  priority
                />
              </motion.div>
            )}

            <motion.div variants={fadeIn} className="mt-12 lg:hidden">
              <TocMobile
                toc={toc}
                activeId={activeId}
                onItemClick={scrollToHeading}
              />
            </motion.div>

            <motion.article variants={fadeIn} className="mdx-body mt-12">
              {children}
            </motion.article>

            <ShareRow title={frontmatter.title} />

            <AdjacentPosts previous={previous} next={next} />

            <Comments slug={slug} />
          </motion.div>

          <motion.div
            className="hidden lg:block lg:w-52 lg:shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <TocDesktop
              toc={toc}
              activeId={activeId}
              onItemClick={scrollToHeading}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span className="text-faint" aria-hidden="true">
      ·
    </span>
  );
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - HEADING_OFFSET_PX;
  window.scrollTo({
    top,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
  // Move focus so keyboard and screen-reader users land in the section they
  // asked for instead of staying in the rail.
  element.setAttribute("tabindex", "-1");
  element.focus({ preventScroll: true });
}

/**
 * Which outline entry the reader is currently in.
 *
 * The previous implementation observed every `h1`–`h6` in the document — nav,
 * footer and comment-form headings included — kept whichever entry the browser
 * happened to report last, and ran its query on mount, before the article had
 * rendered at all. It only ever tracked the outline by accident.
 */
function useActiveHeading(toc: TocEntry[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;

    const ids = toc.map((entry) => entry.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // Earliest visible heading in document order, so a section stays
        // current until the next one actually reaches the reading band. When
        // nothing is visible — mid-way through a long section — the previous
        // value is deliberately kept rather than cleared.
        const current = ids.find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: `-${HEADING_OFFSET_PX}px 0px -60% 0px` },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [toc]);

  return activeId;
}
