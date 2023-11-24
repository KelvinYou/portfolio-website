import { Header, Paragraph } from "@/types/blog"

// Type guard function to check if the content is of type Paragraph
export function isParagraphContent(content: any): content is Paragraph {
  return typeof content === 'object' && 'text' in content && 'keywords' in content;
}

// Type guard function to check if the content is of type Header
export function isHeaderContent(content: any): content is Header {
  return typeof content === 'object' && 'text' in content && 'level' in content;
}

export function isListContent(content: any): content is string[] {
  return Array.isArray(content) && content.every((item) => typeof item === 'string');
}
