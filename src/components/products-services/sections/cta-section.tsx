"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeIn } from "../data";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/10" />
      <div className="absolute inset-0 -z-10 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/40 bg-background/70 p-8 text-center backdrop-blur-md md:p-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Enhance Your Business?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Whether you need a ready-made template or a comprehensive SaaS
            solution, we have the tools to help your business grow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
