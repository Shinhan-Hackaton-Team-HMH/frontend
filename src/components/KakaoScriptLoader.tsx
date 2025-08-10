'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function KakaoScriptLoader() {
  const kakaoJavaScriptKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
    // Check if Kakao SDK is loaded and initialized
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoJavaScriptKey);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  }, [kakaoJavaScriptKey]);

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js" // Use the latest version
      integrity={`${process.env.NEXT_PUBLIC_INTEGRITY}`} // Replace with actual integrity hash
      crossOrigin="anonymous"
      onLoad={() => {
        // This is an additional check, useEffect handles the primary initialization
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoJavaScriptKey);
          console.log(
            'Kakao SDK initialized on Script load:',
            window.Kakao.isInitialized(),
          );
        }
      }}
    />
  );
}
