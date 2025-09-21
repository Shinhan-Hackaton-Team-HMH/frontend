'use client';
import { QRCodeCanvas } from 'qrcode.react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Stepper from '@/components/common/stepper';
import { useRouter } from 'next/navigation';
import useCurrentAdStore from '@/store/useMockVideoStore';

interface CheckItem {
  id: string;
  title: string;
  progress: number;
  isCompleted: boolean;
  details: string[];
}

export default function ReportPage() {
  const [step, setStep] = useState(2);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [pngUrl, setPngUrl] = useState('');
  const [validButton, setValidButton] = useState(false);

  const [checkItems, setCheckItems] = useState<CheckItem[]>([
    {
      id: 'format',
      title: '규격 검사',
      progress: 0,
      isCompleted: false,
      details: [
        '해상도: 1920x1080 (Full HD)',
        '파일 크기: 15.2MB',
        '재생 시간: 30초',
        '프레임 레이트: 30fps',
      ],
    },
    {
      id: 'harmful',
      title: '유해성 검사',
      progress: 0,
      isCompleted: false,
      details: [
        '폭력적 콘텐츠: 검출되지 않음',
        '성인 콘텐츠: 검출되지 않음',
        '혐오 표현: 검출되지 않음',
        '저작권 침해: 검출되지 않음',
      ],
    },
    {
      id: 'text',
      title: '문구 텍스트 검사',
      progress: 0,
      isCompleted: false,
      details: [
        '맞춤법 검사: 오류 없음',
        '금지 단어: 검출되지 않음',
        '광고 표준: 준수',
        '가독성 점수: 95/100',
      ],
    },
  ]);

  useEffect(() => {
    if (canvas.current instanceof HTMLCanvasElement) {
      setPngUrl(
        canvas.current
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream'),
      );
    }
  }, []);

  useEffect(() => {
    const animateProgress = (itemIndex: number, delay: number) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          setCheckItems((prev) => {
            const newItems = [...prev];
            if (newItems[itemIndex].progress < 100) {
              newItems[itemIndex].progress += 2;
            } else {
              newItems[itemIndex].isCompleted = true;
              clearInterval(interval);

              // ✅ 모든 아이템이 완료되었는지 확인
              const allDone = newItems.every((item) => item.isCompleted);
              if (allDone) {
                setValidButton(true);
              }
            }
            return newItems;
          });
        }, 50);
      }, delay);
    };

    // Start animations with different delays
    animateProgress(0, 500); // Format check
    animateProgress(1, 2000); // Harmful check
    animateProgress(2, 4000); // Text check
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const router = useRouter();
  const handlePreviousStep = () => {
    router.push('/mypage');
  };

  const currentAd = useCurrentAdStore();

  const handleConfirm = async () => {
    await currentAd.updateVideoStatus('Reviewing');
    router.push('/mypage');
  };

  return (
    <div className="container mt-3">
      <section className="shadow-section mb-[72px] flex h-fit w-full flex-col items-center justify-center gap-6 rounded-[20px] bg-white px-[60px] pt-3 pb-[60px]">
        <Stepper
          label={'광고 검사 안내'}
          step={3}
          handlePreviousStep={handlePreviousStep}
        />
        <div className="flex w-full flex-col gap-5">
          <div className="text-Headline text-text-normal">
            광고 영상을 확인해주세요
          </div>
          <div className="flex h-[700px] w-full flex-row items-center justify-between gap-6">
            <div className="relative flex w-full">
              <video
                src="https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full rounded-xl object-contain"
                style={{ height: 'auto', maxHeight: '100%' }}
              ></video>
              <div className="absolute bottom-0 left-0 flex w-full flex-row items-center justify-between gap-2 rounded-b-xl bg-black/80 px-4 py-4">
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
            <div className="flex h-full w-full flex-col items-start justify-between">
              <div className="text-TitleMD">AI 광고 심의 결과에요</div>
              <div className="flex w-full flex-col items-center gap-5 overflow-y-auto">
                {checkItems.map((item, index) => (
                  <div key={item.id} className="w-full">
                    <div className="shadow-section flex w-full flex-col rounded-2xl px-6 py-4">
                      <div className="mb-3 flex flex-row items-center justify-between">
                        <div className="text-title">{item.title}</div>
                        {item.isCompleted ? (
                          <Image
                            src={`/icon/check_circle_safe.svg`}
                            alt={'check_icon'}
                            width={24}
                            height={24}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="bg-primary h-full transition-all duration-100 ease-out"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className="min-w-[3rem] text-sm text-gray-600">
                              {Math.round(item.progress)}%
                            </span>
                          </div>
                        )}
                      </div>
                      {item.progress > 0 && (
                        <div className="mt-2 space-y-1">
                          {item.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className={`border-l-2 pl-4 text-sm text-gray-600 transition-all duration-300 ${
                                item.progress > (detailIndex + 1) * 25
                                  ? 'text-status-success border-status-success'
                                  : 'border-gray-300'
                              }`}
                              style={{
                                opacity:
                                  item.progress > detailIndex * 25 ? 1 : 0.3,
                                transform:
                                  item.progress > detailIndex * 25
                                    ? 'translateX(0)'
                                    : 'translateX(-10px)',
                              }}
                            >
                              • {detail}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-ButtonMD text-text-assistive ring-line-assistive w-full rounded-xl py-[13px] ring">
                재생성 하기 (10/10)
              </button>
              <button
                onClick={handleConfirm}
                disabled={!validButton}
                className={`text-ButtonMD w-full rounded-xl py-[13px] ${validButton ? 'bg-primary text-white' : 'bg-inactive text-text-assistive'}`}
              >
                광고 진행하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
