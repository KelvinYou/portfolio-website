import { HOME_PATH, PROJECTS_PATH, RESUME_LINK, EXPERIENCES_PATH } from "./routes";

export type MainMenu = {
  id: string;
  title: string;
  subMenu?: SubMenu[];
  link?: string;
  newTab?: boolean;
}

type SubMenu = {
  title: string;
  subMenu?: SubMenu[];
  link?: string;
}

export const navLinks: MainMenu[] = [
  {
    id: "home",
    title: "Home",
    link: HOME_PATH,
  },
  {
    id: "experiences",
    title: "Experiences",
    link: EXPERIENCES_PATH,
    subMenu: [
      {
        title: "All",
        link: "/exp",
      },
      {
        title: "Works",
        link: "/exp?category=work",
      },
      {
        title: "Educations",
        link: "/exp?category=education",
      },
    ]
  },
  {
    id: "projects",
    title: "Projects",
    link: PROJECTS_PATH,
  },
  {
    id: "resume",
    title: "Resume",
    link: RESUME_LINK,
    newTab: true,
  },
];