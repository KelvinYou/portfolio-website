"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Download } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import PlaceholderImage from "../placeholder-image";
import { Template } from "../types";

interface TemplateCardProps {
  template: Template;
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="h-full overflow-hidden border-border/40 bg-background/70 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="group relative aspect-video overflow-hidden">
        {template.screenshot.startsWith("/images") ? (
          <Image
            src={template.screenshot}
            alt={template.name}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage name={template.name} />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-white/20 text-black hover:bg-white/90 dark:border-black/20 dark:text-white dark:hover:bg-black/10"
            asChild
          >
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Demo
            </a>
          </Button>
        </div>
        {template.popular && (
          <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
            Popular Choice
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-foreground">
            RM {template.price}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              one-time
            </span>
          </p>
          <ul className="mt-4 space-y-1.5">
            {template.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full rounded-full">
          <Download className="mr-2 h-4 w-4" />
          Purchase Now
        </Button>
        <Button variant="ghost" className="w-full rounded-full" asChild>
          <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
            Preview Template
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(TemplateCard);
