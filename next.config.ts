import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`, // 환경 변수 사용
      },
    ];
  },
};

export default nextConfig;
