import { domainPath, personalInfo } from "@/data";
import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";
import BlogClient from "./blog-client";

export const metadata: Metadata = {
  title: `${personalInfo.name} | Blog`,
  description:
    "Thoughts, ideas, and developments in technology and programming",
  keywords: [
    "blog",
    "technology",
    "programming",
    "development",
    "ideas",
    "thoughts",
    "Kelvin You",
    "tech blog",
    "coding",
    "software engineering",
  ],
  authors: [{ name: personalInfo.name, url: domainPath }],
  creator: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} | Blog`,
    description:
      "Thoughts, ideas, and developments in technology and programming",
    url: `${domainPath}/blog`,
    siteName: `${personalInfo.name}'s Blog`,
    images: [
      {
        url: "/images/projects/portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Blog | Kelvin You",
      },
    ],
    type: "article",
  },
  twitter: {
    title: `${personalInfo.name} | Blog`,
    description:
      "Thoughts, ideas, and developments in technology and programming",
    images: ["/images/projects/portfolio.jpg"],
    card: "summary_large_image",
    creator: personalInfo.name,
  },
  alternates: {
    canonical: `${domainPath}/blog`,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${personalInfo.name}'s Blog`,
      url: `${domainPath}/blog`,
      author: {
        "@type": "Person",
        name: personalInfo.name,
        url: domainPath,
      },
    }),
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
