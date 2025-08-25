'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const errorMessages: Record<string, string> = {
  missing_code: '인가 코드가 없습니다. 다시 시도해 주세요.',
  token_exchange_failed: '백엔드에서 토큰 교환에 실패했습니다.',
  missing_token: '로그인 토큰을 받지 못했습니다.',
  network_error: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.',
  default: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorCode = searchParams.get('error') ?? 'default';

  const [message, setMessage] = useState(errorMessages.default);

  useEffect(() => {
    if (errorMessages[errorCode]) {
      setMessage(errorMessages[errorCode]);
    }
  }, [errorCode]);

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
        <h1 className="text-2xl font-bold text-red-500 mb-4">로그인 오류</h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md"
        >
          홈으로 돌아가기
        </button>
      </div>
    </Suspense>
  );
}
