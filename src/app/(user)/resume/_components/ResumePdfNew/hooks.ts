import { careerData, certifications, coCurricular, educations, languages, personalInfo, skills, summary, workExperiences } from "@/constants/data"
import { getProjects } from "@/services/projectService"
import dayjs from "dayjs";

export const fetchResumeData = () => {
  const mergePoints: any = [];
  
  for (const education of educations) {
    mergePoints.push(...education.points);
  }

  // Find the earliest startDate and latest endDate
  const { earliestStartDate, latestEndDate } = educations.reduce(
    (acc, education) => {
      // Parsing dates with dayjs
      const startDate = dayjs(education.startDate);
      const endDate = dayjs(education.endDate);

      // Updating earliestStartDate if current startDate is earlier
      if (startDate.isBefore(acc.earliestStartDate)) {
        acc.earliestStartDate = startDate;
      }

      // Updating latestEndDate if current endDate is later
      if (endDate.isAfter(acc.latestEndDate)) {
        acc.latestEndDate = endDate;
      }

      return acc;
    },
    {
      earliestStartDate: dayjs(),
      latestEndDate: dayjs(0),
    }
  );

  // Get formatted date strings
  const formattedEarliestStartDate = earliestStartDate.format('YYYY-M-D');
  const formattedLatestEndDate = latestEndDate.format('YYYY-M-D');

  const highestEducation = [{
    ...educations[0],
    // points: mergePoints,
    // startDate: formattedEarliestStartDate,
    // endDate: formattedLatestEndDate,
  }];

  return {
    ...personalInfo,
    ...careerData,
    workExperiences,
    educations: highestEducation,
    coCurricular,
    allSkills: Object.values(skills).flat(),
    skills,
    languages,
    summary,
    certifications,
    projects: getProjects(),
  }
}