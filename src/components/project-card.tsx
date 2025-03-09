"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export type ProjectCardProps = {
  title: string;
  description: string;
  image?: string;
  github?: string;
  demo?: string;
  techStacks: string[];
  status: string;
  date: string;
};

export function ProjectCard({ project, index = 0 }: { project: ProjectCardProps, index?: number }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      } 
    }
  };
  
  return (
    <motion.div 
      variants={fadeIn}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border border-border/40 bg-muted/10 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
        <div className="relative h-52 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 group-hover:from-primary/10 group-hover:to-secondary/20 transition-colors duration-500 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <ImageIcon className="w-12 h-12 opacity-40 group-hover:opacity-60 transition-opacity" aria-label="Project placeholder" width={48} height={48} />
                <div className="text-sm font-medium text-muted-foreground/50">Project Preview</div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          
          {/* Status badge with glow effect on hover */}
          <div className="absolute top-3 right-3 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1">
            <span className={`px-2 py-1 text-xs rounded-full backdrop-blur-sm group-hover:shadow-glow ${
              project.status === 'Completed' ? 'bg-green-500/20 text-green-500 group-hover:bg-green-500/30' :
              project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500 group-hover:bg-blue-500/30' :
              project.status === 'Maintaining' ? 'bg-purple-500/20 text-purple-500 group-hover:bg-purple-500/30' :
              'bg-gray-500/20 text-gray-500 group-hover:bg-gray-500/30'
            }`}>
              {project.status}
            </span>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
          
          {/* Animated tech stack tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {project.techStacks.slice(0, 3).map((tech, i) => (
              <span 
                key={i} 
                className="text-xs px-2 py-1 bg-muted/30 rounded-md transition-all duration-300 group-hover:translate-y-[-2px] group-hover:bg-muted/50"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {tech}
              </span>
            ))}
            {project.techStacks.length > 3 && (
              <span 
                className="text-xs px-2 py-1 bg-muted/20 rounded-md transition-all duration-300 group-hover:translate-y-[-2px]"
                style={{ transitionDelay: `150ms` }}
              >
                +{project.techStacks.length - 3}
              </span>
            )}
          </div>
        </CardHeader>
        
        <CardFooter className="pt-2 mt-auto">
          <div className="flex gap-3">
            {project.github && (
              <Button 
                variant="outline" 
                size="sm" 
                className="group/button transition-all duration-300 hover:border-primary/50" 
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1 group-hover/button:rotate-[-8deg] transition-transform" /> 
                  <span className="relative">
                    Code
                    <span className="absolute inset-x-0 bottom-0 h-[1px] bg-primary/0 group-hover/button:bg-primary/50 transform scale-x-0 group-hover/button:scale-x-100 transition-transform origin-left duration-300"></span>
                  </span>
                </a>
              </Button>
            )}
            {project.demo && (
              <Button 
                size="sm" 
                className="group/button transition-all duration-300" 
                asChild
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform" /> 
                  Demo
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 