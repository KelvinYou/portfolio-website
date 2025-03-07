'use client'

import React from 'react';
import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import { personalInfo, experiences, educations, skills, certifications } from "@/data";
import { styles } from './style';

// Format date for resume
const formatResumeDate = (dateString: string | undefined) => {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString);
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
};

// Create Resume Document
const ResumeDocument = () => (
  <Document title={`${personalInfo.name} - Resume`}>
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
            <Link src={personalInfo.contact.linkedin} style={styles.contactLink}>LinkedIn</Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={personalInfo.contact.github} style={styles.contactLink}>GitHub</Link>
          </View>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text>{personalInfo.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        
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
              {job.responsibilities.slice(0, 4).map((bullet, bulletIndex) => (
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
                <Text style={{ fontWeight: 'bold' }}>Technologies: </Text>
                {job.skills.join(', ')}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        
        {educations.map((edu, index) => (
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
                  <Text style={{ fontWeight: 'bold' }}>Coursework: </Text>
                  {edu.techStacks.join(', ')}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Skills */}
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

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        
        {certifications.map((cert, index) => (
          <View key={index} style={styles.certContainer}>
            <Text style={styles.certName}>{cert.name}</Text>
            <Text style={styles.certDetails}>
              {cert.issuingOrganization} • {formatResumeDate(cert.issueDate)}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;