"use client";

import { motion } from "framer-motion";
import { fadeIn, defaultViewport } from "@/lib/animations";
import { ResumeViewerWithFallback } from "./resume-viewer-fallback";

export function ResumePageContent() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
          className="mx-auto"
        >
          <ResumeViewerWithFallback pdfUrl="/api/resume/pdf" />
        </motion.div>
      </div>
    </div>
  );
}
