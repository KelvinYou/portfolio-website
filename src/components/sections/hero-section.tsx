"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { useMotionValue } from "framer-motion";
import { personalInfo } from "@/constants";
import { SocialLinks } from "@/components/base/social-links";

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

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-32 md:py-40"
    >

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Enhanced Main Content with Modern UI but simplified animations */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 px-3 py-1.5"
            >
              <div className="flex items-center justify-center rounded-full bg-white/[0.05] p-1">
                <Sparkles className="h-3.5 w-3.5 text-[#00F0FF]" />
              </div>
              <p className="text-xs font-medium text-neutral-400">
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

            {/* Social links with cyan hover states */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <SocialLinks variant="icon-only" />
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
