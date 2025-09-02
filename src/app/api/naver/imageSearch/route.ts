import { NewsResponse } from '@/types/news/newsType';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
): Promise<NextResponse<NewsResponse>> {
  const headers = {
    'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
    'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!,
  };
  const searchParams = req.nextUrl.searchParams;
  const params = searchParams.get('search');

  const search = `query=${params === '' ? 'naver' : params}`;
  const response = await fetch(
    `https://openapi.naver.com/v1/search/image.json?${search}&display=10&start=1&sort=sim`,
    {
      method: 'GET',
      headers,
    },
  ).then((res) => res.json());
  console.log(response);
  return NextResponse.json(response);
}
