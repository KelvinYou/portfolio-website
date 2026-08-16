"use client";

import { sections } from "@/constants";
import { usePathname } from "@/i18n/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export interface IndexSegment {
  id: string;
  labelKey: string;
  /** Share of the document this section occupies, 0–1. Segment width. */
  weight: number;
}

export interface SectionIndex {
  /** Empty when the index does not apply (any page other than the homepage). */
  segments: IndexSegment[];
  /** Index into `segments`, or -1 before the first measurement lands. */
  activeIndex: number;
  /** Progress through the active section only, 0–1. */
  localProgress: number;
  scrollTo: (id: string) => void;
}

/** Where in the viewport we consider "the thing you are reading" to be. */
const READING_LINE = 0.35;

const EMPTY: IndexSegment[] = [];

/**
 * Rendered before the first measurement lands, so the track is present on the
 * server pass and settles into its true proportions instead of popping in.
 */
const EVEN: IndexSegment[] = sections.map((section) => ({
  id: section.id,
  labelKey: section.labelKey,
  weight: 1 / sections.length,
}));

export function useSectionIndex(): SectionIndex {
  const pathname = usePathname();
  const isDocument = pathname === "/";

  const [segments, setSegments] = useState<IndexSegment[]>(EVEN);
  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);

  // Measured document-space boundaries, kept in a ref so the scroll handler
  // never re-subscribes.
  const boundsRef = useRef<{ id: string; start: number; end: number }[]>([]);

  const measure = useCallback(() => {
    const tops = sections.map((section) => {
      const el = document.getElementById(section.id);
      if (!el) return null;
      return {
        section,
        top: el.getBoundingClientRect().top + window.scrollY,
      };
    });

    const found = tops.filter((t): t is NonNullable<typeof t> => t !== null);
    if (found.length === 0) {
      boundsRef.current = [];
      return;
    }

    // Boundaries, not raw heights: a section runs until the next one starts, so
    // the segments tile the document with no gaps for the inter-section padding.
    const docEnd = document.documentElement.scrollHeight;
    const bounds = found.map((entry, i) => ({
      id: entry.section.id,
      start: entry.top,
      end: i + 1 < found.length ? found[i + 1].top : docEnd,
    }));
    boundsRef.current = bounds;

    const span = bounds[bounds.length - 1].end - bounds[0].start;
    if (span <= 0) return;

    setSegments(
      found.map((entry, i) => ({
        id: entry.section.id,
        labelKey: entry.section.labelKey,
        weight: (bounds[i].end - bounds[i].start) / span,
      })),
    );
  }, []);

  // Sections reveal on scroll and images settle late, so heights are not final
  // at mount. Observe the body rather than measuring once.
  useEffect(() => {
    if (!isDocument) {
      boundsRef.current = [];
      return;
    }

    let frame = requestAnimationFrame(measure);
    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    window.addEventListener("resize", remeasure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [isDocument, measure]);

  useEffect(() => {
    if (!isDocument) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const bounds = boundsRef.current;
      if (bounds.length === 0) return;

      const probe = window.scrollY + window.innerHeight * READING_LINE;

      let i = bounds.findIndex((b) => probe >= b.start && probe < b.end);
      if (i === -1) i = probe < bounds[0].start ? 0 : bounds.length - 1;

      const { start, end } = bounds[i];
      const local = end > start ? (probe - start) / (end - start) : 0;

      setActiveIndex(i);
      setLocalProgress(Math.min(1, Math.max(0, local)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDocument, segments.length]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    // Keep the URL shareable without letting the browser jump.
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  // Off the homepage there is no document to index, so the track renders
  // nothing rather than the last measurement it happened to hold.
  if (!isDocument) {
    return { segments: EMPTY, activeIndex: -1, localProgress: 0, scrollTo };
  }

  return { segments, activeIndex, localProgress, scrollTo };
}
