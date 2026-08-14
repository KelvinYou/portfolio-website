import {
  educations,
  experiences,
  personalInfo,
  projects,
  skills,
} from "@/constants";

const featuredExperienceCompanies = [
  "DTCPay (FinTech)",
  "Simpletruss",
  "Beyondsoft (Tencent)",
] as const;

const featuredProjectTitles = [
  "Agentic Dev Tools — Claude API + MCP",
  "Personal-OS — Multi-Agent Personal Operating System",
] as const;

const normalizePdfText = (text: string) => text.replace(/[—–]/g, "-");

const selectByName = <T extends { company: string }>(
  items: T[],
  names: readonly string[],
) =>
  names.flatMap((name) => {
    const item = items.find(({ company }) => company === name);
    return item ? [item] : [];
  });

const selectProjects = (titles: readonly string[]) =>
  titles.flatMap((title) => {
    const project = projects.find((item) => item.title === title);
    return project ? [project] : [];
  });

const projectDescriptions: Record<string, string> = {
  "Agentic Dev Tools — Claude API + MCP":
    "Built LLM-powered Playwright spec generation and multi-agent PRD/Figma reconciliation tooling with Claude API, MCP, and structured tool calls.",
  "Personal-OS — Multi-Agent Personal Operating System":
    "Built a production agent system with custom skills, MCP servers, circuit breakers, and structured workflows for self-management, finance, learning, and career tooling.",
};

export const resumeProfile = {
  personalInfo: {
    ...personalInfo,
    summary: normalizePdfText(personalInfo.summary),
  },
  title: "Frontend Engineer | AI-native Full-stack Builder",
  experiences: selectByName(experiences, featuredExperienceCompanies),
  projects: selectProjects(featuredProjectTitles).map((project) => ({
    ...project,
    title: normalizePdfText(project.title),
    description: normalizePdfText(
      projectDescriptions[project.title] ?? project.description,
    ),
  })),
  educations: educations.slice(0, 1),
  skillGroups: [
    { label: "Frameworks", items: skills.frameworks },
    { label: "Languages", items: skills.languages },
    { label: "AI / Agents", items: skills.ai },
    { label: "Data", items: skills.databases },
    { label: "Tools", items: skills.tools },
  ],
};
