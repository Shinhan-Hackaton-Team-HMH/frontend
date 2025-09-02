'use client';

import Card, { CardDetail } from '@/components/card';
import GlitchyNumber from '@/components/glitchy_text';
import MapInteraction from '@/components/map';
import { useState } from 'react';
import Image from 'next/image';
import useUserStore from '@/store/useUserStore';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const cardContent: CardDetail[] = [
    {
      client: '전국 동시 광고',
      title: '광고 예산 책정 바로가기',
      small_business: false,
    },
    {
      client: '우리 동네 광고',
      title: '소상공인에게 추천해요',
      small_business: true,
    },
  ];

  const [mapModal, setMapModal] = useState(false);
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);

  const handleRoute = () => {
    if (userId !== '') {
      router.push('/business');
    } else router.push('/login');
  };

  return (
    <>
      <div className="container flex flex-col items-center justify-center">
        <section className="relative flex h-[468px] w-full flex-row gap-3">
          <div
            className={`rounded-[20px] bg-white transition-all duration-500 ${
              mapModal ? 'w-full flex-1' : 'flex-1/2'
            }`}
          >
            <MapInteraction mapModal={mapModal} setMapModal={setMapModal} />
          </div>
          <div
            className={`flex h-full w-full flex-col gap-3 transition-all duration-500 ${
              mapModal
                ? 'pointer-events-none hidden flex-0 opacity-0'
                : 'flex-1/2 opacity-100'
            }`}
          >
            <div
              className={`shadow-section flex flex-col justify-between gap-[22px] rounded-[20px] bg-white p-6`}
            >
              <div className="flex flex-col gap-1">
                <span className="text-text-normal text-Headline">
                  원스탑 광고 솔루션
                </span>
                <span className="text-text-assistive text-BodySM">
                  광고 제작부터 송출까지 한번에 KT바로광고에서 손쉽게
                  도와드려요.
                </span>
              </div>
              <button
                className="flew-row ring-line-assistive flex w-fit items-center gap-2 rounded-[20px] px-6 py-2.5 ring"
                onClick={handleRoute}
              >
                <div className="text-BodyMD text-text-normal">
                  사업자등록증 제출하기
                </div>
                <Image
                  src={'/icon/arrow_right.svg'}
                  alt={''}
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="grid h-full grid-cols-2 gap-2">
              {cardContent.map((value, index) => (
                <Card
                  key={index}
                  client={value.client}
                  title={value.title}
                  small_business={value.small_business}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="relative mt-[23px] mb-[101px] flex w-full flex-col items-center justify-center">
          <div className="shadow-section flex w-full items-center justify-center rounded-[20px] bg-[#FFF] py-[3px]">
            <div className="flex h-[160px] w-[400px] flex-col items-center justify-center gap-5">
              <div className="text-text-strong text-TitleMD text-center">
                일일 광고 재생시간
              </div>
              <div className="text-StatsLG text-text-dark-primary">
                <GlitchyNumber target={566314} duration={1000} />
                <span className="text-TitleMD text-text-primary">시간</span>
              </div>
            </div>
            <div className="flex h-[160px] w-[400px] flex-col items-center justify-center gap-5">
              <div className="text-text-strong text-Headline text-center">
                일일 광고 재생시간
              </div>
              <div className="text-text-primary text-StatsXL">
                <GlitchyNumber target={20403097} duration={1000} />명
              </div>
            </div>
            <div className="flex h-[160px] w-[400px] flex-col items-center justify-center gap-5">
              <div className="text-text-strong text-TitleMD text-center">
                일일 광고 재생시간
              </div>
              <div className="text-StatsLG text-text-dark-primary">
                <GlitchyNumber target={13031310} duration={1000} />개
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 flex flex-row gap-[1px] rounded-full border border-gray-200 bg-white p-1">
            <div className="rounded-full bg-[#ECEEF0] px-6 py-2.5">
              실시간 광고 보기
            </div>
            <div className="px-6 py-2.5">통합 이용 가이드</div>
            <div className="px-6 py-2.5">유의사항</div>
            <div className="px-6 py-2.5">자주하는 질문</div>
            <div className="px-6 py-2.5">회원가입 안내</div>
          </div>
        </section>
      </div>
    </>
  );
}
