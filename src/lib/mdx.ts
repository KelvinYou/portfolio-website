import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypeExternalLinks from "rehype-external-links";
import remarkSlug from "rehype-slug";

// Define the blog post type
export type Post = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags: string[];
    image?: string;
    author: string;
  };
  content: string;
  serializedContent: MDXRemoteSerializeResult;
};

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getPostSlugs() {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
      return [];
    }
    return fs
      .readdirSync(postsDirectory)
      .filter((file) => file.endsWith(".mdx"));
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${realSlug}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkSlug],
        rehypePlugins: [[rehypeExternalLinks, { target: "_blank" }]],
      },
      scope: data,
    });

    // Ensure all required frontmatter fields exist
    const frontmatter = {
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      tags: data.tags || [],
      image: data.image,
      author: data.author || "Anonymous",
    };

    return {
      slug: realSlug,
      frontmatter: frontmatter as Post["frontmatter"],
      content,
      serializedContent: mdxSource,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    throw error;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const slugs = getPostSlugs();
    if (slugs.length === 0) {
      return [];
    }

    const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

    return posts.sort(
      (post1, post2) =>
        new Date(post2.frontmatter.date).getTime() -
        new Date(post1.frontmatter.date).getTime(),
    );
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}
