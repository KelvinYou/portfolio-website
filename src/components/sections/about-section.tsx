"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { personalInfo } from "@/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="about" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UnifiedSectionHeader
          title="About Me"
          subtitle="Learn more about my journey and what drives me as a developer"
        />

        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="group relative overflow-hidden rounded-lg"
            onMouseMove={handleMouseMove}
          >
            <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-[#00F0FF]/30 transition-all duration-500 z-10" />
            {/* Mouse spotlight effect */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
              style={{
                background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,240,255,0.08), transparent 40%)`,
              }}
            />
            <Image
              src={personalInfo.profilePicture}
              alt="About Me"
              width={600}
              height={400}
              className="relative h-[400px] rounded-lg object-cover"
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
            <div className="flex flex-wrap gap-3">
              <Link
                href="/resume"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full px-6 py-3 cursor-pointer",
                )}
                aria-label="View my resume and download PDF"
              >
                <FileText className="mr-2 h-4 w-4" aria-hidden="true" /> View Resume
              </Link>
              <Link
                href="/#contact"
                className={cn(buttonVariants(), "rounded-full px-6 py-3 cursor-pointer")}
                aria-label="Contact me via email or social media"
              >
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" /> Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
