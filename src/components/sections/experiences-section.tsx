"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data";
import { ExperienceCard } from "@/components/experience/experience-card";

// Animation variants
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

export function ExperiencesSection() {
  return (
    <section id="experience" className="relative overflow-hidden py-24">
      {/* Subtle background gradients */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl filter"></div>
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl filter"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 p-1.5 px-3">
            <Briefcase className="mr-1 inline h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Work History</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Professional Experience
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A showcase of my professional journey and the skills I&apos;ve
            developed along the way.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl"
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
