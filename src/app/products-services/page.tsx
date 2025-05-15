import ProductsServicesClient from "@/components/products-services/products-services-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products & Services | Your Name",
  description:
    "Explore our premium templates and subscription-based SaaS solutions. From ready-to-use web templates to powerful tuition management software.",
  openGraph: {
    title: "Products & Services | Your Name",
    description: "Premium templates and SaaS solutions for modern businesses",
    images: [
      {
        url: "/images/og-products-services.jpg",
        width: 1200,
        height: 630,
        alt: "Products & Services",
      },
    ],
  },
};

export default function ProductsServicesPage() {
  return <ProductsServicesClient />;
}
