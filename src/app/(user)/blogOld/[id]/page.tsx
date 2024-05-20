import React, { FC } from 'react'
import BlogDetail from './BlogDetail'
import BlogNotFound from './BlogNotFound';
import { getBlogs } from '@/services/blogService';

const BlogDetailPage = ({ params }: { params: { id: string} }) => {
  const blogDetail = getBlogs().find((blog) => blog._id === params.id);

  if (!blogDetail) {
    return (
      <>
        <BlogNotFound />
      </>
    )
  }

  return (
    <>
      <BlogDetail blogDetail={blogDetail} />
    </>
  )
}

export default BlogDetailPage