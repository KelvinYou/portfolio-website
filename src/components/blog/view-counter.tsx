"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePostViews } from "@/components/blog/blog-data-provider";
import { incrementPostViews, isBlogFirebaseReady } from "@/lib/blog-firebase";

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
  const t = useTranslations("blog");
  const views = usePostViews(slug);

  useEffect(() => {
    if (!shouldIncrement(slug)) return;
    incrementPostViews(slug).catch((err) => {
      console.error("Failed to increment view count:", err);
    });
  }, [slug]);

  if (!isBlogFirebaseReady() || views === null) return null;

  // Carries its own separator: the count is the only optional item in the post
  // header's metadata line, and a dot rendered by the parent would be left
  // dangling on every post Firebase has no number for yet.
  return (
    <>
      <span className="text-muted-foreground/40" aria-hidden="true">
        ·
      </span>
      <span className="tabular-nums">{t("views", { count: views })}</span>
    </>
  );
}
