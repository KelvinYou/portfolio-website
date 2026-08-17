"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { TocEntry } from "@/lib/blog-content";
import { cn } from "@/lib/utils";

interface TocProps {
  toc: TocEntry[];
  activeId: string | null;
  onItemClick: (id: string) => void;
}

/**
 * The rail is anchor links, not buttons. Buttons cannot be opened in a new
 * tab, copied, or reached by a screen reader's link list, and a table of
 * contents is the one control where all three are things people do.
 */
function TocList({ toc, activeId, onItemClick }: TocProps) {
  return (
    <ul className="space-y-px">
      {toc.map(({ text, id, level }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={(event) => {
              // Let modified clicks (new tab, new window) behave normally.
              if (event.metaKey || event.ctrlKey || event.shiftKey) return;
              event.preventDefault();
              onItemClick(id);
            }}
            aria-current={activeId === id ? "location" : undefined}
            className={cn(
              "block border-l py-1.5 text-xs leading-snug transition-colors duration-200",
              level === 3 ? "pl-6" : "pl-3",
              // The cyan rule marks the current section; the label itself goes
              // to foreground. Cyan text on the light background is 1.33:1.
              activeId === id
                ? "border-primary text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground",
            )}
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TocDesktop({ toc, activeId, onItemClick }: TocProps) {
  const t = useTranslations("blog");
  if (toc.length === 0) return null;

  return (
    <nav
      aria-label={t("contents")}
      className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto"
    >
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {t("contents")}
      </p>
      <TocList toc={toc} activeId={activeId} onItemClick={onItemClick} />
    </nav>
  );
}

export function TocMobile({ toc, activeId, onItemClick }: TocProps) {
  const t = useTranslations("blog");
  const [open, setOpen] = useState(false);

  if (toc.length === 0) return null;

  return (
    <nav aria-label={t("contents")} className="mb-12 border-y border-border">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {t("contents")}
          <span className="ml-2 tabular-nums text-muted-foreground">
            {toc.length}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <TocList
                toc={toc}
                activeId={activeId}
                onItemClick={(id) => {
                  onItemClick(id);
                  setOpen(false);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
