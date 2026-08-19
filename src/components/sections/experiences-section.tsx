"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/constants";
import { ExperienceEntry } from "@/components/experience/experience-entry";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { staggerContainer, defaultViewport } from "@/lib/animations";

export function ExperiencesSection() {
  const t = useTranslations("sections");

  return (
    <section id="experience">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("experience_title")}
          subtitle={t("experience_subtitle")}
        />

        {/* Roles are stored newest first, so the current one leads and takes the
            heavier rule — the same weighting the projects ledger gives its lead. */}
        <motion.div
          className="max-w-5xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {experiences.map((exp, index) => (
            <ExperienceEntry
              key={`${exp.company}-${exp.startDate}`}
              experience={exp}
              isCurrent={index === 0 && !exp.endDate}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
