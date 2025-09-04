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
      {
        protocol: 'https',
        hostname: 'shinhan-hmh-files.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**', // 모든 경로 허용
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
