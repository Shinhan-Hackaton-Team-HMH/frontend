'use client';

import Card, { CardDetail } from '@/components/card';
import Footer from '@/components/footer/indext';
import GlitchyNumber from '@/components/glitchy_text';
import Header from '@/components/header';
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
    <div className="flex flex-col  container justify-center items-center">
      <Header />
      <section className="flex flex-row gap-3 w-full relative">
        <div
          className={` bg-white shadow-section  ${
            mapModal ? 'absolute w-10/12 max-w-[1200px] top-0 left-0' : 'w-1/2'
          }`}
        >
          <MapInteraction setMapModal={setMapModal} />
        </div>
        <div
          className={`flex flex-col gap-7 p-6 shadow-section bg-white w-1/2`}
        >
          <span className="text-primary text-StatsLG font-normal font-spotlight">
            원스탑 광고 솔루션
          </span>
          <span className="text-assistive text-TitleMD">
            광고 제작부터 송출까지 한번에
          </span>
          <div className="grid grid-cols-2 gap-2">
            {/* <div className="w-1/2 h-[330px] bg-red-400 rounded-[20px]">
              card
            </div>
            <div className="w-1/2 h-[330px] bg-blue-400 rounded-[20px]">
              card
            </div> */}
            {cardContent.map((value, index) => (
              <Card key={index} client={value.client} title={value.title} />
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col relative justify-center items-center mt-[23px] mb-[101px]">
        <div className="flex rounded-[20px] bg-[#F4F8FF] justify-center items-center h-[166px]">
          <div className="px-[104px] py-[41px] flex flex-col gap-5 ">
            <div className="text-text-Strong text-TitleMD text-center">
              일일 광고 재생시간
            </div>
            <div className="text-StatsLG text-deep-blue-70">
              <GlitchyNumber target={566314} duration={1000} />
              <span className="text-TitleMD text-primary">시간</span>
            </div>
          </div>
          <div className=" py-[30px] px-[66.5px]  flex flex-col  gap-5 ">
            <div className="text-text-Strong text-Headline text-center ">
              일일 광고 재생시간
            </div>
            <div className="text-primary text-StatsXL">20,403,097명</div>
          </div>
          <div className="px-[104px] py-[41px] flex flex-col gap-5">
            <div className="text-text-Strong text-TitleMD. text-center">
              일일 광고 재생시간
            </div>
            <div className="text-StatsLG text-deep-blue-70">13,031,310개</div>
          </div>
        </div>
        <div className="flex flex-row p-1 gap-[1px] absolute -bottom-8 bg-white rounded-full border border-gray-200">
          <div className="px-6 py-2.5 bg-[#ECEEF0] rounded-full">
            실시간 광고 보기
          </div>
          <div className="px-6 py-2.5">통합 이용 가이드</div>
          <div className="px-6 py-2.5">유의사항</div>
          <div className="px-6 py-2.5">자주하는 질문</div>
          <div className="px-6 py-2.5">회원가입 안내</div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
