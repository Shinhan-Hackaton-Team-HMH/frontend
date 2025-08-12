import { redirect } from 'next/navigation';

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

interface PageProps {
  searchParams: SearchParams;
}

export async function KakaRedirect({ searchParams }: PageProps) {
  const { code } = searchParams;
  // 인가 코드가 없으면 에러 처리
  if (!code) {
    console.error('인가 코드가 없습니다.');
    return;
  }
  console.log('리다이렉트 접속');
  // const backendUrl = `${serverURL}/auth/callback/kakao/token-exchange`; // 백엔드의 새로운 POST 엔드포인트

  const backendUrl = '/proxy/auth/callback/kakao/token-exchange';
  // 2. 백엔드로 POST 요청을 보냅니다.

  const postResponse = await fetch(backendUrl, {
    method: 'POST', // GET이 아닌 POST로 변경
    headers: {
      'Content-Type': 'application/json', // 데이터를 JSON 형식으로 보냄을 알림
    },
    body: JSON.stringify({ code: code }), // code를 JSON 객체로 만들어서 보냄
  });

  // 3. 백엔드로부터 응답을 받습니다.
  if (!postResponse.ok) {
    console.error('백엔드에서 토큰 교환 실패');
  }
  const tokenData = await postResponse.json();

  sessionStorage.setItem('token', `${tokenData}`);
  console.log('tokenData : ', tokenData);
  if (postResponse.ok) {
    redirect('/');
  }
  return <></>;
}
