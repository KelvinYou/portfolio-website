import { escapeRegExp } from '@/utils/textUtils';
import React from 'react';

interface HighlightTextProps {
  text: string;
  highlightedTexts?: string[] | undefined;
  className?: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text, highlightedTexts, className }) => {
  if (!highlightedTexts || highlightedTexts.length === 0) {
    return <span>{text}</span>;
  }

  const escapedHighlightedText = highlightedTexts.map(escapeRegExp);
  const parts = text.split(new RegExp(`(${escapedHighlightedText.join('|')})`, 'gi'));

  return (
    <>
      {parts.map((part, index) => (
        highlightedTexts.includes(part) ? (
          <span key={index} className={`text-on-primary font-bold ${className}`} >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      ))}
    </>
  );
};

export default HighlightText;
