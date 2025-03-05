import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['crypto-js'],
  // Add any crypto-using routes to this list if needed
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
