import { getAllPosts } from "@/lib/mdx";
import BlogClient from "./blog-client";

export const metadata = {
  title: "Blog | Kelvin You",
  description: "Thoughts, ideas, and developments in technology and programming",
  keywords: "blog, technology, programming, development, ideas, thoughts",
  images: ['/images/projects/portfolio.jpg'],
  openGraph: {
    title: "Blog | Kelvin You",
    description: "Thoughts, ideas, and developments in technology and programming",
    keywords: "blog, technology, programming, development, ideas, thoughts",
    images: ['/images/projects/portfolio.jpg'],
  },
  twitter: {
    title: "Blog | Kelvin You",
    description: "Thoughts, ideas, and developments in technology and programming",
    keywords: "blog, technology, programming, development, ideas, thoughts",
    images: ['/images/projects/portfolio.jpg'],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BlogClient posts={posts} />
      </div>
    </div>
  );
} 