"use client";

import { motion } from "framer-motion";
import { School, Calendar, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// Example education data
const educations = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2018 - 2020",
    description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors and completed thesis on 'Neural Network Optimization Techniques for Real-time Applications'.",
    achievements: ["Dean's List (All Semesters)", "Best Graduate Research Award", "AI Research Scholarship"],
    logo: "/stanford-logo.png" // You'll need to add these logo images to your public folder
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "MIT",
    location: "Cambridge, MA",
    period: "2014 - 2018",
    description: "Focused on software architecture and development methodologies. Participated in multiple hackathons and coding competitions, consistently placing in the top percentiles.",
    achievements: ["Graduated Summa Cum Laude", "Innovation Award for Senior Project", "Coding Competition Winner (2017)"],
    logo: "/mit-logo.png"
  },
  {
    degree: "Professional Certification in UI/UX Design",
    institution: "Designlab",
    location: "Online",
    period: "2017",
    description: "Intensive 3-month certification focusing on user interface design principles, research methodologies, and prototyping techniques.",
    achievements: ["Outstanding Final Project Award"],
    logo: "/designlab-logo.png"
  }
];

export function EducationsSection() {
  return (
    <section id="education" className="py-24 bg-muted/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and continuous learning path that has shaped my professional skills.
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/10"></div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10"
          >
            {educations.map((edu, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className={`mb-12 md:mb-24 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline node */}
                <div className="hidden md:block absolute left-0 md:left-1/2 transform -translate-y-1/4 md:-translate-x-1/2 w-6 h-6 rounded-full border-2 border-primary bg-background shadow-glow"></div>
                
                {/* Timeline content */}
                <div className={`relative ml-6 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div 
                    className="relative p-6 bg-background border border-border/40 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="absolute -left-3 md:hidden top-8 w-6 h-6 rounded-full border-2 border-primary bg-background"></div>
                    
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                        <div className="flex items-center mt-1 text-muted-foreground">
                          <School className="h-4 w-4 mr-1" />
                          <span className="text-sm">{edu.institution}, {edu.location}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4 mt-1 bg-muted/30 p-2 rounded-md">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-xs block mt-1 text-center font-mono">{edu.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm my-4">{edu.description}</p>
                    
                    {edu.achievements.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-1 text-primary" /> Achievements
                        </h4>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="text-xs pl-6 relative before:absolute before:left-2 before:top-1.5 before:w-1 before:h-1 before:bg-primary before:rounded-full">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-border/40 flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        {/* You could add a credential verification link or similar here */}
                        {/* {edu.institution !== "Designlab" && "Student ID: #" + Math.floor(10000 + Math.random() * 90000)} */}
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs h-8 px-2" asChild>
                        <a href="#" className="flex items-center">
                          <span>View details</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                    
                    {/* Visual highlight effect */}
                    {/* <div className={`absolute ${index % 2 === 0 ? '-right-1 md:-right-3' : '-right-1 md:-left-3'} top-8 transform translate-x-1/2 md:translate-x-0 w-2 h-10 bg-primary/80 rounded-full blur-sm`}></div> */}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Button variant="outline" className="rounded-full text-sm">
            View All Certifications
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
