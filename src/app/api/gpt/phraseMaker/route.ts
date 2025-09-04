// app/api/generate/route.ts
import { NextResponse } from 'next/server';

import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { name, url, biz_type, keywords } = await req.json();

    const textLimits = [
      8, 15, 6, 6, 6, 6, 6, 6, 9, 6, 20, 6, 18, 10, 8, 10, 8, 10, 8, 8, 12, 5,
      20, 8, 9, 9, 10, 10, 6, 20, 20,
    ];

    const prompt = `
당신은 광고 문구 전문가입니다. 
다음 글자 수 제한을 준수하여 광고 문구를 만들어주세요. 
띄워 쓰기랑 맞춤법은 꼭 지키고 키워드 형식을 사용해서 만들고
문구는 한국어로 작성하고, 각 글자 수를 넘지 않도록 정확히 맞춰주세요. 
반드시 배열(JSON) 형태로 반환해주세요.
입력 정보:
- 이름(name): ${name}
- 업종(biz_type): ${biz_type}
- 가게 URL(url): ${url}
- 원하는 키워드(keywords): ${keywords}
입력정보들을 바탕으로 광구문구 만들어줘

글자 제한:
1. 5글자
2. 20글자
3. 8글자
4. 9글자
5. 9글자
6. 10글자
7. 10글자
8. 6글자
9. 20글자
10. 20글자

조건:
- 글자 수를 반드시 지킬 것 (초과하지 않도록)
- 광고 문구는 창의적이고 흥미롭게 작성
- 배열 형태로 출력, 예시: ["문구1", "문구2", "문구3", ..., "문구23"]
- 각 문구는 눈에 띄고 간결하게 작성
- 거짓 광고가 아닌 실제 내용을 기반으로 작성
문구를 만들어 주세요.
`;

    // ✅ 최소 프롬프트 (요금 절약)
    const response = await client.responses.create({
      model: 'gpt-4',

      instructions:
        'Output Array only. No explanations. no extra text. You are an advertising copywriting expert.',
      input: JSON.stringify(prompt),
    });

    // Responses API에서는 output_text 사용
    const rawText = response.output_text || '';

    let adsArray: string[] = [];
    try {
      adsArray = JSON.parse(rawText);
    } catch {
      console.warn('JSON 변환 실패, 글자 수 강제 적용');
      const lines = rawText.split(/\n/).filter(Boolean);
      adsArray = lines.map((line, idx) =>
        line.trim().slice(0, textLimits[idx]),
      );
    }
    console.log(adsArray);
    return NextResponse.json({ data: adsArray });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
