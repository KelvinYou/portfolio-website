"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArtifactLink } from "@/components/project-row";
import { Paths } from "@/enums";
import { fadeIn } from "@/lib/animations";
import { cn, formatTenure, tenureMonths } from "@/lib/utils";
import type { Experience, WorkProject } from "@/types";

/**
 * A role rendered as a ledger entry, matching `project-row.tsx`: hairline rules
 * instead of cards, a mono utility face for anything that isn't prose, and the
 * measured numbers pulled out of the body text so they can be scanned.
 *
 * The rail on the left is the one structural device here, and it earns its
 * place by encoding duration: the rule's height is proportional to tenure, so
 * the shape of the left edge is the shape of the career. Full-time draws solid,
 * an internship dashed — a four-month internship should not be able to look
 * like a two-year role.
 */

/** Rail height per month, and the floor so a short stint still draws a rule. */
const RAIL_REM_PER_MONTH = 0.34;
const RAIL_MIN_REM = 1.5;

/**
 * A measured token: `40%`, `9,000+`, `60KB`, `8s`, `500K`. Deliberately narrow
 * — the unit list is closed so prose like "React 19" or "Web Workers" can't get
 * dragged into the mono face.
 */
const MEASURE =
  /\d[\d,.]*(?:\s?(?:%|KB|MB|GB|K|M|x|ms|min|mos?|fps|s|h))?\+?/gi;

/**
 * Body text with its measurements set in the utility face. This is the same
 * argument the projects ledger makes with its evidence column — the numbers are
 * the credible part of a claim, and they were previously indistinguishable from
 * the filler around them.
 */
export function Measured({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(MEASURE)) {
    const start = match.index;

    // Skips digits sitting inside a word — `IE11`, `H2`. A lookbehind would say
    // this in the pattern itself, but it isn't safe on every Safari we serve.
    if (start > 0 && /[A-Za-z]/.test(text[start - 1])) continue;

    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <span
        key={start}
        className="font-mono text-[0.94em] font-medium tabular-nums text-foreground"
      >
        {match[0]}
      </span>,
    );
    cursor = start + match[0].length;
  }

  parts.push(text.slice(cursor));
  return <>{parts}</>;
}

function TenureRail({
  exp,
  isCurrent,
}: {
  exp: Experience;
  isCurrent: boolean;
}) {
  const months = tenureMonths(exp.startDate, exp.endDate);
  const startYear = exp.startDate.slice(0, 4);
  const endYear = exp.endDate?.slice(0, 4);
  const isInternship = exp.type.toLowerCase().includes("intern");

  return (
    <div className="flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-0">
      {exp.logo && (
        <Image
          src={exp.logo}
          alt=""
          width={32}
          height={32}
          aria-hidden="true"
          className="h-8 w-8 shrink-0 rounded-md object-contain opacity-75 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:mb-5"
        />
      )}

      <p className="font-mono text-sm tabular-nums text-foreground">
        {startYear}
      </p>

      {/* The rule, and the only place duration is stated visually. Hidden on
          mobile, where the rail lies on one line and a vertical measure would
          have nothing to measure against. */}
      <div
        aria-hidden="true"
        className={cn(
          "my-2 hidden w-px md:block",
          isInternship
            ? "bg-[linear-gradient(to_bottom,currentColor_50%,transparent_50%)] bg-[length:1px_5px] bg-repeat-y text-border"
            : "bg-gradient-to-b from-foreground/35 to-border",
        )}
        style={{
          height: `${Math.max(RAIL_MIN_REM, months * RAIL_REM_PER_MONTH)}rem`,
        }}
      />

      <p className="flex items-center gap-1.5 font-mono text-sm tabular-nums text-muted-foreground md:text-foreground">
        <span className="text-faint md:hidden" aria-hidden="true">
          –
        </span>
        {endYear ?? "NOW"}
        {isCurrent && (
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
        )}
      </p>

      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle md:mt-2">
        {formatTenure(months)}
      </p>
    </div>
  );
}

/** Something shipped inside the role. Indented off a rule, not boxed in a card. */
function DeliveredProject({ project }: { project: WorkProject }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h4 className="font-heading text-base font-bold tracking-tight text-foreground">
          {project.title}
        </h4>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {project.demo && (
            <ArtifactLink
              href={project.demo}
              title={project.title}
              kind="demo"
            />
          )}
          {project.github && (
            <ArtifactLink
              href={project.github}
              title={project.title}
              kind="repo"
            />
          )}
        </div>
      </div>
      <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
        <Measured text={project.description} />
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        {project.techStacks.join(" · ")}
      </p>
    </div>
  );
}

/**
 * The write-ups are shown as their own paths rather than their titles: the
 * titles live in MDX frontmatter on the server, and fetching them client-side
 * to label two links would trade a request for nothing a reader can't already
 * read off the path.
 */
function Writing({ slugs }: { slugs: string[] }) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
        Wrote about this
      </p>
      {slugs.map((slug) => (
        <Link
          key={slug}
          href={`${Paths.Blog}/${slug}`}
          className="group/post inline-flex w-fit items-center gap-1.5 font-mono text-xs text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <span className="underline decoration-border underline-offset-4 transition-colors group-hover/post:decoration-primary-ink">
            /{slug}
          </span>
          <ArrowUpRight
            className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover/post:translate-x-0.5 group-hover/post:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  );
}

export const ExperienceEntry = React.memo(function ExperienceEntry({
  experience: exp,
  isCurrent = false,
}: {
  experience: Experience;
  isCurrent?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={reduceMotion ? undefined : fadeIn}
      className={cn(
        "group grid grid-cols-1 gap-x-12 gap-y-6 py-9 md:grid-cols-[7rem_minmax(0,1fr)] md:py-11",
        isCurrent ? "border-t-2 border-foreground" : "border-t border-border",
      )}
    >
      <TenureRail exp={exp} isCurrent={isCurrent} />

      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {exp.type}
          <span className="mx-2 text-faint" aria-hidden="true">
            /
          </span>
          {exp.location}
        </p>

        <h3
          className={cn(
            "mt-4 font-heading font-extrabold leading-[1.08] tracking-tight text-foreground",
            isCurrent ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
          )}
        >
          {exp.title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {exp.companyUrl ? (
            <a
              href={exp.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {exp.company}
              <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <span className="font-medium text-foreground">{exp.company}</span>
          )}
        </p>

        <p
          className={cn(
            "mt-5 max-w-[62ch] leading-relaxed text-muted-foreground",
            isCurrent ? "text-base" : "text-sm",
          )}
        >
          <Measured text={exp.description} />
        </p>

        {/* Each bullet hangs off an en dash rather than a bullet dot: these are
            three claims, not a ranked or sequential list. */}
        <ul className="mt-7 space-y-3.5">
          {exp.responsibilities.map((resp) => (
            <li
              key={resp}
              className="grid grid-cols-[1.25rem_minmax(0,1fr)] text-sm leading-relaxed text-muted-foreground"
            >
              <span className="text-faint" aria-hidden="true">
                —
              </span>
              <span className="max-w-[62ch]">
                <Measured text={resp} />
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          {exp.skills.join(" · ")}
        </p>

        {exp.projects && exp.projects.length > 0 && (
          <div className="mt-8 space-y-7 border-l border-border pl-6 md:pl-7">
            {exp.projects.map((project) => (
              <DeliveredProject key={project.title} project={project} />
            ))}
          </div>
        )}

        {exp.blogSlugs && exp.blogSlugs.length > 0 && (
          <Writing slugs={exp.blogSlugs} />
        )}
      </div>
    </motion.article>
  );
});
