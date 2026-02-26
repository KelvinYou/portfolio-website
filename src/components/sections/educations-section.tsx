"use client";

import { motion } from "framer-motion";
import {
  School,
  Calendar,
  Award,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { educations } from "@/constants";
import { formatStartEndDate, cn } from "@/lib/utils";
import Image from "next/image";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const timelineVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "100%",
    transition: { duration: 1.5 },
  },
};

export function EducationsSection() {
  return (
    <section id="education" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title="Education & Certifications"
          subtitle="My academic journey and continuous learning path that has shaped my professional skills."
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line */}
          <motion.div
            className="absolute left-0 h-full w-1 transform md:left-1/2 md:-translate-x-1/2"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="h-full w-full rounded-full bg-gradient-to-b from-[#00F0FF] via-[#00F0FF]/50 to-[#00F0FF]/10"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10"
          >
            {educations.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`mb-12 flex flex-col md:mb-24 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline node */}
                <div className="absolute left-0 hidden h-8 w-8 transform items-center justify-center rounded-full border-2 border-[#00F0FF]/80 bg-background shadow-[0_0_10px_rgba(0,240,255,0.3)] md:left-1/2 md:flex md:-translate-x-1/2">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-[#00F0FF]"></div>
                </div>

                {/* Date tag */}
                <div
                  className={cn(
                    "hidden md:flex absolute md:left-1/2 transform items-center",
                    index % 2 === 0
                      ? "md:translate-x-12"
                      : "md:-translate-x-[calc(100%+48px)] flex-row-reverse",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center bg-white/[0.03] border border-white/10 rounded-full py-1 px-3 text-xs font-mono hover:border-[#00F0FF]/30 transition-colors",
                      index % 2 === 0 ? "pl-3 pr-4" : "pl-4 pr-3",
                    )}
                  >
                    <Calendar className="h-3 w-3 shrink-0 text-[#00F0FF]" />
                    <span className="ml-1.5">
                      {formatStartEndDate(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                </div>

                {/* Timeline content */}
                <div
                  className={`relative ml-6 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                >
                  <motion.div
                    className="relative rounded-lg bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 p-6 transition-all duration-300 hover:bg-white/[0.06] hover:ring-[#00F0FF]/20"
                    whileHover={{
                      scale: 1.02,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Mobile timeline marker */}
                    <div className="absolute -left-8 top-8 flex flex-col items-center md:hidden">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#00F0FF] bg-background">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00F0FF]"></div>
                      </div>
                      <div className="h-full w-0.5 bg-gradient-to-b from-primary to-primary/10"></div>
                    </div>

                    {/* Content header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between">
                        <h3 className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-xl font-bold text-transparent">
                          {edu.degree}
                        </h3>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center text-muted-foreground">
                        <div className="mr-4 flex items-center">
                          <School className="mr-1 h-3.5 w-3.5 text-[#00F0FF]" />
                          <span className="text-sm">{edu.institution}</span>
                        </div>
                        <div className="mt-1 flex items-center sm:mt-0">
                          <MapPin className="mr-1 h-3.5 w-3.5 text-[#00F0FF]/70" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                        <div className="mt-1 flex items-center sm:mt-0 md:hidden">
                          <Calendar className="mr-1 h-3.5 w-3.5 text-[#00F0FF]/70" />
                          <span className="text-sm">
                            {formatStartEndDate(edu.startDate, edu.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      {/* Decorative line */}
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-primary/30 to-transparent"></div>
                      <p className="my-4 pl-3 text-sm text-muted-foreground">
                        {edu.description}
                      </p>
                    </div>

                    {edu.achievements.length > 0 && (
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <h4 className="mb-2 flex items-center text-sm font-semibold">
                          <Award className="mr-1.5 h-4 w-4 text-[#00F0FF]" />{" "}
                          Achievements & Honors
                        </h4>
                        <ul className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
                          {edu.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="relative pl-5 text-xs before:absolute before:left-1.5 before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#00F0FF]/40"
                            >
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="text-xs text-muted-foreground">
                        {edu.logo && (
                          <Image
                            src={edu.logo}
                            alt={edu.institution}
                            className="h-6 opacity-70"
                            width={42}
                            height={24}
                          />
                        )}
                      </div>
                      {edu.certificateUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          asChild
                        >
                          <a
                            href={edu.certificateUrl}
                            target="_blank"
                            className="group flex items-center"
                          >
                            <span>View certificate</span>
                            <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* Visual highlight effect */}
                    {/* <div className={`absolute ${index % 2 === 0 ? '-right-1 md:-right-3' : '-right-1 md:-left-3'} top-8 transform translate-x-1/2 md:translate-x-0 w-2 h-16 bg-gradient-to-b from-primary/80 to-transparent rounded-full blur-sm opacity-60`}></div> */}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* <motion.div 
          className="text-center mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Button variant="outline" className="rounded-full text-sm group">
            <span>View All Certifications</span>
            <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </motion.div> */}
      </div>
    </section>
  );
}
