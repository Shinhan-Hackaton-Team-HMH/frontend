import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { biz_type, budget } = body;
    const prompt = {
      instruction: `${biz_type} 업종, 예산 ${budget}원을 기준으로 광고 집행 계획을 만들어라.`,
      requirements: {
        rules: [
          '광고 매체는 엘리베이터 TV, 버스정류장, IPTV 중 2가지만 선택할 것',
          '시간대는 3시간 단위, "HH:MM-HH:MM" 형식으로 출력하되 문자열 배열로',
          '출근(06:00-09:00), 퇴근(18:00-21:00)은 단가 1.5배',
          '노출 횟수는 "30", "40", "50", "60" 중 선택',
          '예산은 문자열로 천 단위 구분, 예: "300,000"',
          '모든 값은 문자열 처리',
          '기기 이름 필드 포함',
          'JSON만 출력할 것, 설명 금지',
        ],
      },
      output_format: 'JSON',
    };

    const response = await client.responses.create({
      model: 'gpt-5-mini',
      instructions:
        'Output JSON only. No explanations.  Keys: industry_budget, ad_type, device, deviceCount, timeSlots, impressions, budget, reason.',
      input: JSON.stringify(prompt),
    });
    const raw = await response.output_text;
    console.log(raw);
    // let parsed;
    // try {
    //   parsed = JSON.parse(raw);
    // } catch (e) {
    //   throw new Error('응답 JSON 파싱 실패: ' + raw);
    // }

    // const validated = ResponseSchema.parse(parsed);

    return NextResponse.json({ data: raw });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
