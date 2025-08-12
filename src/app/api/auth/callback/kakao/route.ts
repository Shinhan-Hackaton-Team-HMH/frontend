// app/api/auth/kakao/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 환경 변수에서 카카오 앱 키와 리다이렉트 URI를 가져옵니다.
// .env.local 파일에 KAKAO_REST_API_KEY와 KAKAO_REDIRECT_URI를 설정해야 합니다.
// const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
// const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * 카카오 로그인 콜백을 처리하는 GET 요청 핸들러입니다.
 * 카카오로부터 인가 코드를 받아 액세스 토큰을 요청하고 사용자 정보를 가져옵니다.
 * @param req NextRequest 객체
 * @returns NextResponse 객체
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code'); // 카카오로부터 받은 인가 코드
  console.log(code);
  // 인가 코드가 없으면 에러 처리
  if (!code) {
    console.error('인가 코드가 없습니다.');
    return NextResponse.redirect(
      new URL('/auth/login-error?message=no_code', req.url),
    );
  }
  // const backendUrl = `${serverURL}/auth/callback/kakao/token-exchange`; // 백엔드의 새로운 POST 엔드포인트

  const backendUrl = '/proxy/auth/callback/kakao/token-exchange';

  // 2. 백엔드로 POST 요청을 보냅니다.
  const postResponse = await fetch(backendUrl, {
    method: 'GET', // GET이 아닌 POST로 변경
    headers: {
      'Content-Type': 'application/json', // 데이터를 JSON 형식으로 보냄을 알림
    },
  });

  // 3. 백엔드로부터 응답을 받습니다.
  if (!postResponse.ok) {
    console.error('백엔드에서 토큰 교환 실패');
    return NextResponse.redirect(
      new URL('/auth/login-error?message=token_exchange_failed', req.url),
    );
  }

  const tokenData = await postResponse.json();
  console.log('tokenData : ', tokenData);
  return NextResponse.redirect(new URL('/', req.url));

  // const url = `${serverURL}/auth/callback/kakao?code=${code}`;
  // console.log(url);
  // const tokenResponse = await fetch(
  //   `${serverURL}/auth/callback/kakao?code=${code}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     },
  //   },
  // );

  // 1. 카카오로부터 받은 code를 백엔드에 POST로 보낼 주소

  // try {
  //   // 1. 인가 코드로 액세스 토큰 요청
  //   const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     },
  //     body: new URLSearchParams({
  //       grant_type: 'authorization_code',
  //       client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string,
  //       redirect_uri: process.env.KAKAO_REDIRECT_URI as string,
  //       code: code,
  //     }).toString(),
  //   });

  //   if (!tokenResponse.ok) {
  //     const errorData = await tokenResponse.json();
  //     console.error('액세스 토큰 요청 실패:', errorData);
  //     return NextResponse.redirect(
  //       new URL(
  //         `/auth/login-error?message=token_error&details=${JSON.stringify(
  //           errorData,
  //         )}`,
  //         req.url,
  //       ),
  //     );
  //   }

  //   const tokenData = await tokenResponse.json();
  //   const accessToken = tokenData.access_token;
  //   const refreshToken = tokenData.refresh_token;

  //   // 2. 액세스 토큰으로 사용자 정보 요청
  //   const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     },
  //   });

  //   if (!userResponse.ok) {
  //     const errorData = await userResponse.json();
  //     console.error('사용자 정보 요청 실패:', errorData);
  //     return NextResponse.redirect(
  //       new URL(
  //         `/auth/login-error?message=user_info_error&details=${JSON.stringify(
  //           errorData,
  //         )}`,
  //         req.url,
  //       ),
  //     );
  //   }

  //   const userData = await userResponse.json();
  //   console.log('카카오 사용자 정보:', userData);

  //   // TODO:
  //   // 3. 여기에서 사용자 정보를 사용하여 애플리케이션의 로그인 처리 및 세션 관리 로직을 구현합니다.
  //   //    예:
  //   //    - 사용자 정보를 데이터베이스에 저장/업데이트
  //   //    - JWT 토큰 생성 및 클라이언트에 전달 (HTTP Only Cookie 등)
  //   //    - Next.js의 Server Actions 또는 API Routes를 통해 세션 생성

  //   // 예시: 로그인 성공 후 메인 페이지로 리다이렉트
  //   // 실제 서비스에서는 사용자 정보를 기반으로 세션을 생성하고, 해당 세션 정보를 클라이언트에 전달해야 합니다.
  //   // 예를 들어, JWT를 쿠키에 저장하거나, 서버 세션을 생성한 후 사용자에게 리다이렉트할 수 있습니다.
  //   return NextResponse.redirect(new URL('/', req.url));
  // } catch (error) {
  //   console.error('카카오 로그인 처리 중 오류 발생:', error);
  //   return NextResponse.redirect(
  //     new URL(
  //       `/auth/login-error?message=internal_server_error&details=${
  //         (error as Error).message
  //       }`,
  //       req.url,
  //     ),
  //   );
  // }
}
