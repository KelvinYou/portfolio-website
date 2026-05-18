"use client";

import { Eye } from "lucide-react";
import { useEffect } from "react";
import { usePostViews } from "@/components/blog/blog-data-provider";
import {
  incrementPostViews,
  isBlogFirebaseReady,
} from "@/lib/blog-firebase";
import { formatCompactNumber } from "@/lib/utils";

// Per-slug cooldown to dedupe rapid re-mounts (React StrictMode in dev,
// route remounts during client-side nav). Two seconds is long enough to
// absorb spurious fires but short enough that a real navigate-and-come-back
// will count again.
const lastIncrementMs = new Map<string, number>();
const DEDUPE_MS = 2000;

function shouldIncrement(slug: string): boolean {
  const now = Date.now();
  const last = lastIncrementMs.get(slug);
  if (last && now - last < DEDUPE_MS) return false;
  lastIncrementMs.set(slug, now);
  return true;
}

export function ViewCounter({ slug }: { slug: string }) {
  const views = usePostViews(slug);

  useEffect(() => {
    if (!shouldIncrement(slug)) return;
    incrementPostViews(slug).catch((err) => {
      console.error("Failed to increment view count:", err);
    });
  }, [slug]);

  if (!isBlogFirebaseReady() || views === null) return null;

  return (
    <span className="flex items-center gap-1.5">
      <Eye className="h-3.5 w-3.5 text-primary/60" />
      {formatCompactNumber(views)} {views === 1 ? "view" : "views"}
    </span>
  );
}
