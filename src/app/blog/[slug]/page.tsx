// Server Component
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import BlogPostClient from "./client";
import { personalInfo } from "@/data";

// Keep static generation settings
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  try {
    const post = await getPostBySlug(params.slug);

    const basicInfo = {
      title: `${post.frontmatter.title} | Blog`,
      description: post.frontmatter.description,
      keywords: `blog, ${post.frontmatter.tags?.join(",")}`,
      images: [post.frontmatter?.image ? post.frontmatter.image : '/images/projects/portfolio.jpg'],
    }

    return {
      ...basicInfo,
      openGraph: {
        ...basicInfo,
      },
      twitter: {
        ...basicInfo,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post Not Found | Kelvin You", 
      description: "The requested blog post could not be found.",
      images: [personalInfo.profilePicture],
      openGraph: {
        title: "Blog Post Not Found | Kelvin You",
        description: "The requested blog post could not be found.", 
        images: [personalInfo.profilePicture],
      },
      twitter: {
        title: "Blog Post Not Found | Kelvin You",
        description: "The requested blog post could not be found.",
        images: [personalInfo.profilePicture],
      },
    };
  }
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;

  try {
    const post = await getPostBySlug(params.slug);
    return <BlogPostClient post={post} />;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
} 