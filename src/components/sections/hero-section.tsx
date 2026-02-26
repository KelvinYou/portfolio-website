"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  FileText,
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { cn } from "@/lib/utils";
import { useMotionValue } from "framer-motion";
import { personalInfo } from "@/constants";

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
      className="geometric-bg relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* Vibrant block-based background with geometric patterns */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Bold gradient blocks */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Energetic geometric shapes */}
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pattern" />
        <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-pattern" style={{ animationDelay: '1s' }} />
        
        {/* Block pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
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
                Previously built data platforms at Tencent scale
              </p>
            </motion.div>

            {/* Vibrant block-based heading with large type */}
            <motion.h1
              className="hero-heading mb-8"
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
                      "Frontend Engineer",
                      2500,
                      "React Specialist",
                      2500,
                      "TypeScript Developer",
                      2500,
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
              <div>

              <p className="mb-10 max-w-xl pr-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                I build{" "}
                <span className="font-medium text-foreground">
                  high-performance React applications
                </span>{" "}
                that scale. From data platforms serving millions of users to
                SaaS products that
                <span className="font-medium text-foreground">
                  {" "}
                  drive real business outcomes
                </span>
                .
              </p>

              {/* Static decorative element instead of animated */}
                <div className="absolute -left-6 top-0 h-full w-1 rounded bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />
              </div>
                
            </motion.div>

            {/* CTA button section with clear hierarchy - Contact as primary for conversion */}
            <motion.div
              className="mb-8 flex flex-col gap-5 sm:flex-row sm:gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {/* Primary CTA - Bold block-based design */}
              <Button
                size="lg"
                className="group relative w-full gap-3 overflow-hidden rounded-lg bg-primary px-8 py-6 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/40 sm:w-auto sm:px-12 sm:py-7 sm:text-xl btn-bold-hover"
                asChild
              >
                <Link href="#contact">
                  <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
                  <span className="relative z-10">
                    Let&apos;s Talk
                  </span>
                </Link>
              </Button>

              {/* Secondary CTA - Vibrant outline */}
              <Button
                size="lg"
                variant="outline"
                className="group w-full gap-3 rounded-lg border-3 border-foreground bg-background px-8 py-6 text-lg font-bold transition-all duration-200 hover:-translate-y-2 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg sm:w-auto sm:px-12 sm:py-7 sm:text-xl"
                asChild
              >
                <Link href="#projects">
                  <span>View Projects</span>
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1 sm:h-7 sm:w-7" />
                </Link>
              </Button>
            </motion.div>

            {/* Enhanced social icons with proper touch targets */}
            <motion.div
              className="flex flex-wrap gap-4 sm:gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300",
                    /* Mobile: 48x48px for better touch targets, Desktop: 44x44px */
                    "h-12 w-12 sm:h-11 sm:w-11",
                    "border-2 border-border/40 text-muted-foreground",
                    "hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10",
                    "bg-background/60 backdrop-blur-md",
                    "transform transition-transform hover:-translate-y-1 hover:scale-110 active:scale-95",
                    "cursor-pointer", /* UX Pro Max: cursor-pointer for clickable elements */
                  )}
                  aria-label={social.href || "Social media link"}
                >
                  {social.icon}

                  {/* Premium highlight effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
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
