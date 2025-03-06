"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, ExternalLink, User, Building, Calendar, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data";
import Image from "next/image";

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="mb-8"
            >
              <motion.div 
                className="group relative border border-border/40 rounded-xl overflow-hidden transition-all duration-300 bg-background/80 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1"
              >
                {/* Card header with company info */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/10">
                  <div className="flex items-center gap-4 w-full">
                    {/* Company logo/image */}
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-muted/40 border border-border/30 flex items-center justify-center shadow-sm">
                      {exp.logo ? (
                        <Image src={exp.logo} alt={exp.company} width={40} height={40} className="object-contain" />
                      ) : (
                        <Building className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    
                    {/* Company and role details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                        <h3 className="text-xl font-bold leading-tight">{exp.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-muted/20 text-xs capitalize">
                            {exp.type}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <span className="font-medium text-sm">{exp.company}</span>
                        <span>•</span>
                        <div className="flex items-center text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Brief description */}
                <div className="px-6 py-4">
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </div>
                
                {/* Skills tags with modern styling */}
                <div className="px-6 pb-5 flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary" 
                      className="bg-background border border-border/40 text-xs px-2.5 py-0.5 rounded-md"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                {/* Expansion control */}
                <div className="px-6 py-3 border-t border-border/10 flex justify-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="rounded-full text-xs gap-1.5 hover:bg-muted/50"
                    onClick={() => toggleExpanded(index)}
                  >
                    <span>{expandedIndex === index ? "Show less" : "Show more"}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`} />
                  </Button>
                </div>
                
                {/* Expanded content with clean styling */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: 1, 
                        height: "auto", 
                        transition: { 
                          height: { duration: 0.4, ease: "easeInOut" },
                          opacity: { duration: 0.3, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        height: 0,
                        transition: { 
                          height: { duration: 0.3, ease: "easeInOut" },
                          opacity: { duration: 0.2 }
                        }
                      }}
                      className="border-t border-border/20 px-6 overflow-hidden bg-muted/5"
                    >
                      <div className="py-6">
                        <h4 className="text-md font-semibold mb-4 flex items-center">
                          <User className="h-4 w-4 mr-2 text-primary" /> Key Responsibilities
                        </h4>
                        
                        <ul className="grid gap-3 mb-6">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-sm flex items-start">
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/30 mt-1.5 mr-3"></span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4 border-t border-border/10">
                          <Button variant="outline" size="sm" className="text-xs rounded-full group w-fit" asChild>
                            <a href="#" className="flex items-center gap-1.5">
                              <LinkIcon className="h-3 w-3" />
                              <span>Company website</span>
                              <ExternalLink className="ml-0.5 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Accent element - subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Beyond these roles, I&apos;ve contributed to various open-source projects and built personal applications
            that have further enhanced my technical expertise.
          </p>
          <Button variant="outline" className="rounded-full text-sm px-6 group" asChild>
            <a href="/resume">
              <span>View Full Resume</span>
              <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
