import { NextResponse } from 'next/server';

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: 'http://localhost:3000/api/auth/callback/google',
    response_type: 'code',
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  console.log(url);
  return NextResponse.redirect(url);
}
