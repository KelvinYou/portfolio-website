"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import type { TocEntry } from "@/lib/blog-content";
import { cn } from "@/lib/utils";

export interface TocProps {
  toc: TocEntry[];
  activeId: string | null;
  onItemClick: (id: string) => void;
}

export function ArticleOutline({ toc, activeId, onItemClick }: TocProps) {
  const t = useTranslations("blog");
  const details = useRef<HTMLDetailsElement>(null);
  if (!toc.length) return null;
  return (
    <details ref={details} className="group mt-5">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
        {t("contents")}
        <ChevronDown
          className="size-3.5 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <nav aria-label={t("contents")} className="pb-3 pt-1">
        <ul className="border-l border-border">
          {toc.map(({ text, id, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeId === id ? "location" : undefined}
                className={cn(
                  "flex min-h-11 items-center py-2 text-sm leading-relaxed text-muted-foreground hover:text-foreground",
                  level === 3 ? "pl-7" : "pl-4",
                  activeId === id && "font-medium text-foreground",
                )}
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  event.preventDefault();
                  if (details.current) details.current.open = false;
                  onItemClick(id);
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
