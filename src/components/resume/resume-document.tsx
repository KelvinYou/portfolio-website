'use client'

import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font 
} from '@react-pdf/renderer';
import { resumeData } from "@/data";

Font.register({
  family: 'Quicksand',
  fonts: [
    { src: '/assets/fonts/quicksand-v20-latin-regular.ttf' }, // Regular
    { src: '/assets/fonts/quicksand-v20-latin-300.ttf', fontWeight: 300 }, // Light
    { src: '/assets/fonts/quicksand-v20-latin-600.ttf', fontWeight: 600 }, // Semi-bold
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Quicksand',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#333',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#555',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 15,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  companyName: {
    fontWeight: 'bold',
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
    color: '#555',
  },
  location: {
    fontSize: 10,
    color: '#555',
    marginBottom: 5,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 3,
  },
  bulletContent: {
    flexDirection: 'row',
  },
  bulletDot: {
    width: 10,
  },
  educationItem: {
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    padding: '3 8',
    margin: 3,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    fontSize: 10,
  },
});

// Create Resume Document
const ResumeDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{resumeData.name}</Text>
        <Text style={styles.title}>{resumeData.title}</Text>
        <View style={styles.contactInfo}>
          <Text>{resumeData.contact.email}</Text>
          <Text>{resumeData.contact.phone}</Text>
          <Text>{resumeData.contact.location}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text>{resumeData.contact.linkedin}</Text>
          <Text>{resumeData.contact.github}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text>{resumeData.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        
        {resumeData.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.companyHeader}>
              <Text style={styles.companyName}>{job.company}</Text>
              <Text style={styles.date}>{job.dates}</Text>
            </View>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.location}>{job.location}</Text>
            
            {job.bullets.map((bullet, bulletIndex) => (
              <View key={bulletIndex} style={styles.bullet}>
                <View style={styles.bulletContent}>
                  <Text style={styles.bulletDot}>• </Text>
                  <Text>{bullet}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        
        {resumeData.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <View style={styles.companyHeader}>
              <Text style={styles.companyName}>{edu.institution}</Text>
              <Text style={styles.date}>{edu.dates}</Text>
            </View>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            <Text style={styles.location}>{edu.location} | GPA: {edu.gpa}</Text>
          </View>
        ))}
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        
        {resumeData.certifications.map((cert, index) => (
          <View key={index} style={styles.bullet}>
            <View style={styles.bulletContent}>
              <Text style={styles.bulletDot}>• </Text>
              <Text>{cert.name} - {cert.issuer} ({cert.date})</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {resumeData.skills.map((skill, index) => (
            <Text key={index} style={styles.skillItem}>{skill}</Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;