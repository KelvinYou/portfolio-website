import React, { FC } from 'react'
import RelatedBlogCard from './RelatedBlogCard'
import { BlogPage } from '@/types/blog';

import blogs from "@/data/blogs.json";
import { useRouter } from 'next/navigation';

interface RelatedPostsProps {
  relatedBlogIds: string[];
}

const RelatedPosts: FC<RelatedPostsProps> = (props) => {
  const { relatedBlogIds } = props;

  const relatedBlogs: BlogPage[] = blogs.filter((blog) => relatedBlogIds.includes(blog._id));
  
  const router = useRouter();

  return (
    <div className="bg-gray-dark mb-10 rounded-sm shadow-none">
      <h3 className="border-b  px-8 py-4 text-lg font-semibold  border-white border-opacity-10 text-white">
        Related Posts
      </h3>
      {relatedBlogs.length === 0 ? (
        <p className='p-8 text-body-color'>
          No related post ...
        </p>
      ) : (
        <ul className="">
          {relatedBlogs.map((blog, index) => (
            <li 
              key={index} 
              className="py-6 px-8 border-b border-white border-opacity-10 cursor-pointer"
              onClick={() => router.push(`/blog/${blog._id}`)}
            >
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