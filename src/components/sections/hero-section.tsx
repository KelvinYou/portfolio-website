"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { useMotionValue } from "framer-motion";
import { personalInfo, projects, experiences } from "@/constants";
import { SocialLinks } from "@/components/base/social-links";
import { getTotalWorkingExperiences } from "@/lib/utils";
import { useTranslations } from "next-intl";

const heroStats = [
  { target: getTotalWorkingExperiences(experiences), suffix: "+", labelKey: "stats_years" as const },
  { target: projects.length, suffix: "+", labelKey: "stats_projects" as const },
  { target: 1, suffix: "M+", labelKey: "stats_users" as const },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("hero");

  // Mouse parallax effect
  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { left, top, width, height } =
          ref.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Card parallax effect
  const cardRotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);

  const cardRotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-32 md:py-40"
    >

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-sm border-2 border-foreground dark:border-white/25 bg-card px-3 py-1.5 neo-shadow-sm"
            >
              <div className="flex items-center justify-center rounded-none bg-primary/10 p-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                {t("badge")}
              </p>
            </motion.div>

            <motion.h1
              className="hero-heading mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1.0, 0.32, 1.0] }}
                >
                  <span
                    className="inline-block text-primary"
                  >
                    {t("greeting", { name: personalInfo.name })}
                  </span>
                </motion.div>
              </div>

              <div className="mt-2 h-[64px] overflow-hidden sm:h-[72px] md:h-[80px] lg:h-[100px]">
                {isMounted && (
                  <TypeAnimation
                    sequence={[
                      t("role_1"),
                      2500,
                      t("role_2"),
                      2500,
                      t("role_3"),
                      2500,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-3xl text-foreground/90 sm:text-4xl md:text-5xl lg:text-6xl"
                  />
                )}
              </div>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div>

              <p className="mb-10 max-w-xl pr-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("description_prefix")}
                <span className="font-medium text-foreground">
                  {t("description_build")}
                </span>
                {t("description_middle")}
                <span className="font-medium text-foreground">
                  {t("description_suffix")}
                </span>
                .
              </p>

              {/* Static decorative element instead of animated */}
                <div className="absolute -left-6 top-0 h-full w-1 bg-primary" />
              </div>
                
            </motion.div>

            {/* CTA button section with clear hierarchy - Contact as primary for conversion */}
            <motion.div
              className="mb-8 flex flex-col gap-5 sm:flex-row sm:gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {/* Primary CTA - Bold block-based design */}
              <MagneticButton strength={12}>
                <Button
                  size="lg"
                  className="group relative w-full gap-2.5 overflow-hidden rounded-sm border-2 border-foreground dark:border-white/25 bg-primary px-6 py-3 text-base font-bold text-primary-foreground sm:w-auto sm:px-8 sm:py-4 sm:text-lg btn-bold-hover"
                  asChild
                >
                  <Link href="#contact">
                    <Mail className="h-5 w-5" />
                    <span className="relative z-10">
                      {t("cta_primary")}
                    </span>
                  </Link>
                </Button>
              </MagneticButton>

              {/* Secondary CTA - Vibrant outline */}
              <MagneticButton strength={12}>
                <Button
                  size="lg"
                  variant="outline"
                  className="group w-full gap-2.5 rounded-sm border-2 border-foreground dark:border-white/25 bg-background px-6 py-3 text-base font-bold transition-all duration-150 neo-shadow-sm hover:border-primary hover:bg-primary hover:text-primary-foreground sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                  asChild
                >
                  <Link href="#projects">
                    <span>{t("cta_secondary")}</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Animated stats row */}
            <motion.div
              className="mb-8 flex gap-8 sm:gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {heroStats.map((stat) => (
                <div key={stat.labelKey} className="flex flex-col">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    className="text-2xl font-extrabold sm:text-3xl"
                  />
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {t(stat.labelKey)}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social links with cyan hover states */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <SocialLinks variant="icon-only" />
            </motion.div>
          </div>

          {/* Optimized 3D Card */}
          <motion.div
            className="perspective-1000 relative hidden justify-center lg:flex lg:justify-end"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: "easeOut",
            }}
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="w-[400px] overflow-hidden rounded-sm border-2 border-foreground dark:border-white/25 bg-card p-6 neo-shadow-lg"
              style={{
                transformStyle: "preserve-3d",
                rotateX: cardRotateX,
                rotateY: cardRotateY,
              }}
              whileHover={{ scale: 1.02, rotateZ: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Terminal header */}
              <div
                className="mb-4 flex items-center gap-2"
                style={{ transform: "translateZ(25px)" }}
              >
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  kelvin@portfolio ~ %
                </span>
              </div>

              {/* Terminal content */}
              <div
                className="rounded-none border-2 border-foreground dark:border-white/25 bg-muted p-4 font-mono text-sm"
                style={{ transform: "translateZ(25px)" }}
              >
                <div className="text-muted-foreground">
                  <span className="text-foreground">$</span> kelvin --stats
                </div>
                <div className="mt-3 space-y-1.5">
                  {[
                    { label: "shipped", value: `${projects.length} projects` },
                    { label: "fastest", value: "35% load reduction" },
                    { label: "scale", value: "500K rows @ 60fps" },
                    { label: "users", value: "1M+ products served" },
                    { label: "stack", value: "Next.js + TS + GraphQL" },
                  ].map((line) => (
                    <div key={line.label} className="flex gap-3">
                      <span className="w-16 text-right text-muted-foreground">
                        {line.label}
                      </span>
                      <span className="text-primary">{line.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-3">
                  <span className="w-16 text-right text-muted-foreground">
                    status
                  </span>
                  <span className="text-green-400">
                    open to opportunities
                    <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-primary/80" />
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
