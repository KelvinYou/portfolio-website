"use client";

import { motion } from "framer-motion";
import { School, Calendar, Award, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { educations } from "@/constants";
import { formatStartEndDate, cn } from "@/lib/utils";
import Image from "next/image";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { useTranslations } from "next-intl";
import { fadeIn, staggerContainer } from "@/lib/animations";

const timelineVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 1.2, ease: "easeOut" as const },
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
          {/* Timeline line */}
          <motion.div
            className="absolute left-0 h-full w-px origin-top md:left-1/2 md:-translate-x-1/2"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="h-full w-full bg-gradient-to-b from-primary/40 via-border to-transparent" />
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
                className={`mb-10 flex flex-col md:mb-20 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline node */}
                <div className="absolute left-0 hidden h-7 w-7 transform items-center justify-center rounded-full border-2 border-primary/40 bg-background md:left-1/2 md:flex md:-translate-x-1/2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>

                {/* Date label */}
                <div
                  className={cn(
                    "hidden md:flex absolute md:left-1/2 transform items-center",
                    index % 2 === 0
                      ? "md:translate-x-10"
                      : "md:-translate-x-[calc(100%+40px)] flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground",
                      index % 2 === 0 ? "pl-3 pr-4" : "pl-4 pr-3"
                    )}
                  >
                    <Calendar className="h-3 w-3 text-primary/70" />
                    {formatStartEndDate(edu.startDate, edu.endDate)}
                  </div>
                </div>

                {/* Card */}
                <div className={`relative ml-5 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/25 hover:shadow-[0_0_0_1px_rgba(0,240,255,0.07),0_8px_32px_rgba(0,0,0,0.12)]"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Top accent */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Mobile marker */}
                    <div className="absolute -left-6 top-6 flex flex-col items-center md:hidden">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary/40 bg-background">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </div>
                      <div className="h-full w-px bg-border" />
                    </div>

                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-extrabold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                        {edu.degree}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <School className="h-3.5 w-3.5 text-primary/70" />
                          {edu.institution}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary/50" />
                          {edu.location}
                        </span>
                        <span className="flex items-center gap-1 md:hidden">
                          <Calendar className="h-3.5 w-3.5 text-primary/50" />
                          {formatStartEndDate(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                    </div>

                    {/* Description with left accent */}
                    <div className="relative mb-4 pl-3">
                      <div className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-primary/30" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {edu.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    {edu.achievements.length > 0 && (
                      <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
                        <h4 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                          <Award className="h-3.5 w-3.5" /> Achievements & Honors
                        </h4>
                        <ul className="grid gap-1.5 sm:grid-cols-2">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      {edu.logo ? (
                        <Image
                          src={edu.logo}
                          alt={edu.institution}
                          className="h-6 opacity-60"
                          width={42}
                          height={24}
                        />
                      ) : <div />}
                      {edu.certificateUrl && (
                        <Button variant="ghost" size="sm" className="h-7 rounded-lg px-3 text-xs hover:text-primary" asChild>
                          <a href={edu.certificateUrl} target="_blank" className="flex items-center gap-1">
                            View certificate
                            <ExternalLink className="h-3 w-3" />
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
