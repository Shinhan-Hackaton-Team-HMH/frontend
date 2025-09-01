// {
//   "chicken_shop_budget_1000000": {
//     "bus_shelter": {
//       "device": "버스정류장",
//       "deviceCount": "70",
//       "timeSlots": ["06:00-09:00", "18:00-21:00"],
//       "impressions": "50",
//       "budget": "400,000",
//       "reason": "출퇴근길 직장인 배달 수요 집중 공략"
//     },
//     "IPTV": {
//       "device": "IPTV",
//       "deviceCount": "노출기준",
//       "timeSlots": ["18:00-21:00", "21:00-24:00"],
//       "impressions": "40",
//       "budget": "600,000",
//       "reason": "저녁 프라임타임 가정 내 브랜드 인지도 극대화"
//     }
//   }
// }

import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// const RequestSchema = z.object({
//   biz_type: z.string().min(1, '업종은 필수입니다'),
//   budget: z.string().regex(/^[0-9]+$/, '예산은 숫자 문자열이어야 합니다'),
// });

// export const AdTypeSchema = z.enum(['엘리베이터 TV', 'IPTV', '버스정류장']);
// export type AdType = z.infer<typeof AdTypeSchema>;

// export const AdPlanSchema = z.object({
//   device: z.preprocess((val) => String(val), AdTypeSchema), // 기기
//   deviceCount: z.preprocess((val) => String(val), z.string()), // 기기대수
//   timeSlots: z.preprocess(
//     (val) => (Array.isArray(val) ? val.map(String) : []),
//     z.array(z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/)),
//   ), // 시간대
//   impressions: z.preprocess((val) => String(val), z.string()), // 노출횟수
//   budget: z.preprocess(
//     (val) => (typeof val === 'number' ? val.toLocaleString() : String(val)),
//     z.string().regex(/^\d{1,3}(,\d{3})*$/),
//   ), // 집행예산, 1,000 형식
//   reason: z.preprocess((val) => String(val), z.string()), // 선택이유
// });

// 전체 응답 스키마
// export const ResponseSchema = z.record(
//   z.string(),
//   z.record(z.string(), AdPlanSchema),
// );

// export type AdPlan = z.infer<typeof AdPlanSchema>;
// export type AdResponse = z.infer<typeof ResponseSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // const { biz_type, budget } = RequestSchema.parse(body);
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
