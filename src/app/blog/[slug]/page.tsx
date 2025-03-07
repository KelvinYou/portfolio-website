import { getPostBySlug, getAllPosts } from "@/lib/mdx";
// import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { MdxRemoteRender } from "@/components/mdx";

// MDX components - simplified for troubleshooting
// const components = {
//   // Remove complex components temporarily for troubleshooting
//   pre: (props: React.ComponentPropsWithoutRef<'pre'>) => <pre {...props} className="p-4 bg-muted/20 rounded-md overflow-auto my-4" />,
//   code: (props: React.ComponentPropsWithoutRef<'code'>) => <code {...props} className="bg-muted/30 px-1 py-0.5 rounded" />,
// };

// Make this page static to avoid client fetch errors
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

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
    return {
      title: `${post.frontmatter.title} | Blog`,
      description: post.frontmatter.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post Not Found", 
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;

  try {
    const post = await getPostBySlug(params.slug);
    
    return (
      <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Button variant="ghost" className="mb-8" asChild>
              <Link href="/blog" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to blogs
              </Link>
            </Button>
            
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-muted/30">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.frontmatter.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.frontmatter.author}</span>
                </div>
              </div>
            </div>
            
            {post.frontmatter.image && (
              <div className="mb-8 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={post.frontmatter.image} 
                  alt={post.frontmatter.title} 
                  className="w-full h-auto"
                />
              </div>
            )}
            
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <MdxRemoteRender mdxSource={post.serializedContent} mdxScope={{}} />
            </article>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
} 