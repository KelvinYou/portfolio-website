"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Paths } from "@/enums";

/**
 * The write-ups attached to one role or one project.
 *
 * This is the load-bearing part of both ledgers: a role has an employer
 * vouching for it, but a claim about *how* something was built has nothing
 * behind it except a post a reader can open and disagree with. So the list is
 * rendered in full rather than summarised away.
 *
 * `titles` comes down from a server page via `getPostTitles()`. A slug with no
 * entry falls back to its path rather than disappearing — a missing title is a
 * renamed file, and a silently dropped link would hide that.
 */

/** Links shown before the rest fold into the disclosure. */
const MAX_VISIBLE = 5;

function PostLink({ slug, title }: { slug: string; title?: string }) {
  return (
    <Link
      href={`${Paths.Blog}/${slug}`}
      className="group/post inline-flex w-fit items-start gap-1.5 text-xs leading-relaxed text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <span className="max-w-[54ch] underline decoration-border underline-offset-4 transition-colors group-hover/post:decoration-primary-ink">
        {title ?? `/${slug}`}
      </span>
      <ArrowUpRight
        className="mt-0.5 h-3 w-3 shrink-0 transition-transform duration-300 group-hover/post:translate-x-0.5 group-hover/post:-translate-y-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export const WroteAbout = React.memo(function WroteAbout({
  slugs,
  titles,
}: {
  slugs: string[];
  titles?: Record<string, string>;
}) {
  if (!slugs.length) return null;

  const visible = slugs.slice(0, MAX_VISIBLE);
  const folded = slugs.slice(MAX_VISIBLE);

  return (
    <div className="mt-6 flex flex-col gap-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
        Wrote about this
        <span className="mx-2 text-faint" aria-hidden="true">
          /
        </span>
        <span className="tabular-nums">{slugs.length}</span>
      </p>

      {visible.map((slug) => (
        <PostLink key={slug} slug={slug} title={titles?.[slug]} />
      ))}

      {/* `details` rather than a `useState` toggle: the whole list is in the
          DOM either way, so state would buy nothing a browser doesn't already
          do — including keyboard operation and in-page find. */}
      {folded.length > 0 && (
        <details className="group/more mt-1">
          <summary className="w-fit cursor-pointer list-none font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background">
            <span className="tabular-nums">{folded.length}</span> more
          </summary>
          <div className="mt-2 flex flex-col gap-2">
            {folded.map((slug) => (
              <PostLink key={slug} slug={slug} title={titles?.[slug]} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
});
