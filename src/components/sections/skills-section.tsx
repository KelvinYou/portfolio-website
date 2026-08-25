"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { skillGaps, skillStack } from "@/constants/data";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { cn } from "@/lib/utils";

// Skills as a stack diagram: one column per layer of a full-stack product, in
// the order the reader this section is written for cares about them — AI first,
// then the two halves of the app it sits in, then how it ships.
//
// This replaced a four-row depth ledger (shipped / built / coursework / gap).
// The ledger's axis was honest and the axis was still wrong: a reader arriving
// with "AI-native full stack" in their head is answering a *coverage* question
// first — does he hold all three layers — and the ledger made them assemble
// each layer out of names scattered across three separate rows. Depth didn't
// have to be thrown away to fix that; it demoted to a marker on each name, so
// coverage is read in one pass and provenance in the second.
//
// Three things are deliberately not here: self-assigned proficiency numbers
// ("LLM Integration: 90"), a soft-skills tab (nobody can falsify it), and any
// per-item hover affordance — these names are not controls, so nothing should
// suggest they lead anywhere.
const LAYERS = ["ai", "interface", "server"] as const;

const DEPTH_MARK = { shipped: "●", built: "○" } as const;

export function SkillsSection() {
  const t = useTranslations("sections");
  const columns = LAYERS.map(
    (layer) => skillStack.find((entry) => entry.layer === layer)!,
  );
  const ops = skillStack.find((entry) => entry.layer === "ops")!;

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
          {/* The legend carries the whole depth axis in one line, which is what
              lets the columns below stay a single glyph wide on the point. */}
          <motion.p
            variants={fadeIn}
            className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
          >
            <span>
              <span className="pr-2 text-primary">●</span>
              {t("skills_legend_shipped")}
            </span>
            <span>
              <span className="pr-2">○</span>
              {t("skills_legend_built")}
            </span>
          </motion.p>

          <div className="mt-6 grid border-t border-border md:grid-cols-3">
            {columns.map(({ layer, proven, coursework }, index) => (
              <motion.div
                key={layer}
                variants={fadeIn}
                className={cn(
                  "border-b border-border py-8 md:border-b-0 md:py-9",
                  // Vertical rules only between columns, and only once the grid
                  // is actually side-by-side; stacked, they'd float unattached.
                  index > 0 && "md:border-l md:border-border md:pl-8",
                  index < columns.length - 1 && "md:pr-8",
                )}
              >
                <h3 className="font-mono text-xs tracking-[0.16em] text-foreground uppercase">
                  {t(`skills_layer_${layer}_label`)}
                </h3>
                {/* Where this column's strongest claim comes from. One line per
                    column replaces four provenance paragraphs. */}
                <p className="mt-2 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-muted-foreground/70">
                  {t(`skills_layer_${layer}_source`)}
                </p>

                <ul className="mt-5 space-y-2 text-[15px]">
                  {proven.map(({ name, depth }) => (
                    <li key={name} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pt-[3px] font-mono text-[9px] leading-none",
                          depth === "shipped"
                            ? "text-primary"
                            : "text-muted-foreground/60",
                        )}
                      >
                        {DEPTH_MARK[depth]}
                      </span>
                      <span className="min-w-0">
                        {name}
                        <span className="sr-only">
                          {` — ${t(`skills_legend_${depth}`)}`}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Coursework stays under its own layer, but out of the scan
                    path: it's context for the column, not a claim in it. */}
                {coursework.length > 0 && (
                  <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground/70">
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase">
                      {t("skills_coursework_label")}
                    </span>
                    <span className="pl-2">{coursework.join(" · ")}</span>
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Ship & ops runs full width rather than taking a fourth column: it's
              the layer a reader checks for presence, not for depth. */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-x-8 gap-y-2 border-t border-border py-6 md:flex-row"
          >
            <h3 className="font-mono text-xs tracking-[0.16em] text-foreground uppercase md:w-44 md:shrink-0">
              {t("skills_layer_ops_label")}
            </h3>
            <ul className="flex flex-wrap gap-x-1 gap-y-1.5 text-[15px]">
              {ops.proven.map(({ name, depth }, index) => (
                <li key={name} className="whitespace-nowrap">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pr-2 font-mono text-[9px]",
                      depth === "shipped"
                        ? "text-primary"
                        : "text-muted-foreground/60",
                    )}
                  >
                    {DEPTH_MARK[depth]}
                  </span>
                  {name}
                  <span className="sr-only">
                    {` — ${t(`skills_legend_${depth}`)}`}
                  </span>
                  {index < ops.proven.length - 1 && (
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
            {ops.coursework.length > 0 && (
              <p className="text-[13px] leading-relaxed text-muted-foreground/70 md:pt-[3px]">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase">
                  {t("skills_coursework_label")}
                </span>
                <span className="pl-2">{ops.coursework.join(" · ")}</span>
              </p>
            )}
          </motion.div>

          {/* The gap row is the one line here that isn't a claim, and it's set
              like it: no marker, no accent, muted throughout. */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-x-8 gap-y-2 border-t border-border py-6 md:flex-row"
          >
            <h3 className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase md:w-44 md:shrink-0">
              {t("skills_gap_label")}
            </h3>
            <p className="text-[15px] text-muted-foreground">
              {skillGaps.join(" · ")}
              <span className="pl-2 text-muted-foreground/70">
                {t("skills_gap_note")}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
