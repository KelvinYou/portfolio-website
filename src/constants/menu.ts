import { HOME_PATH, PROJECTS_PATH, RESUME_LINK, WORKS_PATH } from "./routes";

type mainMenu = {
  id: string;
  title: string;
  link?: string;
  path?: string;
}

export const navLinks: mainMenu[] = [
  {
    id: "home",
    title: "Home",
    path: HOME_PATH,
  },
  {
    id: "works",
    title: "Works",
    path: WORKS_PATH,
  },
  {
    id: "projects",
    title: "Projects",
    path: PROJECTS_PATH,
  },
  {
    id: "resume",
    title: "Resume",
    link: RESUME_LINK,
  },
];