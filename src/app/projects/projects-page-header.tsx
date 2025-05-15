"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export function ProjectsPageHeader() {
  return (
    <motion.div
      className="mb-12"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
        variants={item}
      >
        Projects Portfolio
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-10 max-w-3xl text-lg"
        variants={item}
      >
        Browse through my complete collection of projects. Each one represents a
        unique challenge and demonstrates different skills and technologies
        I&apos;ve mastered.
      </motion.p>
    </motion.div>
  );
}
