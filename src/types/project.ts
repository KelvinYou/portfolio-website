import { BlogElement } from "./blog";

export type AppType = {
  _id: string;
  title: string;
  techStacks: string[];
  liveSiteLink?: string;
  sourceCodeLink?: string;
  platforms?: string[];
  date: string;
  createDate?: string;
  modifyDate?: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  tags?: { name: string; color: string; }[];
  images?: string[];
  elements?: BlogElement[];
  liveSiteLink?: string;
  sourceCodeLink?: string;
  includedApps?: AppType[];
  platforms?: string[];
  date: string;
  projectCategory?: string;
  createDate: string;
  modifyDate: string;
}