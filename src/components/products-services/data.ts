// Mock data for templates
export const templateData = [
  {
    id: "dashboard-pro",
    name: "Dashboard Pro",
    description:
      "A comprehensive admin dashboard template with 50+ components and 10+ pre-built pages",
    screenshot: "/images/templates/dashboard-pro.jpg",
    price: 79,
    features: [
      "50+ UI Components",
      "10 Pre-built Pages",
      "Dark & Light Mode",
      "Responsive Design",
      "React & Next.js",
      "Tailwind CSS",
    ],
    popular: true,
    demoUrl: "#",
  },
  {
    id: "landing-suite",
    name: "Landing Suite",
    description:
      "A collection of 5 landing page templates optimized for conversions and SEO",
    screenshot: "/image/templates/landing-suite.jpg",
    price: 59,
    features: [
      "5 Unique Designs",
      "Optimized for SEO",
      "High Conversion Focus",
      "Customizable Sections",
      "React & Next.js",
      "Tailwind CSS",
    ],
    popular: false,
    demoUrl: "#",
  },
  // {
  //   id: "ecommerce-starter",
  //   name: "E-commerce Starter",
  //   description:
  //     "A complete e-commerce starter kit with product listings, cart, and checkout flow",
  //   screenshot: "",
  //   price: 99,
  //   features: [
  //     "Product Catalog",
  //     "Shopping Cart",
  //     "Checkout Flow",
  //     "User Authentication",
  //     "React & Next.js",
  //     "Tailwind CSS",
  //     "12 Months Support",
  //   ],
  //   popular: false,
  //   demoUrl: "#",
  // },
];

// Mock data for SaaS plans
export const saasPlansData = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small tuition centers with up to 50 students",
    price: 29,
    billingPeriod: "monthly",
    features: [
      "Up to 50 students",
      "Basic scheduling",
      "Simple invoicing",
      "Email notifications",
      "Mobile app access",
    ],
    notIncluded: [
      "Advanced reporting",
      "Payment processing",
      "Parent portal",
      "Multiple locations",
      "API access",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing tuition centers with up to 200 students",
    price: 79,
    billingPeriod: "monthly",
    features: [
      "Up to 200 students",
      "Advanced scheduling",
      "Comprehensive invoicing",
      "SMS & email notifications",
      "Mobile app access",
      "Advanced reporting",
      "Payment processing",
      "Parent portal",
    ],
    notIncluded: ["Multiple locations", "API access"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Comprehensive solution for large education businesses",
    price: 199,
    billingPeriod: "monthly",
    features: [
      "Unlimited students",
      "Advanced scheduling",
      "Comprehensive invoicing",
      "SMS & email notifications",
      "Mobile app access",
      "Advanced reporting",
      "Payment processing",
      "Parent portal",
      "Multiple locations",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    highlight: false,
  },
];

export const featureComparisonData = [
  {
    feature: "Students",
    starter: "50",
    professional: "200",
    enterprise: "Unlimited",
  },
  {
    feature: "Staff Accounts",
    starter: "2",
    professional: "10",
    enterprise: "Unlimited",
  },
  {
    feature: "Scheduling",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Advanced",
  },
  {
    feature: "Invoicing",
    starter: "Simple",
    professional: "Comprehensive",
    enterprise: "Comprehensive",
  },
  {
    feature: "Notifications",
    starter: "Email",
    professional: "Email & SMS",
    enterprise: "Email & SMS",
  },
  { feature: "Mobile App", starter: "✓", professional: "✓", enterprise: "✓" },
  {
    feature: "Reporting",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Advanced",
  },
  {
    feature: "Payment Processing",
    starter: "✗",
    professional: "✓",
    enterprise: "✓",
  },
  {
    feature: "Parent Portal",
    starter: "✗",
    professional: "✓",
    enterprise: "✓",
  },
  {
    feature: "Multiple Locations",
    starter: "✗",
    professional: "✗",
    enterprise: "✓",
  },
  { feature: "API Access", starter: "✗", professional: "✗", enterprise: "✓" },
  {
    feature: "Support",
    starter: "Email",
    professional: "Priority Email",
    enterprise: "Dedicated",
  },
];

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
