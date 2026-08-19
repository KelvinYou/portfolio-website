import { getTotalWorkingExperiences } from "@/lib/utils";
import {
  Education,
  Experience,
  Project,
  Skill,
  SkillDepth,
  SkillDomain,
} from "@/types";

export const domainPath = "https://kelvinyou.vercel.app";

export const experiences: Experience[] = [
  {
    title: "Frontend Engineer",
    company: "DTCPay (FinTech)",
    companyUrl: "https://www.dtcpay.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Full-time",
    startDate: "2025-7-7",
    endDate: undefined,
    description:
      "Production payments platform, 9,000+ users. Led Flutter to React Native migration unifying mobile + web.",
    responsibilities: [
      "Kotlin backend for cross-currency batch payments: FX quote lock, largest-remainder allocation, CAS-on-status duplicate guard.",
      "Fail-closed PII masking across 5 payment surfaces — unmask only on explicit corporate classification.",
      "KYT case review UI: maker-checker approval workflow, RFI state machine, scope-gated decisions.",
    ],
    skills: [
      "Kotlin",
      "React",
      "React Native",
      "TypeScript",
      "Payment Systems",
      "Concurrency",
      "System Design",
      "Fintech",
    ],
    logo: "/images/companies/dtcpay.jpeg",
    // The two Kotlin write-ups are the only public evidence of server-side
    // ownership — the rest of the site reads frontend-only without them.
    blogSlugs: [
      "cas-instead-of-idempotency-key",
      "conserving-money-across-rows",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Simpletruss",
    companyUrl: "https://www.simpletruss.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Full-time",
    startDate: "2024-6-10",
    endDate: "2025-7-7",
    description:
      "Building enterprise property management SaaS. 500+ properties, 10K+ maintenance tickets monthly.",
    responsibilities: [
      "Component library with compound patterns, TypeScript generics, Storybook docs. 40% faster dev velocity, 60KB bundle reduction.",
      "GraphQL layer: Apollo Client, 80% cache hit rate, custom hooks (usePaginatedQuery, useOptimisticMutation). Type-safe, zero prop-drilling.",
      "Performance: Code splitting, virtualization for 10K+ rows, Zustand over Redux. 35% faster initial loads.",
    ],
    skills: [
      "React",
      "TypeScript",
      "GraphQL",
      "Apollo Client",
      "Zustand",
      "Material UI",
      "Storybook",
    ],
    logo: "/images/companies/simpletruss.jpeg",
    projects: [
      {
        title: "LessenPro",
        description:
          "Scheduling engine, vendor coordination, maintenance tracking. 500+ properties managed.",
        demo: "https://www.lessenpro.com/",
        techStacks: [
          "React",
          "TypeScript",
          "GraphQL",
          "Material UI",
          "Apollo Client",
        ],
      },
    ],
  },
  {
    title: "Frontend Developer",
    company: "Beyondsoft (Tencent)",
    companyUrl: "https://www.beyondsoft.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Full-time",
    startDate: "2023-7-31",
    endDate: "2024-6-7",
    description:
      "Analytics platform for Tencent, MiHoYo (Genshin Impact), major game studios. Millions of events/day.",
    responsibilities: [
      "Performance: Virtual scrolling (500K rows), Web Workers for parsing, debounced filters. Sub-3s loads at 60fps.",
      "Quality: Jest standards, mandatory reviews, 40% fewer production bugs. Docker dev env: 4h → 30min onboarding.",
      "Cross-team: Specs with Tencent engineers, cross-browser (Safari, IE11), China CDN optimization.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Redux",
      "Ant Design",
      "Jest",
      "Docker",
      "Webpack",
      "Go",
    ],
    logo: "/images/companies/beyondsoft.jpeg",
    blogSlugs: ["beyondsoft"],
    projects: [
      {
        title: "Databrain Global",
        description:
          "Real-time player analytics. 100K+ row datasets, complex filters, interactive dashboards.",
        demo: "https://databrain-global.intlgame.com/",
        techStacks: ["React", "Umi.js", "Ant Design", "TypeScript", "Go"],
      },
    ],
  },
  {
    title: "Java Engineer Intern",
    company: "Finexus (Fintech)",
    companyUrl: "https://www.finexusgroup.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Internship",
    startDate: "2023-2-1",
    endDate: "2023-7-31",
    description:
      "First exposure to fintech production payment systems — legacy Java/JSP monolith, thousands of daily transactions. Foundation for current fintech work at dtcpay.",
    responsibilities: [
      "Fixed connection pool bug causing peak-hour failures. HikariCP + JMX monitoring → 99.9% uptime.",
      "Deployment automation: Bash scripts for Tomcat WAR deploys. 4h → 2h per release.",
      "Jasper Reports: Query optimization, indexing. 8s → 1.2s report generation.",
    ],
    skills: [
      "Java",
      "Oracle SQL",
      "Servlets",
      "JSP",
      "Tomcat",
      "Shell Scripting",
      "Jasper Reports",
    ],
    logo: "/images/companies/finexus.png",
  },
  {
    title: "Blockchain Engineer Intern",
    company: "Techtics (Web3)",
    companyUrl: "https://www.techtics.io/",
    location: "Kuala Lumpur, Malaysia",
    type: "Internship",
    startDate: "2020-10-1",
    endDate: "2021-1-31",
    description:
      "Ethereum dApp during 2020 DeFi boom. Smart contracts, gas optimization, MetaMask.",
    responsibilities: [
      "Solidity contracts: Reentrancy guards, gas estimation UI, MetaMask signing. Deployed to mainnet.",
      "Gas optimization: IPFS storage, batched transactions. 65K → 38K gas (40% savings).",
    ],
    skills: [
      "React",
      "TypeScript",
      "Solidity",
      "MetaMask",
      "Node.js",
      "Express",
      "Redux",
    ],
    logo: "/images/companies/techtics.png",
  },
];

export const personalInfo = {
  name: "Kelvin You",
  title: "AI-native Full-stack Engineer · Fintech Payments & Agent Systems",
  fullname: "Kelvin You Kok Eng",
  contact: {
    email: "ykekelvin0220@gmail.com",
    phone: "+60183732752",
    linkedin: "https://www.linkedin.com/in/kelvinyou2001",
    github: "https://github.com/KelvinYou",
    personalWebsite: domainPath,
    location: "Kuala Lumpur, Malaysia",
  },
  // Full-frame original; use for large-format placements.
  profilePicture: "/images/profile.jpeg",
  // Face-centred crop of the same photo, for the small circular avatars.
  profileAvatar: "/images/profile-avatar.jpg",
  memoji: "/images/memoji.png",
  summary: `Full-stack engineer on a production payment platform serving 9,000+ users at dtcpay — React and React Native at the front, Kotlin at the back: cross-currency batch payments, fail-closed PII masking, AML review workflows. Off the clock, multi-agent LLM systems on the Claude Agent SDK — MCP tool servers, agent debate, and walk-forward evals that grade past calls.`,
};

export type SocialId = "github" | "linkedin" | "email";

// Single owner for the outbound links. The hero, the contact section, and the
// footer all render these; they used to keep three separate hardcoded copies
// that drifted. Icons live in the component (this module stays React-free).
export const socialLinks: {
  id: SocialId;
  label: string;
  href: string;
  external: boolean;
}[] = [
  {
    id: "github",
    label: "GitHub",
    href: personalInfo.contact.github,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: personalInfo.contact.linkedin,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${personalInfo.contact.email}`,
    external: false,
  },
];

/**
 * Ordered newest-first — the highest credential leads and takes the heavier
 * rule, the same weighting the experience and projects ledgers use.
 */
export const educations: Education[] = [
  {
    degree: "Software Engineering (Honours)",
    level: "Bachelor (Hons)",
    institution: "Tunku Abdul Rahman University of Management and Technology",
    institutionUrl: "https://tarc.edu.my/",
    location: "Kuala Lumpur, Malaysia",
    startDate: "2021-6-20",
    endDate: "2023-7-31",
    focus:
      "Distributed systems, parallel computing and performance optimization, carried through 15+ builds — blockchain dApps, mobile apps, graphics.",
    cgpa: "3.72",
    honor: { label: "Dean's List", detail: "top 10% of cohort" },
    achievements: [
      "Final year project — a travel guide app — presented to 50+ industry professionals",
      "Led a capstone team of 4",
      "Earned the Databrain Global (Beyondsoft) internship on university recommendation",
    ],
    coursework: {
      core: [
        "Data Structures & Algorithms",
        "Distributed Systems",
        "Parallel Computing",
        "Human-Computer Interaction",
        "Graphics Programming",
      ],
      electives: [
        "Mobile Development (Flutter)",
        "Blockchain Development (Solidity)",
        "Data Science (Python)",
      ],
    },
    documents: {
      certificate: "/pdf/educations/degree-cert.pdf",
      transcript: "/pdf/educations/degree-transcript.pdf",
    },
    logo: "/images/institutions/tarumt.png",
    techStacks: [
      "Java",
      "Flutter",
      "C++",
      "TypeScript",
      "ReactJS",
      "Linux",
      "Python",
      "Git",
    ],
  },
  {
    degree: "Computer Science",
    level: "Diploma",
    institution: "Tunku Abdul Rahman University of Management and Technology",
    institutionUrl: "https://tarc.edu.my/",
    location: "Kuala Lumpur, Malaysia",
    startDate: "2019-5-28",
    endDate: "2021-5-31",
    focus:
      "Where the fundamentals came from: object-oriented Java, then down to C and assembly, against a full mathematics track.",
    cgpa: "3.7439",
    achievements: [],
    coursework: {
      core: [
        "Object-Oriented Programming (Java)",
        "C & Assembly",
        "Algebra",
        "Calculus",
        "Statistics",
        "Discrete Mathematics",
      ],
    },
    documents: { transcript: "/pdf/educations/diploma-transcript.pdf" },
    logo: "/images/institutions/tarumt.png",
    techStacks: [
      "C lang",
      "Java",
      "C++",
      "html",
      "css",
      "JavaScript",
      "Linux",
      "Git",
    ],
  },
];

/**
 * Ordered newest-first. `/projects` regroups these by `kind`; the homepage
 * lifts the three marked `featured` (first one leads).
 */
export const projects: Project[] = [
  {
    title: "Multi-Agent Stock Analysis",
    kind: "system",
    featured: true,
    claim:
      "Four analyst desks — fundamentals, technical, sentiment, macro — each on its own MCP server, argued through a debate stage and merged by a synthesizer. Signals are validated walk-forward against a frozen holdout, with Wilson intervals and a deflated Sharpe on the strategy search — which is how I know the factor still lagged buy-and-hold.",
    // Numbers from repos/ai-stock-analysis/docs/momentum-factor-sweep-aapl-2026-08-17.md
    // — 20-bar lookback / 20-bar holding, parameters fixed on 2016-2022 and the
    // 2023-2026 window kept frozen. Reported net of cost, never gross.
    outcome: [
      {
        value: "1.32",
        label: "Sharpe on a frozen 2023-26 holdout, net of cost",
      },
      { value: "10/12", label: "tickers still net-positive at 30 bps/side" },
    ],
    links: { repo: "https://github.com/KelvinYou/ai-stock-analysis" },
    access: "public",
    year: 2026,
    techStacks: [
      "Python",
      "Claude Agent SDK",
      "MCP",
      "RAG",
      "Multi-agent Systems",
      "Walk-forward Backtesting",
      "Pydantic",
      "FastAPI",
    ],
  },
  {
    title: "Personal-OS",
    kind: "system",
    featured: true,
    claim:
      "Guardrail design over raw model output. Only an acute bad-sleep night is non-overridable; on the noisier 7-day trend, live HRV overrides the automated deload — so it catches real risk without crying wolf every week on a lagging metric.",
    outcome: [
      { value: "12", label: "agent skills running on a weekly cadence" },
      { value: "1", label: "non-overridable rule; the rest defer to live HRV" },
    ],
    links: { repo: "https://github.com/KelvinYou/personal-os" },
    access: "public",
    year: 2026,
    techStacks: [
      "Claude Code",
      "MCP",
      "LLM Integration",
      "Multi-agent Systems",
      "Python",
      "TypeScript",
      "Agent Skills",
    ],
  },
  {
    title: "PTIB",
    kind: "product",
    featured: true,
    claim:
      "Multi-tenant SaaS that digitised a 200-student tuition centre: role-based portals, Stripe billing, QR attendance, row-level security in Supabase.",
    outcome: [
      { value: "$500", label: "MRR from 3 pilot centres" },
      { value: "5 hrs", label: "of admin saved per week" },
    ],
    links: { demo: "https://ptib.vercel.app/" },
    access: "public",
    year: 2025,
    techStacks: [
      "Next.js",
      "TailwindCSS",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Shadcn",
      "React",
    ],
  },
  {
    title: "Personal Website",
    kind: "product",
    claim:
      "Next.js App Router with an MDX blog, ISR and i18n — plus dynamic OG images, structured data and an RSS feed for search visibility.",
    outcome: [{ value: "95+", label: "Lighthouse across all four metrics" }],
    links: {
      repo: "https://github.com/KelvinYou/portfolio-website",
      demo: "https://kelvinyou.vercel.app/",
    },
    access: "public",
    year: 2025,
    techStacks: ["Next.js", "TailwindCSS", "Shadcn", "React"],
    blogSlugs: ["personal-website"],
  },
  {
    title: "Travel Guide",
    kind: "coursework",
    claim:
      "Final-year capstone: offline-first mobile app with live GPS. Map tiles cached under an LRU limit, battery reclaimed by trading 1s polling for geofencing, booking state machines across five screens.",
    outcome: [
      { value: "10×", label: "less GPS polling — 1s to 10s plus geofencing" },
      { value: "100MB", label: "LRU cap over 10MB+ of map tiles" },
    ],
    links: { repo: "https://github.com/KelvinYou/fyp_tour_guide_app" },
    access: "public",
    year: 2023,
    techStacks: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "Automated Market Maker",
    kind: "coursework",
    claim:
      "Uniswap V2-style constant-product AMM: Solidity liquidity pools, slippage protection, gas-optimised math.",
    outcome: [{ value: "x·y=k", label: "constant-product invariant" }],
    links: { repo: "https://github.com/KelvinYou/amm-assignment" },
    access: "public",
    year: 2023,
    techStacks: [
      "Solidity",
      "Ethereum",
      "React",
      "MetaMask",
      "Smart Contracts",
    ],
  },
  {
    title: "Edge Detection System",
    kind: "coursework",
    claim:
      "Image processing that took 45s per image single-threaded, parallelised — Dask chunking for the compute, Python threading for the I/O.",
    outcome: [
      { value: "8×", label: "speedup on 8 cores — Amdahl's law in practice" },
    ],
    // TODO(kelvin): the previous github link here pointed at
    // react-selflearn/react-restaurant-landing — a React landing page, not this
    // Python project. Removed rather than left wrong: one dead link discounts
    // every other link on the page. Restore with the correct repo URL.
    access: "private",
    year: 2022,
    techStacks: ["Python", "Dask", "Threading"],
  },
];

export const certifications = [
  {
    name: "CCNA: Introduction to Networks",
    link: "https://www.credly.com/badges/fa38eb0b-43b0-4a2a-bdc0-da2a334c8738?source=linked_in_profile",
    issuingOrganization: "CISCO",
    issueDate: "2021-6-20",
  },
  {
    name: "Rust Workshop 2024 - Parallel Programming",
    link: "https://credsverse.com/credentials/af37b752-6f6d-4f6d-9368-34f56c1242e5",
    issuingOrganization: "",
    issueDate: "2024-4-25",
    pdf: `${domainPath}assets/pdf/rust-workshop-2024-parallel-programming.pdf`,
  },
];

/**
 * Every skill, carrying both axes. This flat list is the single source of truth;
 * `skillGroups` and `skillTiers` below are projections of it, so the resume and
 * the website can present different cuts without drifting apart.
 *
 * `depth` is not self-assessment — each value is checkable against data in this
 * same file. `shipped` means it appears in an `experiences[].skills` array or in
 * a project with paying users; `built` means a public repo of mine runs on it;
 * `coursework` means a 2022-23 assignment and nothing since; `gap` means
 * studied, never shipped.
 *
 * Two entries were dropped rather than re-tiered: "Agentic AI" (a buzzword
 * restatement of Multi-agent Systems + MCP, both of which are listed) and
 * "AI-assisted Development" (not falsifiable — the same reason the soft-skills
 * tab was deleted from the section).
 */
export const skillList: Skill[] = [
  // Production — dtcpay (9,000+ users), Simpletruss, PTIB (3 paying centres).
  { name: "TypeScript", domain: "core", depth: "shipped" },
  { name: "React", domain: "core", depth: "shipped" },
  { name: "React Native", domain: "core", depth: "shipped" },
  { name: "Kotlin", domain: "core", depth: "shipped" },
  { name: "Next.js", domain: "core", depth: "shipped" },
  { name: "GraphQL", domain: "core", depth: "shipped" },
  { name: "Apollo Client", domain: "core", depth: "shipped" },
  { name: "PostgreSQL", domain: "data", depth: "shipped" },
  { name: "Supabase", domain: "data", depth: "shipped" },
  { name: "Vercel", domain: "delivery", depth: "shipped" },
  { name: "Git", domain: "tools", depth: "shipped" },

  // My own systems — public repos, no paying users behind them.
  { name: "Python", domain: "core", depth: "built" },
  { name: "Node.js", domain: "core", depth: "built" },
  { name: "FastAPI", domain: "core", depth: "built" },
  { name: "LLM Integration (Claude API)", domain: "ai", depth: "built" },
  { name: "Claude Agent SDK", domain: "ai", depth: "built" },
  { name: "MCP (Model Context Protocol)", domain: "ai", depth: "built" },
  { name: "Multi-agent Systems", domain: "ai", depth: "built" },
  { name: "RAG", domain: "ai", depth: "built" },
  { name: "Prompt Engineering", domain: "ai", depth: "built" },
  { name: "Docker", domain: "delivery", depth: "built" },
  { name: "GitHub Actions (CI/CD)", domain: "delivery", depth: "built" },
  { name: "Claude Code", domain: "tools", depth: "built" },
  { name: "Playwright", domain: "tools", depth: "built" },

  // Coursework — 2022-23 capstone and assignments, nothing since.
  { name: "Java", domain: "core", depth: "coursework" },
  { name: "Solidity", domain: "core", depth: "coursework" },
  { name: "Flutter", domain: "core", depth: "coursework" },
  { name: "Dask", domain: "core", depth: "coursework" },
  { name: "Firebase", domain: "delivery", depth: "coursework" },

  // Studied, never shipped. Rendered as a visible gap on the site and withheld
  // from the resume — a keyword there would read as a claim of experience.
  // Closing this is the current learning target, not a line to pad now.
  { name: "Go", domain: "core", depth: "gap" },
  { name: "Redis", domain: "data", depth: "gap" },
  { name: "AWS", domain: "delivery", depth: "gap" },
  { name: "Kubernetes", domain: "delivery", depth: "gap" },
];

/**
 * The domain cut, for the resume PDF. A one-page scan wants "does he have the
 * data layer" answered fast, and depth tiers on paper would read as hedging.
 *
 * `gap` skills are excluded: on a resume a bare keyword is read as a claim of
 * experience, and the qualifier that makes it honest only exists on the site.
 */
const domainLabels: { domain: SkillDomain; label: string }[] = [
  { domain: "core", label: "Tech Stack" },
  { domain: "ai", label: "AI / Agents" },
  { domain: "data", label: "Data" },
  // Split out of "Tools": a reader scanning for deploy/CI signal was finding it
  // mixed in with an editor and a test runner, and reading it as absent.
  { domain: "delivery", label: "Cloud & Delivery" },
  { domain: "tools", label: "Tools" },
];

export const skillGroups: { label: string; items: readonly string[] }[] =
  domainLabels.map(({ domain, label }) => ({
    label,
    items: skillList
      .filter((skill) => skill.domain === domain && skill.depth !== "gap")
      .map((skill) => skill.name),
  }));

/**
 * The depth cut, for the website. Order is strongest-first, and the weak tiers
 * are kept — the honesty is what makes the top tier believable, the same rule
 * the projects ledger follows with its "no measured result" rows.
 *
 * Labels and provenance lines are translated; look under `sections` for
 * `skills_tier_<depth>_label` and `skills_tier_<depth>_source`.
 */
export const skillTiers: { depth: SkillDepth; items: readonly string[] }[] = (
  ["shipped", "built", "coursework", "gap"] as const
).map((depth) => ({
  depth,
  items: skillList
    .filter((skill) => skill.depth === depth)
    .map((skill) => skill.name),
}));
