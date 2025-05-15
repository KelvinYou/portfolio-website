"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, memo } from "react";
import { fadeIn } from "../data";

interface PricingToggleProps {
  billingPeriod: "monthly" | "annual";
  setBillingPeriod: Dispatch<SetStateAction<"monthly" | "annual">>;
}

function PricingToggle({
  billingPeriod,
  setBillingPeriod,
}: PricingToggleProps) {
  return (
    <motion.div
      className="flex justify-center mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="bg-muted/50 p-1 rounded-full">
        <Button
          variant={billingPeriod === "monthly" ? "default" : "ghost"}
          size="sm"
          className="rounded-full"
          onClick={() => setBillingPeriod("monthly")}
        >
          Monthly Billing
        </Button>
        <Button
          variant={billingPeriod === "annual" ? "default" : "ghost"}
          size="sm"
          className="rounded-full"
          onClick={() => setBillingPeriod("annual")}
        >
          Annual Billing
          <Badge
            variant="outline"
            className="ml-2 bg-green-500/10 text-green-600 border-0 text-xs rounded-full"
          >
            Save 20%
          </Badge>
        </Button>
      </div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(PricingToggle);
