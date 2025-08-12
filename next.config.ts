import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_EC2_IP}/api/:path*`, // 환경 변수 사용
      },
    ];
  },
};

export default nextConfig;
