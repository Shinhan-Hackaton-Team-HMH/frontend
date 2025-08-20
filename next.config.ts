import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  /* config options here */
  reactStrictMode: true,
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
        source: '/proxy/base',
        destination: `http://${process.env.NEXT_PUBLIC_EC2_IP}/api/auth`,
      },
      // {
      //   source: '/proxy/auth',
      //   destination: `http://${process.env.NEXT_PUBLIC_EC2_IP}/api/auth`, // 환경 변수 사용
      // },
      // {
      //   source: '/proxy/auth/callback/kakao/token-exchange',
      //   destination: `http://${process.env.NEXT_PUBLIC_EC2_IP}/api/auth/callback/kakao/token-exchange`, // 환경 변수 사용
      // },
    ];
  },
};

export default nextConfig;
