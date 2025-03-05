import { Github, Mail, Linkedin } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="py-8 bg-muted/20 border-t border-border/40">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 gap-6">
          <a href="https://github.com/yourusername" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com/in/yourusername" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="mailto:your.email@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
} 