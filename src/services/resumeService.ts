import { careerData, coCurricular, educations, languages, personalInfo, skills, workExperiences } from "@/constants/data"

export const getResumeData = () => {
  return {
    ...personalInfo,
    ...careerData,
    workExperiences,
    educations,
    coCurricular,
    allSkills: Object.values(skills).flat(),
    languages,
  }
}