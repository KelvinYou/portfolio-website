"use client";

import { personalInfo } from "@/constants";
import dayjs from "dayjs";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const socialLinks = [
    {
      href: personalInfo.contact.github,
      icon: Github,
      label: "GitHub Profile",
    },
    {
      href: personalInfo.contact.linkedin,
      icon: Linkedin,
      label: "LinkedIn Profile",
    },
    {
      href: `mailto:${personalInfo.contact.email}`,
      icon: Mail,
      label: "Send Email",
    },
  ];

  return (
    <footer className="py-8 bg-card border-t-2 border-foreground dark:border-white/25">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          {t("copyright", { year: dayjs().year(), name: personalInfo.name })}
        </p>
        <div className="flex justify-center mt-4 gap-6">
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <a
              key={index}
              href={href}
              className="text-muted-foreground hover:text-primary transition-colors duration-150"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
