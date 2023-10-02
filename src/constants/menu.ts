import { 
  experienceIcon, 
  homeIcon 
} from "@/assets";

import { HOME_PATH, PROJECTS_PATH, RESUME_LINK, EXPERIENCES_PATH } from "./routes";

export type MainMenu = {
  id: string;
  title: string;
  subMenu?: SubMenu[];
  link?: string;
  newTab?: boolean;
  icon?: any;
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
    icon: homeIcon,
  },
  {
    id: "experiences",
    title: "Experiences",
    link: EXPERIENCES_PATH,
    icon: experienceIcon,
    subMenu: [
      {
        title: "All",
        link: "/exp?type=all",
      },
      {
        title: "Educations",
        link: "/exp?type=education",
      },
      {
        title: "Works",
        link: "/exp?type=works",
      }
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