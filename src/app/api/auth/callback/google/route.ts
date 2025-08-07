// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code missing' },
      { status: 400 },
    );
  }

  try {
    // 1. 인가 코드로 액세스 토큰 교환
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        redirect_uri: 'http://localhost:3000/api/auth/callback',
        grant_type: 'authorization_code',
      }),
    });

    const { access_token } = await tokenResponse.json();

    if (!access_token) {
      throw new Error('Failed to get access token');
    }

    // 2. 액세스 토큰으로 사용자 정보 가져오기
    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    const user = await userResponse.json();

    // 3. 사용자 정보를 HTTP-Only 쿠키에 저장 (보안 강화)
    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    console.log(jwtPayload);

    // 실제 서비스에서는 JWT 토큰을 발급하여 저장하는 것이 좋습니다.
    // 여기서는 예시로 사용자 정보를 문자열로 변환하여 저장합니다.
    // cookies().set('user_info', JSON.stringify(jwtPayload), {
    //   httpOnly: true, // JavaScript 접근 방지
    //   secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송
    //   path: '/',
    // });

    // 4. 로그인 완료 후 메인 페이지로 리디렉션
    return NextResponse.redirect('http://localhost:3000');
  } catch (error) {
    console.error('인증 실패:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
