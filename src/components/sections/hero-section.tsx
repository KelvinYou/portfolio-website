"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Github, Mail, Linkedin, FileText, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';
import { cn } from "@/lib/utils";
import { useMotionValue } from "framer-motion";
import { resumeData } from "@/data/resume-data";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollYProgressSpring = useSpring(scrollYProgress, { stiffness: 300, damping: 40 });
  const opacity = useTransform(scrollYProgressSpring, [0, 0.5], [1, 0]);

  // Mouse parallax effect
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const blobX = useTransform(
    mouseX,
    [-0.5, 0.5],
    ["-15%", "15%"],
    { clamp: false }
  );
  
  const blobY = useTransform(
    mouseY,
    [-0.5, 0.5],
    ["-15%", "15%"],
    { clamp: false }
  );

  // Card parallax effect
  const cardRotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    ["7deg", "-7deg"]
  );
  
  const cardRotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    ["-7deg", "7deg"]
  );

  const socialIcons = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/yourusername", color: "hover:bg-zinc-800 dark:hover:bg-zinc-700" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/yourusername", color: "hover:bg-blue-600" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:your.email@example.com", color: "hover:bg-red-500" },
    { icon: <FileText className="h-5 w-5" />, href: "/resume", color: "hover:bg-emerald-600" }
  ];

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Modern gradient background with blur effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Primary background blur effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-background to-background/60"
          style={{ opacity }}
        />
        
        {/* Animated blob */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 bg-gradient-to-br from-primary/20 via-indigo-500/10 to-transparent rounded-full blur-3xl"
          style={{ x: blobX, y: blobY }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Secondary blobs */}
        <motion.div
          className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main content */}
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="flex items-center justify-center p-1 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-block">
                Hi, I&apos;m{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
                  {resumeData.name}
                </span>
              </span>
              <br />
              <span className="inline-block h-16 sm:h-20">
                {isMounted && (
                  <TypeAnimation
                    sequence={[
                      'Developer',
                      1000,
                      'Designer',
                      1000,
                      'Problem Solver',
                      1000
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-muted-foreground"
                  />
                )}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              I create elegant, user-focused web experiences with modern technologies. Transforming ideas into digital reality.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 group relative overflow-hidden"
                asChild
              >
                <Link href="#projects">
                  <span className="relative z-10">View Projects</span>
                  <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 group border-primary/20"
                asChild
              >
                <Link href="/resume">
                  <span>View Resume</span>
                  <FileText className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full bg-muted/30 backdrop-blur-sm transition-all duration-300",
                    "border border-border/50 text-muted-foreground hover:text-white",
                    social.color
                  )}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* 3D Card */}
          <AnimatePresence>
            {isMounted && (
              <motion.div 
                className="relative perspective-1000 hidden lg:flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="w-[380px] rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl p-6 shadow-xl dark:shadow-indigo-500/50"
                  style={{
                    transformStyle: "preserve-3d",
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-indigo-500 p-0.5"
                        animate={{ 
                          boxShadow: ["0 0 0 rgba(var(--primary), 0)", "0 0 20px rgba(var(--primary), 0.5)", "0 0 0 rgba(var(--primary), 0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <Avatar className="w-full h-full border-2 border-background">
                          <AvatarImage src="/your-photo.jpg" alt="{resumeData.name}" />
                          <AvatarFallback className="bg-muted">YN</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div style={{ transform: "translateZ(30px)" }}>
                        <h3 className="font-semibold">{resumeData.name}</h3>
                        <p className="text-xs text-muted-foreground">Software Developer</p>
                      </div>
                    </div>
                    <div className="flex gap-1" style={{ transform: "translateZ(15px)" }}>
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  {/* Card content */}
                  <div className="mb-6 font-mono text-sm" style={{ transform: "translateZ(25px)" }}>
                    <div className="mb-4">
                      <span className="text-pink-500 dark:text-pink-400">const</span>{" "}
                      <span className="text-blue-500 dark:text-blue-400">developer</span> = {"{"}
                    </div>
                    <div className="pl-4">
                      <div>
                        <span className="text-purple-500 dark:text-purple-400">skills:</span> [
                      </div>
                      <div className="pl-4">
                        <span className="text-green-500 dark:text-green-400">&apos;React&apos;</span>,{" "}
                        <span className="text-green-500 dark:text-green-400">&apos;TypeScript&apos;</span>,{" "}
                        <span className="text-green-500 dark:text-green-400">&apos;Next.js&apos;</span>,
                      </div>
                      <div>],</div>
                      <div className="mt-2">
                        <span className="text-purple-500 dark:text-purple-400">passion:</span>{" "}
                        <span className="text-green-500 dark:text-green-400">&apos;Creating amazing UI/UX&apos;</span>,
                      </div>
                      <div className="mt-2">
                        <span className="text-purple-500 dark:text-purple-400">available:</span>{" "}
                        <span className="text-blue-500 dark:text-blue-400">true</span>
                      </div>
                    </div>
                    <div className="mt-2">{"}"}</div>
                  </div>
                  
                  {/* Card footer */}
                  <div className="flex justify-end" style={{ transform: "translateZ(40px)" }}>
                    <Button 
                      size="sm" 
                      className="rounded-full text-xs gap-1 group"
                      asChild
                    >
                      <Link href="/resume">
                        <span>View Resume</span>
                        <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 w-4 h-4 rounded-full bg-primary" style={{ transform: "translateZ(35px)" }}></div>
                  <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-4 h-4 rounded-full bg-indigo-500" style={{ transform: "translateZ(35px)" }}></div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border border-muted/50 flex items-start justify-center p-1.5">
            <motion.div 
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ 
                y: [0, 14, 0],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 