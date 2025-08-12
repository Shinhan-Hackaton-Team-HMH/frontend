'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') ?? undefined;
  console.log(code);
  useEffect(() => {
    // const run = async () => {
    //   if (!code) {
    //     console.error('인가 코드가 없습니다.');
    //     router.replace('/?error=missing_code');
    //     return;
    //   }
    //   console.log('리다이렉트 접속 (client)');
    //   const backendUrl = `/proxy/auth/callback/kakao/token-exchange/code=${code}`;
    //   try {
    //     const postResponse = await fetch(backendUrl, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ code }),
    //       credentials: 'include', // 필요 시 쿠키 전달
    //     });
    //     if (!postResponse.ok) {
    //       console.error('백엔드에서 토큰 교환 실패');
    //       router.replace('/error=token_exchange_failed');
    //       return;
    //     }
    //     const tokenData = await postResponse.json();
    //     const token = tokenData.token as string | undefined;
    //     if (!token) {
    //       console.error('토큰이 응답에 없습니다.');
    //       router.replace('/error=missing_token');
    //       return;
    //     }
    //     router.replace('/');
    //   } catch (error) {
    //     console.error('네트워크 또는 기타 에러 발생:', error);
    //     router.replace('/error=network_error');
    //   }
    // };
    // // 즉시 실행
    // run();
  }, [code, router]);

  // 간단한 로딩 UI
  return <></>;
}
