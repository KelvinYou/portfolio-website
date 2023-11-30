import { Author, Header, Paragraph, Quote, Image } from "@/types/blog"

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

export function isQuoteContent(content: any): content is Quote {
  return (
    typeof content === 'object' &&
    'quote' in content &&
    'author' in content &&
    isAuthor(content.author) // Assuming you have a type guard for Author as well
  );
}

export function isAuthor(author: any): author is Author {
  return (
    typeof author === 'object' &&
    'name' in author &&
    (typeof author.name === 'string' || author.name === undefined) && // Optional property check
    (typeof author.image === 'string' || author.image === undefined) && // Optional property check
    (typeof author.designation === 'string' || author.designation === undefined) && // Optional property check
    (typeof author.contribution === 'number' || author.contribution === undefined) // Optional property check
  );
}

export function isImageContent(content: any): content is Image {
  return (
    typeof content === 'object' &&
    'url' in content &&
    'alt' in content
  );
}