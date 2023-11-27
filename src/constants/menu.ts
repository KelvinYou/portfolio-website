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
    // path: HOME_PATH,
    newTab: false,
    submenu: [
      {
        id: "about",
        title: "About",
        path: "/#hero",
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
    id: "space",
    title: "Space",
    path: SPACE_LINK,
    newTab: true,
  },
  // {
  //   id: 33,
  //   title: "Blog",
  //   path: "/blog",
  //   newTab: false,
  // },
  // {
  //   id: 3,
  //   title: "Support",
  //   path: "/contact",
  //   newTab: false,
  // },
  // {
  //   id: 4,
  //   title: "Pages",
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 41,
  //       title: "About Page",
  //       path: "/about",
  //       newTab: false,
  //     },
  //     {
  //       id: 42,
  //       title: "Contact Page",
  //       path: "/contact",
  //       newTab: false,
  //     },
  //     {
  //       id: 43,
  //       title: "Blog Grid Page",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //     {
  //       id: 44,
  //       title: "Blog Sidebar Page",
  //       path: "/blog-sidebar",
  //       newTab: false,
  //     },
  //     {
  //       id: 45,
  //       title: "Blog Details Page",
  //       path: "/blog-details",
  //       newTab: false,
  //     },
  //     {
  //       id: 46,
  //       title: "Sign In Page",
  //       path: "/signin",
  //       newTab: false,
  //     },
  //     {
  //       id: 47,
  //       title: "Sign Up Page",
  //       path: "/signup",
  //       newTab: false,
  //     },
  //     {
  //       id: 48,
  //       title: "Error Page",
  //       path: "/error",
  //       newTab: false,
  //     },
  //   ],
  // },
];