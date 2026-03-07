"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "interactive";
  onClick?: () => void;
}

export const BaseCard = React.memo(function BaseCard({
  children,
  className,
  variant = "default",
  onClick,
}: BaseCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-sm overflow-hidden",
        "border-2 border-foreground dark:border-white/25 bg-card",
        "transition-all duration-150",
        "hover:border-primary",
        variant === "interactive" && "cursor-pointer neo-card",
        className
      )}
      onClick={onClick}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});
