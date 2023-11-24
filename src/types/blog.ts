export type Author = {
  name: string;
  image?: string;
  designation?: string;
  contribution?: number;
};

// Define an union type for blog element kinds
type BlogElementType = 
  "header" | "paragraph" | "image" | "unordered_list" | "ordered_list" 
  | "quote" | "code" | "video" | "table" | "audio" | "image" | "link" | "divider";

// Define the BlogElement which can take any form out of the defined types
export interface BlogElement {
  // type: BlogElementType;
  type: string;
  content: Header | Paragraph | string | Image | string[] | Quote | Code | Video | Audio | Table | Link | Divider; 
}; // string for paragraph, Image for image, ListItem array for lists

export interface Header {
  text: string;
  level: number;
}

export interface Paragraph {
  text: string;
  keywords: string[];
}

export interface Quote {
  quote: string;
  author: Author;
}

export interface Code {
  code: string;
  language: string;
}

export interface Video {
  url: string;
  caption: string;
}

export interface Table {
  headers: string[];
  rows: string[][];
}

export interface Audio {
  url: string;
  caption: string;
}

// Define the Image type
export interface Image {
  url: string;
  alt: string;
}

export interface Link {
  url: string;
  text: string;
}

export interface Divider {
  // type: 'dashed' | 'solid';
  type: string;
  color: string;
}

// Define the Blog page type
export type BlogPage = {
  _id: string;
  title: string;
  paragraph: string;
  image?: string;
  elements: BlogElement[];
  author: Author[];
  relatedBlogIds: string[],
  tags: string[];
  createDate: string;
  modifyDate: string;
}