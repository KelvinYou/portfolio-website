import { 
  experienceIcon, 
  homeIcon 
} from "@/assets";

import { HOME_PATH, PROJECTS_PATH, RESUME_LINK, EXPERIENCES_PATH, SPACE_LINK } from "./routes";

export type MainMenu = {
  id: string;
  title: string;
  subMenu?: SubMenu[];
  link: string;
  newTab?: boolean;
  icon?: any;
}

type SubMenu = {
  title: string;
  subMenu?: SubMenu[];
  link?: any;
}

export const navLinks: MainMenu[] = [
  {
    id: "home",
    title: "Home",
    link: HOME_PATH,
    icon: "Home",
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
  // {
  //   id: "resume",
  //   title: "Resume",
  //   link: RESUME_LINK,
  // },
  {
    id: "blog",
    title: "Blogs",
    link: "/blog",
  },
  {
    id: "space",
    title: "Space",
    link: SPACE_LINK,
    newTab: true,
  },
];