"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { fadeInWithDelay } from "@/lib/animations";
import { Project } from "@/types";
import { motion } from "framer-motion";
import {
  Calendar,
  Code,
  ExternalLink,
  Github,
  ImageIcon,
  Info,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { RelatedBlogLinks } from "./blog/related-blog-links";
import { StatusBadge } from "./ui/status-badge";

export const ProjectCard = React.memo(function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const fadeIn = fadeInWithDelay(index * 0.08);

  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/28 hover:shadow-[0_0_0_1px_rgba(0,240,255,0.07),0_16px_48px_rgba(0,0,0,0.18)]">
        {/* Top edge accent on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Image area */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/60">
              <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
              <span className="mt-2 text-xs text-muted-foreground/40 font-medium">Project Preview</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/20 to-transparent" />

          {/* Status badge */}
          {project.status && (
            <div className="absolute top-3 right-3">
              <StatusBadge status={project.status} className="transition-transform duration-300 group-hover:scale-105" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3
            className="mb-2 font-heading text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary"
            style={{ letterSpacing: "-0.01em" }}
          >
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.techStacks.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStacks.length > 3 && (
              <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                +{project.techStacks.length - 3}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-border text-xs transition-all duration-200 hover:border-primary/40 hover:text-primary"
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5 mr-1.5" />
                  Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                size="sm"
                className="rounded-xl text-xs btn-bold-hover"
                asChild
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Demo
                </a>
              </Button>
            )}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto rounded-xl text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Info className="h-3.5 w-3.5" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] md:max-w-[600px] rounded-2xl border-border">
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    {project.title}
                    {project.status && <StatusBadge status={project.status} withHoverEffect={false} />}
                  </DialogTitle>
                  <DialogDescription className="text-base mt-2 leading-relaxed">
                    {project.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 grid gap-5">
                  {project.date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Created: {formatDate(project.date)}</span>
                    </div>
                  )}

                  {project.image && (
                    <div className="relative w-full h-48 overflow-hidden rounded-xl border border-border">
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <Code className="h-4 w-4" /> Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStacks.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.blogSlugs && project.blogSlugs.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> Related Articles
                      </h4>
                      <RelatedBlogLinks blogSlugs={project.blogSlugs} />
                    </div>
                  )}
                </div>

                <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
                  {project.github && (
                    <Button variant="outline" size="sm" className="w-full sm:w-auto rounded-xl" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <Github className="h-4 w-4 mr-2" /> View Source Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" className="w-full sm:w-auto rounded-xl" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 mr-2" /> View Demo
                      </a>
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
