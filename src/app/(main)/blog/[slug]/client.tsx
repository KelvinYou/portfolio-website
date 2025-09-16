"use client";

import { MdxRemoteRender } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/mdx";
import { formatDate, createSlug } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  List,
  Share2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export default function BlogPostClient({ post }: { post: Post }) {
  const [readingTime, setReadingTime] = useState("5 min");
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showToc, setShowToc] = useState(true);
  const tocRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = post.content.split(/\s+/).length;
    const time = Math.ceil(words / 200);
    setReadingTime(`${time} min read`);
  }, [post.content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -70% 0%" },
    );

    // Ensuring we're in client side
    if (typeof window !== "undefined") {
      // Add smooth scrolling behavior to the document
      document.documentElement.style.scrollBehavior = "smooth";

      const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      observer.disconnect();
      // Clean up the scroll behavior
      if (typeof window !== "undefined") {
        document.documentElement.style.scrollBehavior = "";
      }
    };
  }, []);

  // Enhanced TOC generation for more consistent ID matching
  const generateTOC = () => {
    // Extract headers from the markdown content
    const headers = post.content.match(/(#{1,6})\s+(.*?)$/gm) || [];

    const usedIds = new Set<string>();

    return headers.map((header) => {
      // Get level based on number of # symbols
      const level = (header.match(/^#+/) || [""])[0].length;

      // Extract the text content of the header
      let text = header.replace(/^#+\s+/, "").trim();

      // Process the text to handle markdown formatting in headers
      // Remove markdown formatting like **, *, `, etc.
      text = text
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
        .replace(/\*(.*?)\*/g, "$1") // Remove italic
        .replace(/`(.*?)`/g, "$1") // Remove code
        .replace(/\[(.*?)\]\(.*?\)/g, "$1"); // Remove links but keep text

      // Decode HTML entities for display text
      const displayText = text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/&copy;/g, "©")
        .replace(/&reg;/g, "®")
        .replace(/&trade;/g, "™");

      // Generate ID using the shared createSlug function for consistency
      let id = createSlug(text);

      // Ensure unique IDs by adding a counter if duplicate is found
      if (usedIds.has(id)) {
        let counter = 1;
        let uniqueId = `${id}-${counter}`;
        while (usedIds.has(uniqueId)) {
          counter++;
          uniqueId = `${id}-${counter}`;
        }
        id = uniqueId;
      }

      usedIds.add(id);

      return { text: displayText, id, level };
    });
  };

  const handleTocItemClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // On mobile, optionally hide TOC after clicking
      if (window.innerWidth < 768) {
        setShowToc(false);
      }

      // Scroll to the element
      element.scrollIntoView({ behavior: "smooth" });

      // Set the active ID
      setActiveId(id);
    } else {
      console.log(`Element with id "${id}" not found`);
    }
  };

  const toc = generateTOC();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      <div className="relative pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main content area */}
            <motion.div
              className="lg:col-span-8 lg:col-start-2"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              ref={articleRef}
            >
              {/* Back button with enhanced styling */}
              <motion.div variants={fadeInUp}>
                <Button
                  variant="ghost"
                  className="mb-8 group hover:bg-muted/50 transition-all duration-200 rounded-full px-6"
                  asChild
                >
                  <Link href="/blog" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="font-medium">Back to blogs</span>
                  </Link>
                </Button>
              </motion.div>

              {/* Enhanced header section */}
              <motion.header variants={fadeInUp} className="mb-12">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {post.frontmatter.title}
                </motion.h1>

                {/* Enhanced description */}
                {post.frontmatter.description && (
                  <motion.p
                    className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {post.frontmatter.description}
                  </motion.p>
                )}

                {/* Enhanced tags with better animation */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-8"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {post.frontmatter.tags.map((tag: string) => (
                    <motion.div
                      key={tag}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, y: 10 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: { duration: 0.4 },
                        },
                      }}
                      whileHover={{
                        y: -2,
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-muted/30 to-muted/50 hover:from-muted/50 hover:to-muted/70 transition-all duration-200 border-border/50 hover:border-border text-sm px-3 py-1.5 font-medium"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced meta information */}
                <motion.div
                  className="flex flex-wrap items-center gap-8 text-muted-foreground bg-muted/20 rounded-2xl p-6 border border-border/30"
                  variants={fadeInUp}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">
                      {formatDate(post.frontmatter.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">
                      {post.frontmatter.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{readingTime}</span>
                  </div>
                </motion.div>
              </motion.header>

              {/* Enhanced hero image */}
              {post.frontmatter.image && (
                <motion.div
                  className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-border/20"
                  variants={fadeInUp}
                  whileInView={{ scale: 1 }}
                  initial={{ scale: 0.98 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </motion.div>
              )}

              {/* Enhanced Table of Contents (mobile) */}
              <motion.div
                variants={fadeInUp}
                className="lg:hidden mb-12"
                ref={tocRef}
              >
                <div className="p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl border border-border/30 backdrop-blur-sm">
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center mb-4 h-12 rounded-xl border-border/50 hover:bg-muted/50"
                    onClick={() => setShowToc(!showToc)}
                  >
                    <span className="flex items-center gap-3">
                      <List className="h-5 w-5" />
                      <span className="font-semibold">Table of Contents</span>
                    </span>
                    <span className="text-sm font-medium">
                      {showToc ? "Hide" : "Show"}
                    </span>
                  </Button>

                  {showToc && toc.length > 0 && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="space-y-3 text-sm">
                        {toc.map(({ text, id, level }) => (
                          <li
                            key={id}
                            className={`
                              transition-all duration-200
                              ${level === 2 ? "ml-4" : level === 3 ? "ml-8" : level >= 4 ? "ml-12" : ""}
                            `}
                          >
                            <button
                              onClick={() => handleTocItemClick(id)}
                              className={`
                                text-left block w-full px-4 py-2 rounded-xl hover:bg-muted/50 
                                transition-all duration-200 border-l-3 font-medium
                                ${activeId === id ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}
                              `}
                            >
                              {text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Enhanced article content */}
              <motion.article
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted/50 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-blockquote:border-l-primary/30 prose-blockquote:bg-muted/20 prose-blockquote:rounded-r-lg prose-blockquote:py-4"
                variants={fadeInUp}
              >
                <MdxRemoteRender
                  mdxSource={post.serializedContent}
                  mdxScope={{}}
                />
              </motion.article>

              {/* Enhanced share section */}
              <motion.div
                className="mt-16 pt-12 border-t border-gradient-to-r from-transparent via-border to-transparent"
                variants={fadeInUp}
              >
                <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl p-8 border border-border/30">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        Share this article
                      </h3>
                      <p className="text-muted-foreground">
                        Help others discover this content
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full h-12 w-12 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950 transition-all duration-200"
                        aria-label="Share on LinkedIn"
                        onClick={() =>
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                            "_blank",
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="text-blue-600"
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                        </svg>
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full h-12 w-12 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950 transition-all duration-200"
                        aria-label="Share on Facebook"
                        onClick={() =>
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                            "_blank",
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="text-blue-600"
                        >
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full h-12 w-12 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950 transition-all duration-200"
                        aria-label="Share on WhatsApp"
                        onClick={() =>
                          window.open(
                            `https://wa.me/?text=${encodeURIComponent(document.title)} \n ${encodeURIComponent(window.location.href)}`,
                            "_blank",
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="text-green-600"
                        >
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                        </svg>
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full h-12 w-12 hover:bg-muted/50 transition-all duration-200"
                        aria-label="Copy link"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast.success("Link copied to clipboard!");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Share2 className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced TOC Sidebar (desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:block lg:col-span-3"
            >
              <div className="sticky top-24 max-h-[calc(100vh-96px)] overflow-auto">
                <div className="p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl border border-border/30 backdrop-blur-sm shadow-lg">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <List className="h-5 w-5 text-primary" />
                    </div>
                    <span>Table of Contents</span>
                    <span className="text-xs text-muted-foreground ml-auto bg-muted/50 px-2 py-1 rounded-full">
                      {toc.length} items
                    </span>
                  </h2>

                  {toc.length > 0 ? (
                    <nav className="toc-nav">
                      <ul className="space-y-2 text-sm">
                        {toc.map(({ text, id, level }) => (
                          <li
                            key={id}
                            className={`
                              transition-all duration-200
                              ${level === 2 ? "ml-4" : level === 3 ? "ml-8" : level >= 4 ? "ml-12" : ""}
                            `}
                          >
                            <button
                              onClick={() => handleTocItemClick(id)}
                              className={`
                                text-left block w-full px-4 py-3 rounded-xl hover:bg-muted/50 
                                transition-all duration-200 border-l-3 font-medium
                                ${activeId === id ? "border-primary text-primary bg-primary/5 shadow-sm" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}
                              `}
                            >
                              {text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  ) : (
                    <p className="text-muted-foreground text-sm bg-muted/20 p-4 rounded-xl">
                      No headings found in this article.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
