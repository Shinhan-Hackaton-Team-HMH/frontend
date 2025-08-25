// app/api/vidu-callback/route.js

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Vidu AI로부터 전송된 콜백 데이터를 JSON 형태로 파싱합니다.
    const callbackData = await request.json();

    // 콜백 데이터에서 'status' 필드를 추출합니다.
    const { status, taskId, videoUrl, errorMessage } = callbackData;

    console.log(`--- Vidu AI Callback Received ---`);
    console.log(`Task ID: ${taskId}`);
    console.log(`Status: ${status}`);

    // 작업 상태에 따라 다른 로직을 수행할 수 있습니다.
    switch (status) {
      case 'processing':
        console.log(
          `Video generation for Task ID ${taskId} is currently being processed.`,
        );
        // 여기에 데이터베이스 업데이트, 로딩 상태 표시 등의 로직을 추가할 수 있습니다.
        break;
      case 'success':
        console.log(`Video generation for Task ID ${taskId} succeeded!`);
        console.log(`Video URL: ${videoUrl}`);
        // 여기에 완성된 영상 URL을 사용자에게 제공하거나, 데이터베이스에 저장하는 로직을 추가할 수 있습니다.
        break;
      case 'failed':
        console.log(`Video generation for Task ID ${taskId} failed.`);
        console.error(`Error Message: ${errorMessage || 'Unknown error'}`);
        // 여기에 실패 알림, 에러 로깅 등의 로직을 추가할 수 있습니다.
        break;
      default:
        console.log(`Unhandled status: ${status}`);
        break;
    }

    console.log(`Full Callback Data:`, callbackData);
    console.log(`-------------------------------`);

    // Vidu AI에게 콜백 요청을 성공적으로 받았음을 알리는 응답을 보냅니다.
    // 200 OK 응답은 Vidu AI가 콜백을 재시도하지 않도록 합니다.
    return NextResponse.json(
      { message: 'Callback received successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing Vidu AI callback:', error);
    // 에러 발생 시 Vidu AI에게 500 Internal Server Error를 반환하여 재시도를 유도할 수 있습니다.
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
