export type Author = {
  name: string;
  image?: string;
  designation?: string;
  contribution?: number;
};

export interface ArticleElement {
  type: string;
  content: Header | Paragraph | string | Image | string[] | Quote | Code | Video | Audio | Table | Link | Divider; 
};

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