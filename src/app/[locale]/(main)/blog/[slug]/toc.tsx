"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface TocItem {
  text: string;
  id: string;
  level: number;
}

interface TableOfContentsProps {
  toc: TocItem[];
  activeId: string | null;
  onItemClick: (id: string) => void;
}

function TocList({
  toc,
  activeId,
  onItemClick,
}: TableOfContentsProps) {
  return (
    <ul className="space-y-0.5">
      {toc.map(({ text, id, level }) => (
        <li
          key={id}
          style={{ paddingLeft: `${Math.max(0, (level - 1) * 12)}px` }}
        >
          <button
            onClick={() => onItemClick(id)}
            className={`text-left w-full text-xs py-1.5 px-3 rounded-md border-l-2 transition-all duration-200 leading-snug
              ${
                activeId === id
                  ? "border-primary text-primary bg-primary/5 font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border/60"
              }`}
          >
            {text}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function TocDesktop({ toc, activeId, onItemClick }: TableOfContentsProps) {
  if (toc.length === 0) return null;
  return (
    <div className="sticky top-28 max-h-[calc(100vh-120px)] overflow-auto pr-1">
      <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground/60 mb-4 flex items-center gap-2">
        <span className="h-px w-4 bg-border inline-block" />
        Contents
      </p>
      <TocList toc={toc} activeId={activeId} onItemClick={onItemClick} />
    </div>
  );
}

export function TocMobile({ toc, activeId, onItemClick }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);
  if (toc.length === 0) return null;
  return (
    <div className="mb-10 rounded-xl border border-border/40 bg-card/50 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold hover:bg-muted/20 transition-colors"
      >
        <span className="flex items-center gap-2.5 text-foreground">
          <span className="text-[10px] font-mono tracking-widest uppercase text-primary/70">
            Contents
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/30"
          >
            <div className="p-4">
              <TocList toc={toc} activeId={activeId} onItemClick={onItemClick} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
