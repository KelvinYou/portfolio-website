import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Disable minification
    config.optimization.minimize = false;

    return config;
  },
};

export default withBundleAnalyzerConfig(nextConfig);
