"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillRing } from "@/components/ui/skill-ring";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { useTranslations } from "next-intl";

const skills = [
  { name: "TypeScript", level: 90 },
  { name: "Next.js (React)", level: 90 },
  { name: "Gin (Go)", level: 80 },
  { name: "Flutter", level: 70 },
  { name: "Python", level: 60 },
  { name: "Java", level: 70 },
  { name: "C++", level: 60 },
  { name: "Linux", level: 60 },
  { name: "Git", level: 80 },
]
  .sort((a, b) => b.level - a.level)
  .slice(0, 5);

const softSkills = [
  "Team Collaboration",
  "Problem Solving",
  "Time Management",
  "Adaptability",
  "Leadership",
];

export function SkillsSection() {
  const t = useTranslations("sections");

  return (
    <section id="skills" className="geometric-bg relative bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <h2 className="section-heading !mb-4">
            {t("skills_title")}
          </h2>
          <p className="section-subheading !mb-0">
            {t("skills_subtitle")}
          </p>
        </motion.div>

        <Tabs defaultValue="technical" className="mx-auto max-w-3xl">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger
              value="technical"
              className="cursor-pointer text-foreground"
            >
              {t("skills_technical")}
            </TabsTrigger>
            <TabsTrigger
              value="soft"
              className="cursor-pointer text-foreground"
            >
              {t("skills_soft")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technical">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="flex flex-wrap justify-center gap-6 sm:gap-8"
            >
              {skills.map((skill, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <SkillRing
                    name={skill.name}
                    level={skill.level}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="soft">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="grid gap-6 sm:grid-cols-2"
            >
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
