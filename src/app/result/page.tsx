'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function ResultPage() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [pngUrl, setPngUrl] = useState('');

  useEffect(() => {
    if (canvas.current instanceof HTMLCanvasElement) {
      setPngUrl(
        canvas.current
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream'),
      );
    }

    // vh 보정 (모바일 주소창 대응)
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`,
      );
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[1000] flex min-h-svh w-screen flex-col bg-white">
      {/* 배경 영상 */}
      <div className="size-full">
        <video
          src="https://storage.googleapis.com/hackathon_hmh/generated_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute flex w-full flex-1 object-contain"
        ></video>

        {/* 하단 정보 영역 */}
        <div className="fixed bottom-0 left-0 z-[2000] flex w-full flex-row justify-between gap-4 bg-black/80 px-4 pt-4">
          <div className="flex w-full flex-col gap-2 text-white">
            <div className="text-lg leading-relaxed font-medium">매장 정보</div>
            <div className="text-sm leading-relaxed font-normal">
              최대 수용 인원 40명
            </div>
            <div className="text-lg leading-relaxed font-medium">주차 안내</div>
            <div className="text-sm leading-relaxed font-normal">
              인근 공영주차장 1시간 무료
            </div>
          </div>

          <div className="flex w-full max-w-[180px] flex-col items-center justify-center gap-2 rounded-xl bg-white/90 p-3">
            <div className="flex flex-row items-center justify-center gap-2">
              <Image
                src="/icon/camera_icon.svg"
                width={28}
                height={28}
                alt=""
              />
              <div className="text-sm font-semibold text-black">
                방문 혜택 받기
              </div>
            </div>
            <QRCodeCanvas
              ref={canvas}
              className="h-36 w-36 rounded-xl"
              id="qr-code-download"
              value="http://172.30.1.56:3000/result"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
