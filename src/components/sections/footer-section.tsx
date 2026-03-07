import { Github, Mail, Linkedin } from "lucide-react";
import dayjs from "dayjs";
import { personalInfo } from "@/constants";

export function FooterSection() {
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
    <footer className="border-t-2 border-foreground dark:border-white/25 bg-card py-8">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          © {dayjs().year()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <a
              key={index}
              href={href}
              className="text-muted-foreground transition-colors duration-150 hover:text-primary"
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
