"use client";

import React from 'react'
import * as ReactPDF from '@/components/PdfRenderer';
import { styles } from './styles';
import { calculateDurationString, formatDate } from '@/utils/dateUtils';
import dayjs from 'dayjs';
import { capitalizeFirstLetter } from '@/utils/textUtils';
import { fetchResumeData } from './hooks';

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

type SectionType = {
  title: string;
  isLeft?: boolean;
  children?: React.ReactNode;
  style?: ReactPDF.Style;
}

const Section = ({title, isLeft = false, children, style}: SectionType) => {

  return (
    <View style={[
      { marginBottom: '10px' }, 
      {...(style)}
    ]}>
      <Text style={[styles.title, 
        { color: isLeft ? "grey": "grey" }]}>
        {title}
      </Text>
      <View
        style={[styles.separator]}
      />
      {children}
    </View>
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
          <View key={index} style={[styles.scoreItem, {backgroundColor: "grey"}]} />
          : 
          <View key={index} style={[styles.scoreItem, {backgroundColor: "lightgrey"}]} />
        ))}
      </View>
    </View>
  )
}

type ExperienceContentType = {
  title: string;
  industryName: string;
  industryUrl?: string;
  points: {
    highlightedTexts?: string[],
    value: string,
  }[];
  cgpa?: string;
  startDate: string;
  endDate: string | null;
}

const ExperienceContent = ({ 
  title,
  industryName,
  industryUrl,
  points,
  cgpa,
  startDate,
  endDate
}: ExperienceContentType) => {
  const startFormatted = formatDate(startDate);
  const endFormatted = endDate ? formatDate(endDate) : 'Present';
  
  const dateRange = `${startFormatted} - ${endFormatted}`;

  const duration = calculateDurationString(startDate, endDate || dayjs(Date.now()).format('YYYY-MM-DD'));

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.workRole}>{title}</Text>

      <View style={styles.workSecondRow}>
        {industryUrl ?
          <Link style={[styles.workCompanyName, { textDecoration: "underline" }]} src={industryUrl}>
            <Text>
              {industryName}
            </Text>
          </Link>
          :
          <Text style={styles.workCompanyName}>
            {industryName}
          </Text>
        }
        <Text style={styles.workDuration}>{dateRange} {`• ${duration}`}</Text>
      </View>

      {cgpa && 
        <Text style={styles.educationCgpa}>
          CGPA: {cgpa}
        </Text>
      }

      {points.map((point, index) => (
        <View key={index} style={styles.pointsWrapper}>
          <Text style={styles.pointsDot}>•</Text>
          <Text style={styles.workDescription}>
            {point.value}
          </Text>
        </View>

      ))}
    </View>
  )
}

const ResumePdfNew: React.FC = () => {
  const resumeData = fetchResumeData();

  return (
    <Document title={`${resumeData.nickname} | ${resumeData.title}`}>
      <Page size="A4">
        <View style={styles.headerWrapper}>
          <Text style={styles.fullName}>{resumeData.fullName}</Text>
          <Text style={styles.role}>{resumeData.title}</Text>

          <View style={styles.contactListWrapper}>
            <ContactBar iconSrc='assets/images/resume/new/phone.png' value={resumeData.phone} />
            <ContactBar iconSrc='assets/images/resume/new/email.png' value={resumeData.email} />
            <ContactBar iconSrc='assets/images/resume/new/person.png' value={resumeData.portfolio} />
            <ContactBar iconSrc='assets/images/resume/new/linkedin.png' value={resumeData.linkedin} />
            <ContactBar iconSrc='assets/images/resume/new/github.png' value={resumeData.github} />
            <ContactBar iconSrc='assets/images/resume/new/location.png' value={resumeData.location} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.leftColumn}>
            {/* <Section title={'Summary'}>
              <Text style={styles.summary}>
                {resumeData.summary}
              </Text>
            </Section> */}
            <Section title={'Skills'}>
              <View>
                {Object.entries(resumeData.skills).map(([category, items]) => (
                  <View key={category} style={styles.skillsWrapper}>
                    <Text style={styles.skillTitle}>
                      {capitalizeFirstLetter(category)}:
                    </Text>
                    <Text style={styles.skillItem}>
                      {items.join(', ')}
                    </Text>
                  </View>
                ))}
              </View>
            </Section>
            <Section title={'Work Experiences'}>
              {resumeData.workExperiences.map((workExp, index) => {

                return (
                  <ExperienceContent
                    key={index + workExp.startDate}
                    title={workExp.title}
                    industryName={workExp.companyName}
                    industryUrl={workExp.companyUrl}
                    points={workExp.points}
                    startDate={workExp.startDate}
                    endDate={workExp.endDate}
                  />
                )
              })}
            </Section>

            <Section title={'Educations'} style={{ marginTop: 45 }}>
              {resumeData.educations.map((education, index) => {

                return (
                  <ExperienceContent
                    key={index + education.startDate}
                    title={education.title}
                    industryName={education.universityName}
                    industryUrl={education.universityUrl}
                    points={education.points}
                    cgpa={education.cgpa}
                    startDate={education.startDate}
                    endDate={education.endDate}
                  />
                )
              })}
            </Section>

            <Section title={'Projects'}>
              {resumeData.projects.slice(0, 3).map((project, index) => {
                return (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Text style={styles.workRole}>{project.name}</Text>


                        {project.sourceCodeLink && 
                          <Link src={project.sourceCodeLink}>
                            <Image src='assets/images/resume/new/github.png' style={styles.projectIcon}/>
                          </Link>
                        }

                        {project.liveSiteLink && 
                          <Link src={project.liveSiteLink}>
                            <Image src='assets/images/resume/new/eye.png' style={styles.projectIcon}/>
                          </Link>
                        }
                        
                      </View>

                      <Text style={styles.workCompanyName}>{formatDate(project.date)}</Text>
                    </View>

                    {project.points.map((point, index) => {
                      return (
                        <View key={index} style={styles.pointsWrapper}>
                          <Text style={styles.pointsDot}>•</Text>
                          <Text style={styles.workDescription}>
                            {point.value}
                          </Text>
                        </View>
                      )
                    })}


                    <View style={styles.tagWrapper}>
                      {project.tags.map((tag, index) => {
                        return (
                          <Text key={index} style={styles.tag}>
                            {tag.name}
                          </Text>
                        )
                      })}
                    </View>
                  </View>
                )
              })}
            </Section>

            <View style={{
              display: 'flex',
              flexDirection: 'row',

            }}>
              <Section title={'Languages'}  style={{ width: '30%' }}>
                <View style={{ width: '100%' }}>
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

              <Section title={'Certifications'} style={{ width: '70%', paddingLeft: 20 }}>
                {resumeData.certifications.map((cert, index) => {
                  return (
                    <Link key={index} src={cert.link} style={{ textDecoration: 'none' }}>
                      <View style={styles.certificationWrapper}>
                        <Text style={styles.certificationTitle}>{cert.name}</Text>
                        <View style={{ 
                          display: 'flex', 
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                          <Text>{cert.issuingOrganization}</Text>
                          <Text>{formatDate(cert.issueDate)}</Text>
                        </View>
                      </View>
                    </Link>

                  )
                })}
              </Section>
            </View>



            <Section title={'More Info'}>
              <Text style={styles.moreInfoText}>{resumeData.portfolio}</Text>
              <Image src="assets/images/resume/new/personal-website-qr.png" style={styles.moreInfoQr} />
            </Section>
          </View>

        </View>
        

      </Page>
    </Document>
  )
}

export default ResumePdfNew