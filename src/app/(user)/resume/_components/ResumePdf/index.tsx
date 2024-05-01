"use client";

import React from 'react'
import * as ReactPDF from '@/components/PdfRenderer';
import { styles } from './styles';
import { getResumeData } from '@/services/resumeService';
import { formatDate } from '@/utils/dateUtils';

const {
  G,
  Svg,
  View,
  Text,
  Link,
  Page,
  Note,
  Path,
  Rect,
  Line,
  Stop,
  Defs,
  Image,
  Tspan,
  Canvas,
  Circle,
  Ellipse,
  Polygon,
  Document,
  Polyline,
  ClipPath,
  LinearGradient,
  RadialGradient,
  StyleSheet,
  PdfViewer,
  PdfDownloader
} = ReactPDF;

interface DateComponents {
  year: number;
  month: number;
  day: number;
}

const parseDateComponents = (inputDate: string): DateComponents | null => {
  const [year, month, day] = inputDate.split('-').map(Number);

  // Check if the date components are valid
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  return { year, month, day };
};

const DateRange = ({startAt, endAt}: {startAt: string, endAt?: string | null}) => {
  
  const startFormatted = formatDate(startAt);
  const endFormatted = endAt ? formatDate(endAt) : 'Present';
  
  const dateRange = `${startFormatted} - ${endFormatted}`;

  return (
    <Text style={styles.workDuration}>({dateRange})</Text>
  )
}

const Section = ({title, isLeft = false, children}: {title: string, isLeft?: boolean, children: React.ReactNode}) => {
  return (
    <>
      <Text style={[styles.title, 
        { color: isLeft ? "grey": "grey" }]}>
        {title}
      </Text>
      <View
        style={[styles.separator]}
      />
      {children}
    </>
  )
}

const ContactBar = ({iconSrc, value}: {iconSrc: string, value: string}) => {
  return (
    <View style={styles.contactContainer}>
      <View style={[styles.contactCenter, { marginRight: 5 }]}>
        <Image src={iconSrc} style={styles.icon} />
      </View>
      <View style={styles.contactCenter}>
        <Text style={[styles.contactText, { flexWrap: 'wrap' }]}>{value}</Text>
      </View>
    </View>
  )
}

const ScoreBar = ({name, score}: {name: string, score: number}) => {
  return (
    <View style={styles.scoreContainer}>
      <View style={styles.scoreNameContainer}>
        <Text style={styles.scoreName}>{name}</Text>

      </View>
      <View style={styles.scoreView}>
        {Array.from({ length: 5 }).map((_, index) => (
          index <= score - 1? 
          <View key={index} style={[styles.scoreItem, {backgroundColor: "lightgrey"}]} />
          : 
          <View key={index} style={[styles.scoreItem, {backgroundColor: "grey"}]} />
        ))}
      </View>
    </View>
  )
}

const ResumePdf: React.FC = () => {
  const resumeData = getResumeData();

  return (
    <Document title={`${resumeData.nickname} | ${resumeData.title}`}>
      <Page size="A4">
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <View 
              style={{ height: 78 }}
            />
            <Section title={'Contact'}>
              <ContactBar iconSrc='assets/images/resume/location.png' value={resumeData.location} />
              <ContactBar iconSrc='assets/images/resume/phone.png' value={resumeData.phone} />
              <ContactBar iconSrc='assets/images/resume/mail.png' value={resumeData.email} />
              <ContactBar iconSrc='assets/images/resume/person.png' value={resumeData.portfolio} />
            </Section>

            <Section title={'Skills'}>
              <View style={styles.skillsWrapper}>
                {resumeData.allSkills.map((skill, index) => {
                  return (
                    <Text key={index} style={styles.skills}>
                      {skill}
                    </Text>
                  )
                })}
              </View>
            </Section>

            <Section title={'Languages'}>
              <View style={styles.skillsWrapper}>
                {resumeData.languages.map((language, index) => {
                  const score = (language.speak + language.readAndWrite) / 2 * 5;

                  return (
                    <ScoreBar 
                      key={index + language.name}
                      name={language.name} 
                      score={score}
                    />
                  )
                })}
              </View>
            </Section>
          </View>


          <View style={styles.rightColumn}>
            <Text style={styles.fullName}>{resumeData.fullName}</Text>
            <Text style={styles.role}>{resumeData.title}</Text>

            <Section title={'Work Experiences'}>
              {resumeData.workExperiences.map((workExp, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.workRole}>{workExp.title}</Text>

                  <View style={styles.workSecondRow}>
                    {workExp.companyUrl ?
                      <Link style={styles.workCompanyName} src={workExp.companyUrl}>
                        <Text style={styles.workCompanyName}>
                          {workExp.companyName}
                        </Text>
                      </Link>
                      :
                      <Text style={styles.workCompanyName}>
                        {workExp.companyName}
                      </Text>
                    }
                    <DateRange startAt={workExp.startDate} endAt={workExp.endDate} />
                  </View>
                  
                  {workExp.points.slice(0, 2).map((point, index) => (
                    <View key={index} style={styles.pointsWrapper}>
                      <Text style={styles.pointsDot}>•</Text>
                      <Text style={styles.workDescription}>
                        {point.value}
                      </Text>
                    </View>

                  ))}
                  
                </View>
              ))}
            </Section>

            <Section title={'Educations'}>
              {resumeData.educations.map((education, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.workRole}>{education.title}</Text>

                  {education.universityUrl ?
                    <Link style={styles.workCompanyName} src={education.universityUrl}>
                      <Text style={styles.workCompanyName}>
                        {education.universityName}
                      </Text>
                    </Link>
                    :
                    <Text style={styles.workCompanyName}>
                      {education.universityName}
                    </Text>
                  }
                    
                  <DateRange startAt={education.startDate} endAt={education.endDate} />

                  {education.cgpa && 
                    <Text style={styles.workCompanyName}>
                      CGPA: {education.cgpa}
                    </Text>
                  }

                  {education.points.slice(0, 2).map((point, index) => (
                    <View key={index} style={styles.pointsWrapper}>
                      <Text style={styles.pointsDot}>•</Text>
                      <Text style={styles.workDescription}>
                        {point.value}
                      </Text>
                    </View>
                  ))}
                  <Text style={styles.workDescription}>{education.description}</Text>
                </View>
              ))}
            </Section>

            {/* <Section title={'Co-curricular Activities'}>
            {resumeData.coCurricular.map((cocuricular, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.workRole}>{cocuricular.title}</Text>
                    {cocuricular.schoolUrl ?
                    <Link style={styles.workCompanyName} src={cocuricular.schoolUrl}>
                      <Text style={styles.workCompanyName}>
                        {cocuricular.school}
                      </Text>
                    </Link>
                    :
                    <Text style={styles.workCompanyName}>
                      {cocuricular.school}
                    </Text>
                  }

                  <DateRange startAt={cocuricular.startDate} endAt={cocuricular.endDate} />
                  
                  <View style={styles.pointsWrapper}>
                    <Text style={styles.pointsDot}>•</Text>
                    <Text style={styles.workDescription}>
                      {cocuricular.description}
                    </Text>
                  </View>
                </View>
              ))}
            </Section> */}
          </View>
        </View>
        

      </Page>
    </Document>
  )
}

export default ResumePdf