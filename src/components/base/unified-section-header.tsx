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
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#E8E8E8]"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 max-w-2xl text-lg text-neutral-500">{subtitle}</p>
      )}
    </motion.div>
  );
}
