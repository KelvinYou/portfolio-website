import { Github, Mail, Linkedin } from "lucide-react";
import dayjs from "dayjs";
import { personalInfo } from "@/data";

export function FooterSection() {
  return (
    <footer className="py-8 bg-muted/20 border-t border-border/40">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          © {dayjs().year()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 gap-6">
          <a href={personalInfo.contact.github} className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href={personalInfo.contact.linkedin} className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={`mailto:${personalInfo.contact.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
} 