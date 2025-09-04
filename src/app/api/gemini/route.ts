import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

interface TextGenerator {
  text: string | undefined;
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<TextGenerator>> {
  const hours = await req.body;
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `  상점의 영업시간은 매일 아침 10시 부터 저녁 8시야  , 해당 정보를 묶을 수있으면 최대한 묶어서, 깔끔하고 정돈되게 보고 바로 알수있게 영업시간을 작성해줘 최대 2줄로 만약 이상한 내용이나 중복되는 내용있으면 빼고 처리해줘`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
      systemInstruction:
        '너는 마켓팅의 신이야 그리고 광고에 바로 사용할예정이니까 불필요한 기호 사용하지않고 깔끔하게 글을 작성해줘 필요한 글만 작성해줘 ',
    },
  });
  return NextResponse.json({ text: response.text });
}
