import { BlogElement } from "./blog";


export interface Project {
  _id: string;
  name: string;
  description: string;
  tags?: { name: string; color: string; }[];
  images?: string[];
  elements?: BlogElement[];
  liveSiteLink?: string;
  sourceCodeLink?: string;
  platforms?: string[];
  date: string;
  projectCategory?: string;
  createDate: string;
  modifyDate: string;
}