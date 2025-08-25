import { NewsResponse } from '@/types/news/newsType';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<NewsResponse>> {
  const headers = {
    'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
    'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!,
  };
  const response = await fetch(
    'https://openapi.naver.com/v1/search/news.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim',
    {
      method: 'GET',
      headers,
    },
  ).then((res) => res.json());

  return NextResponse.json(response);
}
