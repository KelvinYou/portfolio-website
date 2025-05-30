"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { personalInfo } from "@/data";
import Image from "next/image";
import { cn } from "@/lib/utils";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AboutSection() {
  return (
    <section id="about" className="bg-muted/20 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            About Me
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative overflow-hidden rounded-lg"
          >
            <div className="absolute inset-0 z-10 -m-1 rounded-lg border border-primary/20" />
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-primary/20 to-secondary/20 blur-sm" />
            <Image
              src={personalInfo.profilePicture}
              alt="About Me"
              width={600}
              height={400}
              className="relative z-0 h-[400px] rounded-lg object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h3 className="mb-4 text-2xl font-semibold">My Journey</h3>
            <p className="mb-6 text-muted-foreground">{personalInfo.summary}</p>
            <p className="mb-6 text-muted-foreground">
              I specialize in front-end development with React and TypeScript,
              but I&apos;m also proficient with back-end technologies like
              Node.js and databases. I believe in writing clean, maintainable
              code and creating intuitive user experiences.
            </p>
            <div className="flex gap-2">
              <Link
                href="/resume"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full px-6",
                )}
              >
                <FileText className="mr-2 h-4 w-4" /> View Resume
              </Link>
              <Link
                href="/#contact"
                className={cn(buttonVariants(), "rounded-full px-6")}
              >
                <Mail className="mr-2 h-4 w-4" /> Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
