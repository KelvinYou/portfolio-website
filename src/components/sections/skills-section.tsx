"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { skillGroups } from "@/constants/data";

// Renders `skillGroups` from data.ts — the same array the resume PDF uses, so
// the site and the resume cannot drift apart.
//
// Two things were deliberately dropped here:
//   1. Self-assigned proficiency rings ("LLM Integration: 90"). An invented
//      number is worse signal than no number; the projects and blog posts carry
//      the evidence instead.
//   2. The soft-skills tab ("Team Collaboration", "Adaptability", ...). Every
//      candidate claims these and none of them are falsifiable, so they cost
//      space and add nothing. Removing the tab left a single list, so the Tabs
//      wrapper went with it.
export function SkillsSection() {
  const t = useTranslations("sections");

  return (
    <section
      id="skills"
      className="relative border-y border-border bg-muted/20 py-32 md:py-40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
          className="mb-14 text-center"
        >
          <h2
            className="font-heading text-4xl font-extrabold md:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            {t("skills_title")}
          </h2>
          {/* Accent line */}
          <div className="mt-5 flex justify-center gap-1">
            <div className="h-0.5 w-12 rounded-full bg-primary" />
            <div className="h-0.5 w-4 rounded-full bg-primary/40" />
            <div className="h-0.5 w-2 rounded-full bg-primary/20" />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("skills_subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mx-auto max-w-3xl space-y-8"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.label}
              variants={fadeIn}
              className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <h3 className="pt-1 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors duration-300 hover:border-primary/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
