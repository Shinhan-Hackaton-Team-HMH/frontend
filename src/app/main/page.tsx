'use client';

import Card, { CardDetail } from '@/components/card';
import GlitchyNumber from '@/components/glitchy_text';
import MapInteraction from '@/components/map';
import { useState } from 'react';

export default function MainPage() {
  const cardContent: CardDetail[] = [
    {
      client: '소상공인',
      title: '예산 맞춤형 광고 만들기',
    },
    {
      client: '기업고객',
      title: '광고 예산 책정 바로가기',
    },
  ];

  const [mapModal, setMapModal] = useState(false);

  return (
    <>
      <div className="container flex flex-col items-center justify-center">
        <section className="relative flex h-[492px] w-full flex-row gap-3">
          <div
            className={`rounded-[20px] bg-white transition-all duration-500 ${
              mapModal ? 'flex-1' : 'flex-1/2'
            }`}
          >
            <MapInteraction mapModal={mapModal} setMapModal={setMapModal} />
          </div>
          <div
            className={`shadow-section flex flex-col justify-between gap-[23px] rounded-[20px] bg-white p-6 transition-all duration-500 ${
              mapModal
                ? 'pointer-events-none flex-0 opacity-0'
                : 'flex-1/2 opacity-100'
            }`}
          >
            <span className="text-text-primary text-StatsLG font-spotlight font-normal tracking-[-1.28px]">
              원스탑 광고 솔루션
            </span>
            <span className="text-text-assistive text-TitleMD">
              광고 제작부터 송출까지 한번에
            </span>
            <div className="grid grid-cols-2 gap-2">
              {cardContent.map((value, index) => (
                <Card key={index} client={value.client} title={value.title} />
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
