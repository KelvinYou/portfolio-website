import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Blog | Kelvin You",
  description: "Thoughts, ideas, and developments in technology and programming",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Thoughts, ideas, and developments in technology and programming
          </p>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <Card key={post.slug} className="overflow-hidden border border-border/40 bg-muted/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <CardHeader>
                      <CardTitle className="text-2xl hover:text-primary transition-colors">
                        {post.frontmatter.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.frontmatter.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-muted/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4">
                        {post.frontmatter.description}
                      </CardDescription>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.frontmatter.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.frontmatter.author}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="ghost" size="sm" className="gap-1 pl-0 hover:pl-2 transition-all">
                        Read More <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 