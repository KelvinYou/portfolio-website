"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { educations } from "@/constants";
import {
  CredentialEntry,
  InstitutionMasthead,
} from "@/components/education/credential-entry";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { staggerContainer, defaultViewport } from "@/lib/animations";
import type { Education } from "@/types";

/**
 * Grouped by institution, order preserved. Two credentials from one school
 * across four unbroken years is a fact about this record, and the previous
 * layout dealt them onto opposite sides of a centre timeline where nothing
 * said they were the same place.
 *
 * Computed at module scope: `educations` is a static import, so this runs once
 * at load rather than on every render.
 */
const byInstitution = educations.reduce<
  { institution: string; entries: Education[] }[]
>((groups, edu) => {
  const group = groups.find((g) => g.institution === edu.institution);
  if (group) group.entries.push(edu);
  else groups.push({ institution: edu.institution, entries: [edu] });
  return groups;
}, []);

export function EducationsSection() {
  const t = useTranslations("sections");

  return (
    <section id="education" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("education_title")}
          subtitle={t("education_subtitle")}
        />

        <motion.div
          className="max-w-5xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {byInstitution.map((group, groupIndex) => (
            // A `motion.div`, not a plain one: variants only propagate through
            // motion components, so a bare wrapper here would cut the entries
            // off from the stagger container and leave them un-animated.
            // It stays a `div` rather than a `section` because globals.css
            // carries a bare 6rem/8rem `section` padding rule outside any
            // cascade layer, which no utility can undo.
            <motion.div
              key={group.institution}
              className={groupIndex > 0 ? "mt-16 md:mt-20" : undefined}
            >
              {/* A single credential needs no masthead — its own entry already
                  names the school. */}
              {group.entries.length > 1 && (
                <InstitutionMasthead educations={group.entries} />
              )}

              {group.entries.map((edu, index) => (
                <CredentialEntry
                  key={`${edu.institution}-${edu.degree}`}
                  education={edu}
                  isHighest={groupIndex === 0 && index === 0}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
