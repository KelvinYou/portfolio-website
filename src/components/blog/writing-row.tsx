"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PostIndexEntry } from "@/lib/mdx";
import { formatMonthDay } from "@/lib/utils";

export interface WritingRowProps {
  post: PostIndexEntry;
}

export const WritingRow = React.memo(function WritingRow({
  post,
}: WritingRowProps) {
  const t = useTranslations("blog");
  return (
    <li className="border-b border-border/60 last:border-0">
      <Link
        href={`/blog/${post.slug}`}
        className="group block py-7 focus-visible:rounded-sm sm:py-8"
      >
        <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <time dateTime={post.date}>{formatMonthDay(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{t("minutes", { count: post.readingMinutes })}</span>
        </p>
        <h3 className="max-w-[38ch] font-sans text-xl font-semibold leading-[1.4] tracking-[-0.02em] text-foreground underline decoration-transparent underline-offset-4 group-hover:decoration-foreground/40 sm:text-2xl">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-2.5 line-clamp-2 max-w-[64ch] text-[15px] leading-[1.7] text-muted-foreground">
            {post.description}
          </p>
        )}
      </Link>
    </li>
  );
});
