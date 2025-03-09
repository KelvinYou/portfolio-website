'use client'

import React from 'react';
import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import { personalInfo, experiences, educations, skills, certifications, projects } from "@/data";
import { styles } from './style';

// Format date for resume
const formatResumeDate = (dateString: string | undefined) => {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString);
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
};

// Create Resume Document
const ResumeDocument = () => (
  <Document title={`${personalInfo.name} - Resume`} author={personalInfo.name} keywords={Object.values(skills).flat().join(', ')}>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.name}</Text>
        <Text style={styles.title}>{personalInfo.title}</Text>
        
        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{personalInfo.contact.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{personalInfo.contact.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{personalInfo.contact.location}</Text>
          </View>
        </View>
        
        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Link src={personalInfo.contact.linkedin} style={styles.contactLink}>LinkedIn: kelvinyou2001</Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={personalInfo.contact.github} style={styles.contactLink}>GitHub: KelvinYou</Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={personalInfo.contact.personalWebsite} style={styles.contactLink}>Portfolio: kelvinyou.netlify.app</Link>
          </View>
        </View>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        
        {experiences.slice(0, 3).map((job, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemCompany}>{job.company}</Text>
              <Text style={styles.itemDate}>
                {formatResumeDate(job.startDate)} - {formatResumeDate(job.endDate)}
              </Text>
            </View>
            
            <Text style={styles.itemTitle}>{job.title}</Text>
            <Text style={styles.itemLocation}>{job.location} • {job.type}</Text>
            
            <View style={styles.bulletList}>
              {job.responsibilities.map((bullet, bulletIndex) => (
                <View key={bulletIndex} style={styles.bulletItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
            
            {/* Technologies used */}
            <View style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>Skills utilized: </Text>
                {job.skills.join(', ')}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Skills - Moved up for better ATS scanning */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        
        <View style={styles.skillsContainer}>
          {Object.entries(skills).map(([category, skillList]) => (
            <View key={category} style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              
              {skillList.map((skill, skillIndex) => (
                <Text key={skillIndex} style={styles.skillItem}>
                  • {skill}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notable Projects</Text>
        
        {projects.slice(0, 3).map((project, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemCompany}>{project.title}</Text>
              <Text style={styles.itemDate}>{project.status} • {formatResumeDate(project.date)}</Text>
            </View>
            
            <Text style={styles.bulletText}>{project.description}</Text>
            
            {/* Links section with better styling */}
            <View style={styles.projectLinks}>
              {project.github && (
                <Link src={project.github} style={styles.projectLink}>
                  GitHub Repository
                </Link>
              )}
              
              {project.demo && (
                <Link src={project.demo} style={styles.projectLink}>
                  Live Demo
                </Link>
              )}
            </View>
            
            {/* Technologies as tags */}
            <View style={styles.projectTech}>
              {project.techStacks.map((tech, techIndex) => (
                <Text key={techIndex} style={styles.projectTechItem}>{tech}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        
        {educations.slice(0, 1).map((edu, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemCompany}>{edu.institution}</Text>
              <Text style={styles.itemDate}>
                {formatResumeDate(edu.startDate)} - {formatResumeDate(edu.endDate)}
              </Text>
            </View>
            
            <Text style={styles.itemTitle}>{edu.degree}</Text>
            <Text style={styles.itemLocation}>{edu.location} • CGPA: {edu.cgpa}</Text>
            
            {edu.techStacks && (
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  <Text style={{ fontWeight: 'bold' }}>Relevant coursework: </Text>
                  {edu.techStacks.join(', ')}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Certifications */}
      <View style={{ ...styles.section, marginTop: 30 }}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {certifications.sort((a, b) => b.issueDate.localeCompare(a.issueDate)).map((cert, index) => (
            <Link key={index} src={cert.link} style={{ ...styles.certContainer, width: '50%' }}>
              <Text style={styles.certName}>{cert.name}</Text>
              <Text style={styles.certDetails}>
                {cert.issuingOrganization} • {formatResumeDate(cert.issueDate)}
              </Text>
            </Link>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;