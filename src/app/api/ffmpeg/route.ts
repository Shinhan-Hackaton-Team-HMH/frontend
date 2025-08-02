// pages/api/stream-check-s3-video.ts

import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { NextRequest } from 'next/server';

// ffmpeg 바이너리 경로 설정
// ffmpeg.setFfmpegPath(ffmpegPath.path);

// // Next.js API 라우트의 body parser 설정
// export const config = {
//   api: {
//     // URL을 쿼리 파라미터로 받으므로 body-parser는 기본값으로 두어도 괜찮습니다.
//   },
// };

// 허용할 최대/최소 해상도 정의
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const MIN_WIDTH = 640;
const MIN_HEIGHT = 480;

const MAX_FILE_SIZE_BYTES = 1000 * 1024 * 1024; // 500 MB (바이트 단위)
const MIN_FILE_DURATION_SECONDS = 5; // 최소 영상 길이 5초
const MAX_FILE_DURATION_SECONDS = 300; // 최대 영상 길이 300초 (5분)

const MIN_FRAME_RATE = 24;
const MAX_FRAME_RATE = 60;

// 허용되는 비디오 코덱 목록 (소문자로 비교)
const ALLOWED_VIDEO_CODECS = ['h264', 'vp8', 'vp9', 'av1', 'mpeg4', 'hevc'];
// 허용되는 오디오 코덱 목록 (소문자로 비교)
const ALLOWED_AUDIO_CODECS = ['aac', 'mp3', 'opus', 'vorbis'];

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get('url');
  console.log(videoUrl);

  if (!videoUrl || !videoUrl.startsWith('https://')) {
    return Response.json({
      message: '유효한 영상 URL을 쿼리 파라미터로 제공해주세요.',
    });
  }

  try {
    // 1. ffmpeg.ffprobe를 사용하여 영상 메타데이터 분석 (Promise 래핑)
    const metadata = await new Promise<ffmpeg.FfprobeData>(
      (resolve, reject) => {
        ffmpeg.ffprobe(videoUrl, (err, data) => {
          if (err) {
            console.error(`FFprobe error for URL ${videoUrl}:`, err);
            reject(new Error(`영상 메타데이터 분석 실패: ${err.message}`));
          } else {
            resolve(data);
          }
        });
      },
    );

    const videoStream = metadata.streams.find(
      (stream) => stream.codec_type === 'video',
    );
    const audioStream = metadata.streams.find(
      (stream) => stream.codec_type === 'audio',
    );

    // 영상 스트림 필수 정보 확인
    if (
      !videoStream ||
      videoStream.width === undefined ||
      videoStream.height === undefined
    ) {
      return Response.json({
        message: '영상 스트림 또는 해상도 정보를 찾을 수 없습니다.',
      });
    }

    const {
      width,
      height,
      codec_name: videoCodec,
      avg_frame_rate,
      duration,
    } = videoStream;
    const audioCodec = audioStream?.codec_name; // 오디오 스트림이 없을 수도 있음

    // 프레임 레이트 계산 (avg_frame_rate는 "num/den" 형식일 수 있음)
    let frameRate: number | undefined;
    if (typeof avg_frame_rate === 'string' && avg_frame_rate.includes('/')) {
      const [num, den] = avg_frame_rate.split('/').map(Number);
      if (den !== 0) frameRate = num / den;
    } else if (typeof avg_frame_rate === 'number') {
      frameRate = avg_frame_rate;
    }
    // 영상 길이 계산 (초 단위)
    const videoDurationSeconds =
      typeof duration === 'number' ? duration : parseFloat(duration || '0');

    // 파일 용량 추출
    const fileSize = metadata.format.size;

    console.log(`--- Video Analysis for ${videoUrl} ---`);
    console.log(`Resolution: ${width}x${height}`);
    console.log(`Video Codec: ${videoCodec}`);
    console.log(`Audio Codec: ${audioCodec || 'N/A'}`);
    console.log(`Frame Rate: ${frameRate?.toFixed(2) || 'N/A'} fps`);
    console.log(`Duration: ${videoDurationSeconds.toFixed(2)} seconds`);
    console.log(
      `File Size: ${fileSize ? (fileSize / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A'}`,
    );
    console.log('------------------------------------');

    // 해상도 규격 검사
    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
      return Response.json({
        message: `해상도가 너무 높습니다. 최대 ${MAX_WIDTH}x${MAX_HEIGHT}까지 허용됩니다. (현재: ${width}x${height})`,
      });
    }
    if (width < MIN_WIDTH || height < MIN_HEIGHT) {
      return Response.json({
        message: `해상도가 너무 낮습니다. 최소 ${MIN_WIDTH}x${MIN_HEIGHT} 이상이어야 합니다. (현재: ${width}x${height})`,
      });
    }

    // 2.2. 파일 용량 검사 (메타데이터에서 size 정보를 가져올 수 있을 때만)
    if (fileSize !== undefined && !isNaN(fileSize)) {
      // size가 정의되고 유효한 숫자인 경우에만 검사
      if (fileSize > MAX_FILE_SIZE_BYTES) {
        return Response.json(
          {
            message: `파일 용량이 너무 큽니다. 최대 ${(MAX_FILE_SIZE_BYTES / (1024 * 1024)).toFixed(0)}MB까지 허용됩니다. (현재: ${(fileSize / (1024 * 1024)).toFixed(2)}MB)`,
            details: {
              currentSizeMB: (fileSize / (1024 * 1024)).toFixed(2),
              maxSizeBytes: MAX_FILE_SIZE_BYTES,
            },
          },
          { status: 400 },
        );
      }
    } else {
      // 용량 정보를 얻을 수 없는 경우 (경고 로깅 또는 정책에 따라 에러 처리)
      console.warn(
        `[WARNING] 파일 용량 정보를 메타데이터에서 얻을 수 없습니다: ${videoUrl}`,
      );
      // return Response.json({ message: '파일 용량 정보를 확인할 수 없습니다.' }, { status: 400 }); // 엄격하게 처리하려면 이 주석 해제
    }

    // 2.3. 비디오 코덱 검사
    if (
      videoCodec &&
      !ALLOWED_VIDEO_CODECS.includes(videoCodec.toLowerCase())
    ) {
      return Response.json(
        {
          message: `지원되지 않는 비디오 코덱입니다. 허용되는 코덱: ${ALLOWED_VIDEO_CODECS.join(', ')}. (현재: ${videoCodec})`,
          details: {
            currentCodec: videoCodec,
            allowedCodecs: ALLOWED_VIDEO_CODECS,
          },
        },
        { status: 400 },
      );
    }

    // 2.4. 오디오 코덱 검사 (오디오 스트림이 존재할 경우에만)3
    if (
      audioCodec &&
      !ALLOWED_AUDIO_CODECS.includes(audioCodec.toLowerCase())
    ) {
      return Response.json(
        {
          message: `지원되지 않는 오디오 코덱입니다. 허용되는 코덱: ${ALLOWED_AUDIO_CODECS.join(', ')}. (현재: ${audioCodec})`,
          details: {
            currentCodec: audioCodec,
            allowedCodecs: ALLOWED_AUDIO_CODECS,
          },
        },
        { status: 400 },
      );
    } else if (!audioStream) {
      console.warn(`[WARNING] 영상에 오디오 스트림이 없습니다: ${videoUrl}`);
    }

    // 2.5. 프레임 레이트 검사
    if (
      frameRate !== undefined &&
      (frameRate < MIN_FRAME_RATE || frameRate > MAX_FRAME_RATE)
    ) {
      return Response.json(
        {
          message: `프레임 레이트가 허용 범위를 벗어납니다. ${MIN_FRAME_RATE}-${MAX_FRAME_RATE}fps가 허용됩니다. (현재: ${frameRate.toFixed(2)}fps)`,
          details: {
            currentFrameRate: frameRate.toFixed(2),
            allowedRange: `${MIN_FRAME_RATE}-${MAX_FRAME_RATE}fps`,
          },
        },
        { status: 400 },
      );
    } else if (frameRate === undefined) {
      console.warn(
        `[WARNING] 프레임 레이트 정보를 얻을 수 없습니다: ${videoUrl}`,
      );
    }

    // 2.6. 영상 길이 검사
    if (
      videoDurationSeconds !== undefined &&
      (videoDurationSeconds < MIN_FILE_DURATION_SECONDS ||
        videoDurationSeconds > MAX_FILE_DURATION_SECONDS)
    ) {
      return Response.json(
        {
          message: `영상 길이가 허용 범위를 벗어납니다. ${MIN_FILE_DURATION_SECONDS}초-${MAX_FILE_DURATION_SECONDS}초가 허용됩니다. (현재: ${videoDurationSeconds.toFixed(2)}초)`,
          details: {
            currentDuration: videoDurationSeconds.toFixed(2),
            allowedRange: `${MIN_FILE_DURATION_SECONDS}-${MAX_FILE_DURATION_SECONDS}s`,
          },
        },
        { status: 400 },
      );
    } else if (
      videoDurationSeconds === undefined ||
      videoDurationSeconds === 0
    ) {
      console.warn(
        `[WARNING] 영상 길이 정보를 얻을 수 없거나 0입니다: ${videoUrl}`,
      );
    }

    // 모든 검사 통과
    return Response.json({
      message: '영상 규격 검사 통과',
      url: videoUrl,
      resolution: `${width}x${height}`,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return Response.json({ message: '서버 오류', error: error });
  }
}
