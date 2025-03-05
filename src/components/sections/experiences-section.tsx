"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronDown, MapPin, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ResumeDownloadButton } from "@/components/resume/resume-download-button";

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

// Example experience data
const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    period: "2020 - Present",
    description: "Leading development of next-generation search algorithms and infrastructure. Architected and implemented scalable backend systems serving millions of users.",
    responsibilities: [
      "Lead a team of 5 engineers working on search optimization",
      "Reduced query response time by 40% through innovative caching mechanisms",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored junior developers through code reviews and pair programming"
    ],
    skills: ["React", "Node.js", "Go", "Kubernetes", "TensorFlow", "GraphQL"],
    logo: "/google-logo.png"
  },
  {
    title: "Full Stack Developer",
    company: "Facebook",
    location: "Menlo Park, CA",
    type: "Full-time",
    period: "2018 - 2020",
    description: "Worked on the News Feed team to develop features that improved user engagement and content relevance. Collaborated with designers and product managers to create intuitive interfaces.",
    responsibilities: [
      "Developed key React components for the News Feed interface",
      "Created adaptive algorithms for content personalization",
      "Optimized database queries resulting in 30% performance improvement",
      "Participated in A/B testing and feature launch decision making"
    ],
    skills: ["React", "Redux", "PHP", "MySQL", "GraphQL", "Jest"],
    logo: "/facebook-logo.png"
  },
  {
    title: "Software Development Intern",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Internship",
    period: "Summer 2017",
    description: "Contributed to the development of internal tools for the fulfillment center operations team. Created dashboards and monitoring systems that improved operational efficiency.",
    responsibilities: [
      "Built real-time monitoring dashboard for fulfillment centers",
      "Implemented data visualization components with D3.js",
      "Developed REST APIs for internal service communication",
      "Presented project results to senior management team"
    ],
    skills: ["JavaScript", "Python", "AWS Lambda", "DynamoDB", "D3.js"],
    logo: "/amazon-logo.png"
  }
];

export function ExperiencesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A chronicle of my professional journey, showcasing the projects and teams I&apos;ve had the privilege to work with.
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
                className={`bg-background border border-border/40 rounded-xl overflow-hidden transition-all duration-300 ${expandedIndex === index ? "shadow-lg" : "shadow-sm hover:shadow-md"}`}
                whileHover={{ y: expandedIndex === index ? 0 : -5 }}
                layout
              >
                {/* Company and role header */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        {exp.title}
                        <Badge className="ml-2 text-xs font-normal">{exp.type}</Badge>
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {exp.company}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {exp.location}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.period}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`rounded-full transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}
                    onClick={() => toggleExpanded(index)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Brief description visible always */}
                <div className="px-6 sm:px-8 pb-4">
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </div>
                
                {/* Skills tags */}
                <div className="px-6 sm:px-8 pb-6 flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="bg-muted/30 hover:bg-muted transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                {/* Expanded content */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/40 px-6 sm:px-8 py-6"
                    >
                      <h4 className="text-md font-semibold mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2 text-primary" /> Key Responsibilities
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-sm pl-6 relative before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary/70 before:rounded-full">
                            {resp}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="text-xs rounded-full" asChild>
                          <a href="#" className="flex items-center">
                            <span>Company website</span>
                            <ExternalLink className="ml-1.5 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Visual flair - accent line */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-l-xl"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <ResumeDownloadButton className="rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
