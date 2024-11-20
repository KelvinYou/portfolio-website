import { BlogElement } from "./blog";

export type ProjectType = {
  _id: string;
  name: string;
  description: string;
  techStacks?: string[];
  points: {
    value: string
  }[];
  tags?: { name: string; color: string; }[];
  images?: string[];
  elements?: BlogElement[];
  liveSiteLink?: string;
  sourceCodeLink?: string;
  relatedProjectIds?: string[],
  relatedBlogIds?: string[],
  platforms?: string[];
  date: string;
  projectCategory?: string;
  createDate: string;
  modifyDate: string;
}