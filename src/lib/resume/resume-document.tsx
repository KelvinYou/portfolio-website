import { Link, Document, Page, Text, View } from "@react-pdf/renderer";
import {
  formatStartEndDate,
  getGitHubName,
  getLinkedInName,
  getPersonalWebsiteName,
} from "@/lib/utils";
import { resumeProfile } from "./resume-profile";
import { styles } from "./style";

const ResumeDocument = () => {
  const { personalInfo } = resumeProfile;

  return (
    <Document
      title={`${personalInfo.name} - Resume`}
      author={personalInfo.name}
      keywords={resumeProfile.skillGroups
        .flatMap(({ items }) => items)
        .join(", ")}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{personalInfo.fullname}</Text>
          <Text style={styles.title}>{resumeProfile.title}</Text>

          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email: </Text>
              <Link
                src={`mailto:${personalInfo.contact.email}`}
                style={styles.contactLink}
              >
                {personalInfo.contact.email}
              </Link>
            </Text>
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone: </Text>
              <Link
                src={`tel:${personalInfo.contact.phone}`}
                style={styles.contactLink}
              >
                {personalInfo.contact.phone}
              </Link>
            </Text>
            <Text style={[styles.contactItem, styles.contactText]}>
              <Text style={styles.contactLabel}>Location: </Text>
              {personalInfo.contact.location}
            </Text>
          </View>

          <View style={styles.contactRow}>
            <Link
              src={personalInfo.contact.linkedin}
              style={[styles.contactItem, styles.contactLink]}
            >
              LinkedIn: {getLinkedInName(personalInfo.contact.linkedin)}
            </Link>
            <Link
              src={personalInfo.contact.github}
              style={[styles.contactItem, styles.contactLink]}
            >
              GitHub: {getGitHubName(personalInfo.contact.github)}
            </Link>
            <Link
              src={personalInfo.contact.personalWebsite}
              style={[styles.contactItem, styles.contactLink]}
            >
              Portfolio:{" "}
              {getPersonalWebsiteName(personalInfo.contact.personalWebsite)}
            </Link>
          </View>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{personalInfo.summary}</Text>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          {resumeProfile.skillGroups.map(({ label, items }) => (
            <View key={label} style={styles.skillContainer}>
              <Text style={styles.skillTitle}>{label}:</Text>
              <Text style={styles.skillItem}>{items.join(", ")}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {resumeProfile.experiences.map((job) => (
            <View key={job.company} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Link src={job.companyUrl} style={styles.itemCompany}>
                  {job.company}
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
                {job.responsibilities.map((bullet) => (
                  <View key={bullet} style={styles.bulletItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Projects</Text>
          {resumeProfile.projects.map((project) => {
            const projectUrl = project.demo ?? project.github;

            return (
              <View key={project.title} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  {projectUrl ? (
                    <Link src={projectUrl} style={styles.itemCompany}>
                      {project.title}
                    </Link>
                  ) : (
                    <Text style={styles.itemCompany}>{project.title}</Text>
                  )}
                  <Text style={styles.itemDate}>{project.status}</Text>
                </View>

                <Text style={styles.projectDescription}>
                  {project.description}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resumeProfile.educations.map((education) => (
            <View
              key={`${education.institution}-${education.degree}`}
              style={styles.itemContainer}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.itemCompany}>{education.institution}</Text>
                <Text style={styles.itemDate}>
                  {formatStartEndDate(education.startDate, education.endDate)}
                </Text>
              </View>

              <Text style={styles.itemTitle}>{education.degree}</Text>
              <Text style={styles.itemLocation}>
                {education.location} • CGPA: {education.cgpa}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export { ResumeDocument };
