// Template types
export interface Template {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  price: number;
  features: string[];
  popular: boolean;
  demoUrl: string;
}

// SaaS Plan types
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: string;
  features: string[];
  notIncluded: string[];
  cta: string;
  highlight: boolean;
}

// Feature comparison types
export interface FeatureComparison {
  feature: string;
  starter: string;
  professional: string;
  enterprise: string;
} 