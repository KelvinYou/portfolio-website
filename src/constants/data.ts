import { getTotalWorkingExperiences } from "@/lib/utils";
import {
  Education,
  Experience,
  Project,
  Skill,
  SkillDepth,
  SkillDomain,
  SkillLayer,
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
      "Kotlin + Spring Boot cross-currency batch payments: locked FX quotes, cent-exact splits, duplicate guard.",
      "PII masking across 5 payment surfaces, fail-closed: data stays masked unless explicitly classified corporate.",
      "AML review (KYT) UI: maker-checker approvals, request-for-info state machine, scoped decisions.",
      "Cross-system live E2E (Playwright): Wallet → TOP → bank callback → ledger checks, agent-operable runbooks.",
    ],
    skills: [
      "Kotlin",
      "Spring Boot",
      "React",
      "React Native",
      "TypeScript",
      "Payment Systems",
      "Concurrency",
      "System Design",
    ],
    logo: "/images/companies/dtcpay.jpeg",
    // The two Kotlin write-ups are the only public evidence of server-side
    // ownership — the rest of the site reads frontend-only without them, so they
    // lead. The first five map onto the three responsibilities above; the rest
    // fold behind a disclosure in `WroteAbout`, because sixteen links rendered
    // flat would read as a blog index that wandered into a resume.
    blogSlugs: [
      "cas-instead-of-idempotency-key",
      "conserving-money-across-rows",
      "fail-closed-pii-masking",
      "maker-checker-state-machine",
      "verifying-a-migration-with-no-test-runner",
      "shared-schema-library-across-services",
      "idempotency-check-against-the-wrong-clock",
      "read-mutate-write-back-reverted-update",
      "three-copies-one-rule-disagreed-on-zero",
      "guard-survived-refactor-became-tautology",
      "flag-written-before-the-effect",
      "never-configured-vs-disabled-same-fallback",
      "permission-scope-trap-for-a-later-caller",
      "cache-rebuild-looked-like-a-login",
      "merge-conflict-enum-keys-runtime-break",
      "constants-frozen-at-load-raced-async-init",
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
      "Vendor SaaS (LessenPro) for Lessen, a US property-services operator.",
    // No percentages: none of them was ever measured. Each bullet is a
    // mechanism the owner can walk through in an interview instead.
    responsibilities: [
      "Built and owned the shared React component library (TypeScript, Storybook) behind LessenPro's screens.",
      "Apollo cache: cache.modify list writes instead of refetchQueries, so new tickets skip a full list refetch.",
      "Mobile-first responsive rebuild of the vendor app, with design and backend teams.",
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
    blogSlugs: ["apollo-cache-and-the-list-you-forgot"],
    photos: [
      {
        id: "simpletruss-farewell",
        type: "image",
        src: "/images/gallery/simpletruss/farewell.jpg",
        alt: "Team photo on the last day at Simpletruss",
        title: "Last day at Simpletruss",
      },
    ],
    projects: [
      {
        title: "LessenPro",
        description:
          "Scheduling engine, vendor coordination, maintenance tracking.",
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
      "Game analytics platform (DataBrain) for Tencent's Level Infinite.",
    // Sourced from the owner's own 2025 write-up plus confirmed details; the
    // earlier 500K-row / 60fps / Docker claims were template text, not facts.
    responsibilities: [
      "Shipped 15+ features in a qiankun micro-frontend (React, Umi, Ant Design) for user-configurable dashboards.",
      "100K-row tables: Web Worker parsing, infinite scroll, memoized chart/table components to cut re-renders.",
      "Delivered from Chinese-language specs with Tencent product and engineering teams across time zones.",
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
    photos: [
      {
        id: "beyondsoft-databrain-team",
        type: "image",
        src: "/images/blogs/beyondsoft/databrain-team.jpg",
        alt: "The Databrain team at Beyondsoft",
        title: "The Databrain team",
        description:
          "The group behind the visualization module — the dashboards, the 100K-row tables, and the CSS bug in the opening paragraph.",
        width: 1000,
        height: 750,
        metadata: {
          dateCreated: "May 2024",
          location: "Beyondsoft, Kuala Lumpur",
          dimensions: "1000 × 750 px",
        },
      },
      {
        id: "beyondsoft-big-group",
        type: "image",
        src: "/images/blogs/beyondsoft/big-group.png",
        alt: "Group photo with the wider Beyondsoft team",
        title: "The wider team",
        description:
          "Quarterly team building. Half the people in this photo have explained a Chinese spec term to me at some point.",
        width: 1200,
        height: 800,
        metadata: {
          dateCreated: "June 2024",
          location: "Beyondsoft, Kuala Lumpur",
          dimensions: "1200 × 800 px",
        },
      },
    ],
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
    title: "Java Software Engineer Intern",
    company: "Finexus (Fintech)",
    companyUrl: "https://www.finexusgroup.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Internship",
    startDate: "2023-2-1",
    endDate: "2023-7-31",
    description:
      "Legacy fintech Java applications: new payment features, test coverage, deployment scripts.",
    // 2026-11-08: restored from the owner-confirmed 2023 entry. The later
    // HikariCP pool bug, Jasper report tuning and every metric (99.9% uptime,
    // 4h→2h, 8s→1.2s) were template text and never happened. The HikariCP blog
    // post is now a general technique note and is no longer linked from here.
    responsibilities: [
      "Extended legacy Java applications with payment processing features, with unit and integration tests.",
      "Shell scripts to automate Tomcat deployments and streamline release configuration.",
    ],
    skills: [
      "Java",
      "Oracle SQL",
      "Servlets",
      "JSP",
      "Tomcat",
      "Shell Scripting",
      "SOAP",
    ],
    logo: "/images/companies/finexus.png",
  },
  {
    title: "Software Engineer Intern",
    company: "Techtics (Web3)",
    companyUrl: "https://www.techtics.io/",
    location: "Kuala Lumpur, Malaysia",
    type: "Internship",
    startDate: "2020-10-1",
    endDate: "2021-1-31",
    description:
      "Ethereum dApp with MetaMask signing, plus a jQuery → React rebuild of the legacy frontend.",
    // 2026-11-08: restored from the owner-confirmed 2023 entry. Reentrancy
    // guards, IPFS gas optimization, "deployed to mainnet" and 65K→38K gas were
    // template text. The reentrancy blog post is now a general technique note
    // and is no longer linked from here.
    responsibilities: [
      "Migrated the legacy jQuery frontend to React.",
      "Built a dApp connecting Solidity smart contracts to MetaMask for transaction signing.",
      "Real-time exchange-rate feeds, authentication flows and REST APIs for transaction management.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Solidity",
      "MetaMask",
      "Laravel",
      "Node.js",
      "Express",
    ],
    logo: "/images/companies/techtics.png",
  },
];

export const personalInfo = {
  name: "Kelvin You",
  title: "AI-native Software Engineer · Fintech Payments & Agent Systems",
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
  summary: `Software engineer on a production payment platform serving 9,000+ users at dtcpay — React and React Native at the front, Kotlin at the back: cross-currency batch payments, fail-closed PII masking, AML review workflows. Off the clock, multi-agent LLM systems on the Claude Agent SDK — MCP tool servers, agent debate, and walk-forward evals that grade past calls.`,
};

// The About section's proof row. These are the same facts the resume summary
// carries, reduced to three scannable figures — About stays voice-first while
// still standing on evidence, and neither text has to be kept in sync with the
// other by hand. Values are deliberately locale-neutral so only the short
// labels go through i18n (`sections.about_proof_*`).
export const aboutProofPoints: {
  value: string;
  labelKey: "about_proof_1" | "about_proof_2" | "about_proof_3";
}[] = [
  { value: "9,000+", labelKey: "about_proof_1" },
  // The positioning is agent-first, so one of the three proof slots has to
  // be an agent number. All three used to be payments figures.
  { value: "4 agents", labelKey: "about_proof_2" },
  { value: "RN + Kotlin", labelKey: "about_proof_3" },
];

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
      "Final year project — an offline-first travel guide app, built as a two-person team",
      "Earned the Finexus (fintech) internship on university recommendation",
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
    // Ordered as an argument, not by date: the architecture, then the result it
    // produced, then the two method posts that make the result checkable.
    blogSlugs: [
      "why-my-analysts-argue-before-answering",
      "signal-loses-to-buy-and-hold",
      "deflated-sharpe-and-the-strategy-search",
      "outcome-memory-lookahead-bias",
      "from-impressive-table-to-evidence-first",
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
    blogSlugs: [
      "the-one-rule-my-agent-cannot-override",
      "an-agent-that-audits-my-other-agents",
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
    // `why-i-wont-put-agentic-ai-on-my-resume` belongs here rather than under
    // Personal-OS: the subject is this file's own skill tiers, not the agents.
    blogSlugs: ["why-i-wont-put-agentic-ai-on-my-resume"],
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
    links: { repo: "https://github.com/KelvinYou/dspc-assignment" },
    access: "public",
    year: 2022,
    techStacks: ["Python", "Dask", "Threading"],
  },
  {
    title: "Credit Card Fraud Detection",
    kind: "coursework",
    claim:
      "Fraud detection on a heavily imbalanced transaction set — the hard part is that 99% accuracy is what a model that predicts 'never fraud' scores, so Random Forest, KNN and decision trees are compared on recall, not accuracy.",
    links: { repo: "https://github.com/KelvinYou/ds-assignment" },
    access: "public",
    year: 2022,
    techStacks: ["Python", "scikit-learn", "pandas", "Jupyter"],
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
 * Every skill, carrying all three axes. This flat list is the single source of
 * truth; `skillGroups` (domain, for the resume) and `skillStack` (layer, for the
 * website) below are projections of it, so the two surfaces can present
 * different cuts without drifting apart.
 *
 * `depth` is not self-assessment — each value is checkable against data in this
 * same file. `shipped` means it appears in an `experiences[].skills` array or in
 * a project with paying users; `built` means a public repo of mine runs on it;
 * `coursework` means a 2022-23 assignment and nothing since; `gap` means
 * studied, never shipped.
 *
 * Three entries were dropped rather than re-tiered: "Agentic AI" (a buzzword
 * restatement of Multi-agent Systems + MCP, both of which are listed),
 * "AI-assisted Development" and "Prompt Engineering" (not falsifiable — the
 * same reason the soft-skills tab was deleted from the section).
 */
export const skillList: Skill[] = [
  // Production — dtcpay (9,000+ users), Simpletruss, PTIB (3 paying centres).
  { name: "TypeScript", domain: "core", layer: "interface", depth: "shipped" },
  { name: "React", domain: "core", layer: "interface", depth: "shipped" },
  {
    name: "React Native",
    domain: "core",
    layer: "interface",
    depth: "shipped",
  },
  { name: "Next.js", domain: "core", layer: "interface", depth: "shipped" },
  { name: "GraphQL", domain: "core", layer: "interface", depth: "shipped" },
  {
    name: "Apollo Client",
    domain: "core",
    layer: "interface",
    depth: "shipped",
  },
  { name: "Kotlin", domain: "core", layer: "server", depth: "shipped" },
  { name: "Spring Boot", domain: "core", layer: "server", depth: "shipped" },
  { name: "PostgreSQL", domain: "data", layer: "server", depth: "shipped" },
  { name: "Supabase", domain: "data", layer: "server", depth: "shipped" },
  { name: "Vercel", domain: "delivery", layer: "ops", depth: "shipped" },
  { name: "Git", domain: "tools", layer: "ops", depth: "shipped" },

  // My own systems — public repos, no paying users behind them.
  { name: "Python", domain: "core", layer: "server", depth: "built" },
  { name: "Node.js", domain: "core", layer: "server", depth: "built" },
  { name: "FastAPI", domain: "core", layer: "server", depth: "built" },
  {
    name: "LLM Integration (Claude API)",
    domain: "ai",
    layer: "ai",
    depth: "built",
  },
  { name: "Claude Agent SDK", domain: "ai", layer: "ai", depth: "built" },
  {
    name: "MCP (Model Context Protocol)",
    domain: "ai",
    layer: "ai",
    depth: "built",
  },
  { name: "Multi-agent Systems", domain: "ai", layer: "ai", depth: "built" },
  { name: "RAG", domain: "ai", layer: "ai", depth: "built" },
  { name: "Claude Code", domain: "tools", layer: "ai", depth: "built" },
  { name: "Docker", domain: "delivery", layer: "ops", depth: "built" },
  {
    name: "GitHub Actions (CI/CD)",
    domain: "delivery",
    layer: "ops",
    depth: "built",
  },
  { name: "Playwright", domain: "tools", layer: "ops", depth: "built" },

  // Coursework — 2022-23 capstone and assignments, nothing since.
  { name: "Flutter", domain: "core", layer: "interface", depth: "coursework" },
  { name: "Java", domain: "core", layer: "server", depth: "coursework" },
  { name: "Solidity", domain: "core", layer: "server", depth: "coursework" },
  { name: "Dask", domain: "core", layer: "server", depth: "coursework" },
  {
    name: "scikit-learn",
    domain: "data",
    layer: "server",
    depth: "coursework",
  },
  { name: "pandas", domain: "data", layer: "server", depth: "coursework" },
  { name: "Firebase", domain: "delivery", layer: "ops", depth: "coursework" },

  // Studied, never shipped. Rendered as a visible gap on the site and withheld
  // from the resume — a keyword there would read as a claim of experience.
  // Closing this is the current learning target, not a line to pad now.
  { name: "Go", domain: "core", layer: "server", depth: "gap" },
  { name: "Redis", domain: "data", layer: "server", depth: "gap" },
  { name: "AWS", domain: "delivery", layer: "ops", depth: "gap" },
  { name: "Kubernetes", domain: "delivery", layer: "ops", depth: "gap" },
];

/**
 * The domain cut, for the resume PDF. A one-page scan wants "does he have the
 * data layer" answered fast, and depth tiers on paper would read as hedging.
 *
 * Only `shipped` and `built` skills are listed: on a resume a bare keyword is
 * read as a claim of current experience, and the qualifier that makes a `gap`
 * or 2022-23 `coursework` entry honest only exists on the site. Coursework also
 * cost the page two wrapped lines it needs for content.
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
      .filter(
        (skill) =>
          skill.domain === domain &&
          (skill.depth === "shipped" || skill.depth === "built"),
      )
      .map((skill) => skill.name),
  }));

/**
 * The layer cut, for the website. Columns answer coverage in one glance — the
 * question a full-stack reader actually arrives with — and depth survives as a
 * per-item marker rather than as the grouping.
 *
 * This replaced the depth cut (`skillTiers`), which grouped 33 names into four
 * rows: correct, but it made the reader assemble "does he hold the server
 * layer" out of items scattered across three tiers.
 *
 * `proven` is ordered shipped-first so the strongest name in a column is the
 * first one read. `coursework` is split off rather than dropped — it belongs
 * under its column, but not in the scan path.
 *
 * Labels and proof lines are translated; look under `sections` for
 * `skills_layer_<layer>_label` and `skills_layer_<layer>_source`.
 */
type ProvenDepth = Extract<SkillDepth, "shipped" | "built">;

export const skillStack: {
  layer: SkillLayer;
  proven: readonly { name: string; depth: ProvenDepth }[];
  coursework: readonly string[];
}[] = (["interface", "server", "ai", "ops"] as const).map((layer) => {
  const inLayer = skillList.filter((skill) => skill.layer === layer);
  return {
    layer,
    proven: (["shipped", "built"] as const).flatMap((depth) =>
      inLayer
        .filter((skill) => skill.depth === depth)
        .map(({ name }) => ({ name, depth })),
    ),
    coursework: inLayer
      .filter((skill) => skill.depth === "coursework")
      .map(({ name }) => name),
  };
});

/** The one tier that stays a row of its own: a claim's absence, not a claim. */
export const skillGaps: readonly string[] = skillList
  .filter((skill) => skill.depth === "gap")
  .map(({ name }) => name);
