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
    <Card className="overflow-hidden h-full border-border/40 bg-background/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-video overflow-hidden group">
        {template.screenshot.startsWith("/images") ? (
          <Image
            src={template.screenshot}
            alt={template.name}
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage name={template.name} />
        )}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-white border-white/20 hover:bg-white/10"
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
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
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
          <p className="font-bold text-2xl text-foreground">
            RM {template.price}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              one-time
            </span>
          </p>
          <ul className="space-y-1.5 mt-4">
            {template.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
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
