"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
          {/* Profile Image - Neo-Brutal frame */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeIn}
            className="group relative overflow-hidden rounded-sm border-2 border-foreground dark:border-white/25 neo-shadow"
          >
            <Image
              src={personalInfo.profilePicture}
              alt="About Me"
              width={600}
              height={400}
              className="relative h-[400px] rounded-none object-cover"
            />
          </motion.div>

          {/* Content Stack */}
          <div>
            {/* Stats Bar */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {aboutStats.map((stat) => (
                <motion.div key={stat.labelKey} variants={fadeIn} className="text-center sm:text-left">
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
              <h3 className="mb-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                {t("about_heading")}
              </h3>

              {/* Hook */}
              <p className="mb-4 text-base font-medium leading-relaxed text-foreground sm:text-lg">
                {t("about_hook")}
              </p>

              {/* Currently Building */}
              <div className="mb-4 rounded-sm border-2 border-foreground dark:border-white/25 bg-card p-4">
                <p className="mb-1 text-sm font-bold text-foreground">
                  {t("about_current_label")}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("about_current_detail")}
                </p>
              </div>

              {/* Differentiators */}
              <div className="mb-6 space-y-2">
                {[t("about_diff_1"), t("about_diff_2")].map((diff, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-none bg-foreground" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                {topTechs.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs border-2 border-foreground dark:border-white/25">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Company Logos */}
              <div className="mb-8 flex items-center gap-4">
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {t("about_shipped_for")}
                </span>
                <div className="flex items-center gap-3">
                  {companyLogos.map((company) => (
                    <Image
                      key={company.name}
                      src={company.logo}
                      alt={company.name}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-sm border border-foreground dark:border-white/25 object-cover opacity-80 transition-all duration-150 hover:opacity-100"
                    />
                  ))}
                </div>
              </div>

              {/* CTAs — Contact primary, Resume secondary */}
              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Link
                    href="/#contact"
                    className={cn(
                      buttonVariants(),
                      "rounded-sm px-6 py-3 font-bold cursor-pointer border-2 border-foreground dark:border-white/25 neo-shadow-sm",
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
                      "rounded-sm px-6 py-3 cursor-pointer border-2 border-foreground dark:border-white/25 neo-shadow-sm",
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
