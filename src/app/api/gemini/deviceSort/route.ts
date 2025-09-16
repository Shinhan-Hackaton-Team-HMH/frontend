import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { AdPlan } from '@/types/gpt/phrase';

export async function POST(req: NextRequest) {
  const { biz_type, budget, days } = await req.json();
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const prompt = `
업종: ${biz_type}
예산: ${budget}원
기간: ${days}일

위 정보를 바탕으로 최적의 광고 집행 계획을 수립해주세요. 다음 규칙을 반드시 따르세요.

1. 광고 매체는 '엘리베이터 TV', '버스정류장', 'IPTV' 중 2가지만 선택.
2. 시간대는 3시간 단위로 'HH:MM-HH:MM' 형식의 문자열 배열로 출력.
4. 시간대는 2~3개로 정해서 선택이고 하나의 시간대는  3시간 단위야.
4. 노출 횟수는 '10', '20', 30', '40', '50' 중 선택 1시간당 노출횟수야.
5. 예산은 문자열로 천 단위 구분하여 출력 (예: "300,000").
6. 모든 필드 값은 문자열 또는 문자열 배열로 처리.
7. 기기 이름 필드를 포함.
8.  예산을 최대한 소진하는 방향으로 계획 수립.
10. 총 기기 수는 0~100개 사이에서 랜덤으로 해줘도 되지만 최대한 예산에 맞출수있게.
11. 1회 송출 단가는 엘리베이터 TV 5원, 버스정류장 10원, IPTV 15원으로 가정. 
12. 예산보다 적게 사용해도되지만  반드시 넘지는 않아야되.
13. 기간까지 생각해서 예산을 맞춰야되 전체기간동안의 예산이야  
14. 기기의 선택 이유는 한줄로 작성하되 ,간단하고 타당한 근거로 
15. 예산 계산은  하나의 기기당 (광고 기기 대수)*(일일 송출 횟수(시간대 * 3 * 노출 횟수))*(계약 일수)이고 기기들이 가 합쳐진 금액이 예산을 넘으면 안됨 


출력 형식은 오직 JSON이어야 하며, 설명은 포함하지 않습니다. 키는 다음과 같습니다.
'ad_type', 'device', 'deviceCount', 'timeSlots', 'impressions', 'budget', 'reason', 'calculateProcess'

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
        'Output JSON only. No explanations.  Keys:  ad_type, device, deviceCount, timeSlots, impressions, budget, reason. You are the best marketer',
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
}
