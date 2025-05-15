import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Clock, ImageIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: Post;
  index: number;
  viewMode: "grid" | "list";
}

export function PostCard({ post, index, viewMode }: PostCardProps) {
  const { frontmatter, slug } = post;
  const isList = viewMode === "list";

  // Extract a preview from the content
  const contentPreview =
    post.content
      .replace(/---(.|\n)*?---/, "")
      .replace(/#+\s.*\n/g, "")
      .replace(/!\[.*\]\(.*\)/g, "")
      .replace(/\[.*\]\(.*\)/g, "")
      .replace(/```(.|\n)*?```/g, "")
      .trim()
      .slice(0, 120) + "...";

  // Estimate reading time
  const readingTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        className={`group h-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-card/80 hover:bg-card
        ${isList ? "md:flex" : ""} border border-border/40 hover:border-border/80`}
      >
        <Link
          href={`/blog/${slug}`}
          className={`${isList ? "md:flex md:flex-row" : "flex flex-col"} h-full`}
        >
          {/* Featured image container */}
          <div
            className={`relative bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden
              ${isList ? "md:w-48 md:shrink-0" : "w-full"}
              ${isList ? "md:h-full" : "aspect-[16/10]"}
            `}
          >
            {/* Publication date chip */}
            <div className="absolute top-3 left-3 z-10">
              <Badge
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm text-xs font-medium px-2 py-1 shadow-sm"
              >
                {formatDate(frontmatter.date, "short")}
              </Badge>
            </div>

            {frontmatter.image ? (
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:saturate-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="text-center opacity-90">
                  <ImageIcon
                    className="h-10 w-10 mx-auto mb-2 text-primary/40"
                    strokeWidth={1.5}
                  />
                  <p className="text-xs italic line-clamp-2 text-muted-foreground max-w-[85%] mx-auto">
                    {contentPreview}
                  </p>
                </div>
              </div>
            )}

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>

          <div className="flex flex-col h-full flex-grow">
            <CardHeader className="p-4 pb-2">
              {/* Tags row */}
              <div className="mb-2 flex flex-wrap gap-1.5">
                {frontmatter.tags &&
                  frontmatter.tags
                    .slice(0, isList ? 3 : 2)
                    .map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-medium text-muted-foreground border-primary/20 px-1.5 py-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                {frontmatter.tags &&
                  frontmatter.tags.length > (isList ? 3 : 2) && (
                    <Badge
                      variant="outline"
                      className="text-xs border-primary/20 text-muted-foreground px-1.5 py-0"
                    >
                      +{frontmatter.tags.length - (isList ? 3 : 2)}
                    </Badge>
                  )}
              </div>

              {/* Post title */}
              <CardTitle className="leading-tight tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                {frontmatter.title}
              </CardTitle>

              {/* Post description */}
              <CardDescription
                className={`text-sm mt-1.5 text-muted-foreground/90 ${isList ? "line-clamp-2" : "line-clamp-2"}`}
              >
                {frontmatter.description || contentPreview}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-1 pb-2 mt-auto">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {/* Author info */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary/70" />
                    <span>{frontmatter.author}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary/70" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-1 pb-4 mt-auto">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-medium text-primary/80 hover:text-primary group-hover:underline decoration-primary/30 underline-offset-4 transition-all p-0"
                  >
                    Read article
                  </Button>
                  <ArrowRight className="h-3.5 w-3.5 text-primary/70 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </CardFooter>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}
