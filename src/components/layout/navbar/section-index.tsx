"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import type { IndexSegment, SectionIndex } from "./use-section-index";

const ordinal = (i: number) => String(i + 1).padStart(2, "0");

/** Shared chrome type treatment: the site's only monospace. */
export const MONO = "font-mono text-[10px] uppercase tracking-[0.14em]";

/**
 * The rows behind the desktop panel and the mobile sheet. Each row carries the
 * same proportional bar as the track, so the two views read as one object.
 */
export function SectionIndexList({
  index,
  onNavigate,
  size = "compact",
}: {
  index: SectionIndex;
  onNavigate?: () => void;
  size?: "compact" | "roomy";
}) {
  const t = useTranslations("nav");
  const { segments, activeIndex, localProgress, scrollTo } = index;

  const widest = segments.reduce((max, s) => Math.max(max, s.weight), 0.0001);

  return (
    <ul className="flex flex-col">
      {segments.map((segment, i) => {
        const active = i === activeIndex;
        return (
          <li key={segment.id}>
            <button
              type="button"
              onClick={() => {
                scrollTo(segment.id);
                onNavigate?.();
              }}
              aria-current={active ? "true" : undefined}
              className={cn(
                "group/row flex w-full items-center gap-3 rounded-md text-left",
                "transition-colors duration-150 hover:bg-foreground/[0.06]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                size === "roomy" ? "px-3 py-3" : "px-2.5 py-2",
              )}
            >
              <span
                className={cn(
                  MONO,
                  "tabular-nums",
                  active ? "text-primary-ink" : "text-subtle",
                )}
              >
                {ordinal(i)}
              </span>

              <span
                className={cn(
                  "flex-1 truncate",
                  size === "roomy" ? "text-[15px]" : "text-[13px]",
                  active
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground group-hover/row:text-foreground",
                )}
              >
                {t(segment.labelKey)}
              </span>

              {/* Length of the bar is the length of the section. */}
              <span
                className="h-[3px] shrink-0 overflow-hidden rounded-full bg-foreground/10"
                style={{
                  width: `${Math.max(8, (segment.weight / widest) * 56)}px`,
                }}
                aria-hidden
              >
                <span
                  className={cn(
                    "block h-full rounded-full",
                    active ? "bg-primary" : "bg-foreground/25",
                  )}
                  style={{
                    width: active
                      ? `${localProgress * 100}%`
                      : i < activeIndex
                        ? "100%"
                        : "0%",
                  }}
                />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** One segment of the collapsed track. */
function Segment({
  segment,
  state,
  fill,
  label,
  onClick,
}: {
  segment: IndexSegment;
  state: "passed" | "active" | "upcoming";
  fill: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      style={{ flexGrow: segment.weight * 1000, flexBasis: 0 }}
      className={cn(
        "group/seg relative h-4 min-w-[6px] shrink-0 focus-visible:outline-none",
        // Segments open from even widths into their measured proportions.
        "motion-safe:transition-[flex-grow] motion-safe:duration-500 motion-safe:ease-out",
      )}
    >
      {/* Hit area is 16px tall; only the hairline is painted. */}
      <span
        className={cn(
          "absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full",
          "transition-colors duration-200",
          state === "passed"
            ? "bg-foreground/30"
            : "bg-foreground/12 group-hover/seg:bg-foreground/25",
          "group-focus-visible/seg:bg-foreground/40",
        )}
      >
        {state === "active" && (
          <span
            className="block h-full rounded-full bg-primary"
            style={{ width: `${Math.max(6, fill * 100)}%` }}
          />
        )}
      </span>
    </button>
  );
}

export function SectionIndexTrack({ index }: { index: SectionIndex }) {
  const t = useTranslations("nav");
  const { segments, activeIndex, localProgress, scrollTo } = index;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (segments.length === 0) return null;

  const active = segments[activeIndex] ?? segments[0];
  const activeLabel = t(active.labelKey);

  return (
    <div
      ref={wrapperRef}
      className="relative hidden md:block"
      onPointerEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex w-[180px] items-center gap-[3px] lg:w-[260px]"
          role="group"
          aria-label={t("index_label")}
        >
          {segments.map((segment, i) => (
            <Segment
              key={segment.id}
              segment={segment}
              state={
                i === activeIndex
                  ? "active"
                  : i < activeIndex
                    ? "passed"
                    : "upcoming"
              }
              fill={localProgress}
              label={t(segment.labelKey)}
              onClick={() => scrollTo(segment.id)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="true"
          className={cn(
            MONO,
            "flex shrink-0 items-center gap-1.5 rounded-sm py-1 text-muted-foreground",
            "transition-colors duration-150 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <span className="tabular-nums text-primary-ink">
            {ordinal(activeIndex < 0 ? 0 : activeIndex)}
          </span>
          <span className="text-faint">·</span>
          <span className="whitespace-nowrap">{activeLabel}</span>
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-3">
          <div
            className={cn(
              "w-[268px] rounded-lg border border-border bg-popover p-1.5",
              "shadow-lg shadow-black/5 dark:shadow-black/40",
              "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-150",
            )}
          >
            <SectionIndexList index={index} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

/** Full-bleed hairline under the mobile header — always on, no interaction. */
export function SectionIndexRule({ index }: { index: SectionIndex }) {
  const { segments, activeIndex, localProgress } = index;
  if (segments.length === 0) return null;

  return (
    <div className="flex h-[2px] w-full gap-[2px] md:hidden" aria-hidden>
      {segments.map((segment, i) => (
        <span
          key={segment.id}
          style={{ flexGrow: segment.weight * 1000, flexBasis: 0 }}
          className={cn(
            "h-full overflow-hidden",
            "motion-safe:transition-[flex-grow] motion-safe:duration-500 motion-safe:ease-out",
            i < activeIndex ? "bg-foreground/30" : "bg-foreground/10",
          )}
        >
          {i === activeIndex && (
            <span
              className="block h-full bg-primary"
              style={{ width: `${Math.max(4, localProgress * 100)}%` }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
