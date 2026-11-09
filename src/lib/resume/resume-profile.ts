import {
  educations,
  experiences,
  personalInfo,
  projects,
  skillGroups,
} from "@/constants";

/**
 * One resume per target role. A single document aimed between "AI product"
 * and "frontend" read as a weak fit for both, so each variant owns its title,
 * summary, project picks and skill order. Experience bullets stay shared in
 * data.ts — the facts don't change per audience, only the framing does.
 *
 * `ai-product` is the default served at /resume; `frontend` at /resume/frontend.
 */
export type ResumeVariant = "ai-product" | "frontend";

const featuredExperienceCompanies = [
  "DTCPay (FinTech)",
  "Simpletruss",
  "Beyondsoft (Tencent)",
] as const;

const selectByName = <T extends { company: string }>(
  items: T[],
  names: readonly string[],
) =>
  names.flatMap((name) => {
    const item = items.find(({ company }) => company === name);
    return item ? [item] : [];
  });

// Throws rather than skipping: these titles are matched by string, so a rename
// in data.ts would otherwise drop the project from the resume in silence.
const selectProjects = (titles: readonly string[]) =>
  titles.map((title) => {
    const project = projects.find((item) => item.title === title);
    if (!project) {
      throw new Error(
        `resumeProfile: no project titled "${title}" in constants/data.ts`,
      );
    }
    return project;
  });

// Same rule for skill-group labels: an unknown label would silently drop a row.
const orderSkillGroups = (labels: readonly string[]) =>
  labels.map((label) => {
    const group = skillGroups.find((item) => item.label === label);
    if (!group) {
      throw new Error(`resumeProfile: no skill group labelled "${label}"`);
    }
    return group;
  });

// Resume-length rewrites of the project claims. The agent projects are public
// repos with no users behind them, so neither says "production".
const projectDescriptions: Record<string, string> = {
  "Multi-Agent Stock Analysis":
    "Four-desk multi-agent research pipeline on the Claude Agent SDK: per-desk MCP tool servers, hybrid RAG (BM25 + local embeddings, RRF) over SEC 10-K/10-Q with a point-in-time cutoff (93% hit@5 on a 30-query eval), an adversarial debate stage, and walk-forward evaluation on a frozen holdout (Sharpe 1.32 net of cost).",
  "Personal-OS":
    "Personal agent system with 12 Claude Code skills on a weekly cadence: MCP integrations, guardrail rules the model cannot override, and an audit agent that reviews the other agents' advice.",
  PTIB: "Multi-tenant SaaS for a 200-student tuition centre: role-based portals, Stripe billing, QR attendance, Supabase row-level security. $500 MRR from 3 pilot centres.",
};

interface VariantConfig {
  title: string;
  summary: string;
  projectTitles: readonly string[];
  skillGroupOrder: readonly string[];
  fileName: string;
}

const variants: Record<ResumeVariant, VariantConfig> = {
  "ai-product": {
    title: "Full-stack Engineer · LLM Agents & AI Products · Fintech Payments",
    summary:
      "Full-stack engineer on dtcpay's production payments platform (9,000+ users): React and React Native front ends, Kotlin + Spring Boot services. I build LLM agent systems on the Claude Agent SDK — MCP tool servers, hybrid RAG, multi-agent debate, and evaluations that score past outputs against real outcomes. 3+ years across fintech, enterprise SaaS and Tencent-scale analytics.",
    projectTitles: ["Multi-Agent Stock Analysis", "Personal-OS"],
    skillGroupOrder: [
      "AI / Agents",
      "Tech Stack",
      "Data",
      "Cloud & Delivery",
      "Tools",
    ],
    fileName: "KelvinYou-Resume.pdf",
  },
  frontend: {
    title: "Frontend Engineer · React / React Native · Fintech Payments",
    summary:
      "Frontend engineer on dtcpay's production payments platform (9,000+ users). I led the Flutter → React Native migration that unified mobile and web, and I also ship the Kotlin + Spring Boot services behind it. Before that: a shared TypeScript component library and Apollo GraphQL layer at Simpletruss, and 100K-row analytics dashboards for Tencent's Level Infinite.",
    projectTitles: ["PTIB", "Multi-Agent Stock Analysis"],
    skillGroupOrder: [
      "Tech Stack",
      "Data",
      "AI / Agents",
      "Cloud & Delivery",
      "Tools",
    ],
    fileName: "KelvinYou-Resume-Frontend.pdf",
  },
};

export const getResumeProfile = (variant: ResumeVariant) => {
  const config = variants[variant];
  return {
    personalInfo: { ...personalInfo, summary: config.summary },
    title: config.title,
    fileName: config.fileName,
    experiences: selectByName(experiences, featuredExperienceCompanies),
    projects: selectProjects(config.projectTitles).map((project) => ({
      ...project,
      description: projectDescriptions[project.title] ?? project.claim,
    })),
    educations: educations.slice(0, 1),
    skillGroups: orderSkillGroups(config.skillGroupOrder),
  };
};
