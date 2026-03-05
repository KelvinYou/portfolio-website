"use client";

import { motion } from "framer-motion";
import { SocialLinks } from "@/components/base/social-links";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { useTranslations } from "next-intl";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ContactSection() {
  const t = useTranslations("sections");

  return (
    <section id="contact" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("contact_title")}
          subtitle={t("contact_subtitle")}
        />

        <div className="mx-auto max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h3 className="mb-8 text-2xl font-heading font-semibold text-center text-foreground">Contact Information</h3>
            <SocialLinks variant="full-card" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
