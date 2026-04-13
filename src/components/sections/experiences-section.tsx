"use client";

import { motion } from "framer-motion";
import { experiences } from "@/constants";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { useTranslations } from "next-intl";
import { formatStartEndDate } from "@/lib/utils";
import { Calendar, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";

export function ExperiencesSection() {
  const t = useTranslations("sections");

  return (
    <section id="experience" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <UnifiedSectionHeader
          title={t("experience_title")}
          subtitle={t("experience_subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-4"
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience: exp }: { experience: typeof experiences[0] }) {
  return (
    <motion.div variants={fadeIn}>
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/25 hover:shadow-[0_0_0_1px_rgba(0,240,255,0.08),0_12px_40px_rgba(0,0,0,0.15)]">
        {/* Top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="flex items-start gap-4">
              {exp.logo && (
                <div className="relative flex-shrink-0 h-12 w-12 overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:border-primary/30">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              )}

              <div>
                <h3
                  className="font-heading text-xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {exp.title}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-medium hover:text-primary transition-colors"
                    >
                      {exp.company}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="font-medium">{exp.company}</span>
                  )}
                  <span className="text-border">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 opacity-50" />
                    {exp.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Date & type badges */}
            <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-2">
              <span className="rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {exp.type}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                <Calendar className="h-3 w-3 opacity-50" />
                {formatStartEndDate(exp.startDate, exp.endDate)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {exp.description}
          </p>

          {/* Responsibilities */}
          <ul className="mb-6 space-y-2.5">
            {exp.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                <span className="leading-relaxed text-muted-foreground">{resp}</span>
              </li>
            ))}
          </ul>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-0">
            {exp.skills.slice(0, 8).map((skill, i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Projects */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Key Projects
              </p>
              <div className="space-y-4">
                {exp.projects.map((project, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-muted/30 p-4 transition-colors duration-200 hover:border-primary/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-heading font-semibold text-sm text-foreground">
                        {project.title}
                      </h4>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStacks.map((tech, j) => (
                        <span
                          key={j}
                          className="rounded-full bg-background px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
