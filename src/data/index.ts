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
      "Building reusable React component libraries, optimizing frontend performance, and integrating APIs for seamless user experiences.",
    responsibilities: [
      "Designed and implemented reusable React component libraries to streamline development processes and ensure UI consistency across projects.",
      "Collaborated with cross-functional teams to deliver responsive, mobile-first web app.",
      "Optimized frontend performance, reducing load times by implementing lazy loading and effective state management.",
      "Developed and integrated APIs with frontend interfaces, ensuring seamless data flow.",
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
          "A comprehensive SaaS platform designed to centralize and automate property management services, integrating scheduling, vendor coordination, and maintenance tracking for efficiency-driven operations.",
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
      "Developing and maintaining ReactJS-based web and mobile UIs, optimizing performance, and ensuring cross-browser compatibility. Collaborating with Tencent's team to implement designs, adding features based on user feedback, and upholding coding best practices through code reviews and Git-based version control.",
    responsibilities: [
      "Developed and maintain user interfaces for web & mobile apps using ReactJS.",
      "Optimized web applications for performance, cross-browser compatibility, and responsive design.",
      "Collaborated closely with Tencent's development team to understand project requirements and implement designs according to specifications.",
      "Implemented features and functionality based on user requirements and feedback.",
      "Participated in code reviews and Git-based version control to ensure high-quality code and maintainability.",
      "Utilized version control systems (Git) for collaborative development and code management.",
      "Utilized Docker for containerization and CI/CD pipelines for automated testing and deployment.",
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
          "A platform for analyzing games data for Tencent, MiHoYo, and other game companies.",
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
      "Enhancing Java-based projects with new features, rigorous testing, and optimized deployment. Mastering debugging, web resource searches, and performance improvements for seamless project execution.",
    responsibilities: [
      "Revitalized and advanced Java-based projects by integrating innovative features and implementing a thorough testing regimen.",
      "Proficiently mastered debugging techniques, conducted efficient web resource searches, simplify application deployment processes, ensuring optimal project performance.",
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
      "Modernizing frontend with ReactJS for improved maintenance and dynamic capabilities. Developing a blockchain app with ReactJS and Solidity, integrating smart contracts with MetaMask. Exploring Laravel's MVC, ORM, and event-driven architecture. Implementing authentication, real-time exchange rates, dynamic UI updates, and seamless CRUD APIs.",
    responsibilities: [
      "Revitalized project's frontend using ReactJS for enhanced maintenance, modernization, and dynamic website capabilities.",
      "Developed a cutting-edge blockchain app utilizing ReactJS and Solidity to seamlessly integrate smart contracts with MetaMask for secure and streamlined transactions.",
      "Explored Laravel's router functionality, MVC architecture, ORM, events, listeners, and data seeding techniques for efficient database testing.",
      "Implemented key functionalities such as authentication, real-time exchange rate fetching, dynamic UI updates, and built APIs for seamless CRUD operations on transactions.",
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
      "Developed two user-friendly web apps with HTML, CSS, JavaScript, PHP, and Bootstrap. Integrated front-end components with API endpoints for authentication and CRUD operations. Automated data tasks using Python and Google Script for efficient data fetching, entry, and Excel file generation.",
    responsibilities: [
      "Developed 2 web apps using HTML, CSS, JavaScript, PHP, and Bootstrap, with a focus on user-friendly design.",
      "Integrated front-end components to interact with API endpoints for authentication and CRUD operations.",
      "Leveraged Python and Google Script to automate data tasks, including fetching, entry, and Excel file generation.",
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
  title: "Software Engineer",
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
  summary: `Experienced software engineer with ${getTotalWorkingExperiences(experiences)} of experience in developing and maintaining web applications (includes all internships). Skilled in agile methodologies and CI/CD. I'm an INTP-T, nerd. I'm also passionate about blockchain, investing and chess.`,
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
    documents: [
      {
        name: "Transcript",
        url: "/pdf/educations/degree-transcript.pdf",
      },
    ],
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
    documents: [
      {
        name: "Transcript",
        url: "/pdf/educations/diploma-transcript.pdf",
      },
    ],
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
    title: "Personal Website",
    description:
      "A personal website built with Next.js, TailwindCSS, and Vercel",
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
      "Real world app for a local tuition center with Next.js, TailwindCSS, PostgreSQL, Stripe, and more",
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
      "Mobile application created using Flutter with dart as programming language",
    // image: "/project3.jpg",
    github: "https://github.com/KelvinYou/fyp_tour_guide_app",
    status: "Completed",
    techStacks: ["Flutter", "Dart", "Firebase"],
    date: "2023-11-14",
  },
  {
    title: "Restaurant Landing",
    description: "Build the landing page UI using ReactJS and Bootstrap",
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
      "An assignment from Blockchain course which to build a liquidity pool using smart contract",
    demo: "https://github.com/KelvinYou/amm-assignment",
    status: "Completed",
    techStacks: ["React", "Solidity", "Ethereum"],
    date: "2023-1-5",
  },
  {
    title: "Edge Detection System",
    description:
      "An assignment for the Distributed Systems and Parallel Computing course, Detecting edges in images. We also use tools like Threading, Dask, Classified, etc. to speed up the process",
    // image: "/images/projects/ecommerce.jpg",
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
      "An assignment for the Data Structures and Algorithms course, create adt using doubly linked list",
    github: "https://github.com/KelvinYou/dsa-assignment",
    status: "Completed",
    techStacks: ["Java"],
    date: "2023-2-21",
  },
  {
    title: "Travel Guide: Admin App",
    description:
      "Mobile application created using Flutter with dart as programming language",
    // image: "/images/projects/ecommerce.jpg",
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
