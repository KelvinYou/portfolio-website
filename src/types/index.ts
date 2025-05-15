import { Icons } from "@/components/icons";

export interface NavItem {
  name: string;
  href: string;
  icon: keyof typeof Icons;
}

export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: string;
  startDate: string;
  endDate?: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  logo: string;
  projects?: Project[];
  blogSlugs?: string[];
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  github?: string;
  demo?: string;
  status?: string;
  techStacks: string[];
  date?: string;
  blogSlugs?: string[];
}
