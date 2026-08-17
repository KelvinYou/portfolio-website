import Image from "next/image";
import React from "react";
import { CodeBlock, InlineCode } from "./code-block";
import { Gallery } from "@/components/gallery";

/**
 * Long-form styling for post bodies.
 *
 * This module is deliberately *not* a client component. It is handed to
 * `next-mdx-remote/rsc` inside a server component, so the elements below are
 * rendered on the server; only the three interactive pieces it references
 * (code copy button, mermaid, gallery) carry their own `"use client"`.
 *
 * Two things changed about the headings. They no longer compute their own `id`
 * — `rehype-slug` already assigned one during serialisation, and because the
 * spread came *after* `id={…}` the hand-rolled slug was being overwritten every
 * time anyway, so the only working consequence was a `console.log` per heading.
 * They also no longer carry `flex`: it turned each child of a heading into a
 * flex item, so any heading containing inline code or a link had its words
 * spaced out like a toolbar.
 *
 * Body copy is `foreground/90`, not `muted-foreground`. Muted is metadata grey
 * (#86869A on #07070C, about 4.6:1) — legible for a date, thin for the two
 * thousand words underneath it.
 */

const HEADING_BASE =
  "font-heading font-semibold tracking-tight text-foreground scroll-mt-28";

export const mdxComponents = {
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <CodeBlock {...props} />
  ),

  code: (props: React.ComponentPropsWithoutRef<"code">) => {
    // Fenced code arrives with a `language-*` class and is handled by `pre`.
    const isInline = !props.className?.includes("language-");
    return isInline ? <InlineCode {...props} /> : <code {...props} />;
  },

  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
      {...props}
      className={`${HEADING_BASE} mb-6 mt-14 text-3xl md:text-4xl`}
    />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className={`${HEADING_BASE} mb-5 mt-14 text-2xl md:text-[1.75rem]`}
    />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className={`${HEADING_BASE} mb-4 mt-10 text-xl md:text-2xl`}
    />
  ),
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
    <h4 {...props} className={`${HEADING_BASE} mb-3 mt-8 text-lg`} />
  ),
  h5: (props: React.ComponentPropsWithoutRef<"h5">) => (
    <h5 {...props} className={`${HEADING_BASE} mb-2 mt-6 text-base`} />
  ),
  h6: (props: React.ComponentPropsWithoutRef<"h6">) => (
    <h6
      {...props}
      className="mb-2 mt-6 scroll-mt-28 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
    />
  ),

  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className="mb-6 text-[1.0625rem] leading-[1.75] text-foreground/90"
    />
  ),

  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="my-6 list-outside list-decimal space-y-2.5 pl-7 text-[1.0625rem] leading-[1.75] text-foreground/90 marker:font-mono marker:text-sm marker:text-muted-foreground"
    />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="my-6 list-outside list-disc space-y-2.5 pl-7 text-[1.0625rem] leading-[1.75] text-foreground/90 marker:text-muted-foreground/60"
    />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="pl-1.5" />
  ),

  // A quote is set apart by the rule and the indent. It previously also had a
  // two-stop gradient, a rounded right edge and a drop shadow.
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="my-8 border-l-2 border-primary/50 pl-6 text-[1.0625rem] leading-[1.75] not-italic text-foreground/80 [&>p:last-child]:mb-0"
    />
  ),

  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      // Cyan underline, foreground text. As `text-primary` the link measured
      // 1.33:1 against the light background — an in-body link is the one place
      // that is least survivable.
      className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-[3px] transition-opacity hover:opacity-70"
    />
  ),

  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} className="font-semibold text-foreground" />
  ),
  em: (props: React.ComponentPropsWithoutRef<"em">) => (
    <em {...props} className="italic" />
  ),

  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <Image
      src={(props.src as string) || ""}
      alt={props.alt || ""}
      width={0}
      height={0}
      sizes="(min-width: 1024px) 44rem, 100vw"
      className="my-8 h-auto w-full rounded-xl border border-border"
      style={{ maxWidth: "100%" }}
    />
  ),

  // Tables are the one element allowed to exceed the reading measure — a
  // four-column comparison wrapped to 68ch is unreadable. It scrolls in its
  // own container rather than pushing the page sideways.
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border">
      <table {...props} className="w-full border-collapse text-left text-sm" />
    </div>
  ),
  thead: (props: React.ComponentPropsWithoutRef<"thead">) => (
    <thead {...props} className="border-b border-border" />
  ),
  tbody: (props: React.ComponentPropsWithoutRef<"tbody">) => (
    <tbody {...props} className="divide-y divide-border" />
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className="whitespace-nowrap px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] font-normal text-muted-foreground"
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      className="px-5 py-3.5 align-top leading-relaxed text-foreground/90"
    />
  ),

  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className="my-12 border-0 border-t border-border" />
  ),

  Gallery,
};
