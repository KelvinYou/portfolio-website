"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatStartEndDate } from "@/lib/utils";
import { fadeIn } from "@/lib/animations";
import { Experience } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building,
  Calendar,
  ChevronDown,
  ExternalLink,
  Github,
  LinkIcon,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { RelatedBlogLinks } from "../blog/related-blog-links";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard = React.memo(function ExperienceCard({
  experience: exp,
  index,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div key={index} variants={fadeIn}>
      <motion.div
        className="group relative rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 transition-all duration-500 hover:bg-white/[0.06] hover:ring-[#00F0FF]/20"
        onMouseMove={handleMouseMove}
      >
        {/* Mouse-tracking spotlight effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,240,255,0.06), transparent 40%)`,
          }}
        />
        {/* Card header with company info */}
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5">
          <div className="flex items-center gap-4 md:gap-6 w-full">
            {/* Company logo/image */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white/[0.02] ring-1 ring-white/10 flex items-center justify-center transition-all duration-300 group-hover:ring-[#00F0FF]/30">
              {exp.logo ? (
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={48}
                  height={48}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <Building className="w-10 h-10 text-neutral-500 transition-colors duration-300 group-hover:text-[#00F0FF]" />
              )}
            </div>

            {/* Company and role details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-3">
                <div className="space-y-2">
                  <h3
                    className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8] transition-colors duration-300 group-hover:text-[#00F0FF]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <span className="font-medium text-sm md:text-base">
                      {exp.company}
                    </span>
                    <span className="text-white/20">•</span>
                    <div className="flex items-center text-xs md:text-sm">
                      <MapPin className="h-3 w-3 mr-1 opacity-50" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <Badge
                    variant="outline"
                    className="w-fit bg-white/[0.02] border-white/10 text-[10px] md:text-xs uppercase tracking-wider text-neutral-400 hover:border-[#00F0FF]/30 hover:text-[#00F0FF] transition-colors"
                  >
                    {exp.type}
                  </Badge>
                  <div className="flex items-center text-xs text-neutral-500 whitespace-nowrap">
                    <Calendar className="h-3 w-3 mr-1.5 opacity-50" />
                    <span>
                      {formatStartEndDate(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brief description */}
        <div className="relative px-6 md:px-8 py-5">
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
            {exp.description}
          </p>
        </div>

        {/* Skills tags with glassmorphism */}
        <div className="relative px-6 md:px-8 pb-6 flex flex-wrap gap-2">
          {exp.skills.map((skill, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="bg-white/[0.02] border border-white/10 text-xs text-neutral-400 px-3 py-1 rounded-lg hover:bg-white/[0.05] hover:border-[#00F0FF]/30 hover:text-[#00F0FF] transition-all duration-300"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Expansion control */}
        <div className="relative px-6 md:px-8 py-4 border-t border-white/5 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="group/btn rounded-full text-xs gap-2 text-neutral-400 hover:text-[#00F0FF] hover:bg-white/[0.05] transition-all duration-300"
            onClick={toggleExpanded}
          >
            <Sparkles className="h-3.5 w-3.5 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
            <span className="uppercase tracking-wider font-medium">
              {isExpanded ? "Show less" : "Show more"}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Expanded content with glassmorphism */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { duration: 0.4, ease: "easeInOut" },
                  opacity: { duration: 0.3, delay: 0.1 },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2 },
                },
              }}
              className="relative border-t border-white/5 overflow-hidden bg-white/[0.01]"
            >
              <div className="px-6 md:px-8 py-8">
                {/* Key Responsibilities */}
                <div className="mb-8">
                  <h4 className="text-sm md:text-base font-heading font-semibold mb-6 flex items-center text-[#E8E8E8] uppercase tracking-wider">
                    <div className="w-1 h-4 bg-[#00F0FF]/50 rounded-full mr-3"></div>
                    Key Responsibilities
                  </h4>

                  <ul className="grid gap-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="text-sm md:text-base flex items-start group/item"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/20 mt-2 mr-4 group-hover/item:bg-[#00F0FF] transition-colors"></span>
                        <span className="text-neutral-500 leading-relaxed group-hover/item:text-neutral-400 transition-colors">
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projects */}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-sm md:text-base font-heading font-semibold mb-6 flex items-center text-[#E8E8E8] uppercase tracking-wider">
                      <div className="w-1 h-4 bg-[#00F0FF]/50 rounded-full mr-3"></div>
                      Projects
                    </h4>
                    <div className="grid gap-6">
                      {exp.projects.map((project, index) => (
                        <div
                          key={index}
                          className="group/project p-6 rounded-xl bg-white/[0.02] ring-1 ring-white/10 hover:bg-white/[0.04] hover:ring-[#00F0FF]/20 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h5 className="font-heading font-semibold text-base md:text-lg text-[#E8E8E8] group-hover/project:text-[#00F0FF] transition-colors">
                              {project.title}
                            </h5>
                            <div className="flex gap-3">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-neutral-500 hover:text-[#00F0FF] transition-colors"
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              )}
                              {project.demo && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-neutral-500 hover:text-[#00F0FF] transition-colors"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="text-sm md:text-base text-neutral-500 mb-4 leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStacks.map((tech, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="bg-white/[0.02] border border-white/10 text-xs text-neutral-400 hover:border-[#00F0FF]/30 hover:text-[#00F0FF] transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer with links */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 pt-6 border-t border-white/5">
                  {exp.companyUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/link w-fit text-xs rounded-full bg-white/[0.02] border-white/10 text-neutral-400 hover:bg-white/[0.05] hover:border-[#00F0FF]/30 hover:text-[#00F0FF] transition-all duration-300"
                      asChild
                    >
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <LinkIcon className="h-3 w-3" />
                        <span className="uppercase tracking-wider font-medium">
                          Company website
                        </span>
                        <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </Button>
                  )}

                  {/* Render blog links if blogSlugs exist */}
                  {exp.blogSlugs && exp.blogSlugs.length > 0 && (
                    <div className="flex flex-col w-full sm:w-auto">
                      <h4 className="text-xs font-heading font-semibold mb-3 text-[#E8E8E8] uppercase tracking-wider">
                        Related Articles
                      </h4>
                      <RelatedBlogLinks blogSlugs={exp.blogSlugs} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});
