"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { cn } from "@/lib/utils";

export type Topic = { tag: string; count: number };

/**
 * Two controls, not four. The previous index also carried a grid/list toggle
 * (its sort state had no setter, so it was inert) and every tag any post
 * declared — forty-five chips that accumulated as an AND filter, so most pairs
 * a reader could click returned nothing.
 *
 * Topics are single-select and only appear when they group at least two posts,
 * which is the point at which a topic is a category rather than a label.
 */
export function BlogFilters({
  query,
  onQueryChange,
  topics,
  activeTopic,
  onTopicChange,
  total,
  matches,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  topics: Topic[];
  activeTopic: string | null;
  onTopicChange: (tag: string | null) => void;
  total: number;
  matches: number;
}) {
  const t = useTranslations("blog");
  const searchId = useId();
  const isFiltered = query.length > 0 || activeTopic !== null;

  return (
    <div className="mb-12 md:mb-16">
      <label htmlFor={searchId} className="sr-only">
        {t("search_label")}
      </label>
      <div className="relative max-w-sm">
        <Search
          className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={t("search_placeholder")}
          // Underline rather than a filled box: the page is hairlines and
          // aligned columns, and a rounded input plate reads as borrowed chrome.
          className="w-full border-b border-border bg-transparent py-2.5 pl-7 pr-8 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label={t("clear")}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {topics.length > 0 && (
        // One scrolling row on phones, wrapping on wider screens. The global
        // mobile rule in globals.css gives every button a 44px touch target,
        // which is correct — but wrapped across four lines it put 400px of
        // filter chrome above the first post on a 390px viewport. Bleeding to
        // the screen edges is what signals there is more to the right.
        <div
          className={cn(
            "mt-7 flex items-center gap-x-6",
            "-mx-4 overflow-x-auto px-4 scrollbar-hide",
            "sm:mx-0 sm:flex-wrap sm:gap-y-3 sm:overflow-visible sm:px-0",
          )}
        >
          <TopicButton
            label={t("topic_all")}
            count={total}
            active={activeTopic === null}
            onClick={() => onTopicChange(null)}
          />
          {topics.map(({ tag, count }) => (
            <TopicButton
              key={tag}
              label={tag}
              count={count}
              active={activeTopic === tag}
              onClick={() => onTopicChange(activeTopic === tag ? null : tag)}
            />
          ))}
        </div>
      )}

      {isFiltered && (
        <p
          className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
          role="status"
        >
          {t("results", { count: matches })}
        </p>
      )}
    </div>
  );
}

function TopicButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
        // Cyan marks the selection, but as a rule under the label rather than
        // as the label's colour: #00F0FF text on the light background measures
        // 1.33:1, which is not a legible colour for words in any size.
        active
          ? "text-foreground underline decoration-primary decoration-2 underline-offset-[6px]"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      <span className="ml-1.5 tabular-nums text-muted-foreground">{count}</span>
    </button>
  );
}
