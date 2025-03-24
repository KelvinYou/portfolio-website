"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeIn } from "../data";

export default function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10" />
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10" />
      
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="bg-background/70 backdrop-blur-md border border-border/40 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Enhance Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you need a ready-made template or a comprehensive SaaS solution, 
            we have the tools to help your business grow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="rounded-full">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 