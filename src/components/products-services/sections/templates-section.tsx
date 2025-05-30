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
    <section id="templates" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary"
          >
            Premium Templates
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready-to-Use Web Templates
          </h2>
          <p className="text-lg text-muted-foreground">
            Save time and resources with our professionally designed templates.
            Just customize and launch your project in minutes, not weeks.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
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
