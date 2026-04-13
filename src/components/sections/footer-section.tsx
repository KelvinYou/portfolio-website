import { Github, Mail, Linkedin } from "lucide-react";
import dayjs from "dayjs";
import { personalInfo } from "@/constants";

export function FooterSection() {
  const socialLinks = [
    { href: personalInfo.contact.github, icon: Github, label: "GitHub Profile" },
    { href: personalInfo.contact.linkedin, icon: Linkedin, label: "LinkedIn Profile" },
    { href: `mailto:${personalInfo.contact.email}`, icon: Mail, label: "Send Email" },
  ];

  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {dayjs().year()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="mt-5 flex justify-center gap-5">
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <a
              key={index}
              href={href}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
