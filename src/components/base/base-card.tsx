"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  withSpotlight?: boolean;
  variant?: "default" | "interactive";
  onClick?: () => void;
}

export const BaseCard = React.memo(function BaseCard({
  children,
  className,
  withSpotlight = true,
  variant = "default",
  onClick,
}: BaseCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!withSpotlight) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10",
        "transition-all duration-500",
        "hover:bg-white/[0.06] hover:ring-[#00F0FF]/20",
        variant === "interactive" && "cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Mouse-tracking spotlight effect */}
      {withSpotlight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,240,255,0.06), transparent 40%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
});
