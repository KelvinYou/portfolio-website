"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProjectRow } from "@/components/project-row";
import { staggerContainer, defaultViewport, fadeIn } from "@/lib/animations";
import type { Project, ProjectKind } from "@/types";

/**
 * The full ledger, grouped by kind. There is no search or sort here on purpose:
 * nine projects fit on one screen, and the grouping answers the question a
 * filter panel was standing in for — what kind of thing is this, and can I
 * look at it.
 */

const GROUP_ORDER: ProjectKind[] = ["system", "product", "coursework"];

function ProjectGroup({
  label,
  note,
  projects,
}: {
  label: string;
  note: string;
  projects: Project[];
}) {
  const reduceMotion = useReducedMotion();

  if (!projects.length) return null;

  return (
    // A `div`, not a `section`: globals.css carries a bare `section { padding:
    // 6rem/8rem }` rule outside any cascade layer, so it beats Tailwind's
    // layered utilities and `py-0` cannot undo it. `section` means "top-level
    // page band" in this codebase; these are groups inside one.
    // `md:first:mt-0` is also not redundant — a `md:` media rule outranks a
    // plain `first:` one, so without it the leading group keeps a top margin.
    <div className="mt-16 first:mt-0 md:mt-20 md:first:mt-0">
      <motion.header
        className="mb-8 md:mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={reduceMotion ? undefined : fadeIn}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
          <span className="mx-2 text-faint" aria-hidden="true">
            /
          </span>
          <span className="tabular-nums">{projects.length}</span>
        </p>
        <h2 className="mt-4 max-w-[54ch] font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
          {note}
        </h2>
      </motion.header>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="border-b border-border"
      >
        {projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </motion.div>
    </div>
  );
}

export function ProjectsLedger({ projects }: { projects: Project[] }) {
  const t = useTranslations("sections");

  const copy: Record<ProjectKind, { label: string; note: string }> = {
    system: {
      label: t("projects_kind_system"),
      note: t("projects_group_system_note"),
    },
    product: {
      label: t("projects_kind_product"),
      note: t("projects_group_product_note"),
    },
    coursework: {
      label: t("projects_kind_coursework"),
      note: t("projects_group_coursework_note"),
    },
  };

  return (
    <div className="max-w-5xl">
      {GROUP_ORDER.map((kind) => (
        <ProjectGroup
          key={kind}
          label={copy[kind].label}
          note={copy[kind].note}
          projects={projects
            .filter((project) => project.kind === kind)
            .sort((a, b) => b.year - a.year)}
        />
      ))}
    </div>
  );
}
