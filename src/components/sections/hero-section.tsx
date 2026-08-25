"use client";

import { useRef, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { personalInfo, resumeRoute } from "@/constants";
import { SocialLinks } from "@/components/base/social-links";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

/**
 * Terminal output, not prose — deliberately untranslated. Three rows only:
 * this card is the spec sheet backing the lead sentence, and the sentence
 * stops being a claim the moment the card tries to list everything.
 */
const terminalRows = [
  { label: "agents", value: "4 analysts · debate stage · outcome memory" },
  { label: "payments", value: "cross-currency bulk · FX rate lock · 35% faster" },
  { label: "stack", value: "TypeScript · Kotlin · Python · MCP" },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - left) / width - 0.5);
        mouseY.set((e.clientY - top) / height - 0.5);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const cardRotateX = useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const cardRotateY = useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-32 md:py-40"
    >
      {/* Ambient background glow */}
      <div className="hero-ambient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute left-1/4 bottom-1/4 w-64 h-64 rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Content */}
          <div className="max-w-3xl">
            {/* Availability pill. This used to hold a second identity
                tagline; two labels chained with a middot read as hedging,
                so the identity claim now lives in exactly one place (the
                role line) and the pill carries the thing a recruiter
                actually scans for. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.06] px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <p className="text-xs font-medium text-primary-ink">{t("badge")}</p>
            </motion.div>

            {/* Name — the only element at display scale. */}
            <motion.h1
              className="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* The name itself, not a greeting around it. A name
                      doesn't translate, so it lives in data.ts, not in the
                      message catalogues. */}
                  <span className="inline-block text-primary-ink">
                    {personalInfo.name}
                  </span>
                </motion.div>
              </div>
            </motion.h1>

            {/* Role — demoted to a label. It was competing with the name at
                near-display size, which left nothing for the sentence. */}
            <motion.p
              className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t("role")}
            </motion.p>

            {/* Lead. The hero used to render no prose at all — only labels,
                counters and a stat dump — which is what made it read as a
                spec sheet. This sentence is the whole positioning. */}
            <motion.p
              className="mt-7 max-w-xl text-lg leading-snug text-foreground/90 sm:text-xl md:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ letterSpacing: "-0.01em" }}
            >
              {t("lead")}
            </motion.p>

            {/* Actions — the hero had none. The counters that used to sit
                here (years, project count) are the weakest numbers on the
                page and are covered by the About proof row. */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62 }}
            >
              <MagneticButton>
                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants(),
                    "group rounded-xl px-6 py-3 font-semibold cursor-pointer btn-bold-hover",
                  )}
                >
                  {t("cta_primary")}
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </MagneticButton>
              <MagneticButton>
                {/* /resume is the PDF, so this leaves the app: plain anchor,
                    new tab, no locale prefix. */}
                <a
                  href={resumeRoute}
                  target="_blank"
                  rel="noopener"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-xl px-6 py-3 cursor-pointer border-border transition-all duration-300 hover:border-primary/40 hover:bg-card hover:text-foreground",
                  )}
                  aria-label="Open my resume PDF in a new tab"
                >
                  <FileText className="mr-2 h-4 w-4" aria-hidden="true" />{" "}
                  {tCommon("view_resume")}
                </a>
              </MagneticButton>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.72 }}
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* Right: Terminal card */}
          <motion.div
            className="relative hidden justify-center lg:flex lg:justify-end"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="w-[420px] overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-xl neo-shadow-lg"
              style={{ transformStyle: "preserve-3d", rotateX: cardRotateX, rotateY: cardRotateY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-border px-5 py-3.5" style={{ transform: "translateZ(20px)" }}>
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  kelvin@portfolio ~ %
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm" style={{ transform: "translateZ(20px)" }}>
                <div className="text-muted-foreground">
                  <span className="text-foreground">$</span> kelvin --what-i-ship
                </div>
                <div className="mt-4 space-y-3">
                  {terminalRows.map((row) => (
                    <div key={row.label} className="flex gap-4">
                      <span className="w-[4.5rem] shrink-0 text-right text-subtle">
                        {row.label}
                      </span>
                      <span className="flex-1 text-primary-ink">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-4">
                  <span className="w-[4.5rem] shrink-0 text-right text-subtle" aria-hidden="true">
                    {" "}
                  </span>
                  <span className="inline-block h-4 w-1.5 animate-pulse rounded-sm bg-primary/70" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
