"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { staggerContainerWithTiming, fadeIn } from "@/lib/animations";
import { projects } from "@/constants/data";

export function ProjectsPageHeader() {
  const t = useTranslations("sections");
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      className="mb-16 md:mb-20"
      initial="hidden"
      animate="visible"
      variants={staggerContainerWithTiming(0.12, 0.1)}
    >
      <motion.h1
        className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
        variants={reduceMotion ? undefined : fadeIn}
      >
        {t("projects_page_title")}
      </motion.h1>

      <motion.p
        className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground"
        variants={reduceMotion ? undefined : fadeIn}
      >
        {/* Counted from the array, not spelled out in the copy — the number was
            hardcoded as "Nine" in three locales and went stale the first time a
            project was removed. */}
        {t("projects_page_intro", { count: projects.length })}
      </motion.p>

      <motion.p
        className="mt-5 max-w-[52ch] border-l-2 border-primary pl-4 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-muted-foreground"
        variants={reduceMotion ? undefined : fadeIn}
      >
        {t("projects_page_legend")}
      </motion.p>
    </motion.header>
  );
}
