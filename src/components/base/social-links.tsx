"use client";

import { personalInfo } from "@/constants";
import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  variant?: "icon-only" | "full-card";
  className?: string;
}

export function SocialLinks({ variant = "icon-only", className }: SocialLinksProps) {
  const { contact } = personalInfo;

  const socialLinks = [
    {
      icon: Github,
      href: contact.github,
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: contact.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: `mailto:${contact.email}`,
      label: "Email",
    },
  ];

  if (variant === "icon-only") {
    return (
      <div className={cn("flex gap-4", className)}>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            className="group relative inline-flex h-12 w-12 items-center justify-center rounded-sm border-2 border-foreground dark:border-white/25 bg-card text-muted-foreground transition-all duration-150 neo-shadow-sm hover:border-primary hover:text-primary hover:-translate-y-1"
            aria-label={link.label}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    );
  }

  // full-card variant for contact section
  return (
    <div className={cn("space-y-6", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.label !== "Email" ? "_blank" : undefined}
          rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-6 rounded-sm border-2 border-foreground dark:border-white/25 bg-card p-6 neo-shadow transition-all duration-150 hover:border-primary hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-sm border-2 border-foreground dark:border-white/25 bg-card text-muted-foreground transition-all duration-150 group-hover:text-primary group-hover:border-primary">
            <link.icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {link.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {link.label === "Email" ? contact.email : `Visit my ${link.label}`}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
