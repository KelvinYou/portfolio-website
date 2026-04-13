"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import Link from "next/link";
import Image from "next/image";
import { personalInfo, experiences, skills } from "@/constants";
import { cn } from "@/lib/utils";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { useTranslations } from "next-intl";

const totalTechnologies = Object.values(skills).flat().length;

const aboutStats = [
  { target: experiences.length, suffix: "", labelKey: "about_stats_companies" as const },
  { target: 35, suffix: "%", labelKey: "about_stats_faster" as const },
  { target: 500, suffix: "K+", labelKey: "about_stats_scale" as const },
  { target: totalTechnologies, suffix: "+", labelKey: "about_stats_technologies" as const },
];

const companyLogos = [
  { name: "Simpletruss", logo: "/images/companies/simpletruss.jpeg" },
  { name: "Beyondsoft (Tencent)", logo: "/images/companies/beyondsoft.jpeg" },
  { name: "Finexus", logo: "/images/companies/finexus.png" },
  { name: "Techtics", logo: "/images/companies/techtics.png" },
];

const topTechs = ["React", "TypeScript", "Next.js", "GraphQL", "Node.js", "PostgreSQL"];

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
          {/* Profile Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeIn}
            className="group relative overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-primary/30"
            style={{
              boxShadow: "0 0 0 0 rgba(0,240,255,0)",
              transition: "all 0.4s ease",
            }}
          >
            <Image
              src={personalInfo.profilePicture}
              alt="About Me"
              width={600}
              height={400}
              className="h-[400px] w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>

          {/* Content Stack */}
          <div>
            {/* Stats Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="mb-8 grid grid-cols-2 gap-4"
            >
              {aboutStats.map((stat) => (
                <motion.div
                  key={stat.labelKey}
                  variants={fadeIn}
                  className="rounded-xl border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/25"
                >
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    className="text-2xl font-extrabold sm:text-3xl"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{t(stat.labelKey)}</p>
                </motion.div>
              ))}
            </motion.div>

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
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {t("about_current_label")}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("about_current_detail")}
                </p>
              </div>

              {/* Differentiators */}
              <div className="mb-6 space-y-2.5">
                {[t("about_diff_1"), t("about_diff_2")].map((diff, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                {topTechs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Company Logos */}
              <div className="mb-8 flex items-center gap-4">
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {t("about_shipped_for")}
                </span>
                <div className="flex items-center gap-2">
                  {companyLogos.map((company) => (
                    <Image
                      key={company.name}
                      src={company.logo}
                      alt={company.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full border border-border object-cover opacity-70 transition-all duration-200 hover:opacity-100 hover:border-primary/40"
                    />
                  ))}
                </div>
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
                  <Link
                    href="/resume"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-xl px-6 py-3 cursor-pointer border-border transition-all duration-300 hover:border-primary/40 hover:bg-card"
                    )}
                    aria-label="View my resume and download PDF"
                  >
                    <FileText className="mr-2 h-4 w-4" aria-hidden="true" /> {tCommon("view_resume")}
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
