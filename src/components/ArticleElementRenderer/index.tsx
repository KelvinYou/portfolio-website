import React from 'react'
import { ArticleElement } from './types';
import ArticleHeader from './components/ArticleHeader';
import ArticleImage from './components/ArticleImage';
import ArticleList from './components/ArticleList';
import ArticleParagraph from './components/ArticleParagraph';
import ArticleQuote from './components/ArticleQuote';
import { isParagraphContent, isHeaderContent, isListContent, isQuoteContent, isImageContent } from './utils/checkType';

interface ArticleElementRendererProps {
  elements: ArticleElement[];
}

const ArticleElementRenderer: React.FC<ArticleElementRendererProps> = ({ elements = [] }) => {
  return (
    <div>
      {elements.map((element, index) => {
        if (element.type === "paragraph" && isParagraphContent(element.content)) {
          return (
            <ArticleParagraph key={index} content={element.content} />
          );
        } else if (element.type === "header" && isHeaderContent(element.content)) {
          return (
            <ArticleHeader key={index} content={element.content} />
          );
        } else if (element.type === "unordered_list" && isListContent(element.content)) {
          return (
            <ArticleList key={index} content={element.content} />
          );
        } else if (element.type === "ordered_list" && isListContent(element.content)) {
          return (
            <ArticleList key={index} content={element.content} ordered={true} />
          );
        } else if (element.type === "quote" && isQuoteContent(element.content)) {
          return (
            <ArticleQuote key={index} content={element.content} />
          );
        } else if (element.type === "image" && isImageContent(element.content)) {
          return (
            <ArticleImage key={index} content={element.content} />
          );
        } else {
          return null;
        }
      })}
    </div>
  )
}

export default ArticleElementRenderer