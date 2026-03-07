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
import { useTranslations } from "next-intl";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
  const t = useTranslations("sections");

  return (
    <section id="education" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("education_title")}
          subtitle={t("education_subtitle")}
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line - solid, no gradient */}
          <motion.div
            className="absolute left-0 h-full w-1 transform md:left-1/2 md:-translate-x-1/2"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="h-full w-full bg-foreground"></div>
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
                {/* Timeline node - square, solid */}
                <div className="absolute left-0 hidden h-8 w-8 transform items-center justify-center rounded-none border-2 border-foreground bg-primary md:left-1/2 md:flex md:-translate-x-1/2">
                  <div className="h-3 w-3 rounded-none bg-card"></div>
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
                      "flex items-center border-2 border-foreground dark:border-white/25 bg-card rounded-sm py-1 px-3 text-xs font-mono hover:border-primary transition-colors duration-150",
                      index % 2 === 0 ? "pl-3 pr-4" : "pl-4 pr-3",
                    )}
                  >
                    <Calendar className="h-3 w-3 shrink-0 text-primary" />
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
                    className="relative rounded-sm border-2 border-foreground dark:border-white/25 bg-card p-6 transition-all duration-150 hover:border-primary neo-shadow"
                    whileHover={{ y: -4 }}
                  >
                    {/* Mobile timeline marker */}
                    <div className="absolute -left-8 top-8 flex flex-col items-center md:hidden">
                      <div className="flex h-4 w-4 items-center justify-center rounded-none border-2 border-foreground bg-primary">
                        <div className="h-1.5 w-1.5 rounded-none bg-card"></div>
                      </div>
                      <div className="h-full w-0.5 bg-foreground"></div>
                    </div>

                    {/* Content header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-extrabold text-foreground">
                          {edu.degree}
                        </h3>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center text-muted-foreground">
                        <div className="mr-4 flex items-center">
                          <School className="mr-1 h-3.5 w-3.5 text-primary" />
                          <span className="text-sm">{edu.institution}</span>
                        </div>
                        <div className="mt-1 flex items-center sm:mt-0">
                          <MapPin className="mr-1 h-3.5 w-3.5 text-primary/70" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                        <div className="mt-1 flex items-center sm:mt-0 md:hidden">
                          <Calendar className="mr-1 h-3.5 w-3.5 text-primary/70" />
                          <span className="text-sm">
                            {formatStartEndDate(edu.startDate, edu.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      {/* Decorative line - solid */}
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-primary"></div>
                      <p className="my-4 pl-3 text-sm text-muted-foreground">
                        {edu.description}
                      </p>
                    </div>

                    {edu.achievements.length > 0 && (
                      <div className="mt-5 border-t-2 border-foreground dark:border-white/25 pt-4">
                        <h4 className="mb-2 flex items-center text-sm font-bold">
                          <Award className="mr-1.5 h-4 w-4 text-primary" />{" "}
                          Achievements & Honors
                        </h4>
                        <ul className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
                          {edu.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="relative pl-5 text-xs before:absolute before:left-1.5 before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-none before:bg-foreground"
                            >
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t-2 border-foreground dark:border-white/25 pt-4">
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
                          className="h-8 px-2 text-xs rounded-sm"
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
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
