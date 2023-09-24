import {
  jonvi,
  techtics,
  finexus,
  beyondsoft,
} from "@/assets";

export type ExperienceType = typeof experiences;

// Experiences
export const experiences = [
  {
    title: "Frontend Web Developer",
    company_name: "Beyondsoft (Malaysia) Sdn. Bhd.",
    icon: beyondsoft,
    iconBg: "#FFF",
    date: "Aug 2023 - Today",
    points: [
    ],
    tools: [
      "ReactJS",
      "Git",
      // ""
    ],
  },
  {
    title: "Java Software Engineer Intern",
    company_name: "Finexus International Sdn. Bhd.",
    icon: finexus,
    iconBg: "#383E56",
    date: "Feb 2023 - Jul 2023",
    points: [
      "Focused on Java-based project maintenance, utilizing JSP and Tomcat. Conducted R&D for innovative features such as reusable custom dialogs and remote log file retrieval. Conducted comprehensive testing and documentation for quality assurance.",
      "Contributed to large-scale projects involving multiple teams, including frontend, backend, and mobile, fostering effective collaboration and coordination for successful project execution.",
      "Skilled in utilizing log files for debugging, adept at efficient web resource searching, and knowledgeable in SIT and UAT workflows.",
      "Proficient in deploying applications using Tomcat, SQLDeveloper, and FileZilla for streamlined server management and file transfer."
    ],
    tools: [
      "NextJS",
      "ReactJS",
      "Java for Android",
      "Firebase",
      "Oracle SQL",
      "XML",
      "JavaServer Pages (JSP)",
      "Linux",
      "Jasper",
      "TortoiseSVN"
    ],
  },
  {
    title: "Web Developer Intern",
    company_name: "Techtics Blockchain PLT",
    icon: techtics,
    iconBg: "#E6DEDD",
    date: "Oct 2020 - Jan 2021",
    points: [
      "Revitalized project's frontend using ReactJS for enhanced maintenance, modernization, and dynamic website capabilities.",
      "Developed a cutting-edge blockchain application utilizing ReactJS and Solidity to seamlessly integrate smart contracts with MetaMask for secure and streamlined transactions.",
      "Explored Laravel's router functionality, MVC architecture, ORM, events, listeners, and data seeding techniques for efficient database testing.",
      "Implemented key functionalities such as authentication, real-time exchange rate fetching, dynamic UI updates, and built APIs for seamless CRUD operations on transactions.",
    ],
    tools: [
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
      "MetaMask"
    ],
  },
  {
    title: "Web Developer Intern",
    company_name: "Jonvi Marketing Sdn. Bhd.",
    icon: jonvi,
    iconBg: "#E6DEDD",
    date: "Jan 2019 - May 2019",
    points: [
      "Master website design with HTML, CSS, JavaScript and some simple Bootstrap.",
      "Understand how to connect the frontend and backend through APIs.",
      "Explore HTTPS methods (GET, POST, DELETE, PUT) and practice testing with Postman. Learn how to call APIs in HTML or PHP files.",
      "Acquired Python scripting skills.",
      "Gained expertise in using Google Scripts to automate data entry tasks in Google Sheets.",
    ],
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "Php",
      "Python",
      "MySQL",
      "Git",
      "NodeJS",
      "Bootstrap",
      "Postman API"
    ],
  },
];