"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { ArrowRight, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
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

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - left) / width - 0.5);
        mouseY.set((e.clientY - top) / height - 0.5);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const cardRotateX = useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const cardRotateY = useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-32 md:py-40"
    >
      {/* Ambient background glow */}
      <div className="hero-ambient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute left-1/4 bottom-1/4 w-64 h-64 rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Content */}
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center rounded-full bg-primary/15 p-1">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                {t("badge")}
              </p>
              <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="hero-heading mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-block text-primary">
                    {t("greeting", { name: personalInfo.name })}
                  </span>
                </motion.div>
              </div>

              <div className="mt-2 h-[64px] overflow-hidden sm:h-[72px] md:h-[80px] lg:h-[100px]">
                {isMounted && (
                  <TypeAnimation
                    sequence={[t("role_1"), 2500, t("role_2"), 2500, t("role_3"), 2500]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-3xl text-foreground/85 sm:text-4xl md:text-5xl lg:text-6xl"
                  />
                )}
              </div>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative mb-10"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              <p className="max-w-xl pl-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("description_prefix")}
                <span className="font-medium text-foreground">{t("description_build")}</span>
                {t("description_middle")}
                <span className="font-medium text-foreground">{t("description_suffix")}</span>.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mb-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <MagneticButton strength={10}>
                <Button
                  size="lg"
                  className="group relative w-full gap-2.5 overflow-hidden rounded-xl border-0 bg-primary px-7 py-3 text-base font-bold text-primary-foreground btn-bold-hover sm:w-auto sm:px-8 sm:py-4"
                  asChild
                >
                  <Link href="#contact">
                    <Mail className="h-4 w-4" />
                    <span className="relative z-10">{t("cta_primary")}</span>
                  </Link>
                </Button>
              </MagneticButton>

              <MagneticButton strength={10}>
                <Button
                  size="lg"
                  variant="outline"
                  className="group w-full gap-2.5 rounded-xl border border-border bg-background/50 px-7 py-3 text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card sm:w-auto sm:px-8 sm:py-4"
                  asChild
                >
                  <Link href="#projects">
                    <span>{t("cta_secondary")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mb-10 flex gap-8 sm:gap-12"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              {heroStats.map((stat, i) => (
                <div key={stat.labelKey} className="flex flex-col">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    className="text-2xl font-extrabold sm:text-3xl"
                  />
                  <span className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                    {t(stat.labelKey)}
                  </span>
                  {i < heroStats.length - 1 && (
                    <div className="absolute" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <SocialLinks variant="icon-only" />
            </motion.div>
          </div>

          {/* Right: Terminal card */}
          <motion.div
            className="relative hidden justify-center lg:flex lg:justify-end"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="w-[400px] overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-xl neo-shadow-lg"
              style={{ transformStyle: "preserve-3d", rotateX: cardRotateX, rotateY: cardRotateY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-border px-5 py-3.5" style={{ transform: "translateZ(20px)" }}>
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  kelvin@portfolio ~ %
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm" style={{ transform: "translateZ(20px)" }}>
                <div className="text-muted-foreground">
                  <span className="text-foreground">$</span> kelvin --stats
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { label: "shipped", value: `${projects.length} projects` },
                    { label: "fastest", value: "35% load reduction" },
                    { label: "scale", value: "500K rows @ 60fps" },
                    { label: "users", value: "1M+ products served" },
                    { label: "stack", value: "Next.js + TS + GraphQL" },
                  ].map((line) => (
                    <div key={line.label} className="flex gap-4">
                      <span className="w-14 shrink-0 text-right text-muted-foreground/70">
                        {line.label}
                      </span>
                      <span className="text-primary">{line.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-4">
                  <span className="w-14 shrink-0 text-right text-muted-foreground/70">status</span>
                  <span className="text-emerald-400">
                    open to opportunities
                    <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-emerald-400/80" />
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
