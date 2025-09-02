// app/api/ffmpeg/editor/route.ts
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// --- FFmpeg 실행 helper ---
async function runFFmpeg(args: string[], label?: string) {
  return new Promise<void>((resolve, reject) => {
    console.log(`[ffmpeg] Running: ${label || 'command'} ${args.join(' ')}`);
    const ffmpeg = spawn('ffmpeg', args);
    ffmpeg.stderr.on('data', (d) =>
      console.log(`[ffmpeg ${label || ''}]`, d.toString()),
    );
    ffmpeg.on('close', (code) =>
      code === 0
        ? (console.log(`[ffmpeg ${label || ''}] Success`), resolve())
        : (console.log(`[ffmpeg ${label || ''}] Failed with code ${code}`),
          reject(new Error('ffmpeg failed'))),
    );
  });
}

// --- URL에서 영상 다운로드 ---
async function downloadVideo(url: string, dest: string) {
  console.log(`[download] Start downloading ${url}`);
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(dest, Buffer.from(response.data));
  console.log(`[download] Finished downloading ${url}`);
}

// --- xfade filter builder ---
// function buildXfadeFilter(
//   files: string[],
//   singleLength = 5,
//   transitionDuration = 1,
// ) {
//   let filter = '';

//   // 1️⃣ 각 입력 영상에 tpad 적용
//   for (let i = 0; i < files.length; i++) {
//     filter += `[${i}:v]tpad=stop_duration=${singleLength}[v${i}];`;
//   }

//   // 2️⃣ xfade 체인 만들기
//   let prevLabel = 'v0';
//   for (let i = 1; i < files.length; i++) {
//     const offset = i * singleLength - transitionDuration; // 트랜지션 시작 시점
//     const outLabel = i === files.length - 1 ? 'vout' : `v${i}`;
//     filter += `[${prevLabel}][v${i}]xfade=transition=fade:duration=${transitionDuration}:offset=${offset}[${outLabel}];`;
//     prevLabel = outLabel;
//   }

//   return filter.slice(0, -1); // 마지막 ; 제거
// }
function buildXfadeFilter(
  files: string[],
  singleLength = 5,
  transitionDuration = 0.5,
) {
  let filter = '';

  // 1️⃣ 각 입력 영상에 tpad 적용
  for (let i = 0; i < files.length; i++) {
    filter += `[${i}:v]tpad=stop_duration=${singleLength}[v${i}];`;
  }

  // 2️⃣ xfade 체인 (라벨 충돌 방지)
  let prevLabel = 'v0';
  for (let i = 1; i < files.length; i++) {
    const offset = i * singleLength - transitionDuration; // 트랜지션 시작
    const outLabel = i === files.length - 1 ? 'vout' : `xf${i}`;
    filter += `[${prevLabel}][v${i}]xfade=transition=fade:duration=${transitionDuration}:offset=${offset}[${outLabel}];`;
    prevLabel = outLabel;
  }

  return filter.slice(0, -1); // 마지막 ; 제거
}

// --- API handler ---
export async function POST(req: Request) {
  const formData = await req.formData();
  const texts = JSON.parse(formData.get('texts') as string) as string[];
  const urls = JSON.parse(formData.get('urls') as string) as string[];

  ///IF Files need to be used
  // const files = formData.getAll('files') as File[];

  console.log('Starting Files: ', urls);
  console.log('Starting text: ', texts);

  const processedFiles: string[] = [];
  const singleLength = 5;
  const transitionDuration = 0.5;

  console.log(`[process] Starting video processing for ${texts.length} videos`);

  // 1️⃣ 각 영상 처리
  for (let i = 0; i < texts.length; i++) {
    const inputPath = path.join('/tmp', `input_${i}.mp4`);
    const outputPath = path.join('/tmp', `processed_${i}.mp4`);

    try {
      // if (files[i]) {
      //   console.log(`[process] Writing uploaded file ${i}`);
      //   const buffer = Buffer.from(await files[i].arrayBuffer());
      //   fs.writeFileSync(inputPath, buffer);
      // } else
      if (urls[i]) {
        await downloadVideo(urls[i], inputPath);
      } else {
        throw new Error(`Missing video at index ${i}`);
      }

      const startTime = i * singleLength;
      const duration = singleLength + transitionDuration;
      console.log(
        `[process] Video ${i}: start=${startTime}s, duration=${duration}s, text="${texts[i]}"`,
      );
      // 모든 영상 1080:1920, 30fps, yuv420p, 텍스트, tpad 추가
      await runFFmpeg(
        [
          '-i',
          inputPath,
          '-vf',
          `
          scale=1080:1920,fps=30,format=yuv420p,
          drawtext=text='${texts[i]}':fontcolor=white:fontsize=40:x='(w-text_w)/2':y='(h-text_h)/2',
          tpad=stop_duration=${transitionDuration}
        `,
          '-t',
          `${singleLength + transitionDuration}`,
          '-c:v',
          'libx264',
          '-preset',
          'fast',
          '-crf',
          '23',
          '-pix_fmt',
          'yuv420p',
          '-y',
          outputPath,
        ],
        `video-${i}`,
      );

      processedFiles.push(outputPath);
      console.log(`[process] Finished processing video ${i}`);
    } catch (err) {
      console.log(
        `[process] Failed processing video ${i}: ${(err as Error).message}`,
      );
      throw err;
    }
  }

  console.log(`[concat] Preparing final video with xfade`);
  const finalPath = path.join('/tmp', 'final.mp4');

  try {
    if (processedFiles.length === 1) {
      fs.copyFileSync(processedFiles[0], finalPath);
      console.log(`[concat] Only one video, copied to final`);
    } else {
      const filter = buildXfadeFilter(
        processedFiles,
        singleLength,
        transitionDuration,
      );
      console.log(`[concat] xfade filter: ${filter}`);

      await runFFmpeg(
        [
          ...processedFiles.flatMap((f) => ['-i', f]),
          '-filter_complex',
          filter,
          '-map',
          '[vout]',
          '-c:v',
          'libx264',
          '-preset',
          'fast',
          '-crf',
          '23',
          '-pix_fmt',
          'yuv420p',
          '-y',
          finalPath,
        ],
        'xfade-final',
      );
    }
    console.log(`[concat] Finished final video`);
  } catch (err) {
    console.log(`[concat] Failed final xfade: ${(err as Error).message}`);
    throw err;
  }

  const video = fs.readFileSync(finalPath);
  console.log(`[response] Sending final video`);
  return new NextResponse(video, { headers: { 'Content-Type': 'video/mp4' } });
}
