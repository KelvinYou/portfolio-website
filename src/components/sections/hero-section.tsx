"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";
import {
  Github,
  Mail,
  Linkedin,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { cn } from "@/lib/utils";
import { useMotionValue } from "framer-motion";
import { personalInfo } from "@/data";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  // Mouse parallax effect
  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { left, top, width, height } =
          ref.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Card parallax effect
  const cardRotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);

  const cardRotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const socialIcons = [
    {
      icon: <Github className="h-5 w-5" />,
      href: personalInfo.contact.github,
      color: "hover:bg-zinc-800 dark:hover:bg-zinc-700",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: personalInfo.contact.linkedin,
      color: "hover:bg-blue-600",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: `mailto:${personalInfo.contact.email}`,
      color: "hover:bg-red-500",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      href: "/resume",
      color: "hover:bg-green-500",
    },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* Optimized background animations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Primary background - static gradient to improve performance */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/60" />
        {/* Static secondary blob */}
        <div className="absolute -right-1/4 top-1/2 h-1/2 w-1/2 rounded-full bg-gradient-to-bl from-blue-500/10 via-purple-500/10 to-transparent blur-3xl" />

        {/* Static grid pattern */}
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.02]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Enhanced Main Content with Modern UI but simplified animations */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-center justify-center rounded-full bg-background/50 p-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-xs font-medium text-primary/80">
                Available for tech consulting
                {/* Available for new opportunities */}
              </p>
            </motion.div>

            {/* Simplified heading animation */}
            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
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
                  <span
                    className="inline-block bg-gradient-to-r from-primary via-indigo-500 to-primary bg-clip-text text-transparent"
                    style={{ backgroundSize: "200% 100%" }}
                  >
                    Hi, I&apos;m {personalInfo.name}
                  </span>
                </motion.div>
              </div>

              {/* Type animation kept as it's a key engagement element */}
              <div className="mt-2 h-[64px] overflow-hidden sm:h-[72px] md:h-[80px] lg:h-[100px]">
                {isMounted && (
                  <TypeAnimation
                    sequence={[
                      "Full-Stack Developer",
                      2000, // Longer pause for better performance
                      "Software Engineer",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-3xl text-foreground/90 sm:text-4xl md:text-5xl lg:text-6xl"
                  />
                )}
              </div>
            </motion.h1>

            {/* Simplified paragraph section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <p className="mb-10 max-w-xl pr-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                I create{" "}
                <span className="font-medium text-foreground">
                  elegant, user-focused
                </span>{" "}
                web experiences with modern technologies. Passionate about
                turning complex problems into
                <span className="font-medium text-foreground">
                  {" "}
                  simple, intuitive
                </span>{" "}
                solutions.
              </p>

              {/* Static decorative element instead of animated */}
              <div className="absolute -left-6 top-0 h-full w-1 rounded bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />
            </motion.div>

            {/* Simplified button section */}
            <motion.div
              className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="group relative w-full gap-2 overflow-hidden rounded-full px-6 py-3 text-sm shadow-lg shadow-primary/10 hover:shadow-primary/20 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                asChild
              >
                <Link href="#projects">
                  <span className="relative z-10 font-medium">
                    View Projects
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" />

                  {/* Keep hover animation as it provides important user feedback */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </Link>
              </Button>
            </motion.div>

            {/* Simplified social icons section with minimal animations */}
            <motion.div
              className="flex gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
                    "border border-border/30 text-muted-foreground",
                    "hover:border-primary/30 hover:text-primary hover:shadow-sm",
                    "bg-background/50 backdrop-blur-sm",
                    "transform transition-transform hover:-translate-y-1 active:scale-95",
                  )}
                  aria-label={social.href || "Social media link"}
                >
                  {social.icon}

                  {/* Static highlight effect - pure CSS for better performance */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Optimized 3D Card */}
          <motion.div
            className="perspective-1000 relative hidden justify-center lg:flex lg:justify-end"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: "easeOut",
            }}
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="w-[400px] overflow-hidden rounded-2xl border border-border/50 bg-background/80 p-6 shadow-xl backdrop-blur-xl"
              style={{
                transformStyle: "preserve-3d",
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                transition: "box-shadow 2s ease",
              }}
              whileHover={{
                scale: 1.02,
                rotateZ: 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Card content with simplified animations */}
              {(() => {
                const codeContent = {
                  skills: ["Next.js", "TypeScript", "Go"],
                  passion:
                    "I believe in writing clean, maintainable code and creating intuitive user experiences",
                };

                return (
                  <motion.div
                    className="mb-8 rounded-lg border border-border/30 bg-muted/40 p-4 font-mono text-sm"
                    style={{ transform: "translateZ(25px)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                  >
                    <div>
                      <span className="font-medium text-pink-500 dark:text-pink-400">
                        const
                      </span>{" "}
                      <span className="font-medium text-blue-500 dark:text-blue-400">
                        developer
                      </span>{" "}
                      = {"{"}
                    </div>

                    <div className="mt-1 pl-6">
                      <div>
                        <span className="text-purple-500 dark:text-purple-400">
                          skills:
                        </span>{" "}
                        [
                        <div className="pl-6">
                          {codeContent.skills.map((skill, i) => (
                            <span key={i} className="flex items-center">
                              <span className="block text-green-500 dark:text-green-400">
                                &apos;{skill}&apos;
                                {i < codeContent.skills.length - 1 ? "," : ""}
                              </span>
                            </span>
                          ))}
                        </div>
                        ],
                      </div>

                      <div className="mt-2">
                        <span className="text-purple-500 dark:text-purple-400">
                          passion:
                        </span>{" "}
                        <span className="text-green-500 dark:text-green-400">
                          &apos;{codeContent.passion}&apos;
                        </span>
                        ,
                      </div>
                    </div>
                    <div className="mt-1">{"}"}</div>
                  </motion.div>
                );
              })()}

              {/* Simplified decorative elements */}
              <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-[0.03]"></div>

              {/* Reduced to just 2 decorative dots with simpler animations */}
              {[
                {
                  position: "top-0 right-0 -mt-2 -mr-2",
                  gradient: "from-primary to-indigo-500",
                  delay: 0,
                },
                {
                  position: "bottom-0 left-0 -mb-2 -ml-2",
                  gradient: "from-indigo-500 to-primary",
                  delay: 1.5,
                },
              ].map((decoration, i) => (
                <div
                  key={i}
                  className={`absolute ${decoration.position} h-5 w-5 rounded-full bg-gradient-to-r ${decoration.gradient} shadow-lg`}
                  style={{ transform: "translateZ(35px)" }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
