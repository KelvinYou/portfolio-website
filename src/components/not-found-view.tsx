"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { locales } from "@/i18n/routing";

export interface NotFoundCopy {
  eyebrow: string;
  heading: string;
  description: string;
  attempted: string;
  suggestionsLabel: string;
}

export interface NotFoundLink {
  /** Locale-agnostic path; the locale prefix is added here. */
  href: string;
  label: string;
  /** Set for addresses that exist at one URL only, e.g. the resume PDF. */
  unprefixed?: boolean;
}

interface NotFoundViewProps {
  copy: NotFoundCopy;
  primaryAction: NotFoundLink;
  suggestions: NotFoundLink[];
}

const PRIMARY_CLASS =
  "btn-bold-hover inline-flex h-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground px-6 font-heading text-sm font-semibold tracking-tight text-background";

const SUGGESTION_CLASS =
  "smooth-interaction inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary";

export function NotFoundView({
  copy,
  primaryAction,
  suggestions,
}: NotFoundViewProps) {
  const pathname = usePathname();

  // Plain anchors, not `Link`. A soft navigation out of a 404 has no matching
  // router tree to patch — the address bar changes and the 404 stays on
  // screen. A document request is also the honest gesture: you are leaving a
  // dead route, not moving inside an app shell.
  //
  // The prefix is read off the live pathname rather than passed in, because
  // `getLocale()` is not available inside a not-found boundary: calling it
  // there throws and drops the whole page to Next's bare error shell.
  const [, firstSegment = ""] = pathname.split("/");
  const prefix = (locales as readonly string[]).includes(firstSegment)
    ? `/${firstSegment}`
    : "";
  const localized = (href: string) =>
    href === "/" ? prefix || "/" : `${prefix}${href}`;

  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden bg-background px-4 py-24 sm:px-6 lg:px-8">
      {/* Depth, not decoration: one soft cyan bloom plus an oversized 404 set
          in the page's own heading face, held at low contrast so it reads as
          the room the content sits in rather than as a second headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="absolute h-[38rem] w-[38rem] rounded-full bg-primary/[0.07] blur-[120px]" />
        <span className="select-none font-heading text-[38vw] font-semibold leading-none text-foreground/[0.035] sm:text-[26rem]">
          404
        </span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container relative mx-auto max-w-2xl"
      >
        <motion.p
          variants={fadeIn}
          className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-primary"
        >
          {copy.eyebrow}
        </motion.p>

        <motion.h1
          variants={fadeIn}
          className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        >
          {copy.heading}
        </motion.h1>

        <motion.p
          variants={fadeIn}
          className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
        >
          {copy.description}
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="glass-card mt-8 flex flex-col gap-1 rounded-xl px-4 py-3"
        >
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {copy.attempted}
          </span>
          <code className="break-all font-mono text-sm text-foreground">
            {pathname}
          </code>
        </motion.div>

        <motion.div variants={fadeIn} className="mt-10">
          <a href={localized(primaryAction.href)} className={PRIMARY_CLASS}>
            {primaryAction.label}
          </a>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="mt-12 border-t border-border pt-6"
        >
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {copy.suggestionsLabel}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {suggestions.map(({ href, label, unprefixed }) => (
              <li key={href}>
                <a
                  href={unprefixed ? href : localized(href)}
                  className={SUGGESTION_CLASS}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </main>
  );
}
