"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data";
import { ExperienceCard } from "@/components/experience/experience-card";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function ExperiencesSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-block p-1.5 px-3 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <Briefcase className="h-4 w-4 text-primary inline mr-1" />
            <span className="text-xs font-medium">Work History</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my professional journey and the skills I&apos;ve developed along the way.
          </p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {experiences.map((exp, index) => (
            <ExperienceCard 
              key={index} 
              experience={exp} 
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
