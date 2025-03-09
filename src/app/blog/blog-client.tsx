"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Search, SlidersHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import type { Post } from "@/lib/mdx";

type SortOption = "newest" | "oldest" | "az" | "za";

export default function BlogClient({ posts: initialPosts }: { posts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(initialPosts.flatMap(post => post.frontmatter.tags))
  ).sort();
  
  // Filter and sort posts whenever search, tags, or sort option changes
  useEffect(() => {
    let filteredPosts = [...initialPosts];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(
        post => 
          post.frontmatter.title.toLowerCase().includes(query) || 
          post.frontmatter.description.toLowerCase().includes(query)
      );
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      filteredPosts = filteredPosts.filter(post => 
        selectedTags.some(tag => post.frontmatter.tags.includes(tag))
      );
    }
    
    // Apply sorting
    filteredPosts.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
        case "oldest":
          return new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime();
        case "az":
          return a.frontmatter.title.localeCompare(b.frontmatter.title);
        case "za":
          return b.frontmatter.title.localeCompare(a.frontmatter.title);
        default:
          return 0;
      }
    });
    
    setPosts(filteredPosts);
  }, [initialPosts, searchQuery, selectedTags, sortOption]);
  
  // Toggle a tag in the selected tags list
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header section with animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Thoughts, ideas, and developments in technology and programming
        </p>
      </motion.div>
      
      {/* Search and filter section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem 
                  className={sortOption === "newest" ? "bg-muted/60" : ""}
                  onClick={() => setSortOption("newest")}
                >
                  Newest first
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={sortOption === "oldest" ? "bg-muted/60" : ""}
                  onClick={() => setSortOption("oldest")}
                >
                  Oldest first
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className={sortOption === "az" ? "bg-muted/60" : ""}
                  onClick={() => setSortOption("az")}
                >
                  Title (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={sortOption === "za" ? "bg-muted/60" : ""}
                  onClick={() => setSortOption("za")}
                >
                  Title (Z-A)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant={isFiltersOpen ? "default" : "outline"} 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
              {selectedTags.length > 0 && (
                <Badge variant="secondary" className="ml-1">{selectedTags.length}</Badge>
              )}
            </Button>
          </div>
        </div>
        
        {/* Tag filters */}
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="py-4 flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer hover:bg-muted/80 ${
                      selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "bg-muted/30"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="flex justify-end mb-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedTags([])}
                    className="text-xs"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Results summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6 text-sm text-muted-foreground"
      >
        Showing {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        {searchQuery && <span> for &quot;<span className="font-medium">{searchQuery}</span>&quot;</span>}
        {selectedTags.length > 0 && (
          <span> with tags: {selectedTags.map(tag => 
            <Badge key={tag} variant="outline" className="ml-1 mr-1 bg-muted/20">{tag}</Badge>
          )}</span>
        )}
      </motion.div>
      
      {/* Post grid with animations */}
      {posts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 border border-dashed border-border/40 rounded-lg"
        >
          <p className="text-muted-foreground">No matching blog posts found.</p>
          {(searchQuery || selectedTags.length > 0) && (
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedTags([]);
              }}
            >
              Clear all filters
            </Button>
          )}
        </motion.div>
      ) : (
        <motion.div 
          className="grid gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Card className="overflow-hidden border border-border/40 bg-muted/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {post.frontmatter.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.frontmatter.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-muted/30 group-hover:bg-muted/50 transition-colors">
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
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-primary/60" />
                        <span>{formatDate(post.frontmatter.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4 text-primary/60" />
                        <span>{post.frontmatter.author}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 pl-0 group-hover:pl-2 transition-all"
                    >
                      Read More <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
} 