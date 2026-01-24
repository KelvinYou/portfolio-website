import { getTotalWorkingExperiences } from "@/lib/utils";
import { Experience, Project } from "@/types";

export const domainPath = "https://kelvinyou.vercel.app";

export const experiences: Experience[] = [
  {
    title: "Frontend Engineer",
    company: "Simpletruss Sdn Bhd",
    companyUrl: "https://www.simpletruss.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Full-time",
    startDate: "2024-6-10",
    endDate: undefined,
    description:
      "Leading frontend architecture for a property management SaaS serving enterprise clients. Own the component library, performance optimization, and API integration layer.",
    responsibilities: [
      "Architected and shipped a reusable React component library with Storybook documentation, reducing feature development time by 40%.",
      "Led mobile-first responsive implementation across the platform, partnering with design and backend teams.",
      "Drove performance improvements through lazy loading, code splitting, and optimized state management—cutting initial load time by 35%.",
      "Owned the GraphQL integration layer, ensuring type-safe data flow between frontend and backend services.",
    ],
    skills: [
      "React",
      "TypeScript",
      "GraphQL",
      "Material UI",
      "Git",
      "Jest",
      "Storybook",
    ],
    logo: "/images/companies/simpletruss.jpeg",
    projects: [
      {
        title: "LessenPro - Property Management SaaS",
        description:
          "Enterprise SaaS platform centralizing property management operations. Built scheduling engine, vendor coordination workflows, and maintenance tracking dashboards serving 500+ properties.",
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
    company: "Beyondsoft (Malaysia) Sdn. Bhd.",
    companyUrl: "https://www.beyondsoft.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Full-time",
    startDate: "2023-7-31",
    endDate: "2024-6-7",
    description:
      "Shipped data analytics features for Tencent's gaming division. Owned frontend modules consumed by game studios including MiHoYo (Genshin Impact). Drove cross-browser performance and enforced code quality standards.",
    responsibilities: [
      "Shipped 15+ frontend features for Databrain Global, a data platform used by Tencent and MiHoYo game studios.",
      "Owned performance optimization initiatives—achieved consistent sub-3s load times across data-heavy dashboards.",
      "Partnered directly with Tencent's engineering team on technical specs and design implementation.",
      "Enforced code quality through mandatory PR reviews, reducing production bugs by establishing testing standards.",
      "Containerized development environment with Docker, streamlining onboarding for new team members.",
    ],
    skills: [
      "React",
      "Redux",
      "Webpack",
      "MySQL",
      "GraphQL",
      "Jest",
      "Git",
      "Docker",
      "CI/CD",
      "TypeScript",
      "Go",
    ],
    logo: "/images/companies/beyondsoft.jpeg",
    blogSlugs: ["beyondsoft"],
    projects: [
      {
        title: "Databrain Global - Data Analysis Platform",
        description:
          "Enterprise data analytics platform serving Tencent, MiHoYo, and major game publishers. Built interactive dashboards processing millions of player events daily.",
        demo: "https://databrain-global.intlgame.com/",
        techStacks: ["React", "Umi.js", "Ant Design", "TypeScript", "Go"],
      },
    ],
  },
  {
    title: "Java Software Engineer (Internship)",
    company: "Finexus International Sdn. Bhd.",
    companyUrl: "https://www.finexusgroup.com/",
    location: "Kuala Lumpur, Malaysia",
    type: "Internship",
    startDate: "2023-2-1",
    endDate: "2023-7-31",
    description:
      "Enhanced fintech Java applications with new features and comprehensive test coverage. Streamlined deployment workflows and resolved critical production issues.",
    responsibilities: [
      "Extended legacy Java applications with new payment processing features, writing comprehensive unit and integration tests.",
      "Reduced deployment time by 50% through shell script automation and streamlined Tomcat configurations.",
    ],
    skills: [
      "Java",
      "Firebase",
      "Oracle SQL",
      "XML",
      "Servlets",
      "JavaServer Pages (JSP)",
      "Tomcat",
      "Linux",
      "Shell Scripting",
      "Jasper",
      "TortoiseSVN",
      "SOAP",
    ],
    logo: "/images/companies/finexus.png",
  },
  {
    title: "Software Engineer (Intern)",
    company: "Techtics Blockchain PLT",
    companyUrl: "https://www.techtics.io/",
    location: "Kuala Lumpur, Malaysia",
    type: "Internship",
    startDate: "2020-10-1",
    endDate: "2021-1-31",
    description:
      "Rebuilt legacy frontend in React, cutting maintenance overhead. Shipped a production blockchain dApp with MetaMask integration for secure crypto transactions.",
    responsibilities: [
      "Migrated legacy jQuery codebase to React, improving maintainability and enabling dynamic UI capabilities.",
      "Built and deployed a blockchain dApp integrating Solidity smart contracts with MetaMask for secure transaction signing.",
      "Implemented real-time exchange rate feeds, authentication flows, and RESTful APIs for transaction management.",
    ],
    skills: [
      "Laravel PHP",
      "PhpMyAdmin",
      "Typescript",
      "Javascript",
      "Solidity",
      "ReactJS",
      "NodeJS",
      "ExpressJS",
      "PuppeteerJS",
      "Git",
      "MetaMask",
    ],
    logo: "/images/companies/techtics.png",
  },
  {
    title: "Frontend Web Developer",
    company: "Jonvi Marketing Sdn. Bhd.",
    location: "Kuala Lumpur, Malaysia",
    type: "Full-time",
    startDate: "2019-1-1",
    endDate: "2019-5-20",
    description:
      "Shipped 2 production web applications and automated manual data workflows, saving 10+ hours weekly on repetitive tasks.",
    responsibilities: [
      "Delivered 2 production web apps end-to-end using HTML, CSS, JavaScript, PHP, and Bootstrap.",
      "Built API integrations for authentication and data CRUD operations.",
      "Automated data entry workflows with Python and Google Apps Script, eliminating 10+ hours of manual work weekly.",
    ],
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Php",
      "Python",
      "MySQL",
      "Git",
      "NodeJS",
      "Bootstrap",
      "Postman API",
    ],
    logo: "/images/companies/jonvi.png",
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
  summary: `Frontend Engineer with ${getTotalWorkingExperiences(experiences)} of hands-on experience building React applications at scale. Shipped data analytics platforms used by Tencent and MiHoYo. Specialized in TypeScript, performance optimization, and component architecture. Currently focused on full-stack development with Next.js and GraphQL.`,
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
      "Taken core courses for software development such as Data Structure and Algorithm in Java, Human-Computer Interaction, Graphics Programming, Distributed System and Parallel Computing. Exposed to technologies such as Mobile App Development, Blockchain App Development, Data Science through elective courses.",
    achievements: [
      "Dean's List",
      // "Best Graduate Research Award",
      // "AI Research Scholarship"
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
    title: "Availability Scheduling Platform (Zync)",
    description:
      "Built to eliminate the 30+ minute back-and-forth of scheduling meetings. Architected a real-time availability sync system using Supabase subscriptions, with Stripe integration for premium tier monetization. Targeting 50% reduction in scheduling friction.",
    status: "Focusing",
    techStacks: [
      "React.js",
      "Nest.js",
      "Supabase",
      "PostgreSQL",
      "Shadcn",
      "Stripe",
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
    title: "Tuition Management System (PTIB)",
    description:
      "Digitized operations for a tuition center managing 200+ students on spreadsheets. Built role-based access for admin/teachers/parents, automated recurring billing with Stripe, and real-time attendance tracking. Reduced admin workload by eliminating manual invoicing.",
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
      "Final year project: Built a cross-platform mobile app for tourists with real-time location services, offline map caching, and Firebase-powered itinerary sync. Implemented custom state management for complex booking flows.",
    github: "https://github.com/KelvinYou/fyp_tour_guide_app",
    status: "Completed",
    techStacks: ["Flutter", "Dart", "Firebase"],
    date: "2023-11-14",
  },
  {
    title: "Restaurant Landing",
    description:
      "Delivered a pixel-perfect, mobile-first landing page with smooth scroll animations and optimized asset loading. Focused on conversion-oriented layout with prominent CTAs.",
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
      "Implemented a constant-product AMM (x*y=k) smart contract for decentralized token swaps. Wrote Solidity contracts for liquidity provision with slippage protection, integrated MetaMask wallet connection, and deployed to Ethereum testnet.",
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
      "Designed and implemented a custom doubly-linked list ADT to handle CRUD operations for donation records with O(1) insertions and deletions. Demonstrated understanding of memory-efficient data structures.",
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
