import React from 'react';
import { isParagraphContent, isHeaderContent, isListContent, isQuoteContent } from './config/checkType';
import BlogHeader from './elements/BlogHeader';
import BlogParagraph from './elements/BlogParagraph';
import { BlogElement } from '@/types/blog';
import BlogList from './elements/BlogList';
import BlogQuote from './elements/BlogQuote';

interface BlogElementRendererProps {
  elements: BlogElement[];
}

const BlogElementRenderer: React.FC<BlogElementRendererProps> = ({ elements }) => {
  return (
    <div>
      {elements.map((element, index) => {
        if (element.type === "paragraph" && isParagraphContent(element.content)) {
          return (
            <BlogParagraph key={index} content={element.content} />
          );
        } else if (element.type === "header" && isHeaderContent(element.content)) {
          return (
            <BlogHeader key={index} content={element.content} />
          );
        } else if (element.type === "unordered_list" && isListContent(element.content)) {
          return (
            <BlogList key={index} content={element.content} />
          );
        } else if (element.type === "ordered_list" && isListContent(element.content)) {
          return (
            <BlogList key={index} content={element.content} ordered={true} />
          );
        } else if (element.type === "quote" && isQuoteContent(element.content)) {
          return (
            <BlogQuote key={index} content={element.content} />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default BlogElementRenderer;
