/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['crypto-js'],
  webpack: (config, { isServer }) => {
    // Handle crypto libraries for browser vs server
    if (isServer) {
      // Mark crypto-js as external on server-side
      config.externals = [...(config.externals || []), 'crypto-js'];
    } else {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        fs: false,
        os: false,
        path: false,
      };
    }
    
    return config;
  },
  // Add any crypto-using routes to this list if needed
  experimental: {
    optimizeCss: true,
  }
}

module.exports = nextConfig; 