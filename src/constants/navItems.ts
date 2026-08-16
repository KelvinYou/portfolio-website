import { NavItem, SectionItem } from "@/types";

/**
 * The homepage is one document. `sections` are positions inside it, measured
 * and drawn by the section index; `routes` are separate pages. They are
 * deliberately two lists — collapsing them into one is what made the old
 * navbar unreadable.
 */
export const sections: SectionItem[] = [
  { id: "home", labelKey: "home" },
  { id: "about", labelKey: "about" },
  { id: "skills", labelKey: "skills" },
  { id: "projects", labelKey: "projects" },
  { id: "experience", labelKey: "experience" },
  { id: "education", labelKey: "education" },
  { id: "contact", labelKey: "contact" },
];

export const routes: NavItem[] = [
  { name: "Blog", href: "/blog", labelKey: "blog" },
  { name: "Projects", href: "/projects", labelKey: "projects" },
];

export const resumeRoute = "/resume";
