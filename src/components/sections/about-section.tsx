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
import { useState } from "react";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="about" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("about_title")}
          subtitle={t("about_subtitle")}
        />

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Profile Image with Spotlight */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeIn}
            className="group relative overflow-hidden rounded-lg"
            onMouseMove={handleMouseMove}
          >
            <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-[#00F0FF]/30 transition-all duration-500 z-10" />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
              style={{
                background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,240,255,0.08), transparent 40%)`,
              }}
            />
            <Image
              src={personalInfo.profilePicture}
              alt="About Me"
              width={600}
              height={400}
              className="relative h-[400px] rounded-lg object-cover"
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
                    className="text-2xl font-bold sm:text-3xl"
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
              <h3 className="mb-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {t("about_heading")}
              </h3>

              {/* Hook */}
              <p className="mb-4 text-base font-medium leading-relaxed text-foreground sm:text-lg">
                {t("about_hook")}
              </p>

              {/* Currently Building */}
              <div className="mb-4 rounded-lg bg-muted/50 p-4 ring-1 ring-border/20 dark:bg-white/[0.03] dark:ring-white/10">
                <p className="mb-1 text-sm font-semibold text-foreground">
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
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                {topTechs.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
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
                      className="h-6 w-6 rounded-full object-cover opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
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
                      "rounded-full px-6 py-3 font-bold cursor-pointer",
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
                      "rounded-full px-6 py-3 cursor-pointer",
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
