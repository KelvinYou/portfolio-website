import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { EducationsSection } from "@/components/sections/educations-section";
import { ExperiencesSection } from "@/components/sections/experiences-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <EducationsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
