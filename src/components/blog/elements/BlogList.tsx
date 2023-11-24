import React from 'react';

interface BlogListProps {
  content: string[];
  ordered?: boolean; // New prop to indicate whether it's an ordered list
}

const BlogList: React.FC<BlogListProps> = ({ content, ordered = false }) => {
  const ListComponent = ordered ? 'ol' : 'ul';

  return (
    <ListComponent className={`mb-10 list-inside ${ordered ? 'list-decimal' : 'list-disc'} text-body-color`}>
      {content.map((text, index) => (
        <li
          key={index}
          className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg"
        >
          {text}
        </li>
      ))}
    </ListComponent>
  );
};

export default BlogList;
