"use client";

import { motion } from "framer-motion";
import { fadeIn, defaultViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeIn}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 p-1.5 px-3">
          {badge.icon && (
            <badge.icon className="mr-1 inline h-4 w-4 text-primary" />
          )}
          <span className="text-xs font-medium">{badge.text}</span>
        </div>
      )}
      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
