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
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { memo } from "react";
import { Plan } from "../types";

interface PlanCardProps {
  plan: Plan;
  billingPeriod: "monthly" | "annual";
}

function PlanCard({ plan, billingPeriod }: PlanCardProps) {
  // 20% discount for annual billing
  const getPlanPrice = (price: number) => {
    if (billingPeriod === "annual") {
      return {
        monthly: Math.round(price * 0.8),
        annually: Math.round(price * 0.8 * 12),
      };
    }
    return { monthly: price, annually: price * 12 };
  };

  const price = getPlanPrice(plan.price);

  return (
    <Card
      className={cn(
        "h-full border-border/40 backdrop-blur-sm relative overflow-hidden",
        plan.highlight ? "border-primary/50 shadow-lg" : "",
      )}
    >
      {plan.highlight && (
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-indigo-600" />
      )}

      <CardHeader>
        {plan.highlight && (
          <div className="absolute right-6 top-6">
            <Badge className="bg-primary">Popular</Badge>
          </div>
        )}
        <CardTitle className="flex items-baseline gap-2">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <p className="text-4xl font-bold">
              RM {price.monthly}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                /month
              </span>
            </p>
            {billingPeriod === "annual" && (
              <p className="mt-1 text-sm text-muted-foreground">
                RM {price.annually} billed annually
              </p>
            )}
          </div>

          <div>
            <p className="mb-3 font-medium">Includes:</p>
            <ul className="space-y-2">
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {plan.notIncluded.length > 0 && (
            <div>
              <p className="mb-3 font-medium text-muted-foreground">
                Not included:
              </p>
              <ul className="space-y-2 opacity-70">
                {plan.notIncluded.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <X className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={cn(
            "w-full rounded-full",
            plan.highlight ? "" : "bg-primary/80 hover:bg-primary",
          )}
        >
          {plan.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(PlanCard);
