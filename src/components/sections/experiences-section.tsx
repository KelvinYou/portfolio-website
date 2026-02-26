"use client";

import { motion } from "framer-motion";
import { experiences } from "@/constants";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { Badge } from "@/components/ui/badge";
import { formatStartEndDate } from "@/lib/utils";
import { Calendar, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ExperiencesSection() {
  return (
    <section id="experience" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <UnifiedSectionHeader
          title="Experience"
          subtitle="Building products at scale. From Tencent's millions to startup MVPs."
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div variants={fadeIn}>
      <div
        className="group relative rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 transition-all duration-500 hover:bg-white/[0.06] hover:ring-[#00F0FF]/20"
        onMouseMove={handleMouseMove}
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,240,255,0.06), transparent 40%)`,
          }}
        />

        <div className="relative p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Company logo */}
              {exp.logo && (
                <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-white/[0.02] ring-1 ring-white/10 flex items-center justify-center transition-all duration-300 group-hover:ring-[#00F0FF]/30">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={48}
                    height={48}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}

              {/* Title and company */}
              <div>
                <h3
                  className="font-heading text-2xl font-bold tracking-tight text-foreground mb-2 transition-colors duration-300 group-hover:text-[#00F0FF]"
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
                      className="font-medium hover:text-[#00F0FF] transition-colors flex items-center gap-1.5"
                    >
                      {exp.company}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="font-medium">{exp.company}</span>
                  )}
                  <span className="text-white/20">•</span>
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
                className="bg-white/[0.02] border-white/10 text-[10px] uppercase tracking-wider text-neutral-400"
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
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00F0FF]/40 mt-2 mr-3"></span>
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
                className="bg-white/[0.02] border border-white/10 text-xs text-neutral-400 hover:border-[#00F0FF]/30 hover:text-[#00F0FF] transition-all duration-300"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {/* Projects - if any */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="pt-6 border-t border-white/5">
              <div className="space-y-4">
                {exp.projects.map((project, i) => (
                  <div key={i} className="group/project">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-heading font-semibold text-sm text-foreground group-hover/project:text-[#00F0FF] transition-colors">
                        {project.title}
                      </h4>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-[#00F0FF] transition-colors"
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
                          className="text-[10px] px-2 py-0.5 rounded bg-white/[0.02] text-neutral-500"
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
