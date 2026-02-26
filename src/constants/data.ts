import { getTotalWorkingExperiences } from "@/lib/utils";
import { Experience, Project } from "@/types";

export const domainPath = "https://kelvinyou.vercel.app";

export const experiences: Experience[] = [
  {
    title: "Frontend Engineer",
    company: "Simpletruss",
    companyUrl: "https://www.simpletruss.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Full-time",
    startDate: "2024-6-10",
    endDate: undefined,
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
      "Payment gateway systems. Legacy Java/JSP monolith, thousands of daily transactions.",
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
  title: "Frontend Engineer",
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
  summary: `Frontend Engineer who ships fast without breaking things. Built dashboards serving 1M+ users at Tencent/MiHoYo scale. ${getTotalWorkingExperiences(experiences)} specializing in performance (35% faster loads), architecture (GraphQL layers, component systems), and scale (500K-row tables at 60fps).

0→1 startups + enterprise experience. I know when to move fast and when to architect for growth.

Currently building SaaS with Next.js + Supabase. Exploring system design patterns and scalable architectures.`,
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
    title: "Zync - Meeting Scheduling SaaS",
    description:
      "Solving the $5B scheduling software market's core pain: the 30-minute meeting coordination dance. Built real-time availability sync (think Calendly + Doodle reimagined) with Stripe monetization. Target: 50% reduction in scheduling friction. Architected real-time sync engine handling 1000+ concurrent users with Supabase subscriptions. Integrated Stripe recurring billing with webhook-driven subscription lifecycle. Sub-200ms response times for availability checks through PostgreSQL query optimization and Redis caching.",
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
    title: "Personal Website",
    description:
      "Engineered a performant portfolio with Next.js App Router, MDX blog support, and ISR for optimal SEO. Achieved 95+ Lighthouse scores across all metrics. Features dynamic OG images and structured data for search visibility.",
    image: "/images/projects/portfolio.jpg",
    github: "https://github.com/KelvinYou/portfolio-website",
    demo: "https://kelvinyou.vercel.app/",
    status: "Maintaining",
    techStacks: ["Next.js", "TailwindCSS", "Shadcn", "React"],
    date: "2025-3-3",
    blogSlugs: ["personal-website"],
  },
  {
    title: "PTIB - Tuition Center Management SaaS",
    description:
      "Digitizing a 200-student tuition center running on spreadsheets. Problem: 5+ hours weekly on manual invoicing, attendance tracking, parent communication. Solution: Role-based SaaS (admin/teacher/parent portals) with Stripe recurring billing, QR code attendance, and automated notifications. Technical challenges: Multi-tenant architecture with row-level security in Supabase PostgreSQL. Stripe webhooks for subscription lifecycle and dunning management. Real-time attendance updates via Supabase subscriptions. Optimistic UI updates for instant feedback despite 200ms API latency. Result: Saved 5 hours/week on admin work. Generated first $500 MRR from 3 pilot centers.",
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
    title: "Travel Guide: Tourist App",
    description:
      "Final year capstone project: Built a cross-platform mobile app for tourists with real-time GPS tracking, offline-first architecture, and Firebase sync. Technical challenges: Handling 10MB+ map tiles for offline mode (implemented LRU cache with 100MB limit), optimizing battery drain from continuous location tracking (reduced polling from 1s → 10s intervals with geofencing), managing complex booking state machines across 5 screens. Architected custom state management using Provider pattern—chose this over Riverpod for simplicity. Presented to 50+ industry professionals, received commendation for UX design.",
    github: "https://github.com/KelvinYou/fyp_tour_guide_app",
    status: "Completed",
    techStacks: ["Flutter", "Dart", "Firebase"],
    date: "2023-11-14",
  },
  {
    title: "Restaurant Landing",
    description:
      "Pixel-perfect restaurant landing page built as a React learning project. Focused on performance: Lazy loaded images with Intersection Observer (saved 400KB initial load), implemented smooth scroll with CSS scroll-behavior (no heavy libraries), optimized Bootstrap to include only used components (1.2MB → 180KB bundle). Achieved 95+ Lighthouse performance score with sub-2s First Contentful Paint. Learned: How small optimizations compound—every 100ms matters for conversion rates.",
    image: "/images/projects/restaurant-landing.png",
    github:
      "https://github.com/KelvinYou/react-selflearn/tree/main/react-restaurant-landing",
    demo: "https://restaurant-landing-kelvinyou.vercel.app/",
    status: "Completed",
    techStacks: ["React", "Bootstrap"],
    date: "2023-2-21",
  },
  {
    title: "Automated Market-Making System",
    description:
      "Built a Uniswap V2-style constant-product AMM (x*y=k formula) as a blockchain course assignment. Implemented Solidity smart contracts for: liquidity pools with LP token minting, slippage protection (max 2% deviation), front-running prevention with deadline checks. Technical challenges: Handling integer overflow in Solidity 0.7 (used SafeMath library before 0.8's built-in checks), calculating square roots on-chain for LP tokens (implemented Babylonian method in assembly for gas efficiency). Integrated MetaMask for transaction signing, deployed to Rinkeby testnet. Cost: ~0.02 ETH in deployment gas. Learned: Every operation costs money—optimization is mandatory, not optional.",
    demo: "https://github.com/KelvinYou/amm-assignment",
    status: "Completed",
    techStacks: ["React", "Solidity", "Ethereum"],
    date: "2023-1-5",
  },
  {
    title: "Edge Detection System",
    description:
      "Parallelized image processing that took 45+ seconds per image on single thread. Implemented image chunking with Dask for distributed processing and Python threading for I/O operations. Achieved 8x speedup on 8-core machines, demonstrating Amdahl's Law in practice.",
    github:
      "https://github.com/KelvinYou/react-selflearn/tree/main/react-restaurant-landing",
    demo: "https://restaurant-landing-kelvinyou.vercel.app/",
    status: "Completed",
    techStacks: ["Python", "Dask", "Threading", "Classified"],
    date: "2022-9-23",
  },
  {
    title: "Donation System",
    description:
      "Data Structures & Algorithms course assignment: Built a donation management system from scratch in Java using custom-implemented doubly-linked list ADT (no ArrayList/LinkedList imports allowed). Achieved O(1) insertions/deletions at head/tail, O(n) for arbitrary position. Implemented bidirectional iteration, sorting (merge sort for linked lists), and search (binary search after sorting). Challenge: Managing pointers correctly—spent hours debugging null pointer exceptions and lost references. Learned: Why libraries exist, but also how they work under the hood. This assignment solidified my understanding of memory management and pointer manipulation.",
    github: "https://github.com/KelvinYou/dsa-assignment",
    status: "Completed",
    techStacks: ["Java"],
    date: "2023-2-21",
  },
  {
    title: "Travel Guide: Admin App",
    description:
      "Companion admin dashboard for the Travel Guide app. Built real-time content management with Firebase, image upload with compression, and analytics dashboard for tracking user engagement metrics.",
    github: "https://github.com/KelvinYou/fyp_admin_app",
    status: "Completed",
    techStacks: ["Flutter", "Dart", "Firebase"],
    date: "2022-12-17",
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
  languages: ["TypeScript", "JavaScript", "Java", "Go"],
  frameworks: [
    "Next.js",
    "React",
    "Express",
    "Node.js",
    "React Native",
    "Flutter",
  ],
  databases: ["PostgreSQL", "MySQL"],
  tools: ["Git", "Docker", "Postman", "Supabase"],
};
