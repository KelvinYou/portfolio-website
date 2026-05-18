"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  isBlogFirebaseReady,
  subscribeToAllPostViews,
  subscribeToComments,
  type BlogComment,
} from "@/lib/blog-firebase";

type CommentsState = {
  comments: BlogComment[];
  loaded: boolean;
};

type BlogDataContextValue = {
  viewsBySlug: Map<string, number>;
  getComments: (slug: string) => CommentsState;
  ensureCommentsSubscription: (slug: string) => void;
};

const EMPTY_COMMENTS: CommentsState = { comments: [], loaded: false };
const EMPTY_VIEWS: Map<string, number> = new Map();

// Cap how many per-slug comment listeners stay open at once. The LRU bound
// prevents a long reading session from accumulating dozens of live Firestore
// listeners while still letting the most-recent posts hit a warm cache.
const MAX_COMMENT_SUBS = 10;

const BlogDataContext = createContext<BlogDataContextValue | null>(null);

export function BlogDataProvider({ children }: { children: React.ReactNode }) {
  const [viewsBySlug, setViewsBySlug] = useState<Map<string, number>>(
    () => new Map()
  );
  const [commentsBySlug, setCommentsBySlug] = useState<
    Map<string, CommentsState>
  >(() => new Map());

  const commentSubsRef = useRef<Map<string, () => void>>(new Map());

  useEffect(() => {
    if (!isBlogFirebaseReady()) return;
    return subscribeToAllPostViews((next) => {
      setViewsBySlug((prev) => (viewMapsEqual(prev, next) ? prev : next));
    });
  }, []);

  useEffect(() => {
    const subs = commentSubsRef.current;
    return () => {
      subs.forEach((unsub) => unsub());
      subs.clear();
    };
  }, []);

  const ensureCommentsSubscription = useCallback((slug: string) => {
    if (!isBlogFirebaseReady()) return;
    const subs = commentSubsRef.current;

    // Already subscribed — bump to "most recently used" so it survives eviction.
    if (subs.has(slug)) {
      const unsub = subs.get(slug)!;
      subs.delete(slug);
      subs.set(slug, unsub);
      return;
    }

    // At cap — evict the oldest entry (Map preserves insertion order).
    if (subs.size >= MAX_COMMENT_SUBS) {
      const oldest = subs.keys().next().value;
      if (oldest !== undefined) {
        subs.get(oldest)?.();
        subs.delete(oldest);
      }
    }

    const unsub = subscribeToComments(slug, (comments) => {
      setCommentsBySlug((prev) => {
        const next = new Map(prev);
        next.set(slug, { comments, loaded: true });
        return next;
      });
    });

    subs.set(slug, unsub);
  }, []);

  const getComments = useCallback(
    (slug: string): CommentsState => commentsBySlug.get(slug) ?? EMPTY_COMMENTS,
    [commentsBySlug]
  );

  const value = useMemo<BlogDataContextValue>(
    () => ({ viewsBySlug, getComments, ensureCommentsSubscription }),
    [viewsBySlug, getComments, ensureCommentsSubscription]
  );

  return (
    <BlogDataContext.Provider value={value}>
      {children}
    </BlogDataContext.Provider>
  );
}

export function useBlogViews(): Map<string, number> {
  const ctx = useContext(BlogDataContext);
  return ctx?.viewsBySlug ?? EMPTY_VIEWS;
}

export function usePostViews(slug: string): number | null {
  const ctx = useContext(BlogDataContext);
  if (!ctx) return null;
  return ctx.viewsBySlug.get(slug) ?? null;
}

export function usePostComments(slug: string): CommentsState {
  const ctx = useContext(BlogDataContext);
  // Safe to call every render — ensureCommentsSubscription dedupes by slug.
  useEffect(() => {
    ctx?.ensureCommentsSubscription(slug);
  }, [ctx, slug]);
  return ctx?.getComments(slug) ?? EMPTY_COMMENTS;
}

function viewMapsEqual(
  a: Map<string, number>,
  b: Map<string, number>
): boolean {
  if (a.size !== b.size) return false;
  for (const [k, v] of a) {
    if (b.get(k) !== v) return false;
  }
  return true;
}
