"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Github, Mail, Linkedin, FileText, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';
import { cn } from "@/lib/utils";
import { useMotionValue } from "framer-motion";
import { personalInfo } from "@/data";

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
    { icon: <Github className="h-5 w-5" />, href: personalInfo.contact.github, color: "hover:bg-zinc-800 dark:hover:bg-zinc-700" },
    { icon: <Linkedin className="h-5 w-5" />, href: personalInfo.contact.linkedin, color: "hover:bg-blue-600" },
    { icon: <Mail className="h-5 w-5" />, href: `mailto:${personalInfo.contact.email}`, color: "hover:bg-red-500" },
    { icon: <FileText className="h-5 w-5" />, href: "/resume", color: "hover:bg-green-500" }
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
          {/* Enhanced Main Content with Modern UI */}
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 shadow-sm"
            >
              <div className="flex items-center justify-center p-1 rounded-full bg-background/50">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              {/* <p className="text-xs font-medium text-primary/80">Available for new opportunities</p> */}
              <p className="text-xs font-medium text-primary/80">Available for tech consulting</p>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1.0, 0.32, 1.0] }}
                >
                  <motion.span 
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-primary"
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: "200% 100%"
                    }}
                  >
                    Hi, I&apos;m {personalInfo.name}
                  </motion.span>
                </motion.div>
              </div>
              
              <div className="overflow-hidden h-[64px] sm:h-[72px] md:h-[80px] lg:h-[100px] mt-2">
                {isMounted && (
                  <TypeAnimation
                    sequence={[
                      'Full-Stack Developer',
                      1500,
                      'Software Engineer',
                      1500
                    ]}
                    wrapper="span"
                    speed={40}
                    repeat={Infinity}
                    className="text-foreground/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  />
                )}
              </div>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              <motion.p 
                className="text-lg md:text-xl mb-10 text-muted-foreground max-w-xl pr-8 leading-relaxed"
                style={{ textWrap: "balance" }}
              >
                I create <span className="text-foreground font-medium">elegant, user-focused</span> web 
                experiences with modern technologies. Passionate about turning complex problems into 
                <span className="text-foreground font-medium"> simple, intuitive</span> solutions.
              </motion.p>
              
              {/* Decorative element */}
              <motion.div 
                className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent rounded"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-3 sm:py-4 gap-2 group relative overflow-hidden shadow-lg shadow-primary/10 hover:shadow-primary/20 text-sm sm:text-base"
                asChild
              >
                <Link href="#projects">
                  <span className="relative z-10 font-medium">View Projects</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
                  
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.8 }}
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={cn(
                    "flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300",
                    "border border-border/30 text-muted-foreground",
                    "hover:border-primary/30 hover:text-primary hover:shadow-md hover:shadow-primary/5",
                    "bg-background/50 backdrop-blur-sm"
                  )}
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: "rgba(var(--primary), 0.08)",
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {social.icon}
                  <span className="sr-only">{social.icon}</span>
                  
                  {/* Subtle highlight effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* 3D Card */}
          <AnimatePresence>
            {isMounted && (
              <motion.div 
                className="relative perspective-1000 hidden lg:flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8, 
                  ease: [0.23, 1.0, 0.32, 1.0] // Improved easing curve for natural motion
                }}
                style={{
                  perspective: "1200px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="w-[400px] rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl p-6 shadow-xl overflow-hidden dark:shadow-indigo-500/30"
                  style={{
                    transformStyle: "preserve-3d",
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                    transition: "box-shadow 2s ease" // Smoother shadow transitions
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    rotateZ: 1,
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(0, 0, 0, 0.1)",
                      "0 30px 60px rgba(var(--primary), 0.2)",
                      "0 10px 30px rgba(0, 0, 0, 0.1)"
                    ],
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    // Make different properties animate at different speeds for more natural feel
                    boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {/* Glass morphism effect overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 dark:from-background/5 dark:to-background/10 pointer-events-none"></div> */}
                  
                  {/* Card header with improved layout */}
                  <motion.div 
                    className="flex items-center justify-between mb-8 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/80 to-indigo-500/80 p-0.5 relative overflow-hidden"
                        style={{ transform: "translateZ(40px)" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400,
                          damping: 20 // Smoother spring physics
                        }}
                      >
                        {/* Animated gradient border */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-500 to-primary opacity-80"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <Avatar className="w-full h-full border-2 border-background relative z-10">
                          <AvatarImage src={personalInfo.profilePicture} alt={personalInfo.name} />
                          <AvatarFallback className="bg-muted">{personalInfo.name.charAt(0)}{personalInfo.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <motion.div 
                        style={{ transform: "translateZ(30px)" }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ x: 3 }}
                      >
                        <h3 className="font-semibold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent text-balance">{personalInfo.name}</h3>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          <p className="text-xs text-muted-foreground">{personalInfo.title}</p>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="flex gap-1" 
                      style={{ transform: "translateZ(15px)" }}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 1.4, type: "spring", damping: 15 }}
                    >
                      {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((color, i) => (
                        <motion.div
                          key={i}
                          className={`w-2.5 h-2.5 rounded-full ${color} ring-2 ring-background`}
                          whileHover={{ 
                            scale: 1.6, 
                            rotate: 360,
                            transition: { type: "spring", stiffness: 400 } 
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  {/* Card content with improved code styling */}
                  {(() => {
                    const codeContent = {
                      skills: ["React", "TypeScript", "Next.js"],
                      passion: "I believe in writing clean, maintainable code and creating intuitive user experiences",
                      available: true
                    };
                    
                    return (
                      <motion.div 
                        className="mb-8 font-mono text-sm bg-muted/40 rounded-lg p-4 border border-border/30" 
                        style={{ transform: "translateZ(25px)" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                      >
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <motion.span className="text-pink-500 dark:text-pink-400 font-medium" whileHover={{ scale: 1.1 }}>const</motion.span>{" "}
                          <motion.span className="text-blue-500 dark:text-blue-400 font-medium" whileHover={{ scale: 1.1 }}>developer</motion.span> = {"{"}
                        </motion.div>
                        
                        <motion.div className="pl-6 mt-1" animate={{ x: [0, 2, 0] }} transition={{ duration: 3, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}>
                          <motion.div whileHover={{ x: 6, transition: { ease: "easeOut" } }}>
                            <motion.span className="text-purple-500 dark:text-purple-400">skills:</motion.span> [
                            <motion.div className="pl-6">
                              {codeContent.skills.map((skill, i) => (
                                <motion.span
                                  key={i}
                                  className="flex items-center"
                                  whileHover={{ x: 10, scale: 1.02 }}
                                >
                                  <motion.span
                                    className="text-green-500 dark:text-green-400 block"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                                  >
                                    &apos;{skill}&apos;{i < codeContent.skills.length - 1 ? "," : ""}
                                  </motion.span>
                                </motion.span>
                              ))}
                            </motion.div>
                            ],
                          </motion.div>
                          
                          <motion.div 
                            className="mt-2"
                            whileHover={{ x: 6, transition: { ease: "easeOut" } }}
                          >
                            <motion.span className="text-purple-500 dark:text-purple-400">passion:</motion.span>{" "}
                            <motion.span 
                              className="text-green-500 dark:text-green-400"
                              animate={{ opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              &apos;{codeContent.passion}&apos;
                            </motion.span>,
                          </motion.div>
                          
                          <motion.div 
                            className="mt-2"
                            whileHover={{ x: 6, transition: { ease: "easeOut" } }}
                          >
                            <motion.span className="text-purple-500 dark:text-purple-400">available:</motion.span>{" "}
                            <motion.span 
                              className="text-blue-500 dark:text-blue-400 font-bold"
                              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {String(codeContent.available)}
                            </motion.span>
                          </motion.div>
                        </motion.div>
                        <motion.div 
                          className="mt-1"
                          animate={{ x: [0, 1, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {"}"}
                        </motion.div>
                      </motion.div>
                    );
                  })()}
                  
                  {/* Card footer with improved button design */}
                  {/* <motion.div 
                    className="flex justify-end" 
                    style={{ transform: "translateZ(40px)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, ease: "easeOut" }}
                  >
                    <Button 
                      size="sm" 
                      className="rounded-full text-xs gap-1.5 group bg-gradient-to-r from-primary/90 to-indigo-500/90 hover:from-primary hover:to-indigo-500 shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                      asChild
                    >
                      <Link href="/resume">
                        <motion.span 
                          className="font-medium"
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          View Resume
                        </motion.span>
                        <motion.div
                          className="relative ml-0.5"
                          whileHover={{ 
                            x: 2,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div> */}
                  
                  {/* Enhanced decorative elements */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
                  
                  {[
                    { position: "top-0 right-0 -mt-2 -mr-2", gradient: "from-primary to-indigo-500", delay: 0 },
                    { position: "bottom-0 left-0 -mb-2 -ml-2", gradient: "from-indigo-500 to-primary", delay: 1.5 }
                  ].map((decoration, i) => (
                    <motion.div 
                      key={i}
                      className={`absolute ${decoration.position} w-5 h-5 rounded-full bg-gradient-to-r ${decoration.gradient} shadow-lg`}
                      style={{ transform: "translateZ(35px)" }}
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 1, 0.6],
                        rotate: i === 0 ? [0, 180, 360] : [360, 180, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        delay: decoration.delay, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Subtle light reflections */}
                  {/* <motion.div 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    animate={{
                      background: [
                        "linear-gradient(130deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 60%)",
                        "linear-gradient(130deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0) 50%)",
                        "linear-gradient(130deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0) 40%)",
                        "linear-gradient(130deg, rgba(255,255,255,0) 10%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0) 30%)",
                        "linear-gradient(130deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0) 20%)"
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  /> */}
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