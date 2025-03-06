"use client";

import { resumeData } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, GraduationCap, Award, User } from "lucide-react";

export function ResumeView() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="text-center md:text-left md:flex items-start justify-between border-b border-border/40 pb-8">
        <div>
          <h2 className="text-3xl font-bold mb-1">{resumeData.name}</h2>
          <p className="text-xl text-muted-foreground mb-4">{resumeData.title}</p>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-muted-foreground">
            <a href={`mailto:${resumeData.contact.email}`} className="hover:text-primary">
              {resumeData.contact.email}
            </a>
            <span>{resumeData.contact.phone}</span>
            <span>{resumeData.contact.location}</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-muted-foreground mt-1">
            <a 
              href={`https://${resumeData.contact.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {resumeData.contact.linkedin}
            </a>
            <a 
              href={`https://${resumeData.contact.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {resumeData.contact.github}
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="h-24 w-24 rounded-full border-4 border-primary/20 overflow-hidden relative bg-muted/30">
            {/* <Image 
              src="/your-photo.jpg" 
              alt={resumeData.name}
              fill
              className="object-cover"
            /> */}
          </div>
        </div>
      </section>

      {/* Summary */}
      <section>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-border/40 pb-2">
          <User className="h-5 w-5 text-primary" />
          Summary
        </h3>
        <p className="text-muted-foreground">
          {resumeData.summary}
        </p>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-border/40 pb-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Professional Experience
        </h3>
        
        <div className="space-y-8">
          {resumeData.experience.map((job, index) => (
            <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/30">
              <div className="absolute left-0 top-1 h-2 w-2 rounded-full bg-primary transform -translate-x-[3px]"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">{job.title}</h4>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {job.dates}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-3 text-sm">
                <span className="font-medium">{job.company}</span>
                <span className="text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {job.location}
                </span>
              </div>
              
              <ul className="mt-3 space-y-2">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-muted-foreground pl-5 relative before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:bg-primary/50 before:rounded-full">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-border/40 pb-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education
        </h3>
        
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/30">
              <div className="absolute left-0 top-1 h-2 w-2 rounded-full bg-primary transform -translate-x-[3px]"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">{edu.degree}</h4>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {edu.dates}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                <span className="font-medium">{edu.institution}</span>
                <span className="text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {edu.location}
                </span>
                <span className="text-muted-foreground">
                  GPA: {edu.gpa}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Certifications */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills */}
        <section>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-border/40 pb-2">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-muted/30">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-border/40 pb-2">
            <Award className="h-5 w-5 text-primary" />
            Certifications
          </h3>
          <div className="space-y-3">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{cert.name}</span>
                <div className="text-sm text-muted-foreground">
                  {cert.issuer} | {cert.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 