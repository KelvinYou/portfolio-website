"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { MailComposer } from "@/components/base/mail-composer";
import { socialLinks } from "@/constants";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";

// The page's terminus, so it deliberately breaks the shared section header
// (centred title + tapering accent dashes) that About/Skills/Projects share:
// arriving here should feel like arriving, not like another chapter. The
// status strip does the eyebrow's job with facts instead of decoration, and
// the three equal link cards are gone — email is the route that works, the
// other two are footnotes.
export function ContactSection() {
  const t = useTranslations("sections");
  const tc = useTranslations("contact");

  const secondary = socialLinks.filter((link) => link.id !== "email");

  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="mx-auto max-w-2xl"
        >
          {/* Status strip — verifiable facts, not an icon restating the heading */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-5 font-mono text-xs text-muted-foreground"
          >
            <span>{tc("status_location")}</span>
            <span>{tc("status_reply")}</span>
            <span className="flex items-center gap-2 text-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              {tc("status_open")}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeIn}
            className="mt-8 font-heading text-4xl font-extrabold md:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            {t("contact_title")}
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="mt-5 mb-10 text-lg leading-relaxed text-muted-foreground"
          >
            {t("contact_subtitle")}
          </motion.p>

          <motion.div variants={fadeIn}>
            <MailComposer />
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground"
          >
            <span className="text-muted-foreground/70">{tc("also_here")}</span>
            {secondary.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
