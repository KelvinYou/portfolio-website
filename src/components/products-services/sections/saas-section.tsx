"use client";

import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "../data";
import { Plan, FeatureComparison } from "../types";
import FeaturesTabs from "../components/features-tabs";
import PlanCard from "../components/plan-card";
import PricingToggle from "../components/pricing-toggle";

interface SaasSectionProps {
  plans: Plan[];
  featureComparison: FeatureComparison[];
  billingPeriod: "monthly" | "annual";
  setBillingPeriod: Dispatch<SetStateAction<"monthly" | "annual">>;
}

export default function SaasSection({ 
  plans, 
  featureComparison, 
  billingPeriod, 
  setBillingPeriod 
}: SaasSectionProps) {
  return (
    <section id="saas" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm rounded-full border-primary/20 bg-primary/5 text-primary">
            SaaS Solution
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tuition Management Software
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete solution for managing your tuition center. 
            From student management to billing, we&apos;ve got you covered.
          </p>
        </motion.div>

        <PricingToggle 
          billingPeriod={billingPeriod} 
          setBillingPeriod={setBillingPeriod} 
        />

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan) => (
            <motion.div key={plan.id} variants={fadeIn}>
              <PlanCard plan={plan} billingPeriod={billingPeriod} />
            </motion.div>
          ))}
        </motion.div>

        <FeaturesTabs featureComparison={featureComparison} />
      </div>
    </section>
  );
} 