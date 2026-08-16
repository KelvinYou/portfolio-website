"use client";

import { socialLinks, type SocialId } from "@/constants";
import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialId, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

interface SocialLinksProps {
  /** `sm` is the footer's density; `md` is the hero's. */
  size?: "sm" | "md";
  className?: string;
}

// Icon row only. The full-card variant this file used to carry was retired
// with the contact-section rewrite — that section now leads with a single
// primary action instead of three equally-weighted doors.
export function SocialLinks({ size = "md", className }: SocialLinksProps) {
  const box = size === "sm" ? "h-9 w-9 rounded-lg" : "h-11 w-11 rounded-xl";
  const glyph = size === "sm" ? "h-4 w-4" : "h-[1.125rem] w-[1.125rem]";

  return (
    <div className={cn("flex gap-3", className)}>
      {socialLinks.map((link) => {
        const Icon = ICONS[link.id];
        return (
          <a
            key={link.id}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={cn(
              box,
              "flex items-center justify-center border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_16px_rgba(0,240,255,0.12)]",
            )}
            aria-label={link.label}
          >
            <Icon className={glyph} />
          </a>
        );
      })}
    </div>
  );
}
