// Server Component
import { domainPath, personalInfo } from "@/data";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import BlogPostClient from "./client";

// Keep static generation settings
export const dynamic = "force-static";
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
      keywords: `blog, ${post.frontmatter.tags?.join(", ")}`,
      images: [
        post.frontmatter?.image
          ? post.frontmatter.image
          : "/images/projects/portfolio.jpg",
      ],
    };

    return {
      title: basicInfo.title,
      description: basicInfo.description,
      keywords: basicInfo.keywords,
      authors: [{ name: personalInfo.name, url: domainPath }],
      creator: personalInfo.name,
      openGraph: {
        title: basicInfo.title,
        description: basicInfo.description,
        url: `${domainPath}/blog/${params.slug}`,
        siteName: `${personalInfo.name}'s Blog`,
        images: basicInfo.images.map((image) => ({
          url: image,
          width: 1200,
          height: 630,
          alt: basicInfo.title,
        })),
        type: "article",
        article: {
          publishedTime: post.frontmatter.date,
          authors: [domainPath],
          tags: post.frontmatter.tags,
        },
      },
      twitter: {
        card: "summary_large_image",
        title: basicInfo.title,
        description: basicInfo.description,
        images: basicInfo.images,
        creator: personalInfo.name,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    const basicInfo = {
      title: "Blog Post Not Found | Kelvin You",
      description: "The requested blog post could not be found.",
    };

    return {
      title: basicInfo.title,
      description: basicInfo.description,
      openGraph: {
        title: basicInfo.title,
        description: basicInfo.description,
        url: `${domainPath}/blog/${params.slug}`,
        siteName: `${personalInfo.name}'s Blog`,
        images: ["/images/projects/portfolio.jpg"],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: basicInfo.title,
        description: basicInfo.description,
        images: ["/images/projects/portfolio.jpg"],
        creator: personalInfo.name,
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
