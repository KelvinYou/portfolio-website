// Server Component
import { domainPath, personalInfo } from "@/constants";
import { PostBody } from "@/components/mdx";
import { extractToc, measureReading } from "@/lib/blog-content";
import {
  draftsVisible,
  getAdjacentPosts,
  getPostBySlug,
  getPostSlugs,
  type Post,
} from "@/lib/mdx";
import { ogImageFor, siteOgImage } from "@/lib/og";
import { notFound } from "next/navigation";
import { BlogPostClient } from "./client";

// Posts are MDX files in this repository, so a rendered page can only change
// when the bundle changes. The `revalidate = 3600` that used to sit here re-ran
// all 36 pages every hour and could not produce different output — the content
// it would re-read is the same content the build already read.
export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    // Slugs come from the filenames. This used to call `getAllPosts()`, which
    // compiles every post's MDX just to read the `slug` field off each result.
    return getPostSlugs().map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
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

    // Absolute, because crawlers resolve og:image without a document base.
    const ogImageUrl = ogImageFor({
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      tags: post.frontmatter.tags,
    });

    const basicInfo = {
      title: `${post.frontmatter.title} | Blog`,
      description: post.frontmatter.description,
      keywords: `blog, ${post.frontmatter.tags?.join(", ")}`,
      images: [post.frontmatter?.image ?? ogImageUrl],
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
        images: [siteOgImage.url],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: basicInfo.title,
        description: basicInfo.description,
        images: [siteOgImage.url],
        creator: personalInfo.name,
      },
    };
  }
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;

  let post: Post;
  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }

  // The slug is guessable and this route renders unknown params on demand, so
  // keeping drafts out of the listings does not keep them unpublished.
  if (post.frontmatter.draft && !draftsVisible) {
    notFound();
  }

  const { minutes, units } = measureReading(post.content);
  const { previous, next } = getAdjacentPosts(params.slug);

  // Outline and reading length are derived here rather than in the client:
  // the client used to re-scan the raw markdown with a regex that could not
  // tell a heading from a `#` comment inside a fenced code sample.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    keywords: post.frontmatter.tags,
    wordCount: units,
    author: { "@type": "Person", name: personalInfo.name, url: domainPath },
    publisher: { "@type": "Person", name: personalInfo.name, url: domainPath },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${domainPath}/blog/${params.slug}`,
    },
    ...(post.frontmatter.image && {
      image: `${domainPath}${post.frontmatter.image}`,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Values come from this repo's own frontmatter, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient
        frontmatter={post.frontmatter}
        slug={params.slug}
        toc={extractToc(post.content)}
        readingMinutes={minutes}
        previous={previous}
        next={next}
      >
        {/* Rendered here, in the server component, so the static HTML for this
            route actually contains the article. */}
        <PostBody source={post.content} />
      </BlogPostClient>
    </>
  );
}
