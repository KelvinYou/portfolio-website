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
      "Building agentic dev tools and LLM-powered workflows on a production fintech payment platform. Claude API + MCP-based agents, plus React JS→TS architecture migration.",
    // TODO(kelvin): fill the bracketed numbers below — estimate E2E test time saved (% or hours/week),
    // team size N, and count of internal AI workflows. Leaving placeholders is fine for now;
    // recruiters skim — XYZ formula with concrete numbers ranks much higher.
    responsibilities: [
      "Built agentic test generation pipeline at fintech production scale: LLM-powered Playwright spec generator + auto-debug loop. Stack: Claude API + custom MCP tools + Playwright. Adopted by full team within [N] weeks.",
      "Designed multi-agent PRD/Figma reconciliation system that flags spec conflicts pre-development and auto-applies fixes to codebase via structured tool calls.",
      "Authored team-wide Claude rules + agent harness conventions, codifying prompt patterns and tool schemas across [N] internal AI workflows.",
      "Frontend architecture overhaul: React JS→TS migration, ESLint setup, folder structure rewrite — supporting agent-assisted code generation downstream.",
    ],
    skills: [
      "LLM Integration",
      "Claude API",
      "MCP (Model Context Protocol)",
      "Agentic AI",
      "Prompt Engineering",
      "Multi-agent Systems",
      "Playwright",
      "TypeScript",
      "React",
      "AI-assisted Development",
    ],
    logo: "/images/companies/dtcpay.jpeg",
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
      "jQuery → React: 5K lines → 40 components, Redux state. 60% fewer bugs.",
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
  title: "AI Application Engineer | Building agentic dev tools & LLM-powered fintech apps",
  fullname: "Kelvin You Kok Eng",
  contact: {
    email: "ykekelvin0220@gmail.com",
    phone: "+60183732752",
    linkedin: "https://www.linkedin.com/in/kelvinyou2001",
    github: "https://github.com/KelvinYou",
    personalWebsite: domainPath,
    location: "Kuala Lumpur, Malaysia",
  },
  profilePicture: "/images/profile-picture.jpg",
  memoji: "/images/memoji.png",
  summary: `AI Application Engineer with ${getTotalWorkingExperiences(experiences)}+ years shipping at Tencent/MiHoYo scale (1M+ users). Currently building agentic dev tools at dtcpay — LLM-powered Playwright generators, multi-agent PRD/Figma conflict resolution, team-wide Claude workflows. Background spans frontend performance engineering (500K-row tables at 60fps, 35% faster loads), fintech payments (dtcpay, Finexus), and Solidity/web3 (Ethereum AMM). Exploring multi-agent systems on production fintech infra.`,
};

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

export const projects: Project[] = [
  {
    title: "Personal-OS — Multi-Agent Personal Operating System",
    description:
      "Production agentic system built on Claude Code skill architecture + MCP servers (Figma, Google Calendar). Custom agents: weekly-review (data-driven self-management with circuit breakers), wealth-manager (portfolio analysis across MY/SG/US markets), learning-agent (job-market scraping + skill-radar synthesis), profile-optimizer (LLM-driven LinkedIn/resume optimization), coach-planner (real-time decision support and timetable scheduling). Demonstrates production agent design: tool schemas, prompt rules, structured outputs, hot-reloadable skill registry, multi-source data orchestration.",
    status: "In Progress",
    techStacks: [
      "Claude Code",
      "MCP",
      "LLM Integration",
      "Multi-agent Systems",
      "Python",
      "TypeScript",
      "Agent Skills",
    ],
    date: "2026-04-01",
    // TODO(kelvin): consider publishing a sanitized public version (framework only,
    // exclude data/ submodule). If you do, add github: "https://github.com/KelvinYou/personal-os" here.
  },
  {
    title: "PTIB - Tuition Center Management SaaS",
    description:
      "Multi-tenant SaaS digitizing a 200-student tuition center. Role-based portals, Stripe billing, QR attendance, row-level security in Supabase. Saved 5 hrs/week, $500 MRR from 3 pilot centers.",
    image: "/images/projects/tms.png",
    demo: "https://ptib.vercel.app/",
    status: "In Progress",
    techStacks: [
      "Next.js",
      "TailwindCSS",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Shadcn",
      "React",
    ],
    date: "2025-3-3",
  },
  {
    title: "Zync - Meeting Scheduling SaaS",
    description:
      "Real-time meeting scheduling SaaS (Calendly + Doodle reimagined). Architecting sync engine for 1000+ concurrent users with Supabase subscriptions. Stripe recurring billing, sub-200ms availability checks via PostgreSQL optimization and Redis caching.",
    status: "Focusing",
    techStacks: [
      "React.js",
      "Nest.js",
      "Supabase",
      "PostgreSQL",
      "Shadcn",
      "Stripe",
      "Redis",
    ],
    date: "2025-8-8",
  },
  {
    title: "Automated Market-Making System (Uniswap V2-style AMM)",
    description:
      "Built a constant-product AMM (x*y=k formula) as a blockchain course assignment. Solidity smart contracts: liquidity pools with LP token minting, slippage protection (max 2% deviation), front-running prevention with deadline checks. Handled integer overflow in Solidity 0.7 (SafeMath before 0.8 built-ins), implemented Babylonian square-root method in assembly for gas efficiency. MetaMask signing, deployed to Rinkeby testnet (~0.02 ETH gas). Combined with current fintech work, demonstrates crypto-fintech bridge for AI agent applications.",
    demo: "https://github.com/KelvinYou/amm-assignment",
    status: "Completed",
    techStacks: ["Solidity", "Ethereum", "React", "MetaMask", "Smart Contracts"],
    date: "2023-1-5",
  },
  {
    title: "Personal Website",
    description:
      "Performant portfolio with Next.js App Router, MDX blog, ISR, and i18n. 95+ Lighthouse scores across all metrics. Dynamic OG images, structured data, and RSS feed for search visibility.",
    image: "/images/projects/portfolio.jpg",
    github: "https://github.com/KelvinYou/portfolio-website",
    demo: "https://kelvinyou.vercel.app/",
    status: "Maintaining",
    techStacks: ["Next.js", "TailwindCSS", "Shadcn", "React"],
    date: "2025-3-3",
    blogSlugs: ["personal-website"],
  },
  {
    title: "Travel Guide: Tourist App",
    description:
      "Final year capstone: cross-platform mobile app with real-time GPS tracking, offline-first architecture, and Firebase sync. Handled 10MB+ map tiles via LRU cache (100MB limit), reduced battery drain by switching from 1s polling to 10s + geofencing, managed booking state machines across 5 screens. Presented to 50+ industry professionals.",
    github: "https://github.com/KelvinYou/fyp_tour_guide_app",
    status: "Completed",
    techStacks: ["Flutter", "Dart", "Firebase"],
    date: "2023-11-14",
  },
  {
    title: "Edge Detection System",
    description:
      "Parallelized image processing (45+ s/image on single thread). Image chunking with Dask + Python threading for I/O. Achieved 8x speedup on 8-core machines, demonstrating Amdahl's Law in practice.",
    github:
      "https://github.com/KelvinYou/react-selflearn/tree/main/react-restaurant-landing",
    status: "Completed",
    techStacks: ["Python", "Dask", "Threading"],
    date: "2022-9-23",
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
    name: "HTML, CSS, and Javascript for Web Developers",
    link: `${domainPath}pdf/TDA-html_css_js.pdf`,
    issuingOrganization: "The Digital Adda",
    issueDate: "2023-12-11",
  },
  {
    name: "ReactJS",
    link: `${domainPath}pdf/TDA-reactjs.pdf`,
    issuingOrganization: "The Digital Adda",
    issueDate: "2023-12-12",
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
    "Prompt Engineering",
    "AI-assisted Development",
  ],
  languages: ["TypeScript", "JavaScript", "Python", "Java", "Go", "Solidity"],
  frameworks: ["Next.js", "React", "Node.js", "NestJS", "Express"],
  databases: ["PostgreSQL", "Supabase", "Redis"],
  blockchain: ["Solidity", "Ethereum", "MetaMask", "Smart Contracts"],
  tools: ["Claude Code", "Docker", "Git", "Vercel", "GitHub Actions", "Playwright"],
};
