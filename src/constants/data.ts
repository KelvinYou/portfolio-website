import { getTotalWorkingExperiences } from "@/lib/utils";
import { Experience, Project } from "@/types";

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

// Example education data
export const educations = [
  {
    degree: "Bachelor of Software Engineering (Honours)",
    institution: "Tunku Abdul Rahman University of Management and Technology",
    location: "Kuala Lumpur, Malaysia",
    startDate: "2021-6-20",
    endDate: "2023-7-31",
    description:
      "Specialized in distributed systems, parallel computing, and performance optimization. Built 15+ projects ranging from blockchain dApps to mobile applications. Core coursework: Data Structures & Algorithms (Java), Distributed Systems, Parallel Computing, Human-Computer Interaction, Graphics Programming. Electives: Mobile Development (Flutter), Blockchain Development (Solidity), Data Science (Python).",
    achievements: [
      "Dean's List (Top 10% - GPA: 3.72/4.0)",
      "Final Year Project: Travel Guide App presented to 50+ industry professionals",
      "Secured Databrain Global (Beyondsoft) internship through university recommendation",
      "Led student team of 4 for final year capstone project",
    ],
    logo: "/images/institutions/tarumt.png",
    cgpa: "3.72",
    institutionUrl: "https://tarc.edu.my/",
    certificateUrl: "/pdf/educations/degree-cert.pdf",
    transcriptUrl: "/pdf/educations/degree-transcript.pdf",
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
    degree: "Diploma in Computer Science",
    institution: "Tunku Abdul Rahman University of Management and Technology",
    location: "Kuala Lumpur, Malaysia",
    startDate: "2019-5-28",
    endDate: "2021-5-31",
    description:
      "Basic Programming Concepts through various languages such as Object-Oriented Programming in Java, C, and Assembly Language. Mathematics courses included Algebra, Calculus, Statistics, Discrete Math.",
    achievements: [
      // "Graduated Summa Cum Laude",
      // "Innovation Award for Senior Project",
      // "Coding Competition Winner (2017)"
    ],
    logo: "/images/institutions/tarumt.png",
    cgpa: "3.7439",
    institutionUrl: "https://tarc.edu.my/",
    transcriptUrl: "/pdf/educations/diploma-transcript.pdf",
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

export const skills = {
  ai: [
    "LLM Integration (Claude API)",
    "Agentic AI",
    "Multi-agent Systems",
    "MCP (Model Context Protocol)",
    "RAG",
    "Prompt Engineering",
    "AI-assisted Development",
  ],
  languages: ["TypeScript", "JavaScript", "Python", "Kotlin", "Java", "Go"],
  frameworks: [
    "Next.js",
    "React",
    "React Native",
    "Node.js",
    "NestJS",
    "FastAPI",
  ],
  databases: ["PostgreSQL", "Supabase", "Redis"],
  blockchain: ["Solidity", "Ethereum", "MetaMask", "Smart Contracts"],
  // Deliberately no AWS/GCP/Kubernetes here. Every one of those would be a
  // claim with nothing behind it; this list is what has actually run something
  // in production. Closing that gap is the current learning target, not a line
  // to pad now.
  delivery: ["Docker", "GitHub Actions (CI/CD)", "Vercel", "Firebase"],
  tools: ["Claude Code", "Git", "Playwright"],
};

// Single source of truth for how skills are grouped and ordered. Both the
// website's Skills section and the resume PDF render from this exact array, so
// the two can never drift out of sync.
export const skillGroups: { label: string; items: readonly string[] }[] = [
  {
    label: "Tech Stack",
    items: [
      "React",
      "React Native",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Kotlin",
      "Python",
      "Java",
      "Go",
    ],
  },
  { label: "AI / Agents", items: skills.ai },
  { label: "Data", items: skills.databases },
  // Split out of "Tools": a reader scanning for deploy/CI signal was finding it
  // mixed in with an editor and a test runner, and reading it as absent.
  { label: "Cloud & Delivery", items: skills.delivery },
  { label: "Tools", items: skills.tools },
];
