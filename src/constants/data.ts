import {
  mobile,
  backend,
  creator,
  web,

  jonvi,
  techtics,
  finexus,
  beyondsoft,
  tarumt,

  portfolio,
  restaurantLanding,
} from "@/assets";

export const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Flutter Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Blockchain Developer",
    icon: creator,
  },
];

export const socialMedia = [
  {
    name: "Github",
    link: "https://github.com/KelvinYou",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/kelvinyou2001/",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/kelvinyou0220/",
  },
]
export type PersonalDataType = typeof personalData;

export const personalData = {
  nickname: "Kelvin You",
  fullName: "Kelvin You Kok Eng",
  location: "Kuala Lumpur, Malaysia",
  email: "ykekelvin0220@gmail.com",
  phone: "+(60) 18 373-2752",
  birthDate: "2001-02-20",
  gender: "Male",
  socialMedia: [ {
    name: "Personal Website",
    link: "https://kelvinyou.vercel.app/"
  }, ... socialMedia],
};

export const strengths = [
  {
    name: "Self-taught Person",
    description: "Powered by Internet: Youtube, Github, Leetcode, etc",
  },
  {
    name: "Love to Code",
    description: "Love exploring more best practice, problem solving, clean code, code structure",
  },
  {
    name: "Problem Solving",
    description: "Can solve problem on time and love to provide idea to colleague due to the problems they faced",
  }
];

export const careerData = {
  role: "Full Stack Software Engineer",
  startCoding: "2018-12-20",
  desc: "I develop Web, Mobile and Blockchain App."
};

export const languages = [
  {
    name: "Mandarin",
    speak: 0.9,
    readAndWrite: 0.9,
  },
  {
    name: "Malay",
    speak: 0.7,
    readAndWrite: 0.8,
  },
  {
    name: "English",
    speak: 0.6,
    readAndWrite: 0.8,
  },
]

const techStack = {
  projectManagement: ['Jira'],
  frontend: ['React', 'NextJS'],
  backend: ['NodeJS', 'Express'],
  database: ['MongoDB', 'PostgreSQL'],
  mobile: ['Flutter'],
  versionControl: ['Git', 'Bitbucket'],
  cloud: ['Firebase'],
  // devOps: ['Docker', 'Jenkins'],
  languages: ['JavaScript', 'TypeScript'],
  tools: ['VS Code', 'Postman'],
};

// Experiences
export const workExperiences = [
  {
    id: "6",
    title: "Frontend Web Developer",
    companyName: "Beyondsoft (Malaysia) Sdn. Bhd.",
    companyUrl: "https://www.beyondsoft.com/",
    icon: beyondsoft,
    iconBg: "#FFF",
    date: "Aug 2023 - Today",
    startDate: "2023-8-7",
    endDate: null,
    points: [
    ],
    techStacks: [
      "ReactJS",
      "Git",
    ],
    experienceCategory: "work"
  },
  {
    id: "5",
    title: "Java Software Engineer Intern",
    companyName: "Finexus International Sdn. Bhd.",
    companyUrl: "https://www.finexusgroup.com/",
    icon: finexus,
    iconBg: "#383E56",
    date: "Feb 2023 - Jul 2023",
    startDate: "2023-2-1",
    endDate: "2023-7-31",
    description: "Finexus International Sdn Bhd is a dynamic and innovative technology company specializing in financial solutions.",
    points: [
      {
        value: "Revitalized and advanced Java-based projects by integrating innovative features and implementing a thorough testing regimen. ",
        highlightedTexts: [
          "Java-based",
          "features",
          "testing regimen",
        ],
      },
      {
        value: "Proficiently mastered debugging techniques, conducted efficient web resource searches, simplify application deployment processes, ensuring optimal project performance.",
        highlightedTexts: [
          "debugging",
          "web resource searches",
          "simplify",
          "performance"
        ],
      },
    ],
    techStacks: [
      "Java",
      "Firebase",
      "Oracle SQL",
      "XML",
      "JavaServer Pages (JSP)",
      "Tomcat",
      "Linux",
      "Jasper",
      "TortoiseSVN",
    ],
    experienceCategory: "work"
  },
  {
    id: "3",
    title: "Software Engineer Intern",
    companyName: "Techtics Blockchain PLT",
    companyUrl: "https://www.techtics.io/",
    icon: techtics,
    iconBg: "#E6DEDD",
    date: "Oct 2020 - Jan 2021",
    startDate: "2020-10-1",
    endDate: "2021-1-31",
    points: [
      {
        value: "Revitalized project's frontend using ReactJS for enhanced maintenance, modernization, and dynamic website capabilities.",
        highlightedTexts: [
          "ReactJS",
          "enhanced maintenance",
          "modernization",
          "dynamic website capabilities"
        ],
      },
      {
        value: "Developed a cutting-edge blockchain app utilizing ReactJS and Solidity to seamlessly integrate smart contracts with MetaMask for secure and streamlined transactions.",
        highlightedTexts: [
          "ReactJS and Solidity",
          // "seamlessly integrate smart contracts",
          // "secure and streamlined transactions",
        ],
      },
      {
        value: "Explored Laravel's router functionality, MVC architecture, ORM, events, listeners, and data seeding techniques for efficient database testing.",
        highlightedTexts: [
          "MVC",
          "ORM",
          "events, listeners",
          "data seeding",
        ],
      },
      {
        value: "Implemented key functionalities such as authentication, real-time exchange rate fetching, dynamic UI updates, and built APIs for seamless CRUD operations on transactions.",
        highlightedTexts: [
          "authentication",
          "real-time exchange rate fetching",
          "dynamic UI",
          "built APIs",
        ],
      },
    ],
    techStacks: [
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
    experienceCategory: "work",
  },
  {
    id: "1",
    title: "Frontend Web Developer",
    companyName: "Jonvi Marketing Sdn. Bhd.",
    icon: jonvi,
    iconBg: "#E6DEDD",
    date: "Jan 2019 - May 2019",
    startDate: "2019-1-1",
    endDate: "2019-5-20",
    description: "Jonvi Exchange elegantly provides a seamless platform for effortless buying, selling, and trading of digital assets, ensuring both convenience and robust security.",
    points: [
      {
        value: "Developed 2 web apps using HTML, CSS, JavaScript, PHP, and Bootstrap, with a focus on user-friendly design.",
        highlightedTexts: [
          "2 web apps",
        ],
      },
      {
        value: "Integrated front-end components to interact with API endpoints for authentication and CRUD operations.",
        highlightedTexts: [
          "interact with API endpoints",
        ],
      },
      {
        value: "Leveraged Python and Google Script to automate data tasks, including fetching, entry, and Excel file generation.",
        highlightedTexts: [
          "automate data tasks"
        ],
      },
    ],
    techStacks: [
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
    experienceCategory: "work",
  },
];

export const educations = [
  {
    id: "degree",
    title: "Bachelor (Hons) of Software Engineering",
    universityName: "Tunku Abdul Rahman University of Management and Technology",
    universityUrl: "https://tarc.edu.my/",
    icon: tarumt,
    iconBg: "#FFF",
    date: "Jun 2021 - Jul 2023",
    startDate: "2021-6-20",
    endDate: "2023-7-31",
    cgpa: "3.7200",
    description: "",
    points: [
      {
        value: "Taken core courses for software development such as Data Structure and Algorithm in Java, Human-Computer Interaction, Graphics Programming, Distributed System and Parallel Computing. ",
        highlightedTexts: [
          "Data Structure and Algorithm in Java", 
          "Human-Computer Interaction", 
          "Graphics Programming",
          "Distributed System and Parallel Computing"
        ],
      },
      {
        value: "Exposed to technologies such as Mobile App Development, Blockchain App Development, Data Science through elective courses.",
        highlightedTexts: [
          "Mobile App Development",
          "Blockchain App Development",
          "Data Science"
        ],
      },
      
      
    ],
    techStacks: [
      "Java",
      "C++",
      "TypeScript",
      "ReactJS",
      "Linux",
      "Python",
      "Git"
    ],
    experienceCategory: "education",
  },
  {
    id: "diploma",
    title: "Diploma in Computer Science",
    universityName: "Tunku Abdul Rahman University of Management and Technology",
    universityUrl: "https://tarc.edu.my/",
    icon: tarumt,
    iconBg: "#FFF",
    date: "May 2019 - Jun 2021",
    startDate: "2019-5-28",
    endDate: "2021-5-31",
    cgpa: "3.7200",
    description: "",
    points: [
      {
        value: "Basic Programming Concepts through various languages such as Object-Oriented Programming in Java, C, and Assembly Language.",
        highlightedTexts: ["Basic Programming Concepts"],
      },
      {
        value: "Mathematics courses included Algebra, Calculus, Statistics, Discrete Math.",
        highlightedTexts: ["Mathematics courses"],
      },
    ],
    techStacks: [
      "Java",
      "C++",
      "TypeScript",
      "ReactJS",
      "Linux",
      "Python",
      "Git"
    ],
    experienceCategory: "education",
  },
]

export const combinedExperiences = [...workExperiences , ...educations];

export const commonEducation = [
  {
    title: "Pure Science Class",
    start_date: "2014-1-1",
    end_date: "2018-12-6",
    school: "SMK Taman Desa",
    schoolUrl: "https://ms.wikipedia.org/wiki/Sekolah_Menengah_Kebangsaan_Taman_Desa,_Bandar_Country_Homes",
    description: "Pure science class, studied Chinese, Malay, English, Maths, Moral, Sejarah, Biology, Chemistry, Physic and Add Maths"
  },
  {
    title: "Pure Science",
    start_date: "2008-1-1",
    end_date: "2013-12-1",
    school: "SJK(C) Kundang",
    schoolUrl: "http://www.sjkckundang.edu.my/",
    description: ""
  },
]

export type ProjectType = typeof projects;

export const projects = [
  {
    id: 1,
    name: "My Portfolio",
    description: 
      "A self-introduction website. The place full of my love",
    tags: [
      {
        name: "NextJS",
        color: "blue-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "blue-text-gradient",
      },
    ],
    images: [portfolio],
    liveSiteLink: "https://kelvinyou.vercel.app/",
    platforms: ["Web"],
    date: "2023-10-02",
    projectCategory: "side_project",
  },
  {
    id: 2,
    name: "Travel Guide",
    description: 
      "Mobile application created using Flutter with dart as programming language",
    tags: [
      {
        name: "Flutter",
        color: "blue-text-gradient",
      },
      {
        name: "Firebase",
        color: "orange-text-gradient",
      },
    ],
    images: [],
    sourceCodeLink: "https://github.com/KelvinYou/fyp_tour_guide_app",
    platforms: ["Android", "iOS"],
    date: "2022-12-17",
    projectCategory: "school_project",
  },
  {
    name: "Restaurant Landing",
    description: 
      "Just to build an UI refer from Figma",
    tags: [
      {
        name: "ReactJS",
        color: "blue-text-gradient",
      },
      {
        name: "Bootstrap",
        color: "pink-text-gradient",
      },
    ],
    images: [restaurantLanding],
    liveSiteLink: "https://restaurant-landing-kelvinyou.vercel.app/",
    sourceCodeLink: "https://github.com/KelvinYou/react-selflearn/tree/main/react-restaurant-landing",
    platforms: ["Web"],
    date: "2023-2-21",
    projectCategory: "side_project",
  },
  {
    id: 3,
    name: "Automated Market-Making System",
    description: 
      "An assignment from Blockchain course which to build a liquidity pool using smart contract",
    tags: [
      {
        name: "ReactJS",
        color: "blue-text-gradient",
      },
      {
        name: "Solidity",
        color: "blue-text-gradient",
      },
    ],
    images: [],
    sourceCodeLink: "https://github.com/KelvinYou/amm-assignment",
    platforms: ["Web"],
    date: "2023-1-5",
    projectCategory: "school_project",
  },
  {
    name: "Edge Detection System",
    description: 
      "An assignment for the Distributed Systems and Parallel Computing course, Detecting edges in images. We also use tools like Threading, Dask, Classified, etc. to speed up the process",
    tags: [
      {
        name: "Python",
        color: "pink-text-gradient",
      },
    ],
    images: [],
    sourceCodeLink: "https://github.com/KelvinYou/dspc-assignment",
    platforms: [],
    date: "2022-9-23",
    projectCategory: "school_project",
  },
  {
    name: "Donation System",
    description: 
      "An assignment for the Data Structures and Algorithms course, create adt using doubly linked list",
    tags: [
      {
        name: "Java",
        color: "pink-text-gradient",
      },
    ],
    images: [],
    sourceCodeLink: "https://github.com/KelvinYou/dsa-assignment",
    platforms: ["Command Line"],
    date: "2022-9-9",
    projectCategory: "school_project",
  },
]

export const coCurricular = [
  {
    title: "Chinese Language Society",
    start_date: "2019-5-28",
    end_date: "2023-7-31",
    school: "Tunku Abdul Rahman University of Management and Technology",
    schoolUrl: "https://tarc.edu.my/",
    description: "Made friends and established connections with them, Learnt communication skills",
  },
  {
    title: "Chess Club",
    start_date: "2019-5-28",
    end_date: "2023-7-31",
    school: "Tunku Abdul Rahman University of Management and Technology",
    schoolUrl: "https://tarc.edu.my/",
    description: "Learnt how to solve chess tactics, Learnt time management.",
  },
]