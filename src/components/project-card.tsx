"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const fadeIn = fadeInWithDelay(index * 0.1);

  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-2 border-foreground dark:border-white/25 bg-card transition-all duration-150 h-full flex flex-col group card-hover-lift">
        <div className="relative h-52 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
          ) : (
            <div className="absolute inset-0 bg-muted group-hover:bg-muted/80 transition-colors duration-150 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <ImageIcon
                  className="w-12 h-12 opacity-40 group-hover:opacity-60 transition-opacity"
                  aria-label="Project placeholder"
                  width={48}
                  height={48}
                />
                <div className="text-sm font-medium text-muted-foreground/50">
                  Project Preview
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

          {/* Status badge with glow effect on hover */}
          {project.status && (
            <div className="absolute top-3 right-3 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1">
              <StatusBadge status={project.status} className="group-hover:shadow-glow" />
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="group-hover:text-primary transition-colors duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>

          {/* Animated tech stack tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {project.techStacks.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-muted border border-foreground dark:border-white/25 rounded-none transition-all duration-150"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {tech}
              </span>
            ))}
            {project.techStacks.length > 3 && (
              <span
                className="text-xs px-2 py-1 bg-muted/50 border border-foreground dark:border-white/25 rounded-none transition-all duration-150"
                style={{ transitionDelay: `150ms` }}
              >
                +{project.techStacks.length - 3}
              </span>
            )}
          </div>
        </CardHeader>

        <CardFooter className="pt-2 mt-auto flex-col gap-3">
          <div className="flex gap-3 w-full">
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                className="group/button transition-all duration-150 hover:border-primary"
                asChild
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-1 group-hover/button:rotate-[-8deg] transition-transform" />
                  <span>Code</span>
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                size="sm"
                className="group/button transition-all duration-300"
                asChild
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-1 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform" />
                  Demo
                </a>
              </Button>
            )}

            {/* Dialog trigger button */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-sm text-xs gap-1.5 hover:bg-muted/50 ml-auto"
                >
                  <span>Details</span>
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    {project.title}
                    {project.status && (
                      <StatusBadge status={project.status} className="ml-2" withHoverEffect={false} />
                    )}
                  </DialogTitle>
                  <DialogDescription className="text-base mt-2">
                    {project.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 grid gap-6">
                  {/* Created Date */}
                  {project.date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Created: {formatDate(project.date)}</span>
                    </div>
                  )}

                  {/* Project Image */}
                  {project.image && (
                    <div className="relative w-full h-48 overflow-hidden rounded-md">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Code className="h-4 w-4" /> Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStacks.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-background/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Related blog posts */}
                  {project.blogSlugs && project.blogSlugs.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> Related Articles
                      </h4>
                      <RelatedBlogLinks blogSlugs={project.blogSlugs} />
                    </div>
                  )}
                </div>

                <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" className="w-full sm:w-auto" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Demo
                      </a>
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
});
