import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { AdPlan } from '@/types/gpt/phrase';

export async function POST(req: NextRequest) {
  const { biz_type, budget } = await req.json();
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const prompt = `
업종: ${biz_type}
예산: ${budget}원

위 정보를 바탕으로 최적의 광고 집행 계획을 수립해주세요. 다음 규칙을 반드시 따르세요.

1. 광고 매체는 '엘리베이터 TV', '버스정류장', 'IPTV' 중 2가지만 선택.
2. 시간대는 3시간 단위로 'HH:MM-HH:MM' 형식의 문자열 배열로 출력.
3. 출근(06:00-09:00) 및 퇴근(18:00-21:00) 시간대 비용은 1.5배로 계산.
4. 시간대는 2~3개로 정해서 선택.
4. 노출 횟수는 '30', '40', '50', '60' 중 선택.
5. 예산은 문자열로 천 단위 구분하여 출력 (예: "300,000").
6. 모든 필드 값은 문자열 또는 문자열 배열로 처리.
7. 기기 이름 필드를 포함.
8. 예산을 최대한 소진하는 방향으로 계획 수립.
9. 광고 기간은 1개월로 가정.
10. 총 기기 수는 엘리베이터 TV 10~100개 랜덤지정, 버스정류장 10~100개 랜덤지정, IPTV 10~100개로 가정.
11. 1회 송출 단가는 엘리베이터 TV 5원, 버스정류장 10원, IPTV 15원으로 가정.

출력 형식은 오직 JSON이어야 하며, 설명은 포함하지 않습니다. 키는 다음과 같습니다.
'ad_type', 'device', 'deviceCount', 'timeSlots', 'impressions', 'budget', 'reason'

광고 계획은 각 매체별로 하나의 JSON 객체로 구성된 배열로 만들어주세요.
`;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      systemInstruction:
        'Output JSON only. No explanations.  Keys:  ad_type, device, deviceCount, timeSlots, impressions, budget, reason.',
    },
  });
  const textResponse = response.text;
  if (!textResponse) {
    return NextResponse.json(
      { error: 'No content received from AI' },
      { status: 500 },
    );
  }
  try {
    const cleanedResponse = textResponse.replace(/```json|```/g, '').trim();
    const parsedJson = JSON.parse(cleanedResponse);
    console.log(parsedJson);
    return NextResponse.json(parsedJson);
  } catch (parseError) {
    console.error('Failed to parse JSON from AI response:', textResponse);
    return NextResponse.json(
      { error: 'Invalid JSON response from AI', rawResponse: textResponse },
      { status: 500 },
    );
  }
  console.log(response.text);
  return NextResponse.json({ text: response.text });
}
