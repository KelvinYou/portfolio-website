"use client";

import { useState } from "react";
import { featureComparisonData, saasPlansData, templateData } from "./data";
import CtaSection from "./sections/cta-section";
import HeroSection from "./sections/hero-section";
import SaasSection from "./sections/saas-section";
import TemplatesSection from "./sections/templates-section";

export default function ProductsServicesClient() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly",
  );

  return (
    <div className="min-h-screen">
      <HeroSection />
      <TemplatesSection templates={templateData} />
      <SaasSection
        plans={saasPlansData}
        featureComparison={featureComparisonData}
        billingPeriod={billingPeriod}
        setBillingPeriod={setBillingPeriod}
      />
      <CtaSection />
    </div>
  );
}
