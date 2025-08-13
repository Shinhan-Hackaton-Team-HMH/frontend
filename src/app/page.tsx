// app/components/KakaoLoginButton.tsx
'use client';

import Link from 'next/link';
// import DetectionVideo from '@/components/detection';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  const K_REDIRECT_URI = `https://frontend-five-sepia-55.vercel.app/auth/callback/kakao`;

  // const K_REDIRECT_URI = `http://localhost:3000/auth/callback/kakao`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    console.log('Fetching...');
    const response = async () => {
      try {
        // 프록시 경로를 사용
        const res = await fetch(`/proxy/base`);
        console.log('Response data:', res);
        const data = await res.json();
        console.log('Response data:', data);
        setConnected(true);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    response();
  }, []);

  return (
    <>
      <button
        onClick={handleKakaoLogin}
        style={{
          backgroundColor: '#FEE500',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#3C1E1E',
        }}
      >
        Login with Kakao
      </button>
      {connected && (
        <p style={{ color: 'green', marginTop: '10px', fontSize: '100px' }}>
          Successfully connected to Server
        </p>
      )}
      <Link href={'baemin:// '}></Link>
      {/* <DetectionVideo /> */}
    </>
  );
}
