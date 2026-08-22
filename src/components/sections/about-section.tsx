"use client";

import { motion } from "framer-motion";
import { FileText, Mail, MapPin, Puzzle, Compass, Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import Image from "next/image";
import Link from "next/link";
import { aboutProofPoints, personalInfo, resumeRoute } from "@/constants";
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
            className="flex flex-col gap-8 py-4"
          >
            {/* Identity strip — the face behind the résumé. Greyscale by
                default so the busy travel shot doesn't fight the monochrome
                page; colour returns on hover. */}
            <motion.div
              variants={fadeIn}
              className="group flex items-center gap-5"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border transition-all duration-500 group-hover:ring-primary/40">
                <Image
                  src={personalInfo.profilePicture}
                  alt={`Portrait of ${personalInfo.fullname}`}
                  width={640}
                  height={640}
                  sizes="112px"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </div>
              {/* No name here — the navbar wordmark and the hero already
                  carry it. The strip only adds what they don't: a face and
                  a timezone. */}
              <p className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 text-primary-ink"
                  aria-hidden="true"
                />
                {personalInfo.contact.location}
              </p>
            </motion.div>

            <div className="relative flex flex-col gap-4">
              <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
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
            </div>
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
              <h3
                className="mb-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                {t("about_heading")}
              </h3>

              {/* Hook */}
              <p className="mb-6 text-base leading-relaxed text-foreground/85 sm:text-lg">
                {t("about_hook")}
              </p>

              {/* Proof row — the resume summary's figures, not its prose. The
                  hook above says how I work; this says it worked. Hairline
                  dividers instead of three more cards: the section already
                  carries enough bordered boxes. */}
              <dl className="mb-6 grid grid-cols-3 divide-x divide-border border-y border-border">
                {aboutProofPoints.map((point) => (
                  <div
                    key={point.labelKey}
                    className="group px-3 py-4 first:pl-0 last:pr-0"
                  >
                    <dt
                      className="font-heading text-xl font-extrabold tabular-nums tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary-ink sm:text-2xl"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      {point.value}
                    </dt>
                    <dd className="mt-1 text-[11px] uppercase leading-snug tracking-wider text-muted-foreground">
                      {t(point.labelKey)}
                    </dd>
                  </div>
                ))}
              </dl>

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
                      "rounded-xl px-6 py-3 font-semibold cursor-pointer btn-bold-hover",
                    )}
                    aria-label="Contact me via email or social media"
                  >
                    <Mail className="mr-2 h-4 w-4" aria-hidden="true" />{" "}
                    {tCommon("contact")}
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
                      "rounded-xl px-6 py-3 cursor-pointer border-border transition-all duration-300 hover:border-primary/40 hover:bg-card hover:text-foreground",
                    )}
                    aria-label="Open my resume PDF in a new tab"
                  >
                    <FileText className="mr-2 h-4 w-4" aria-hidden="true" />{" "}
                    {tCommon("view_resume")}
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
