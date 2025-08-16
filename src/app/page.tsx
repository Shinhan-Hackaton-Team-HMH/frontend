// app/components/KakaoLoginButton.tsx
'use client';

import NaverImageSearch from '@/app/components/naverSearch/index';
import { useRouter } from 'next/navigation';


export default function Home() {
  // const router = useRouter();
  const handleKakaoLogin = () => {
    if (window.Kakao) {
      window.Kakao.Auth.authorize({
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        // scope: 'profile_nickname,profile_image', // Add desired scopes
      });
    } else {
      console.error('Kakao SDK not loaded or initialized.');
    }
  };

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
      {/* <button onClick={handleGoogleLogin}>Google Login </button> */}
      {/* <DetectionVideo /> */}
  );
}
