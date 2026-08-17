import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { measureReading } from "./blog-content";

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
    draft?: boolean;
  };
  /**
   * Raw markdown. There is no `serializedContent` any more: compilation moved
   * to `next-mdx-remote/rsc` at render time, so the loader no longer produces a
   * compiled bundle for every post and no compiled bundle crosses to the client.
   */
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src/content/blog");

// Drafts stay on disk and stay reviewable via `npm run dev`, but must not be
// reachable in production — filtering the listings is not enough, since the
// slug is guessable and the route renders unknown params on demand.
export const isDraft = (data: { draft?: boolean }) => data.draft === true;

// Dev renders drafts so they can be reviewed; anywhere else they 404.
export const draftsVisible = process.env.NODE_ENV !== "production";

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

    // Ensure all required frontmatter fields exist
    const frontmatter = {
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      tags: data.tags || [],
      image: data.image,
      author: data.author || "Anonymous",
      draft: data.draft === true,
    };

    return {
      slug: realSlug,
      frontmatter: frontmatter as Post["frontmatter"],
      content,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    throw error;
  }
}

export type PostMeta = {
  slug: string;
  frontmatter: Post["frontmatter"];
};

/**
 * What the listing needs and nothing more. The listing used to receive
 * `Post[]` — every post's raw markdown plus its compiled MDX — so that a
 * client component could count words and search bodies. That shipped the
 * entire blog to the browser to render none of it. Reading length is measured
 * here instead, and search runs over title/description/tags.
 */
export type PostIndexEntry = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingMinutes: number;
  /** Length in Latin-word equivalents, for sizing one post against another. */
  readingUnits: number;
};

export function getPostIndex(): PostIndexEntry[] {
  return getAllPostsMeta().map(({ slug, frontmatter }) => {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const { content } = matter(fs.readFileSync(fullPath, "utf8"));
    const { minutes, units } = measureReading(content);

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      description: frontmatter.description,
      tags: frontmatter.tags,
      readingMinutes: minutes,
      readingUnits: units,
    };
  });
}

export type AdjacentPosts = {
  /** The post published before this one — further back in the archive. */
  previous: PostMeta | null;
  /** The post published after this one. */
  next: PostMeta | null;
};

/**
 * Neighbours in publication order. `getAllPostsMeta` is newest-first, so the
 * older post sits at the higher index.
 */
export function getAdjacentPosts(slug: string): AdjacentPosts {
  const posts = getAllPostsMeta();
  const i = posts.findIndex((post) => post.slug === slug);

  if (i === -1) return { previous: null, next: null };

  return {
    previous: posts[i + 1] ?? null,
    next: posts[i - 1] ?? null,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  try {
    const slugs = getPostSlugs();
    if (slugs.length === 0) return [];

    return slugs
      .map((file) => {
        const realSlug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: realSlug,
          frontmatter: {
            title: data.title || "Untitled",
            date: data.date || new Date().toISOString(),
            description: data.description || "",
            tags: data.tags || [],
            image: data.image,
            author: data.author || "Anonymous",
            draft: data.draft === true,
          } as Post["frontmatter"],
        };
      })
      .filter(({ frontmatter }) => !frontmatter.draft)
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime(),
      );
  } catch (error) {
    console.error("Error getting all posts meta:", error);
    return [];
  }
}

/**
 * `getAllPosts` is gone. Every caller wanted metadata — slugs for
 * `generateStaticParams`, titles for the related-links API, dates for the
 * listing — and got every post's body read and compiled to obtain it. Use
 * `getAllPostsMeta`, `getPostIndex`, or `getPostSlugs` instead.
 */
