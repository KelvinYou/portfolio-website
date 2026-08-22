"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

/** How long typing settles before the URL is rewritten. */
const QUERY_DEBOUNCE_MS = 300;

const QUERY_PARAM = "q";
const TOPIC_PARAM = "topic";

function readQuery(): string {
  return new URLSearchParams(window.location.search).get(QUERY_PARAM) ?? "";
}

/**
 * The index's filter state, held in the URL rather than in component state.
 *
 * The state used to be two `useState` calls, which lost the reader's place in
 * the one flow the page exists for: filter to a topic, open a post, come back.
 * Neither the in-page "All writing" link nor the browser's own Back button
 * could restore a filter that had never been written down anywhere.
 *
 * Both writes are `replace`, not `push`. A filter is a view of one page, not a
 * place — pushing would mean four Backs to escape a page the reader adjusted
 * four times. The history entry that matters is created by the navigation *into*
 * a post, and it carries the filtered URL with it, so Back out of a post lands
 * on the list exactly as it was left. Next restores the scroll offset on that
 * pop for free, because the entry is real.
 */
export function useBlogFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const topic = searchParams.get(TOPIC_PARAM);

  // `query` is local, not read back off `searchParams`, so results update at
  // typing speed while the URL trails on a debounce. Deriving it from the URL
  // would put a router round-trip between a keystroke and the letter appearing,
  // and would let an in-flight write overwrite whatever was typed after it.
  const [query, setQueryState] = useState(() =>
    typeof window === "undefined" ? "" : readQuery(),
  );

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Back and Forward are the one case where the URL is the authority and the
  // input is stale. `replace` does not emit `popstate`, so our own debounced
  // writes cannot echo back through here and clobber in-flight typing.
  useEffect(() => {
    const sync = () => setQueryState(readQuery());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const commit = useCallback(
    (next: { query?: string; topic?: string | null }) => {
      const params = new URLSearchParams(searchParams);

      if (next.query !== undefined) {
        if (next.query) params.set(QUERY_PARAM, next.query);
        else params.delete(QUERY_PARAM);
      }

      if (next.topic !== undefined) {
        if (next.topic) params.set(TOPIC_PARAM, next.topic);
        else params.delete(TOPIC_PARAM);
      }

      const search = params.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const setQuery = useCallback(
    (value: string) => {
      setQueryState(value);

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () => commit({ query: value }),
        QUERY_DEBOUNCE_MS,
      );
    },
    [commit],
  );

  const setTopic = useCallback(
    (value: string | null) => commit({ topic: value }),
    [commit],
  );

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setQueryState("");
    commit({ query: "", topic: null });
  }, [commit]);

  return { query, setQuery, topic, setTopic, clear };
}
