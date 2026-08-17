"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeIn } from "@/lib/animations";
import type { PostIndexEntry } from "@/lib/mdx";
import { cn, formatMonthDay } from "@/lib/utils";

/**
 * A post rendered as a ledger row, matching the shape /projects already uses:
 * date on the left, the claim in the middle, measured facts in an aligned
 * right column.
 *
 * The measured fact for a post is its extent. The index used to lead with
 * cover art, but only five of twelve posts have an image, so the grid filled
 * the other seven with a decorative number — decoration standing in for
 * missing decoration. Length is the thing a reader actually weighs before
 * opening a note, so it gets the column instead.
 */

const MAX_TAGS = 3;

/**
 * Length as a hairline, scaled against the longest note on the page. The
 * minute count carries the same information for anyone not looking at pixels,
 * so the bar is decorative to assistive tech.
 */
function ExtentBar({ ratio }: { ratio: number }) {
  return (
    <span
      className="mt-3.5 block h-[3px] w-16 bg-muted-foreground/15 md:ml-auto"
      aria-hidden="true"
    >
      <span
        className="block h-[3px] bg-muted-foreground/60 transition-colors duration-200 group-hover:bg-primary"
        // Floored so the shortest note still reads as a mark rather than a gap.
        style={{ width: `${Math.max(8, Math.round(ratio * 100))}%` }}
      />
    </span>
  );
}

/**
 * Eight of twelve titles here are written as `claim: qualifier`. Setting the
 * qualifier back in metadata grey lets the eye run down the claims, which is
 * the part that differs between two posts about the same subsystem.
 */
function splitTitle(title: string): { lede: string; qualifier: string | null } {
  const at = title.indexOf(": ");
  if (at === -1) return { lede: title, qualifier: null };
  return { lede: title.slice(0, at), qualifier: title.slice(at + 1).trim() };
}

export const WritingRow = React.memo(function WritingRow({
  post,
  longestUnits,
  views,
}: {
  post: PostIndexEntry;
  longestUnits: number;
  views?: number;
}) {
  const t = useTranslations("blog");
  const { lede, qualifier } = splitTitle(post.title);

  return (
    <motion.li variants={fadeIn} className="border-t border-border">
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group grid grid-cols-1 gap-x-10 gap-y-4 px-2 py-7 transition-colors duration-200",
          "-mx-2 rounded-lg hover:bg-foreground/[0.02]",
          "md:grid-cols-[4.75rem_minmax(0,1fr)_8rem] md:py-8",
        )}
      >
        <p className="font-mono text-sm tabular-nums text-muted-foreground">
          {formatMonthDay(post.date)}
        </p>

        <div className="min-w-0">
          {/* Not a flex container: `flex` makes every child of the heading a
              flex item, which spaces the words of a wrapped title like a
              toolbar. The arrow is inline, so it trails the last word. */}
          <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
            {/* Hover is carried by the row tint, the arrow and the extent bar
                rather than by recolouring the title: cyan text measures 1.33:1
                on the light background. */}
            <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-primary">
              {lede}
            </span>
            {qualifier && (
              <span className="text-muted-foreground">: {qualifier}</span>
            )}
            <ArrowUpRight
              className="ml-1.5 inline-block h-4 w-4 align-baseline text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              aria-hidden="true"
            />
          </h3>

          {post.description && (
            <p className="mt-3 line-clamp-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}

          {post.tags.length > 0 && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {post.tags.slice(0, MAX_TAGS).join(" · ")}
            </p>
          )}
        </div>

        <div className="md:text-right">
          <p className="font-mono text-sm tabular-nums text-foreground">
            {t("minutes", { count: post.readingMinutes })}
          </p>

          <ExtentBar
            ratio={longestUnits > 0 ? post.readingUnits / longestUnits : 0}
          />

          {typeof views === "number" && (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] tabular-nums text-muted-foreground">
              {t("views", { count: views })}
            </p>
          )}
        </div>
      </Link>
    </motion.li>
  );
});
