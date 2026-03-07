"use client";

import { motion } from "framer-motion";
import { experiences } from "@/constants";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { Badge } from "@/components/ui/badge";
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
          className="space-y-6"
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
      <div
        className="group relative rounded-sm overflow-hidden border-2 border-foreground dark:border-white/25 bg-card transition-all duration-150 hover:border-primary neo-shadow"
      >
        <div className="relative p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Company logo */}
              {exp.logo && (
                <div className="relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 border-foreground dark:border-white/25 bg-card flex items-center justify-center transition-all duration-150 group-hover:border-primary">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}

              {/* Title and company */}
              <div>
                <h3
                  className="font-heading text-2xl font-extrabold tracking-tight text-foreground mb-2 transition-colors duration-150 group-hover:text-primary"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {exp.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      {exp.company}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="font-medium">{exp.company}</span>
                  )}
                  <span className="text-foreground/20">|</span>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1.5 opacity-50" />
                    {exp.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Date and type */}
            <div className="flex flex-col items-end gap-2">
              <Badge
                variant="outline"
                className="border-2 border-foreground dark:border-white/25 bg-card text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {exp.type}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                <Calendar className="h-3 w-3 mr-1.5 opacity-50" />
                {formatStartEndDate(exp.startDate, exp.endDate)}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
            {exp.description}
          </p>

          {/* Key achievements - clean bullet list */}
          <div className="mb-6">
            <ul className="space-y-3">
              {exp.responsibilities.map((resp, i) => (
                <li
                  key={i}
                  className="text-sm flex items-start group/item"
                >
                  <span className="flex-shrink-0 w-2 h-2 rounded-none bg-foreground mt-1.5 mr-3"></span>
                  <span className="text-muted-foreground leading-relaxed">
                    {resp}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack - clean tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {exp.skills.slice(0, 8).map((skill, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="border-2 border-foreground dark:border-white/25 bg-card text-xs text-muted-foreground hover:border-primary hover:text-primary transition-all duration-150"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {/* Projects - if any */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="pt-6 border-t-2 border-foreground dark:border-white/25">
              <div className="space-y-4">
                {exp.projects.map((project, i) => (
                  <div key={i} className="group/project">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-heading font-semibold text-sm text-foreground group-hover/project:text-primary transition-colors">
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
                    <p className="text-xs text-muted-foreground mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStacks.map((tech, j) => (
                        <span
                          key={j}
                          className="text-[10px] px-2 py-0.5 rounded-none bg-muted border border-foreground dark:border-white/25 text-muted-foreground"
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
