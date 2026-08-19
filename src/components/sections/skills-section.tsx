"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { skillTiers } from "@/constants/data";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { cn } from "@/lib/utils";

// Skills as a depth ledger: each row is how far the tools in it have actually
// gone, with the work that proves it named underneath.
//
// This replaced a five-row chip cloud of 33 equally-weighted pills. Three
// problems it had, in the order they mattered:
//
//   1. Category grouping told the reader nothing. Nobody needs to be told
//      PostgreSQL is a database; what they can't tell from a flat list is
//      whether it ever carried a paying customer. Depth is the axis that
//      answers a hiring question, and `skillList` already holds the ground
//      truth for it.
//   2. It restated, unsourced, what the projects ledger below already proves
//      with numbers. The provenance line is the only thing here that the rest
//      of the page doesn't say — so it's the thing worth rendering.
//   3. The pills' `hover:border-primary/40` implied a control that never
//      existed. Names now sit in a `·`-separated line, like the tech lists on
//      the project rows.
//
// Two things stay deliberately absent: self-assigned proficiency numbers
// ("LLM Integration: 90"), which are worse signal than none, and the
// soft-skills tab, which nobody can falsify.
export function SkillsSection() {
  const t = useTranslations("sections");

  return (
    <section id="skills" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("skills_title")}
          subtitle={t("skills_subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-5xl"
        >
          {skillTiers.map(({ depth, items }) => (
            <motion.div
              key={depth}
              variants={fadeIn}
              className="grid gap-x-10 gap-y-4 border-t border-border py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:py-9"
            >
              <h3 className="font-mono text-xs leading-relaxed tracking-[0.16em] text-muted-foreground uppercase">
                {t(`skills_tier_${depth}_label`)}
              </h3>

              <div className="min-w-0">
                {/* The gap tier is set in muted text: the one row that isn't a
                    claim shouldn't carry the weight of the ones that are. */}
                {/* A flex row rather than a text paragraph: as running text,
                    "Apollo Client" and "Claude Agent SDK" broke across lines
                    and the reader lost where one item ended. Each item is its
                    own non-wrapping child, and the separator travels inside it
                    so a dot can never start a line. */}
                <ul
                  className={cn(
                    "flex max-w-[64ch] flex-wrap gap-x-1 gap-y-1.5 text-[15px]",
                    depth === "gap"
                      ? "text-muted-foreground"
                      : "text-foreground",
                  )}
                >
                  {items.map((item, index) => (
                    <li key={item} className="whitespace-nowrap">
                      {item}
                      {index < items.length - 1 && (
                        <span
                          className="pl-2 text-muted-foreground/40"
                          aria-hidden="true"
                        >
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Where the tier's claim comes from. The rule reads as "this
                    line is subordinate to the one above" without spending a
                    glyph on saying so. */}
                <p className="mt-4 border-l border-border pl-3 font-mono text-[11px] leading-relaxed tracking-[0.14em] text-muted-foreground/70 uppercase">
                  {t(`skills_tier_${depth}_source`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
