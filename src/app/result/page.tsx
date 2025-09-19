'use client';
import { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function ResultPage() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [pngUrl, setPngUrl] = useState('');

  //광고 송출 횟수

  useEffect(() => {
    if (canvas.current instanceof HTMLCanvasElement) {
      setPngUrl(
        canvas.current
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream'),
      );
    }

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
    <div
      className="fixed top-0 left-0 z-[1000] flex w-full flex-1 flex-col bg-black"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* 배경 영상 */}
      <div className="relative h-full w-full flex-1">
        <video
          src="https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-contain"
          style={{ height: 'auto', maxHeight: '100%' }}
        ></video>

        {/* 하단 정보 영역 */}
        <div className="fixed bottom-0 left-0 z-[2000] flex w-full flex-row items-center justify-around gap-2 bg-black/80 px-2 py-4 pb-[calc(env(safe-area-inset-bottom,0)+12px)]">
          <div className="flex w-fit flex-col gap-2 text-white">
            <div className="text-md font-medium">매장 정보</div>
            <div className="text-xs font-normal">최대 수용 인원 40명</div>
            <div className="text-md font-medium">주차 안내</div>
            <div className="text-xs font-normal">
              인근 공영주차장 1시간 무료
            </div>
          </div>

          <div className="h-fit max-w-[180px]">
            <div className="flex h-full w-fit flex-col items-center justify-center gap-2 rounded-xl bg-white p-3">
              <div className="text-sm font-semibold text-black">
                방문 혜택 받기
              </div>
              <QRCodeCanvas
                ref={canvas}
                style={{ width: '60px', height: '60px' }}
                id="qr-code-download"
                value="https://frontend-five-sepia-55.vercel.app/redirect/url?target=https://naver.me/xyTiaCSl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
