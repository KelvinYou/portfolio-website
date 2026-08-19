"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Measured } from "@/components/experience/experience-entry";
import { fadeIn } from "@/lib/animations";
import { cn, formatTenure, tenureMonths } from "@/lib/utils";
import type { Education } from "@/types";

/**
 * A credential rendered as a registrar's record rather than a stop on a
 * journey. The section used to draw an alternating centre timeline of
 * rounded cards — the most-copied device in the free-portfolio genre, and the
 * only place left on the site still speaking that dialect after the projects
 * and experience ledgers were rebuilt.
 *
 * The one structural device is the left column, and it holds the CGPA at the
 * transcript's own precision with the documents that prove it directly
 * underneath. That column is deliberately the same `7rem` at the same `gap-x-12`
 * as the experience tenure rail, so the two sections share one spine down the
 * page — and it is the same argument the projects ledger makes with its
 * evidence column: the number is the credible part, so it gets the type.
 */

/**
 * A document on file. Same contract as `ArtifactLink` — mono, a rule under the
 * word only, and the 44px hit box built from `-my-3` + `py-3` — but its own
 * component because the artifact labels are a closed two-key set and a PDF is
 * neither a repo nor a demo.
 */
function DocumentLink({
  href,
  label,
  credential,
}: {
  href: string;
  label: string;
  credential: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${credential} (PDF, opens in a new tab)`}
      className="group/doc -my-3 inline-flex items-center gap-1.5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <span className="underline decoration-border underline-offset-4 transition-colors group-hover/doc:decoration-primary-ink">
        {label}
      </span>
      <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
    </a>
  );
}

/**
 * The evidence column. On mobile it lies down as a wrapping row, because a
 * fixed measure column has nothing to align against in a single-column stack.
 */
function Transcript({ edu }: { edu: Education }) {
  const { certificate, transcript } = edu.documents;

  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4 md:block">
      <div>
        <p className="font-mono text-3xl font-semibold tabular-nums leading-none tracking-tight text-foreground">
          {edu.cgpa}
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          CGPA
        </p>
      </div>

      {/* Rendered only where it is true. The diploma has no distinction, and
          leaving its slot empty is what keeps the degree's readable as earned
          rather than as a badge every entry happens to carry. */}
      {edu.honor && (
        <div className="md:mt-7">
          <p className="text-sm font-medium leading-none text-foreground">
            {edu.honor.label}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            {edu.honor.detail}
          </p>
        </div>
      )}

      {(certificate || transcript) && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 md:mt-7 md:flex-col md:items-start md:gap-y-3 md:border-t md:border-border md:pt-6">
          {certificate && (
            <DocumentLink
              href={certificate}
              label="Certificate"
              credential={edu.degree}
            />
          )}
          {transcript && (
            <DocumentLink
              href={transcript}
              label="Transcript"
              credential={edu.degree}
            />
          )}
        </div>
      )}
    </div>
  );
}

/** `CORE` / `ELECTIVES` against their subjects. A definition list, not prose. */
function Coursework({ coursework }: { coursework: Education["coursework"] }) {
  const rows = [
    { label: "Core", items: coursework.core },
    { label: "Electives", items: coursework.electives },
  ].filter((row) => row.items?.length);

  return (
    <dl className="mt-7 space-y-3">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-x-5 gap-y-1 sm:grid-cols-[5.5rem_minmax(0,1fr)]"
        >
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle sm:pt-px">
            {row.label}
          </dt>
          {/* Subjects stay in the body face: five course titles set in mono
              small caps is a shout, and the mono face is chrome here. */}
          <dd className="max-w-[62ch] text-xs leading-relaxed text-muted-foreground">
            {row.items!.join(" · ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export const CredentialEntry = React.memo(function CredentialEntry({
  education: edu,
  isHighest = false,
}: {
  education: Education;
  isHighest?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const years = `${edu.startDate.slice(0, 4)} – ${edu.endDate.slice(0, 4)}`;

  return (
    <motion.article
      variants={reduceMotion ? undefined : fadeIn}
      className={cn(
        "grid grid-cols-1 gap-x-12 gap-y-6 py-9 md:grid-cols-[7rem_minmax(0,1fr)] md:py-11",
        isHighest ? "border-t-2 border-foreground" : "border-t border-border",
      )}
    >
      <Transcript edu={edu} />

      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {edu.level}
          <span className="mx-2 text-faint" aria-hidden="true">
            /
          </span>
          <span className="tabular-nums">{years}</span>
        </p>

        <h3
          className={cn(
            "mt-4 font-heading font-extrabold leading-[1.08] tracking-tight text-foreground",
            isHighest ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
          )}
        >
          {edu.degree}
        </h3>

        <p
          className={cn(
            "mt-5 max-w-[62ch] leading-relaxed text-muted-foreground",
            isHighest ? "text-base" : "text-sm",
          )}
        >
          <Measured text={edu.focus} />
        </p>

        {edu.achievements.length > 0 && (
          <ul className="mt-7 space-y-3.5">
            {edu.achievements.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[1.25rem_minmax(0,1fr)] text-sm leading-relaxed text-muted-foreground"
              >
                <span className="text-faint" aria-hidden="true">
                  —
                </span>
                <span className="max-w-[62ch]">
                  <Measured text={item} />
                </span>
              </li>
            ))}
          </ul>
        )}

        <Coursework coursework={edu.coursework} />
      </div>
    </motion.article>
  );
});

/**
 * One institution, over the whole run its credentials span. Both credentials
 * here come from the same school across four unbroken years, which the old
 * layout actively hid by dealing them into two disconnected cards on opposite
 * sides of a rule.
 */
export function InstitutionMasthead({
  educations: group,
}: {
  educations: Education[];
}) {
  const first = group[group.length - 1];
  const last = group[0];
  const months = tenureMonths(first.startDate, last.endDate);
  const span = `${first.startDate.slice(0, 4)} – ${last.endDate.slice(0, 4)}`;

  return (
    <div className="flex flex-col gap-5 pb-9 sm:flex-row sm:items-start sm:gap-6 md:pb-11">
      {first.logo && (
        <Image
          src={first.logo}
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
          className="h-10 w-10 shrink-0 rounded-md object-contain opacity-75 grayscale"
        />
      )}

      <div className="min-w-0">
        <h3 className="font-heading text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl">
          {first.institutionUrl ? (
            <a
              href={first.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline gap-1.5 underline decoration-border underline-offset-[6px] transition-colors hover:decoration-primary-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {first.institution}
              <ArrowUpRight
                className="h-4 w-4 shrink-0 self-center"
                aria-hidden="true"
              />
            </a>
          ) : (
            first.institution
          )}
        </h3>

        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          {first.location}
          <span className="mx-2 text-faint" aria-hidden="true">
            ·
          </span>
          <span className="tabular-nums">{span}</span>
          <span className="mx-2 text-faint" aria-hidden="true">
            ·
          </span>
          <span className="tabular-nums">{formatTenure(months)} unbroken</span>
        </p>
      </div>
    </div>
  );
}
