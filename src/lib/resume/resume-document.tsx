import { Link, Document, Page, Text, View } from "@react-pdf/renderer";
import {
  formatStartEndDate,
  getGitHubName,
  getLinkedInName,
  getPersonalWebsiteName,
} from "@/lib/utils";
import { resumeProfile } from "./resume-profile";
import { styles } from "./style";

/**
 * Hairline rule, tracked label, content. The rule carries the section break so
 * the label itself can stay small — six loud uppercase headings competing with
 * the name was most of the old page's noise.
 */
const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionRule} />
    <Text style={styles.sectionLabel}>{label}</Text>
    {children}
  </View>
);

const Bullet = ({ children }: { children: string }) => (
  <View style={styles.bulletItem}>
    <View style={styles.bulletMarker} />
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const ResumeDocument = () => {
  const { personalInfo } = resumeProfile;
  const { contact } = personalInfo;

  // Two lines by intent: reachability first, then presence. One flowing row
  // wrapped mid-list and stranded a separator at the start of line two.
  const reachEntries: { id: string; node: React.ReactNode }[] = [
    {
      id: "email",
      node: (
        <Link src={`mailto:${contact.email}`} style={styles.contactLink}>
          {contact.email}
        </Link>
      ),
    },
    {
      id: "phone",
      node: (
        <Link src={`tel:${contact.phone}`} style={styles.contactLink}>
          {contact.phone}
        </Link>
      ),
    },
    {
      id: "location",
      node: <Text style={styles.contactItem}>{contact.location}</Text>,
    },
  ];

  const presenceEntries: { id: string; node: React.ReactNode }[] = [
    {
      id: "site",
      node: (
        <Link src={contact.personalWebsite} style={styles.contactLink}>
          {getPersonalWebsiteName(contact.personalWebsite)}
        </Link>
      ),
    },
    {
      id: "linkedin",
      node: (
        <Link src={contact.linkedin} style={styles.contactLink}>
          in/{getLinkedInName(contact.linkedin)}
        </Link>
      ),
    },
    {
      id: "github",
      node: (
        <Link src={contact.github} style={styles.contactLink}>
          github/{getGitHubName(contact.github)}
        </Link>
      ),
    },
  ];

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
          <Text style={styles.tagline}>{resumeProfile.title}</Text>

          {/* Hairline rules instead of six "Email:"-style labels: the reader
              already knows what an @ and a URL are. */}
          {[reachEntries, presenceEntries].map((entries, row) => (
            <View
              key={entries[0].id}
              style={[styles.contactRow, row > 0 ? styles.contactRowNext : {}]}
            >
              {entries.map(({ id, node }, index) => (
                <View key={id} style={styles.contactRow}>
                  {index > 0 ? (
                    <Text style={styles.contactSeparator}>|</Text>
                  ) : null}
                  {node}
                </View>
              ))}
            </View>
          ))}
        </View>

        <Section label="Summary">
          <Text style={styles.summary}>{personalInfo.summary}</Text>
        </Section>

        <Section label="Experience">
          {resumeProfile.experiences.map((job, index) => (
            <View
              key={job.company}
              style={[
                styles.item,
                index === resumeProfile.experiences.length - 1
                  ? styles.itemLast
                  : {},
              ]}
              wrap={false}
            >
              <View style={styles.rail}>
                <Text style={styles.railDate}>
                  {formatStartEndDate(job.startDate, job.endDate)}
                </Text>
              </View>

              <View style={styles.itemBody}>
                <Text style={styles.role}>{job.title}</Text>
                <Text style={styles.metaLine}>
                  <Link src={job.companyUrl} style={styles.company}>
                    {job.company}
                  </Link>
                  <Text style={styles.companyMeta}>
                    {` · ${job.location} · ${job.type}`}
                  </Text>
                </Text>

                <View style={styles.bulletList}>
                  {job.responsibilities.map((bullet) => (
                    <Bullet key={bullet}>{bullet}</Bullet>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </Section>

        <Section label="Projects">
          {resumeProfile.projects.map((project, index) => {
            const projectUrl = project.links?.demo ?? project.links?.repo;

            return (
              <View
                key={project.title}
                style={[
                  styles.item,
                  index === resumeProfile.projects.length - 1
                    ? styles.itemLast
                    : {},
                ]}
                wrap={false}
              >
                <View style={styles.rail}>
                  <Text style={styles.railDate}>{project.year}</Text>
                </View>

                <View style={styles.itemBody}>
                  {projectUrl ? (
                    <Link src={projectUrl} style={styles.projectTitle}>
                      {project.title}
                    </Link>
                  ) : (
                    <Text style={styles.projectTitle}>{project.title}</Text>
                  )}
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </Section>

        <Section label="Skills">
          {resumeProfile.skillGroups.map(({ label, items }) => (
            <View key={label} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{label}</Text>
              <Text style={styles.skillItems}>{items.join(", ")}</Text>
            </View>
          ))}
        </Section>

        <Section label="Education">
          {resumeProfile.educations.map((education) => (
            <View
              key={`${education.institution}-${education.degree}`}
              style={[styles.item, styles.itemLast]}
              wrap={false}
            >
              <View style={styles.rail}>
                <Text style={styles.railDate}>
                  {formatStartEndDate(education.startDate, education.endDate)}
                </Text>
              </View>

              <View style={styles.itemBody}>
                {/* `level` and `degree` are separate fields — the website sets
                    the level as an eyebrow above the subject, but a resume line
                    has to read as the credential's full name. */}
                <Text style={styles.role}>
                  {`${education.level} — ${education.degree}`}
                </Text>
                <Text style={styles.metaLine}>
                  <Text style={styles.company}>{education.institution}</Text>
                  <Text style={styles.companyMeta}>
                    {` · ${education.location} · CGPA ${education.cgpa}`}
                  </Text>
                </Text>
              </View>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  );
};

export { ResumeDocument };
