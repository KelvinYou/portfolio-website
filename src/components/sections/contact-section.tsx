"use client";

import { motion } from "framer-motion";
import { SocialLinks } from "@/components/base/social-links";
import { useTranslations } from "next-intl";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { Mail } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("sections");

  return (
    <section id="contact" className="relative py-32 md:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Icon */}
          <motion.div variants={fadeIn} className="mb-6 inline-flex">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeIn}
            className="font-heading text-4xl font-extrabold md:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            {t("contact_title")}
          </motion.h2>

          {/* Accent line */}
          <motion.div variants={fadeIn} className="mt-5 flex justify-center gap-1">
            <div className="h-0.5 w-12 rounded-full bg-primary" />
            <div className="h-0.5 w-4 rounded-full bg-primary/40" />
            <div className="h-0.5 w-2 rounded-full bg-primary/20" />
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="mx-auto mt-6 mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {t("contact_subtitle")}
          </motion.p>

          <motion.div variants={fadeIn}>
            <SocialLinks variant="full-card" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
