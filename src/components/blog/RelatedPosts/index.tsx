import React, { FC } from 'react'
import RelatedBlogCard from './RelatedBlogCard'
import { BlogPage } from '@/types/blog';

import blogs from "@/data/blogs.json";

interface RelatedPostsProps {
  relatedBlogIds: string[];
}

const RelatedPosts: FC<RelatedPostsProps> = (props) => {
  const { relatedBlogIds } = props;

  const relatedBlogs: BlogPage[] = blogs.filter((blog) => relatedBlogIds.includes(blog._id));

  return (
    <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
      <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
        Related Posts
      </h3>
      {relatedBlogs.length === 0 ? (
        <p className='p-8 text-body-color'>
          No related post ...
        </p>
      ) : (
        <ul className="px-8">
          {relatedBlogs.map((blog, index) => (
            <li key={index} className="pt-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
              <RelatedBlogCard
                blog={blog}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RelatedPosts