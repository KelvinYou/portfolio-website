"use client";

import { AdjacentPosts } from "@/components/blog/adjacent-posts";
import { Comments } from "@/components/blog/comments";
import { ShareRow } from "@/components/blog/share-row";
import { ViewCounter } from "@/components/blog/view-counter";
import type { TocEntry } from "@/lib/blog-content";
import type { Post, PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { ArticleOutline } from "./toc";

const HEADING_OFFSET_PX = 96;

export interface BlogPostClientProps {
  frontmatter: Post["frontmatter"];
  slug: string;
  toc: TocEntry[];
  readingMinutes: number;
  previous: PostMeta | null;
  next: PostMeta | null;
  children: React.ReactNode;
}

export function BlogPostClient({
  frontmatter,
  slug,
  toc,
  readingMinutes,
  previous,
  next,
  children,
}: BlogPostClientProps) {
  const t = useTranslations("blog");
  const activeId = useActiveHeading(toc);
  return (
    <main className="mx-auto max-w-[46rem] px-5 pb-20 pt-24 text-foreground sm:px-8 sm:pb-28 sm:pt-28">
      <Link
        href="/blog"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        {t("back")}
      </Link>
      <header className="mt-7 sm:mt-10">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground">
          <time dateTime={frontmatter.date}>
            {formatDate(frontmatter.date)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{t("minutes", { count: readingMinutes })}</span>
          <ViewCounter slug={slug} />
        </p>
        <h1 className="mt-4 text-balance font-sans text-[2rem] font-semibold leading-[1.17] tracking-[-0.035em] sm:text-[2.75rem]">
          {frontmatter.title}
        </h1>
        {frontmatter.description && (
          <p className="mt-5 text-[17px] leading-[1.7] text-muted-foreground sm:text-lg">
            {frontmatter.description}
          </p>
        )}
        <ArticleOutline
          toc={toc}
          activeId={activeId}
          onItemClick={scrollToHeading}
        />
      </header>
      {frontmatter.image && (
        <div className="mt-8 overflow-hidden rounded-sm sm:mt-10">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            width={1600}
            height={900}
            className="h-auto w-full"
            sizes="(min-width: 768px) 42rem, 100vw"
            priority
          />
        </div>
      )}
      <article className="mdx-body mt-9 sm:mt-12">{children}</article>
      <ShareRow title={frontmatter.title} />
      <AdjacentPosts previous={previous} next={next} />
      <Comments slug={slug} />
    </main>
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
