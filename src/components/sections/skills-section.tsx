"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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
  return (
    <section id="skills" className="bg-muted/10 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Skills & Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Technologies and tools I&apos;ve mastered throughout my professional
            journey.
          </p>
        </motion.div>

        <Tabs defaultValue="technical" className="mx-auto max-w-3xl">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger
              value="technical"
              className="cursor-pointer text-foreground"
            >
              Technical Skills
            </TabsTrigger>
            <TabsTrigger
              value="soft"
              className="cursor-pointer text-foreground"
            >
              Soft Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technical">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-4"
            >
              {skills.map((skill, index) => (
                <motion.div key={index} variants={fadeIn} className="mb-4">
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted/50">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="soft">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
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
