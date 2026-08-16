"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/lib/animations";
import type { Project, ProjectOutcome } from "@/types";

/**
 * A project rendered as a ledger row: claim on the left, measured evidence on
 * the right, in a column that aligns down the whole list. Rows with nothing to
 * show say so — the gap is the point, not a thing to fill with a placeholder.
 */

const accessLabel: Record<Project["access"], string> = {
  public: "",
  private: "no public artifact",
  building: "building — nothing to show yet",
};

function Evidence({
  outcome,
  size,
}: {
  outcome?: ProjectOutcome[];
  size: "lead" | "row";
}) {
  if (!outcome?.length) {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/50">
        no measured result
      </p>
    );
  }

  return (
    <dl className={cn("space-y-4", size === "lead" && "space-y-5")}>
      {outcome.map((item) => (
        <div key={item.label}>
          <dt
            className={cn(
              "font-mono font-semibold tabular-nums leading-none tracking-tight text-foreground",
              size === "lead" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl",
            )}
          >
            {item.value}
          </dt>
          <dd
            className={cn(
              "mt-2 leading-snug text-muted-foreground",
              size === "lead" ? "text-sm" : "text-xs",
            )}
          >
            {item.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ArtifactLink({
  href,
  children,
  title,
}: {
  href: string;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${children} — ${title} (opens in a new tab)`}
      className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {children}
      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
    </a>
  );
}

function Artifact({ project }: { project: Project }) {
  const { links, access, title } = project;

  if (access === "public" && (links?.demo || links?.repo)) {
    return (
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {links.demo && (
          <ArtifactLink href={links.demo} title={title}>
            Demo
          </ArtifactLink>
        )}
        {links.repo && (
          <ArtifactLink href={links.repo} title={title}>
            Source
          </ArtifactLink>
        )}
      </div>
    );
  }

  return (
    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground/60">
      <span aria-hidden="true">— </span>
      {accessLabel[access] || accessLabel.private}
    </p>
  );
}

function TechList({ techStacks }: { techStacks: string[] }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
      {techStacks.join(" · ")}
    </p>
  );
}

export const ProjectRow = React.memo(function ProjectRow({
  project,
}: {
  project: Project;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={reduceMotion ? undefined : fadeIn}
      className="grid grid-cols-1 gap-x-10 gap-y-5 border-t border-border py-8 md:grid-cols-[3.5rem_minmax(0,1fr)_14rem] md:py-9"
    >
      <p className="font-mono text-sm tabular-nums text-muted-foreground/70">
        {project.year}
      </p>

      <div className="min-w-0">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2.5 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
          {project.claim}
        </p>
        <div className="mt-4">
          <TechList techStacks={project.techStacks} />
        </div>
      </div>

      <div className="space-y-5">
        <Evidence outcome={project.outcome} size="row" />
        <Artifact project={project} />
      </div>
    </motion.article>
  );
});

/**
 * The single featured project. Same information as a row, weighted heavier —
 * on a page where everything looked equally important, one thing has to lead.
 */
export const ProjectLead = React.memo(function ProjectLead({
  project,
  eyebrow,
}: {
  project: Project;
  eyebrow: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={reduceMotion ? undefined : fadeIn}
      className="grid grid-cols-1 gap-x-12 gap-y-8 border-t-2 border-foreground pt-8 md:grid-cols-[minmax(0,1fr)_18rem] md:pt-10"
    >
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
          <span className="mx-2 text-muted-foreground/40" aria-hidden="true">
            /
          </span>
          <span className="tabular-nums">{project.year}</span>
        </p>

        <h3 className="mt-4 font-heading text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
          {project.claim}
        </p>
        <div className="mt-6">
          <TechList techStacks={project.techStacks} />
        </div>
      </div>

      <div className="space-y-8">
        <Evidence outcome={project.outcome} size="lead" />
        <Artifact project={project} />
      </div>
    </motion.article>
  );
});
