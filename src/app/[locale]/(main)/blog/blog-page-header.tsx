"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeIn, staggerContainerWithTiming } from "@/lib/animations";

/**
 * Same masthead structure as /projects: title, one paragraph of orientation,
 * then a rule-marked legend explaining what the aligned right column holds.
 * The legend is load-bearing here — the extent bar is the one device on this
 * page a reader has not seen on another blog, so it gets a sentence.
 */
export function BlogPageHeader() {
  const t = useTranslations("blog");

  return (
    <motion.header
      className="mb-14 md:mb-16"
      initial="hidden"
      animate="visible"
      variants={staggerContainerWithTiming(0.12, 0.1)}
    >
      <motion.h1
        className="font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
        variants={fadeIn}
      >
        {t("title")}
      </motion.h1>

      <motion.p
        className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground"
        variants={fadeIn}
      >
        {t("intro")}
      </motion.p>

      <motion.p
        className="mt-5 max-w-[52ch] border-l-2 border-primary pl-4 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-muted-foreground"
        variants={fadeIn}
      >
        {t("legend")}
      </motion.p>
    </motion.header>
  );
}
