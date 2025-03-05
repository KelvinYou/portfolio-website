"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Menu, X, ChevronRight, Home, User, Briefcase, Code, Sparkles, GraduationCap, Send, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

// Define the navigation items with icons
const navItems = [
  { name: "Home", href: "/#home", icon: <Home className="h-4 w-4" /> },
  { name: "About", href: "/#about", icon: <User className="h-4 w-4" /> },
  { name: "Education", href: "/#education", icon: <GraduationCap className="h-4 w-4" /> },
  { name: "Experience", href: "/#experience", icon: <Briefcase className="h-4 w-4" /> },
  { name: "Projects", href: "/#projects", icon: <Code className="h-4 w-4" /> },
  { name: "Skills", href: "/#skills", icon: <Sparkles className="h-4 w-4" /> },
  { name: "Contact", href: "/#contact", icon: <Send className="h-4 w-4" /> },
];

// Navigation menu component for large screens
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(1000);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  
  const { scrollY } = useScroll();
  
  // Track if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Track window size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu if screen becomes large
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    // Set initial width
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Track scroll position for navbar styling
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Adjust the threshold based on screen size
    const threshold = isClient && windowWidth < 640 ? 30 : 50;
    setScrolled(latest > threshold);
  });
  
  // Track active section based on scroll position
  useEffect(() => {
    if (!isClient) return; // Skip if not client-side
    
    const sections = navItems.map(item => item.href.replace('/#', ''));
    
    const handleScroll = () => {
      // Adjust offset based on screen size and navbar height
      const offset = windowWidth < 640 ? 100 : 150;
      const scrollPosition = window.scrollY + offset;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowWidth, isClient]);
  
  // Get the document height on the client side only
  useEffect(() => {
    if (!isClient) return; // Skip if not client-side
    
    const updateScrollDistance = () => {
      setScrollDistance(
        document.documentElement.scrollHeight - window.innerHeight
      );
    };
    
    updateScrollDistance();
    window.addEventListener('resize', updateScrollDistance);
    return () => window.removeEventListener('resize', updateScrollDistance);
  }, [isClient]);
  
  // Calculate how many menu items to show based on screen width
  const getVisibleNavItems = () => {
    if (!isClient) return navItems.slice(0, 3); // Default for SSR
    if (windowWidth < 1024) return navItems.slice(0, 3);
    if (windowWidth < 1280) return navItems.slice(0, 5);
    return navItems;
  };
  
  // Items to show in the "More" dropdown on larger screens
  const moreItems = () => {
    if (!isClient) return navItems.slice(3); // Default for SSR
    if (windowWidth < 1024) return navItems.slice(3);
    if (windowWidth < 1280) return navItems.slice(5);
    return [];
  };
  
  const hasMoreItems = moreItems().length > 0;
  
  // Safe access to windowWidth
  const isMobile = isClient && windowWidth < 640;
  const isSmallScreen = isClient && windowWidth < 1024;
  const isTinyScreen = isClient && windowWidth < 400;
  const isVeryTinyScreen = isClient && windowWidth < 350;
  
  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? 
          "bg-background/90 backdrop-blur-lg shadow-md py-1 sm:py-2" : 
          "bg-background/50 backdrop-blur-sm py-2 sm:py-4"
      )}>
        <nav className="container mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo - responsive sizing */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link 
              href="#home" 
              className="flex items-center gap-1 sm:gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border border-primary/20">
                <AvatarImage src="/your-photo.jpg" alt="Your Name" />
                <AvatarFallback className="bg-primary/10 text-xs sm:text-sm">
                  YN
                </AvatarFallback>
              </Avatar>
              <motion.span 
                className="font-bold text-base sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Kelvin You
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Menu - Adaptive based on screen size */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-0.5 lg:gap-1">
                {getVisibleNavItems().map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link 
                      href={item.href} 
                      legacyBehavior 
                      passHref
                    >
                      <NavigationMenuLink 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "px-2 md:px-3 lg:px-4 py-1.5 text-xs lg:text-sm rounded-full transition-all",
                          activeSection === item.href.replace('/#', '') ? 
                            "bg-primary/10 text-primary font-medium" : 
                            "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <motion.div 
                          className="flex items-center gap-1 md:gap-2"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          {item.icon}
                          <span className={isSmallScreen ? "hidden lg:inline" : ""}>
                            {item.name}
                          </span>
                        </motion.div>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* More dropdown for extra items */}
                {hasMoreItems && (
                  <NavigationMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={cn(
                            "rounded-full text-xs lg:text-sm",
                            scrolled ? "py-1.5" : "py-2"
                          )}
                        >
                          <span className="hidden lg:inline">More</span>
                          <span className="lg:hidden">•••</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        {moreItems().map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link 
                              href={item.href} 
                              className="flex items-center gap-2"
                            >
                              {item.icon}
                              <span>{item.name}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions - Right side of navbar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 sm:gap-4"
          >
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="hidden md:flex">
              <Button 
                size={scrolled ? "sm" : isSmallScreen ? "sm" : "default"}
                className="rounded-full text-xs sm:text-sm group"
                asChild
              >
                <Link href="/resume">
                  <FileText className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
                  <span className={isSmallScreen ? "hidden lg:inline" : ""}>View Resume</span>
                </Link>
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={isMobile ? 16 : 20} />
            </Button>
          </motion.div>
        </nav>
        
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
          style={{ 
            scaleX: useTransform(scrollY, [0, scrollDistance || 1000], [0, 1])
          }}
        />
      </header>
      
      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b border-border/30">
                <Link 
                  href="#home" 
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-primary/20">
                    <AvatarImage src="/your-photo.jpg" alt="Your Name" />
                    <AvatarFallback className="bg-primary/10 text-xs sm:text-sm">YN</AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    YourName
                  </span>
                </Link>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={isMobile ? 20 : 24} />
                </Button>
              </div>
              
              <motion.div 
                className="flex-1 overflow-auto py-6 px-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.07,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                <div className={cn(
                  "space-y-3 sm:space-y-6",
                  isTinyScreen ? "grid grid-cols-2 gap-2 space-y-0" : ""
                )}>
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-lg transition-colors",
                          isTinyScreen 
                            ? "p-2 text-sm flex-col text-center gap-1" 
                            : "p-3 text-base sm:text-lg gap-2",
                          activeSection === item.href.replace('/#', '') ?
                            "bg-primary/10 text-primary font-medium" :
                            "text-foreground hover:bg-muted/50"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className={cn(
                          "rounded-full bg-background flex items-center justify-center",
                          isTinyScreen ? "w-8 h-8" : "w-10 h-10 mr-4"
                        )}>
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                        {!isTinyScreen && (
                          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <div className="p-4 border-t border-border/30 flex items-center justify-between">
                <ThemeToggle />
                <Button 
                  size={isTinyScreen ? "sm" : "default"}
                  className="rounded-full"
                  asChild
                >
                  <Link 
                    href="/resume"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="mr-2 h-4 w-4" /> 
                    <span className={isVeryTinyScreen ? "sr-only" : ""}>View Resume</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 