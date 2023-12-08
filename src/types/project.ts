import { BlogElement } from "./blog";

export interface Project {
  _id: string;
  name: string;
  description: string;
  techStacks?: string[];
  tags?: { name: string; color: string; }[];
  images?: string[];
  elements?: BlogElement[];
  liveSiteLink?: string;
  sourceCodeLink?: string;
  relatedProjectIds?: string[],
  platforms?: string[];
  date: string;
  projectCategory?: string;
  createDate: string;
  modifyDate: string;
}