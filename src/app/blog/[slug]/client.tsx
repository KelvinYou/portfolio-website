"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { MdxRemoteRender } from "@/components/mdx";
import Image from "next/image";
import type { Post } from "@/lib/mdx";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.3
    } 
  }
};

export default function BlogPostClient({ post }: { post: Post }) {
  const [readingTime, setReadingTime] = useState("5 min");
  
  useEffect(() => {
    const words = post.content.split(/\s+/).length;
    const time = Math.ceil(words / 200);
    setReadingTime(`${time} min read`);
  }, [post.content]);
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Back button with hover effect */}
          <motion.div variants={fadeInUp}>
            <Button 
              variant="ghost" 
              className="mb-8 group" 
              asChild
            >
              <Link href="/blog" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
                <span>Back to blogs</span>
              </Link>
            </Button>
          </motion.div>
          
          {/* Header section with animation */}
          <motion.div variants={fadeInUp} className="mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {post.frontmatter.title}
            </motion.h1>
            
            {/* Tags with staggered animation */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-4"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } }
              }}
            >
              {post.frontmatter.tags.map((tag: string) => (
                <motion.div 
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Badge 
                    variant="outline" 
                    className="bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Meta information with icons */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 text-muted-foreground"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary/70" />
                <span>{formatDate(post.frontmatter.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary/70" />
                <span>{post.frontmatter.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary/70" />
                <span>{readingTime}</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Featured image with animation */}
          {post.frontmatter.image && (
            <motion.div 
              className="mb-8 rounded-lg overflow-hidden shadow-lg"
              variants={fadeInUp}
              whileInView={{ scale: 1 }}
              initial={{ scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src={post.frontmatter.image} 
                alt={post.frontmatter.title} 
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
            </motion.div>
          )}
          
          {/* Article content */}
          <motion.article 
            className="prose prose-lg dark:prose-invert max-w-none"
            variants={fadeInUp}
          >
            <MdxRemoteRender mdxSource={post.serializedContent} mdxScope={{}} />
          </motion.article>
          
          {/* Share and comment section */}
          <motion.div 
            className="mt-12 pt-8 border-t border-border/40"
            variants={fadeInUp}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Share this article</h3>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-full" aria-label="Share on Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15" />
                  </svg>  
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full" aria-label="Share on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                  </svg>
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full" aria-label="Copy link">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Next/Previous blog navigation */}
          {/* <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            variants={fadeInUp}
          >
            <div className="p-4 border border-border/40 rounded-lg hover:bg-muted/10 transition-colors">
              <p className="text-xs text-muted-foreground mb-1">Previous article</p>
              <Link href="/blog" className="font-medium hover:text-primary transition-colors">
                Getting Started with Web Development
              </Link>
            </div>
            <div className="p-4 border border-border/40 rounded-lg hover:bg-muted/10 transition-colors text-right">
              <p className="text-xs text-muted-foreground mb-1">Next article</p>
              <Link href="/blog" className="font-medium hover:text-primary transition-colors">
                Advanced CSS Techniques
              </Link>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </div>
  );
} 