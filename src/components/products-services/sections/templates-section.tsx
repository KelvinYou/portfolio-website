"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "../data";
import { Template } from "../types";
import TemplateCard from "../components/template-card";

interface TemplatesSectionProps {
  templates: Template[];
}

export default function TemplatesSection({ templates }: TemplatesSectionProps) {
  return (
    <section id="templates" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/20 bg-primary/5 text-primary">
            Premium Templates
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready-to-Use Web Templates
          </h2>
          <p className="text-muted-foreground text-lg">
            Save time and resources with our professionally designed templates. 
            Just customize and launch your project in minutes, not weeks.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {templates.map((template) => (
            <motion.div key={template.id} variants={fadeIn}>
              <TemplateCard template={template} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 