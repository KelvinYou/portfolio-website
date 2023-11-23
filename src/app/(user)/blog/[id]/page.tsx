import React, { FC } from 'react'
import BlogDetail from './BlogDetail'
import blogs from "@/data/blogs.json";
import BlogNotFound from './BlogNotFound';

const BlogDetailPage = ({ params }: { params: { id: string} }) => {
  const blogDetail = blogs.find((blog) => blog._id === params.id);

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