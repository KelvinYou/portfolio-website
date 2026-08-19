"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { projects } from "@/constants";
import { ProjectLead, ProjectRow } from "@/components/project-row";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { staggerContainer, defaultViewport, fadeIn } from "@/lib/animations";
import type { ProjectKind } from "@/types";

const featured = projects.filter((project) => project.featured);
const [lead, ...supporting] = featured;

export function ProjectsSection() {
  const t = useTranslations("sections");

  const kindLabel: Record<ProjectKind, string> = {
    system: t("projects_kind_system"),
    product: t("projects_kind_product"),
    coursework: t("projects_kind_coursework"),
  };

  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("projects_title")}
          subtitle={t("projects_subtitle")}
        />

        <motion.div
          className="max-w-5xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {lead && (
            <ProjectLead project={lead} eyebrow={kindLabel[lead.kind]} />
          )}

          <div className="mt-14 md:mt-16">
            {supporting.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 max-w-5xl border-t border-border pt-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary-ink hover:decoration-primary-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {t("projects_see_all", { count: projects.length })}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
