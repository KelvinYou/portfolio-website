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

const softSkillsData = [
  { name: "Team Collaboration", icon: "🤝" },
  { name: "Problem Solving", icon: "🧩" },
  { name: "Time Management", icon: "⏱" },
  { name: "Adaptability", icon: "🔄" },
  { name: "Leadership", icon: "🧭" },
];

export function SkillsSection() {
  const t = useTranslations("sections");

  return (
    <section
      id="skills"
      className="relative border-y border-border bg-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
          className="mb-14 text-center"
        >
          <h2
            className="font-heading text-4xl font-extrabold md:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            {t("skills_title")}
          </h2>
          {/* Accent line */}
          <div className="mt-5 flex justify-center gap-1">
            <div className="h-0.5 w-12 rounded-full bg-primary" />
            <div className="h-0.5 w-4 rounded-full bg-primary/40" />
            <div className="h-0.5 w-2 rounded-full bg-primary/20" />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("skills_subtitle")}
          </p>
        </motion.div>

        <Tabs defaultValue="technical" className="mx-auto max-w-3xl">
          <TabsList className="mb-10 grid w-full grid-cols-2 rounded-xl border border-border bg-muted/40 p-1">
            <TabsTrigger
              value="technical"
              className="cursor-pointer rounded-lg text-sm font-medium transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              {t("skills_technical")}
            </TabsTrigger>
            <TabsTrigger
              value="soft"
              className="cursor-pointer rounded-lg text-sm font-medium transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm"
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
              className="flex flex-wrap justify-center gap-8"
            >
              {skills.map((skill, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <SkillRing name={skill.name} level={skill.level} index={index} />
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
              className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
            >
              {softSkillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/25 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium text-foreground">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
