type Author = {
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
interface BlogElement {
  // type: BlogElementType;
  type: string;
  content: Header | Paragraph | string | Image | string[] | Quote | Code | Video | Audio | Table | Link | Divider; 
}; // string for paragraph, Image for image, ListItem array for lists

interface Header {
  text: string;
  level: number;
}

interface Paragraph {
  text: string;
  keywords: string[];
}

interface Quote {
  quote: string;
  author: string;
}

interface Code {
  code: string;
  language: string;
}

interface Video {
  url: string;
  caption: string;
}

interface Table {
  headers: string[];
  rows: string[][];
}

interface Audio {
  url: string;
  caption: string;
}

// Define the Image type
interface Image {
  url: string;
  alt: string;
}

interface Link {
  url: string;
  text: string;
}

interface Divider {
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
  tags: string[];
  createDate: string;
  modifyDate: string;
}