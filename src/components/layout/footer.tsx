import { personalInfo } from "@/data";
import dayjs from "dayjs";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
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
    <footer className="py-8 bg-muted/20 border-t border-border/40">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          © {dayjs().year()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 gap-6">
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <a
              key={index}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
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
