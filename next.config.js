/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle crypto libraries for browser vs server
    if (!isServer) {
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
}

module.exports = nextConfig; 