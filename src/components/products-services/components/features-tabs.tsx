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
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="features">Features Comparison</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="features">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 bg-muted/30 rounded-tl-lg">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 bg-muted/30">Starter</th>
                  <th className="text-center py-4 px-4 bg-primary/10 font-bold">
                    Professional
                  </th>
                  <th className="text-center py-4 px-4 bg-muted/30 rounded-tr-lg">
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
                    <td className="py-3 px-4 border-t border-border/20 font-medium">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 border-t border-border/20 text-center">
                      {row.starter === "✓" ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : row.starter === "✗" ? (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="py-3 px-4 border-t border-primary/20 text-center bg-primary/5">
                      {row.professional === "✓" ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : row.professional === "✗" ? (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      ) : (
                        row.professional
                      )}
                    </td>
                    <td className="py-3 px-4 border-t border-border/20 text-center">
                      {row.enterprise === "✓" ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : row.enterprise === "✗" ? (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border/40 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                  <div className="flex items-center mb-3">
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
