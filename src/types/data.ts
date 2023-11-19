

export interface Project {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  images?: string[];
  liveSiteLink?: string;
  sourceCodeLink?: string;
  platforms?: string[];
  date: string;
  projectCategory?: string;
  createDate: string;
  modifyDate: string;
}