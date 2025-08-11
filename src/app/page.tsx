// app/components/KakaoLoginButton.tsx
'use client';

// import DetectionVideo from '@/components/detection';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  // const K_REDIRECT_URI = `http://localhost:3000/api/auth/callback/kakao`;
  const K_REDIRECT_URI = `https://frontend-five-sepia-55.vercel.app/api/auth/callback/kakao`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

  // const router = useRouter();
  // console.log('kakaoURL: ', kakaoURL);

  const handleKakaoLogin = () => {
    // if (window.Kakao) {
    //   window.Kakao.Auth.authorize({
    //     redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    //     // scope: 'profile_nickname,profile_image', // Add desired scopes
    //   });
    // } else {
    //   console.error('Kakao SDK not loaded or initialized.');
    // }
    window.location.href = kakaoURL;
  };

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const response = () =>
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setConnected(true);
          } else {
            setConnected(false);
          }
          console.log('data: ', data);
        });
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
      {/* <button onClick={handleGoogleLogin}>Google Login </button> */}
      {/* <DetectionVideo /> */}
    </>
  );
}
