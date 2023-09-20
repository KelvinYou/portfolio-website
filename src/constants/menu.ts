import { HOME_PATH, PROJECTS_PATH, RESUME_LINK, WORKS_PATH } from "./routes";

type mainMenu = {
  id: string;
  title: string;
  link?: string;
  newTab?: boolean;
}

export const navLinks: mainMenu[] = [
  {
    id: "home",
    title: "Home",
    link: HOME_PATH,
  },
  {
    id: "works",
    title: "Works",
    link: WORKS_PATH,
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