import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/proxy/auth/:path*',
        destination: `http://${process.env.EC2_IP}/api/auth/:path*`,
      },
      {
        source: '/proxy/base',
        destination: `http://${process.env.EC2_IP}/api/auth`,
      },
    ];
  },
};

export default nextConfig;
