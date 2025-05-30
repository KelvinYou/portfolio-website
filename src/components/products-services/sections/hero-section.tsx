"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { fadeIn } from "../data";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/10" />
      <div className="absolute inset-0 -z-10 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="mb-6 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Products & Services
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            From ready-to-use templates to powerful subscription-based
            solutions, find the perfect tools to accelerate your business
            growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full" asChild>
              <a href="#templates">
                Explore Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              asChild
            >
              <a href="#saas">
                View SaaS Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
