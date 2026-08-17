"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Icons } from "@/components/icons";
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

/**
 * The two artifacts a project can expose. Label and mark are paired here
 * because the pairing is the point: both links used to carry the same
 * `ArrowUpRight`, so the glyph slot said nothing — it was decoration next to
 * the word doing all the work.
 *
 * The GitHub mark names its destination, which "SOURCE" cannot, so it leads.
 * The arrow means "this leaves the site", which is a footnote on the label
 * rather than a destination, so it trails. Both keep their word: there is no
 * conventional glyph for "live demo", and dropping the labels would also leave
 * the `no public artifact` rows with nothing to be parallel to.
 */
const ARTIFACTS = {
  repo: { label: "Source" },
  demo: { label: "Demo" },
} as const;

function ArtifactLink({
  href,
  title,
  kind,
}: {
  href: string;
  title: string;
  kind: keyof typeof ARTIFACTS;
}) {
  const { label } = ARTIFACTS[kind];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${title} (opens in a new tab)`}
      // Hover moves the rule to cyan and leaves the text alone. As
      // `hover:text-primary` the label measured 1.33:1 against the light
      // background — the same fix the blog pages now use throughout.
      // 16px of text + 14px padding either side = a 44px hit box, and the
      // matching negative margin keeps the row height exactly where it was.
      // The mobile 44px rule in globals.css covers `button` and
      // `[role="button"]` but not a plain anchor, so these were 16px targets.
      className="group -my-3.5 inline-flex items-center gap-1.5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {kind === "repo" && (
        // The octocat carries interior detail that turns to mud below ~14px;
        // the arrow is two strokes and holds at 12.
        <Icons.gitHub className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      )}

      {/* The rule underlines the word only. On the `inline-flex` anchor it also
          ran under the glyph, which put a brand mark on a baseline rule. */}
      <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-primary">
        {label}
      </span>

      {kind === "demo" && (
        <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      )}
    </a>
  );
}

function Artifact({ project }: { project: Project }) {
  const { links, access, title } = project;

  if (access === "public" && (links?.demo || links?.repo)) {
    return (
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {links.demo && (
          <ArtifactLink href={links.demo} title={title} kind="demo" />
        )}
        {links.repo && (
          <ArtifactLink href={links.repo} title={title} kind="repo" />
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
