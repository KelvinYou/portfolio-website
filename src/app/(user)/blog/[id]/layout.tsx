import React from 'react'
import blogs from "@/data/blogs.json";

export async function generateMetadata({ params }: { params: { id: string} }) {

  const blogDetail = blogs.find((blog) => blog._id === params.id);

  if (!blogDetail) return {
    title: 'Kelvin You | Blog',
    // description: 'Kelvin You - Software Engineer | Explore my portfolio, projects, and learn more about my expertise in web development and technology solutions. Connect with a passionate developer.',
  }

  return {
    title: `${blogDetail.title}`,
    description: `${blogDetail.paragraph} by ${blogDetail.author[0].name}`,
    keywords: `blog, ${blogDetail.tags.join(",")}`,
    openGraph: {
      images: blogDetail.image,
    },
  };
}

const BlogLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>{children}</>
  )
}

export default BlogLayout