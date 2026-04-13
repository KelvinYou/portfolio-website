"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/constants";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { staggerContainer, defaultViewport, fadeIn } from "@/lib/animations";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { useTranslations } from "next-intl";

export function ProjectsSection() {
  const t = useTranslations("sections");

  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title={t("projects_title")}
          subtitle={t("projects_subtitle")}
        />

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
          className="mt-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
        >
          <Button
            variant="outline"
            className="rounded-xl border-border px-8 py-5 text-base font-semibold transition-all duration-300 hover:border-primary/40 hover:bg-card"
            asChild
          >
            <Link href="/projects">
              {t("projects_see_all")}
              <ArrowRight className="ml-2.5 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
