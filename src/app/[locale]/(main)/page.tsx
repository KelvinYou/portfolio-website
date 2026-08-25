import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { EducationsSection } from "@/components/sections/educations-section";
import { ExperiencesSection } from "@/components/sections/experiences-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getPostTitles } from "@/lib/mdx";

export default function Home() {
  // Read here rather than in the section: the section is a client component,
  // and the frontmatter only exists on the server.
  const postTitles = getPostTitles();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperiencesSection postTitles={postTitles} />
      <EducationsSection />
      <ContactSection />
    </div>
  );
}
