"use client";

import { personalInfo } from "@/constants";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
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
      handle: "View my repositories",
    },
    {
      icon: Linkedin,
      href: contact.linkedin,
      label: "LinkedIn",
      handle: "Connect with me",
    },
    {
      icon: Mail,
      href: `mailto:${contact.email}`,
      label: "Email",
      handle: contact.email,
    },
  ];

  if (variant === "icon-only") {
    return (
      <div className={cn("flex gap-3", className)}>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_16px_rgba(0,240,255,0.12)] hover:-translate-y-0.5"
            aria-label={link.label}
          >
            <link.icon className="h-4.5 w-4.5" />
          </a>
        ))}
      </div>
    );
  }

  // full-card variant for contact section
  return (
    <div className={cn("space-y-3", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.label !== "Email" ? "_blank" : undefined}
          rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_0_1px_rgba(0,240,255,0.07),0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
            <link.icon className="h-5 w-5" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-heading text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              {link.label}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {link.handle}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
}
