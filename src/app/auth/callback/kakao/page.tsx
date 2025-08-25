import KakaoRedirectClient from '@/components/kakaoRedirect';
import { Suspense } from 'react';

export default function Kakao() {
  return (
    <Suspense
      fallback={<div style={{ padding: 24 }}>오류 정보를 불러오는 중...</div>}
    >
      <KakaoRedirectClient />
    </Suspense>
  );
}
