type mainMenu = {
  id: string;
  title: string;
  link?: string;
}

export const navLinks: mainMenu[] = [
  {
    id: "home",
    title: "Home",
    link: "/home",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];