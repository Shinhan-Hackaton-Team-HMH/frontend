'use client';
import Stepper from '@/components/common/stepper';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ReportPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [mergedData, setMergedData] = useState<any>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseFF = await axios.get(
  //         '/api/ffmpeg/inspection?gcsURI=https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4',
  //       );
  //       const responseGC = await axios.post('/api/video/analyze', {
  //         gcsUri: 'gs://hmh_bucket/flower.mp4',
  //       });

  //       // 실제 데이터만 추출하고 병합
  //       const merged = { ...responseFF.data, ...responseGC.data };
  //       console.log(merged);
  //       setMergedData(merged);
  //     } catch (err) {
  //       console.error('Error fetching video analysis:', err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // JSON 다운로드 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const downloadJSON = (data: any, filename = 'data.json') => {
  //   const jsonStr = JSON.stringify(data, null, 2);
  //   const blob = new Blob([jsonStr], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);

  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = filename;
  //   a.click();

  //   URL.revokeObjectURL(url);
  // };
  const [step, setStep] = useState(2);
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
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container mt-3">
      <section className="shadow-section mb-[72px] flex h-fit w-[1200px] flex-col items-center justify-center gap-6 rounded-[20px] bg-white px-[60px] pt-3 pb-[60px]">
        <Stepper
          label={'광고 송출 기기 안내'}
          step={step}
          handlePreviousStep={handlePreviousStep}
        />
        <div className="flex w-full flex-col gap-5">
          <div className="text-Headline text-text-normal">
            광고 송출 기기를 선택해 주세요.
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-6">
            <div className="relative w-full">
              <video
                src="https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full rounded-xl object-contain"
                style={{ height: 'auto', maxHeight: '100%' }}
              ></video>
              <div className="absolute bottom-0 left-0 flex w-full flex-row items-center justify-between gap-2 rounded-b-xl bg-black/80 px-2 py-4">
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
                      value="https://frontend-five-sepia-55.vercel.app/result"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full flex-col justify-center gap-6">
              <div className="flex flex-col items-center gap-8">
                <div className="shadow-section mx-10 flex w-full flex-row justify-between rounded-2xl px-10 py-4">
                  <div>규격 검사</div>
                  <Image
                    src={`/icon/check_circle_selected.svg`}
                    alt={'check_icon'}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="shadow-section mx-10 flex w-full flex-row justify-between rounded-2xl px-10 py-4">
                  <div>유해성 검사</div>
                  <Image
                    src={`/icon/check_circle_selected.svg`}
                    alt={'check_icon'}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="shadow-section mx-10 flex w-full flex-row justify-between rounded-2xl px-10 py-4">
                  <div>문구 텍스트 검사</div>
                  <Image
                    src={`/icon/check_circle_selected.svg`}
                    alt={'check_icon'}
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <button className="bg-normal-assistive text-text-normal text-ButtonMD w-full rounded-xl py-[13px]">
                재생성 하기 (10/10)
              </button>
              <button className="bg-primary text-text-inverse text-ButtonMD w-full rounded-xl py-[13px]">
                광고비 결제하기
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* {mergedData ? (
        <button
          onClick={() => downloadJSON(mergedData, 'video-analysis.json')}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Download Video Analysis
        </button>
      ) : (
        <p>Loading video analysis...</p>
      )} */}
    </div>
  );
}
