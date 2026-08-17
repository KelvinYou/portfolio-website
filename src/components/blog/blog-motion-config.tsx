"use client";

import { MotionConfig } from "framer-motion";

/**
 * Reduced-motion handling for the blog routes.
 *
 * Branching rendered output on `useReducedMotion()` does not work in a
 * prerendered tree: the hook has no `matchMedia` on the server, so it returns
 * `false` there and `true` in a reader's browser, and every guarded element
 * hydrates with different props than it was sent with.
 *
 * `MotionConfig reducedMotion="user"` moves the decision into the animation
 * layer instead. Markup is identical on both sides; when the reader has asked
 * for less motion, Framer drops transform and layout animations and keeps plain
 * opacity fades, which is the behaviour the preference actually asks for.
 */
export function BlogMotionConfig({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
