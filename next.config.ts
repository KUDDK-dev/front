import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://46.4.81.199:8034/api/:path*',
      },
    ];
  },
};

export default nextConfig;
