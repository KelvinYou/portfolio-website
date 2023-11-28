import { 
  experienceIcon, 
  homeIcon 
} from "@/assets";

import { HOME_PATH, PROJECTS_PATH, RESUME_LINK, EXPERIENCES_PATH, SPACE_LINK } from "./routes";
import { Menu } from "@/types/menu";

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
    id: "experience",
    title: "Experiences",
    link: "/#experience",
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
    link: "/#project",
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

export const menuData: Menu[] = [
  {
    id: "home",
    title: "Home",
    path: HOME_PATH,
    newTab: false,
    submenu: [
      {
        id: "about",
        title: "About",
        path: "/#about",
        newTab: false,
      },
      {
        id: "experience",
        title: "Experiences",
        path: "/#experience",
        newTab: false,
      },
      {
        id: "project",
        title: "Projects",
        path: "/#project",
        newTab: false,
      },
    ]
  },
  {
    id: "blog",
    title: "Blogs",
    path: "/blog",
    newTab: false,
  },
  {
    id: "other",
    title: "Others",
    newTab: false,
    submenu: [
      {
        id: "resume",
        title: "Resume",
        path: RESUME_LINK,
      },
      {
        id: "growth-journey",
        title: "Growth Journey",
        path: "/growth-journey",
      },
      {
        id: "space",
        title: "Space",
        path: SPACE_LINK,
        newTab: true,
      },
    ]
  },
];