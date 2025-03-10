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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 border border-primary/20 rounded-lg -m-1 z-10" />
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-lg blur-sm" />
            <Image
              src={personalInfo.profilePicture}
              alt="About Me"
              width={600}
              height={400}
              className="rounded-lg relative z-0 h-[400px] object-cover"
            />
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <p className="text-muted-foreground mb-6">
              {personalInfo.summary}
            </p>
            <p className="text-muted-foreground mb-6">
              I specialize in front-end development with React and TypeScript, but I&apos;m also proficient 
              with back-end technologies like Node.js and databases. I believe in writing clean, maintainable 
              code and creating intuitive user experiences.
            </p>
            <div className="flex gap-2">
              <Link href="/resume" className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6")}>
                <FileText className="mr-2 h-4 w-4" /> View Resume
              </Link>
              <Link href="/#contact" className={cn(buttonVariants(), "rounded-full px-6")}>
                <Mail className="mr-2 h-4 w-4" /> Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 