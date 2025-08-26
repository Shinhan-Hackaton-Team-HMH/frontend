'use client';

import { use, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useUserStore from '@/store/useUserStore';

export default function KakaoRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') ?? undefined;
  const setUserId = useUserStore((state) => state.setUserId);

  useEffect(() => {
    const run = async () => {
      if (!code) {
        console.error('인가 코드가 없습니다.');
        router.replace('/?error=missing_code');
        return;
      }
      console.log('리다이렉트 접속 (client)');
      const backendUrl = `/proxy/auth/callback/kakao?code=${code}`;

      const postResponse = await fetch(backendUrl, {
        method: 'GET',
      });
      console.log(postResponse);
      if (!postResponse.ok) {
        console.error('백엔드에서 토큰 교환 실패');
        router.replace('/?error=token_exchange_failed');
        return;
      }
      const { userId } = await postResponse.json();
      setUserId(userId);

      if (!userId) {
        console.error('토큰이 응답에 없습니다.');
        router.replace('/error=userId');
        return;
      } else {
        router.replace('/');
      }
    };
    run();
  }, [code, router, setUserId]);

  // 간단한 로딩 UI
  return <></>;
}
