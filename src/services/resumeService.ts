import { careerData, certifications, coCurricular, educations, languages, personalInfo, skills, summary, workExperiences } from "@/constants/data"
import { getProjects } from "./projectService"

export const getResumeData = () => {
  return {
    ...personalInfo,
    ...careerData,
    workExperiences,
    educations,
    coCurricular,
    allSkills: Object.values(skills).flat(),
    skills,
    languages,
    summary,
    certifications,
    projects: getProjects(),
  }
}