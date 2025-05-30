"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check, Star, X } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import { fadeIn } from "../data";
import { FeatureComparison } from "../types";

interface FeaturesTabsProps {
  featureComparison: FeatureComparison[];
}

function FeaturesTabs({ featureComparison }: FeaturesTabsProps) {
  return (
    <motion.div
      className="mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <Tabs defaultValue="features" className="w-full">
        <div className="mb-8 flex justify-center">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="features">Features Comparison</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="features">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-tl-lg bg-muted/30 px-4 py-4 text-left">
                    Feature
                  </th>
                  <th className="bg-muted/30 px-4 py-4 text-center">Starter</th>
                  <th className="bg-primary/10 px-4 py-4 text-center font-bold">
                    Professional
                  </th>
                  <th className="rounded-tr-lg bg-muted/30 px-4 py-4 text-center">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-muted/10" : ""}
                  >
                    <td className="border-t border-border/20 px-4 py-3 font-medium">
                      {row.feature}
                    </td>
                    <td className="border-t border-border/20 px-4 py-3 text-center">
                      {row.starter === "✓" ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : row.starter === "✗" ? (
                        <X className="mx-auto h-5 w-5 text-muted-foreground" />
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="border-t border-primary/20 bg-primary/5 px-4 py-3 text-center">
                      {row.professional === "✓" ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : row.professional === "✗" ? (
                        <X className="mx-auto h-5 w-5 text-muted-foreground" />
                      ) : (
                        row.professional
                      )}
                    </td>
                    <td className="border-t border-border/20 px-4 py-3 text-center">
                      {row.enterprise === "✓" ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : row.enterprise === "✗" ? (
                        <X className="mx-auto h-5 w-5 text-muted-foreground" />
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="testimonials">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border/40 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Image
                        src={`/images/testimonial-${i}.jpg`}
                        alt="Testimonial"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">John Smith</CardTitle>
                      <CardDescription>ABC Tuition Center</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    &quot;This software has completely transformed how we manage
                    our tuition center. The scheduling and billing features
                    alone have saved us countless hours every month.&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(FeaturesTabs);
