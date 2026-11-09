"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Topic {
  tag: string;
  count: number;
}
export interface BlogFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  topics: Topic[];
  activeTopic: string | null;
  onTopicChange: (tag: string | null) => void;
  total: number;
  matches: number;
}

export function BlogFilters({
  query,
  onQueryChange,
  topics,
  activeTopic,
  onTopicChange,
  total,
  matches,
}: BlogFiltersProps) {
  const t = useTranslations("blog");
  const id = useId();
  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex flex-wrap items-center gap-x-5 border-b border-border pb-2">
        <div className="relative min-w-0 flex-1 basis-44">
          <label htmlFor={id} className="sr-only">
            {t("search_label")}
          </label>
          <Search
            className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id={id}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("search_label")}
            className="min-h-11 w-full bg-transparent pl-7 pr-11 text-sm text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              aria-label={t("clear")}
              onClick={() => onQueryChange("")}
              className="absolute right-0 top-0 flex size-11 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        {topics.length > 0 && (
          <>
            <label htmlFor={`${id}-topics`} className="sr-only">
              {t("topics_label")}
            </label>
            <Select
              value={activeTopic ?? "all"}
              onValueChange={(value) =>
                onTopicChange(value === "all" ? null : value)
              }
            >
              <SelectTrigger
                id={`${id}-topics`}
                className="min-h-11 w-full sm:w-52"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" align="end">
                <SelectItem value="all" className="min-h-11">
                  {t("all_topics")}
                </SelectItem>
                {topics.map(({ tag, count }) => (
                  <SelectItem key={tag} value={tag} className="min-h-11">
                    {tag} ({count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground" role="status">
        {query || activeTopic
          ? t("results", { count: matches })
          : t("count", { count: total })}
      </p>
    </div>
  );
}
