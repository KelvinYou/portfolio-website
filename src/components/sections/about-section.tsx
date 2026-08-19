"use client";

import { motion } from "framer-motion";
import { FileText, Mail, Puzzle, Compass, Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import Link from "next/link";
import { resumeRoute } from "@/constants";
import { cn } from "@/lib/utils";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { useTranslations } from "next-intl";

const topTechs = [
  "TypeScript",
  "Next.js",
  "React",
  "Python",
  "Claude Agent SDK",
  "MCP",
  "FastAPI",
  "PostgreSQL",
];

const workSteps = [
  { icon: Puzzle, labelKey: "about_step_1" as const },
  { icon: Compass, labelKey: "about_step_2" as const },
  { icon: Rocket, labelKey: "about_step_3" as const },
];

export function AboutSection() {
  const t = useTranslations("sections");
  const tCommon = useTranslations("common");

  return (
    <section id="about" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("about_title")}
          subtitle={t("about_subtitle")}
        />

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* How-I-Work process visual */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="relative flex flex-col gap-4 py-4"
          >
            <div className="absolute left-[27px] top-10 bottom-10 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
            {workSteps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.labelKey}
                  variants={fadeIn}
                  className="group relative z-10 flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background/60 transition-colors duration-300 group-hover:border-primary/40">
                    <Icon className="h-6 w-6 text-primary-ink" />
                  </div>
                  <p className="text-base font-medium text-foreground/90 sm:text-lg">
                    {t(step.labelKey)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Content Stack */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeIn}
            >
              {/* Heading */}
              <h3 className="mb-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl"
                style={{ letterSpacing: "-0.02em" }}>
                {t("about_heading")}
              </h3>

              {/* Hook */}
              <p className="mb-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
                {t("about_hook")}
              </p>

              {/* Currently Building */}
              <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-ink">
                  {t("about_current_label")}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("about_current_detail")}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                {topTechs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium transition-colors duration-200 hover:border-primary/40 hover:text-primary-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Link
                    href="/#contact"
                    className={cn(
                      buttonVariants(),
                      "rounded-xl px-6 py-3 font-semibold cursor-pointer btn-bold-hover"
                    )}
                    aria-label="Contact me via email or social media"
                  >
                    <Mail className="mr-2 h-4 w-4" aria-hidden="true" /> {tCommon("contact")}
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  {/* /resume is the PDF, so this leaves the app: plain anchor,
                      new tab, no locale prefix. */}
                  <a
                    href={resumeRoute}
                    target="_blank"
                    rel="noopener"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-xl px-6 py-3 cursor-pointer border-border transition-all duration-300 hover:border-primary/40 hover:bg-card"
                    )}
                    aria-label="Open my resume PDF in a new tab"
                  >
                    <FileText className="mr-2 h-4 w-4" aria-hidden="true" /> {tCommon("view_resume")}
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
