import dayjs from "dayjs";
import { personalInfo } from "@/constants";
import { SocialLinks } from "@/components/base/social-links";

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {dayjs().year()} {personalInfo.name}. All rights reserved.
        </p>
        <SocialLinks size="sm" className="mt-5 justify-center" />
      </div>
    </footer>
  );
}
