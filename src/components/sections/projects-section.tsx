"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/constants";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { staggerContainer, defaultViewport } from "@/lib/animations";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title="Featured Projects"
          subtitle="Here are some projects I've worked on that showcase my skills and approach to problem-solving."
        />

        {/* Portfolio Grid - Masonry-style layout */}
        <motion.div
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
        >
          <Button 
            variant="outline" 
            className="rounded-lg border-3 border-foreground px-8 py-6 text-lg font-bold transition-all duration-200 hover:-translate-y-2 hover:border-primary hover:bg-primary hover:text-primary-foreground" 
            asChild
          >
            <Link href="/projects">
              See All Projects <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
