import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
};

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getPostSlugs() {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
      return [];
    }
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${realSlug}`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Ensure all required frontmatter fields exist
    const frontmatter = {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || [],
      image: data.image,
      author: data.author || 'Anonymous',
    };

    return {
      slug: realSlug,
      frontmatter: frontmatter as Post['frontmatter'],
      content,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    throw error;
  }
}

export function getAllPosts(): Post[] {
  try {
    const slugs = getPostSlugs();
    if (slugs.length === 0) {
      return [];
    }
    
    const posts = slugs
      .map(slug => getPostBySlug(slug))
      .sort((post1, post2) => (new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date) ? -1 : 1));
    
    return posts;
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
} 