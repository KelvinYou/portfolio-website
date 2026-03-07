"use client";

import { motion } from "framer-motion";
import { fadeIn, defaultViewport } from "@/lib/animations";

interface UnifiedSectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function UnifiedSectionHeader({
  title,
  subtitle,
}: UnifiedSectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeIn}
      className="mb-16 md:mb-24"
    >
      <h2
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
        style={{ letterSpacing: "-0.04em" }}
      >
        {title}
      </h2>
      <div className="mt-4 h-1 w-16 bg-primary" />
      {subtitle && (
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      )}
    </motion.div>
  );
}
