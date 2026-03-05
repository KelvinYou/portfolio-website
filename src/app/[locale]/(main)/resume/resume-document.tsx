/* eslint-disable jsx-a11y/alt-text */
"use client";

import {
  educations,
  experiences,
  personalInfo,
  projects,
  skills,
} from "@/constants";
import {
  capitalizeFirstLetter,
  formatStartEndDate,
  getGitHubName,
  getLinkedInName,
  getPersonalWebsiteName,
} from "@/lib/utils";
import { Document, Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./style";

// Create Resume Document — single page
const ResumeDocument = () => (
  <Document
    title={`${personalInfo.name} - Resume`}
    author={personalInfo.name}
    keywords={Object.values(skills).flat().join(", ")}
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullname}</Text>
        <Text style={styles.title}>{personalInfo.title}</Text>

        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Image
              src={"/images/resume/email.png"}
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>{personalInfo.contact.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Image
              src={"/images/resume/phone.png"}
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>{personalInfo.contact.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Image
              src={"/images/resume/location.png"}
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>
              {personalInfo.contact.location}
            </Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Image
              src={"/images/resume/linkedin.png"}
              style={styles.contactIcon}
            />
            <Link
              src={personalInfo.contact.linkedin}
              style={styles.contactLink}
            >
              LinkedIn: {getLinkedInName(personalInfo.contact.linkedin)}
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Image
              src={"/images/resume/github.png"}
              style={styles.contactIcon}
            />
            <Link src={personalInfo.contact.github} style={styles.contactLink}>
              GitHub: {getGitHubName(personalInfo.contact.github)}
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Image
              src={"/images/resume/person.png"}
              style={styles.contactIcon}
            />
            <Link
              src={personalInfo.contact.personalWebsite}
              style={styles.contactLink}
            >
              Portfolio:{" "}
              {getPersonalWebsiteName(personalInfo.contact.personalWebsite)}
            </Link>
          </View>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summaryText}>{personalInfo.summary}</Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>

        <View>
          {Object.entries(skills).map(([category, skillList]) => (
            <View key={category} style={styles.skillContainer}>
              <Text style={styles.skillTitle}>
                {capitalizeFirstLetter(category)}:
              </Text>
              <Text style={styles.skillItem}>{skillList.join(", ")}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Experience — show top 3 roles (skip oldest internship) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>

        {experiences.slice(0, 3).map((job, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Link src={job.companyUrl}>
                <Text style={styles.itemCompany}>{job.company}</Text>
              </Link>
              <Text style={styles.itemDate}>
                {formatStartEndDate(job.startDate, job.endDate)}
              </Text>
            </View>

            <Text style={styles.itemTitle}>{job.title}</Text>
            <Text style={styles.itemLocation}>
              {job.location} • {job.type}
            </Text>

            <View style={styles.bulletList}>
              {job.responsibilities.slice(0, 3).map((bullet, bulletIndex) => (
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
                <Text style={{ fontWeight: "bold" }}>Tech Stack: </Text>
                {job.skills.join(", ")}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Projects — top 2 only */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notable Projects</Text>

        {projects.slice(0, 2).map((project, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemCompany}>{project.title}</Text>
              <Text style={styles.itemDate}>{project.status}</Text>
            </View>

            <Text style={styles.bulletText}>{project.description}</Text>

            {/* Technologies as inline tags */}
            <View style={styles.projectTech}>
              {project.techStacks.map((tech, techIndex) => (
                <Text key={techIndex} style={styles.projectTechItem}>
                  {tech}
                </Text>
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
                {formatStartEndDate(edu.startDate, edu.endDate)}
              </Text>
            </View>

            <Text style={styles.itemTitle}>{edu.degree}</Text>
            <Text style={styles.itemLocation}>
              {edu.location} • CGPA: {edu.cgpa}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export { ResumeDocument };
