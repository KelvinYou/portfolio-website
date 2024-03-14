const existing = {
  nickname: "Kelvin You",
  fullname: "Kelvin You Kok Eng",
  roles: ["Software Engineer", "Web & Mobile App Developer"],
  portfolio: {
    url: 'https://kelvinyou.vercel.app/',
  },
  contacts: [
    {
      type: 'location',
      icon: 'assets/images/resume/location.png',
      value: 'Kuala Lumpur, Malaysia',
    },
    {
      type: 'email',
      icon: 'assets/images/resume/mail.png',
      value: 'ykekelvin0220@gmail.com',
    },
    {
      type: 'phone',
      icon: 'assets/images/resume/phone.png',
      value: '+(60) 18 373-2752',
    },
    {
      type: 'person',
      icon: 'assets/images/resume/person.png',
      value: 'https://kelvinyou.vercel.app/',
    },
  ],
  languages: [
    {
      language: "Mandarin",
      score: 5,
    },
    {
      language: "Malay",
      score: 4,
    },
    {
      language: "English",
      score: 3,
    }
  ],
  programming: {
    languages: [
      {
        language: "JavaScript",
        score: 5,
      },
      {
        language: "TypeScript",
        score: 5,
      },
      {
        language: "Java",
        score: 4,
      },
    ],
    frameworks: [
      {
        framework: "ReactJS",
        version: "18",
        score: 5,
      },
      {
        framework: "NextJS",
        version: "13",
        score: 5,
      },
      {
        framework: "Flutter",
        score: 4,
      },
      {
        framework: "ExpressJS",
        score: 3,
      },
      {
        framework: "SSM (Spring, Spring Boot, MyBatis)",
        score: 3,
      },
    ],
  },
  workExps: [
    {
      role: "Java Software Engineering Intern",
      companyName: "Finexus International Sdn Bhd",
      companyUrl: "https://www.finexusgroup.com/",
      startAt: "2023-2-1",
      endAt: "2023-7-31",
      description: "",
      points: [
        "Focused on Java-based project maintenance, utilizing JSP and Tomcat. Conducted R&D for innovative features such as reusable custom dialogs and remote log file retrieval. ", 
        "Conducted comprehensive testing and documentation for quality assurance.",
      ],
      skills: ["ExpressJS", "ReactJS", "NextJS"]
    },
    {
      role: "Software Engineer (Intern)",
      companyName: "Techtics Blockchain PLT",
      companyUrl: "https://www.techtics.io/",
      startAt: "2020-10-1",
      endAt: "2021-1-31",
      description: "",
      points: [
        "Revitalized project's frontend using ReactJS for enhanced maintenance, modernization, and dynamic website capabilities.",
        "Developed a cutting-edge blockchain application utilizing ReactJS and Solidity to seamlessly integrate smart contracts with MetaMask for secure and streamlined transactions."
      ],
      skills: ["ExpressJS", "ReactJS", "Laravel"]
    }
  ],
  educations: [
    {
      title: "Bachelor of Software Engineering (Hons)",
      startAt: "2021-6-20",
      endAt: "2023-7-31",
      school: "Tunku Abdul Rahman University of Management and Technology",
      schoolUrl: "https://tarc.edu.my/",
      grade: 3.7200,
      description: "Taken core courses for software development such as Data Structure and Algorithm, Human-Computer Interaction, Agile Methodology Development. Exposed to technologies such as Mobile Application Development, Graphics Programming, Data Science through elective courses.",
    },
    {
      title: "Diploma in Computer Science",
      startAt: "2019-5-28",
      endAt: "2021-5-31",
      school: "Tunku Abdul Rahman University of Management and Technology",
      schoolUrl: "https://tarc.edu.my/",
      grade: 3.7439,
      description: "Basic Programming Concepts through various languages such as Object-Oriented Programming in Java, C, and Assembly Language. Mathematics courses included Algebra, Calculus, Statistics, Discrete Math."
    },
    {
      title: "Pure Science",
      startAt: "2014-1-1",
      endAt: "2018-12-6",
      school: "SMK Taman Desa",
      schoolUrl: "https://ms.wikipedia.org/wiki/Sekolah_Menengah_Kebangsaan_Taman_Desa,_Bandar_Country_Homes",
      description: "Pure science class, studied Chinese, Malay, English, Maths, Moral, Sejarah, Biology, Chemistry, Physic and Add Maths"
    },
  ],
  strengths: [
    {
      strength: "Self-taught Person",
      description: "Powered by Internet: Youtube, Github, Leetcode, etc",
    },
    {
      strength: "Love to Code",
      description: "Love exploring more best practice, problem solving, clean code, code structure",
    },
    {
      strength: "New Tech Lover",
      description: "Love to spend my free time to catch up with new technology",
    }
  ],
  cocuriculars: [
    {
      title: "Chinese Language Society",
      startAt: "2019-5-28",
      endAt: "2023-7-31",
      school: "Tunku Abdul Rahman University of Management and Technology",
      schoolUrl: "https://tarc.edu.my/",
      description: "Made friends and established connections with them, Learnt communication skills",
    },
    {
      title: "Chess Club",
      startAt: "2019-5-28",
      endAt: "2023-7-31",
      school: "Tunku Abdul Rahman University of Management and Technology",
      schoolUrl: "https://tarc.edu.my/",
      description: "Learnt how to solve chess tactics, Learnt time management.",
    },
  ],
  ModifiedDate: "2023-5-19",
};

const fromGpt = {
  "personalInfo": {
    "name": "John Doe",
    "address": "123 Main St, Anytown, CA 12345",
    "phone": "(123) 456-7890",
    "email": "john.doe@email.com",
    "portfolio": "https://johndoe.com",
    "github": "https://github.com/johndoe"
  },
  "summary": "Experienced software engineer with [CALCULATED_EXPERIENCE] years of experience in developing and maintaining web applications using React, Node.js, and Python. Skilled in agile methodologies, test-driven development, and continuous integration/deployment.",
  "skills": {
    "languages": ["JavaScript", "Python", "Java"],
    "webTechnologies": ["React", "Node.js", "Express", "HTML", "CSS"],
    "databases": ["MongoDB", "PostgreSQL", "MySQL"],
    "tools": ["Git", "Docker", "Kubernetes", "Jira", "Confluence", "Postman"]
  },
  "experience": [
    {
      "company": "Acme Inc.",
      "location": "San Francisco, CA",
      "title": "Senior Software Engineer",
      "startDate": "2019-03-01",
      "endDate": "Present",
      "responsibilities": [
        "Designed and developed new features for a large-scale e-commerce platform using React and Node.js",
        "Implemented RESTful APIs and integrated with various third-party services",
        "Optimized application performance and improved code quality through refactoring and testing"
      ]
    },
    {
      "company": "Beta Corp.",
      "location": "Los Angeles, CA",
      "title": "Software Engineer",
      "startDate": "2016-08-01",
      "endDate": "2019-02-28",
      "responsibilities": [
        "Developed and maintained a content management system using Python and Django",
        "Collaborated with cross-functional teams to gather requirements and implement new features",
        "Conducted code reviews and participated in agile ceremonies (standups, sprint planning, retrospectives)"
      ]
    }
  ],
  "education": [
    {
      "institution": "University of California, Berkeley",
      "degree": "Bachelor of Science in Computer Science",
      "graduationYear": 2016,
      "gpa": 3.8
    }
  ],
  "certifications": [
    {
      "name": "AWS Certified Solutions Architect - Associate",
      "issuingOrganization": "Amazon Web Services",
      "issueDate": "2022-05-01"
    }
  ],
  "projects": [
    {
      "name": "Personal Portfolio Website",
      "description": "Developed a responsive personal portfolio website using React and hosted on AWS S3",
      "technologies": ["React", "HTML", "CSS", "AWS S3"]
    }
  ]
}

const example = {
    "lang": "en",
    "techProfile": {
      "id": "rec9sOqORNMskTURz",
      "name": "Kelvin You Kok Eng",
      "nickname": "Kelvin You",
      "freelanceRole": "Software Consultant",
      "interests": [
        "problem solving",
        "clean code ",
        "web development",
        "api architecture"
      ],
      "location": "Peru",
      "website": "https://rcrd.space",
      "email": "ricardo.quiroz@pedidosya.com",
      "github": "https://github.com/rqbazan",
      "linkedin": "https://www.linkedin.com/in/rqbazan",
      "twitter": "https://twitter.com/rqbazan"
    },
    "techResume": {
      "id": "recNxIiI11AEqGBYr",
      "name": "EN - Soffware Engineer",
      "aboutMe": "Software Developer with +5 years of experience working on the frontend and backend side. I've worked with many technologies over the past years, now focused on the Web with Node.js, React, TypeScript, and GraphQL.",
      "published": true,
      "lang": "en",
      "langSkills": [
        {
          "id": "recTpOHHn2BeqGRUP",
          "name": "Spanish",
          "scoreLabel": "Native",
          "score": 5,
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        },
        {
          "id": "recfe8umspTPkDIYc",
          "name": "English",
          "scoreLabel": "Intermediate",
          "score": 3,
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        }
      ],
      "strengths": [
        {
          "id": "recwybFRNFP3O414U",
          "name": "Self-taught Person",
          "description": "Powered by Internet: Online Courses, Youtube, Blogs, etc.",
          "icon": "search",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        },
        {
          "id": "rec5Lg1zta2fW8yhC",
          "name": "Creative",
          "description": "Intelligence for sustainable solutions.",
          "icon": "puzzle",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        },
        {
          "id": "recdqRdiQAVbnApZE",
          "name": "Cooperative",
          "description": "Teamwork, with respect and passion for success.",
          "icon": "cog",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        }
      ],
      "keywords": "software,developer,javascript,nodejs",
      "primaryColor": "#fa0050",
      "workExperiences": [
        {
          "id": "reckmIvfl6DsDEaFt",
          "title": "Sr. Software Engineer",
          "company": "PedidosYa",
          "companyUrl": "https://www.linkedin.com/company/pedidosya/mycompany",
          "location": "Remote",
          "description": "PedidosYa is the leading delivery and quick commerce technology company in LATAM. Since 2014 it has been part of Delivery Hero.",
          "startAt": "2022-01-10",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        },
        {
          "id": "reckmIvfl6DsDEaFt",
          "title": "Frontend Lead Engineer",
          "company": "Riqra",
          "companyUrl": "https://www.linkedin.com/company/riqra/",
          "location": "Remote",
          "description": "Riqra is building an e-commerce suite dedicated to digitize the B2B sales in LATAM.",
          "startAt": "2020-07-01",
          "endAt": "2022-01-07",
          "lines": "I was the core maintainer for all the frontend applications, leading structural changes in our architecture. #Leadership\nI developed integrations with national and international payment systems. #Payments\nI started the E2E testing initiative for the Storefront. #Testing\n",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        },
        {
          "id": "recYuPM3hquiVvljs",
          "title": "Backend Node.js Engineer",
          "company": "VISA - VendeMás",
          "companyUrl": "https://www.vendemas.com.pe/",
          "location": "Remote",
          "description": "VendeMás provides technologies for middle-entry-level merchants, so they can accept payments with all the credit cards.",
          "startAt": "2020-03-01",
          "endAt": "2020-06-30",
          "lines": "I developed microservices using Apache Kafka and RabbitMQ for one main project of e-billing along with Close2U technology. #Backend\nI used TDD to develop high-level quality software, also good and modern software practices. #Testing\nI contributed to one C++ project about the encryption system used by mobile devices. #Security\n",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        },
        {
          "id": "recVCofW95QMMBDDR",
          "title": "Software Consultant",
          "company": "Freelance",
          "companyUrl": "https://rcrd.space/projects",
          "location": "Perú",
          "startAt": "2019-09-01",
          "endAt": "2022-01-01",
          "lines": "I provided consulting about modern software development practices, on topics ranging from prototyping to continuous deployment of a web application. #Workflows\nI developed web and mobile solutions using the Node.js ecosystem. #FullStack\nI taught about modern software development as a FullStack Node.js Developer. #DevTalks\n",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        },
        {
          "id": "rec6YYXDNBuMGR81l",
          "title": "Full Stack Node.js Developer",
          "companyUrl": "https://www.linkedin.com/company/riqra/",
          "company": "Riqra",
          "location": "Lima - Perú",
          "description": "Riqra is building an e-commerce suite dedicated to digitize the B2B sales in LATAM.",
          "startAt": "2018-02-01",
          "endAt": "2019-08-31",
          "lines": "I implemented the most recent version of the e-commerce platform, supporting different features for different customers in LATAM. #SaaS\nI contributed to the GraphQL API. ~300 deploys to production. #Backend\nI was the creator of the Hyperbola project, the integration server based on data flows. #Innovation\nI was the core maintainer of Truck, the React UI components library. ~100 components built from scratch. #DesignSystem\n",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        }
      ],
      "educationExperiences": [
        {
          "id": "recQ9AkZJa5RVLOIp",
          "title": "Computer Systems Engineering",
          "almaMater": "Universidad Privada del Norte",
          "startAt": "2013-03-01",
          "endAt": "2017-12-31",
          "location": "San Isidro, Trujillo, La Libertad, Perú",
          "lines": "In the field of Software Engineering\nCompetitive programming community Leader – ACM-ICPC Contestant\nI took CS courses like data structure, algorithms design & compilers\nI enjoyed learning programming basics from my masters. C++ & Python rocks!\n",
          "Tech Resumes": ["recNxIiI11AEqGBYr"]
        }
      ],
      "title": "Sr. Software Engineer",
      "createdAt": "2021-01-21"
    }
  }