import { domainPath, personalInfo } from "@/constants";
import { getPostIndex } from "@/lib/mdx";
import { ogImageFor } from "@/lib/og";
import { Metadata } from "next";
import { BlogClient } from "./blog-client";

const blogOgImage = ogImageFor({ title: "Writing" });

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
    images: [{ url: blogOgImage, width: 1200, height: 630, alt: "Blog" }],
    type: "article",
  },
  twitter: {
    title: `${personalInfo.name} | Blog`,
    description:
      "Thoughts, ideas, and developments in technology and programming",
    images: [blogOgImage],
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

export default function BlogPage() {
  // Metadata plus a measured reading length per post — not the post bodies.
  const posts = getPostIndex();

  return (
    <div className="min-h-screen bg-background pb-24 pt-28 text-foreground md:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BlogClient posts={posts} />
      </div>
    </div>
  );
}
