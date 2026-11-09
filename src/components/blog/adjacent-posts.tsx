"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PostMeta } from "@/lib/mdx";
import { cn } from "@/lib/utils";

/**
 * Where to go next. The post page previously ended at the comment form, so the
 * only route onward was the browser's back button — the reader most likely to
 * read a second note was handed nothing to read it from.
 */
export function AdjacentPosts({
  previous,
  next,
}: {
  previous: PostMeta | null;
  next: PostMeta | null;
}) {
  if (!previous && !next) return null;

  // The newest and oldest posts have one neighbour each. Splitting into two
  // columns regardless left a bordered empty half on those two pages, so a
  // lone link takes the full width instead.
  const bothSides = previous !== null && next !== null;

  return (
    <nav
      className={cn(
        "mt-10 grid gap-x-8 border-t border-border",
        bothSides && "sm:grid-cols-2",
      )}
    >
      {previous && <AdjacentLink post={previous} direction="previous" />}
      {next && <AdjacentLink post={next} direction="next" />}
    </nav>
  );
}

function AdjacentLink({
  post,
  direction,
}: {
  post: PostMeta;
  direction: "previous" | "next";
}) {
  const t = useTranslations("blog");
  const isNext = direction === "next";
  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col gap-3 py-7 transition-colors",
        isNext ? "sm:items-end sm:pl-8 sm:text-right" : "sm:pr-8",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-2 text-xs text-muted-foreground",
          isNext && "sm:flex-row-reverse",
        )}
      >
        <Icon
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isNext
              ? "group-hover:translate-x-0.5"
              : "group-hover:-translate-x-0.5",
          )}
          aria-hidden="true"
        />
        {isNext ? t("nav_later") : t("nav_earlier")}
      </span>
      <span className="font-sans text-base font-medium leading-snug tracking-tight text-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-primary-ink md:text-lg">
        {post.frontmatter.title}
      </span>
    </Link>
  );
}
