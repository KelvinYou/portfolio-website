import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Disable minification
    config.optimization.minimize = false;

    return config;
  },
};

export default nextConfig;
