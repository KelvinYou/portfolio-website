import React from "react";
import { Header } from "@/types/blog";

const BlogHeader = ({ content }: { content: Header }) => {
  const { text, level } = content;

  // Map level to the corresponding HTML heading tag
  const headingTag = `h${Math.max(1, Math.min(level, 6))}`;

  return (
    React.createElement(
      headingTag,
      { className: "mt-5 font-xl mb-3 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight" },
      text
    )
  );
};

export default BlogHeader;