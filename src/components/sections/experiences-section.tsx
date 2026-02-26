"use client";

import { motion } from "framer-motion";
import { experiences } from "@/constants";
import { ExperienceCard } from "@/components/experience/experience-card";
import { fadeIn, staggerContainer, defaultViewport } from "@/lib/animations";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";

export function ExperiencesSection() {
  return (
    <section id="experience" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <UnifiedSectionHeader
          title="Professional Experience"
          subtitle="A showcase of my professional journey and the skills I've developed along the way."
        />

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-6xl">
          {/* Timeline Line */}
          <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00F0FF]/50 via-border/20 to-transparent"></div>

          {/* Experience Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-12 md:space-y-16"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="relative grid md:grid-cols-2 gap-8 items-start"
              >
                {/* Timeline Node */}
                <div className={`absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-8 z-10`}>
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full border-2 border-[#00F0FF]/80 bg-background shadow-[0_0_12px_rgba(0,240,255,0.4)] animate-pulse"></div>
                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-[#00F0FF]/20 animate-ping"></div>
                  </div>
                </div>

                {/* Content - Alternating sides on desktop */}
                <div className={`md:col-span-1 ${index % 2 === 0 ? 'md:col-start-1 md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'} ml-16 md:ml-0`}>
                  <ExperienceCard experience={exp} index={index} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
