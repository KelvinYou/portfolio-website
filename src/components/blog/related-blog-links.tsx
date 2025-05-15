"use client";

import { Button } from "@/components/ui/button";
import { Paths } from "@/enums";
import { Post } from "@/lib/mdx";
import { ExternalLink, LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface RelatedBlogLinksProps {
  blogSlugs?: string[];
}

export function RelatedBlogLinks({ blogSlugs }: RelatedBlogLinksProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blogSlugs || blogSlugs.length === 0) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();

        // Filter posts that match the blogSlugs
        const relatedPosts = data.filter((post: Post) =>
          blogSlugs.includes(post.slug),
        );

        if (isMounted) setPosts(relatedPosts);
      } catch {
        if (isMounted) setError("Failed to load blog posts");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, [blogSlugs]);

  if (isLoading) {
    return (
      <div className="text-xs text-muted-foreground">
        Loading related posts...
      </div>
    );
  }

  if (error || posts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {posts.map((post) => (
        <Button
          key={post.slug}
          variant="outline"
          size="sm"
          className="text-xs rounded-full group w-full sm:w-auto"
          asChild
        >
          <a
            href={`${Paths.Blog}/${post.slug}`}
            target="_blank"
            className="flex items-center justify-center sm:justify-start gap-1.5"
          >
            <LinkIcon className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{post.frontmatter.title}</span>
            <ExternalLink className="h-3 w-3 flex-shrink-0 hidden sm:inline ml-0.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Button>
      ))}
    </div>
  );
}
