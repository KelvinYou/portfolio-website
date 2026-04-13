"use client";

import { motion } from "framer-motion";
import { fadeIn, defaultViewport } from "@/lib/animations";

interface UnifiedSectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function UnifiedSectionHeader({
  title,
  subtitle,
  align = "left",
}: UnifiedSectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeIn}
      className={`mb-16 md:mb-20 ${isCenter ? "text-center" : ""}`}
    >
      <h2
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
        style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
      >
        {title}
      </h2>

      {/* Accent line — tapers to suggest direction */}
      <div
        className={`mt-5 flex gap-1 ${isCenter ? "justify-center" : ""}`}
      >
        <div className="h-0.5 w-12 rounded-full bg-primary" />
        <div className="h-0.5 w-4 rounded-full bg-primary/40" />
        <div className="h-0.5 w-2 rounded-full bg-primary/20" />
      </div>

      {subtitle && (
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground ${isCenter ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
