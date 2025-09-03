import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  /* config options here */
  allowedDevOrigins: ['*'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search.pstatic.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/proxy/auth/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_EC2_IP}/api/auth/:path*`,
      },
      {
        source: '/proxy/api/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_EC2_IP}/api/:path*`,
      },
      {
        source: '/proxy/base',
        destination: `http://${process.env.NEXT_PUBLIC_EC2_IP}/api/auth`,
      },
    ];
  },
};

export default nextConfig;
