import { NextRequest, NextResponse } from 'next/server';

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * 카카오 로그인 콜백을 처리하는 GET 요청 핸들러입니다.
 * 카카오로부터 인가 코드를 받아 액세스 토큰을 요청하고 사용자 정보를 가져옵니다.
 * @param req NextRequest 객체
 * @returns NextResponse 객체
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) {
    console.error('인가 코드가 없습니다.');
    return NextResponse.redirect(
      new URL('/auth/login-error?message=no_code', req.url),
    );
  }
  const url = `${serverURL}/auth/callback/kakao?code=${code}`;
  const tokenResponse = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  const tokenData = await tokenResponse.json();
  //TODO: Save in storage
  return NextResponse.redirect(new URL('/', req.url));
}
