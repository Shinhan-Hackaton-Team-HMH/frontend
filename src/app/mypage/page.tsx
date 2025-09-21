'use client';
import useCurrentAdStore, { VideoStatus } from '@/store/useMockVideoStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const currentAd = useCurrentAdStore();
  const status = useCurrentAdStore((state) => state.status);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    const run = async () => {
      await delay(2000);
      if (status === 'Generating') {
        currentAd.updateVideoStatus('Confirmed');
      }
    };
    run();
  }, [status]); // ✅ status 변화 감지만 담당

  const statusLabel: Record<VideoStatus, string> = {
    Generating: '제작중',
    Reviewing: '심사중',
    BroadCasting: '광고 진행 중',
    Confirmed: '광고 제작 완료',
  };

  return (
    <div className="container mb-20 flex flex-row gap-[30px]">
      <div className="shadow-section ring-line-assistive text-BodyMD flex h-fit w-[180px] flex-col rounded-xl px-1.5 ring">
        <div className="text-TitleMD px-4 pt-4 pb-2">마이페이지</div>
        <div className="w-full rounded-lg py-3 pl-4">내 광고 현황</div>
        <Link href="/mypage/my-ads">
          <div className="w-full rounded-lg py-3 pl-4">광고 집행 내역</div>
        </Link>
        <div className="w-full rounded-lg py-3 pl-4">내 문의내역</div>
        <div className="w-full rounded-lg py-3 pl-4">회원정보 관리</div>
        <div className="w-full rounded-lg py-3 pl-4">개인정보처리방침</div>
      </div>
      <div className="flex w-full flex-col gap-9">
        <div className="shadow-section flex w-full flex-col rounded-[20px] p-6">
          <div className="flex w-full flex-row justify-between rounded-[120px]">
            <span className="text-Headline text-text-normal">홍길동</span>
            <button
              onClick={() => currentAd.reset()}
              className="ring-line-assistive flex flex-row items-center justify-center gap-2 rounded-[120px] px-6 py-2 ring"
            >
              <span className="text-BodyMD text-text-normal">로그아웃</span>
              <Image src={'/icon/logout.svg'} alt={''} width={20} height={20} />
            </button>
          </div>
          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-3">
              <div className="bg-normal-assistive flex w-full flex-row justify-between rounded-xl px-4 py-3">
                <span>내 문의 내역</span>
                <Image
                  src={'/icon/arrow_right.svg'}
                  alt={''}
                  width={24}
                  height={24}
                />
              </div>
              <div className="text-BodySM text-text-assistive flex flex-row items-center justify-start gap-[3px]">
                <span>회원정보 관리</span>
                <Image
                  src={'/icon/settings.svg'}
                  alt={''}
                  width={18}
                  height={18}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-row items-center justify-center gap-1.5">
              <div className="flex flex-col items-center justify-center gap-3.5">
                <div className="text-text-assistive text-BodyMD">
                  사업자등록증
                </div>
                <div className="text-BodyMD bg-normal-assistive rounded-lg px-2 py-1 text-black">
                  완료
                </div>
              </div>
              <Image
                src={'/icon/arrow_right.svg'}
                alt={''}
                width={24}
                height={24}
              />
              <div className="flex flex-col items-center justify-center gap-3.5">
                <div className="text-BodyMD text-black">광고예산 산정</div>
                <div className="text-BodyMD bg-primary-lighten text-primary rounded-lg px-2 py-1">
                  진행중
                </div>
              </div>
              <Image
                src={'/icon/arrow_right.svg'}
                alt={''}
                width={24}
                height={24}
              />
              <div className="flex flex-col items-center justify-center gap-3.5">
                <div className="text-text-assistive text-BodyMD">
                  광고영상 제작
                </div>
                <div className="text-BodyMD bg-normal-assistive rounded-lg px-2 py-1 text-black">
                  시작전
                </div>
              </div>
              <Image
                src={'/icon/arrow_right.svg'}
                alt={''}
                width={24}
                height={24}
              />
              <div className="flex flex-col items-center justify-center gap-3.5">
                <div className="text-text-assistive text-BodyMD">
                  광고 진행 중
                </div>
                <div className="text-BodyMD rounded-lg px-2 py-1 text-black">
                  2
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-row items-center justify-between">
            <span className="text-Headline text-text-normal">
              어제의 광고 현황
            </span>
            <Link
              href="/mypage"
              className="flex flex-row items-center justify-center gap-[3px]"
            >
              <span className="text-text-assistive text-BodySM">자세히</span>
              <Image
                src={'/icon/arrow_right.svg'}
                alt={''}
                width={18}
                height={18}
              />
            </Link>
          </div>
          <div className="ring-line-assistive shadow-section flex w-full flex-row gap-4 rounded-[20px] p-6 ring">
            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full flex-row gap-6">
                <div className="flex flex-col gap-[40px]">
                  <div>광고 내 QR링크 유입자 수</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-end justify-start">
                      <span className="text-[40px] leading-[26px] font-normal tracking-[-1.6px]">
                        78
                      </span>
                      <span className="text-ButtonMD text-text-normal">명</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3">
                        <div className="text-text-normal text-BodyMD">
                          최소갑
                        </div>
                        <div className="text-text-normal text-BodyMD">24명</div>
                      </div>
                      <div className="flex flex-row gap-3">
                        <div className="text-text-normal text-BodyMD">
                          최대갑
                        </div>
                        <div className="text-text-normal text-BodyMD">
                          135명
                        </div>
                      </div>
                    </div>
                    <div className="text-primary text-BodyMD">
                      전일 대비 13명이 증가했어요
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-TitleMD text-text-normal w-full">
                    CTR
                  </div>
                  <div className="text-BodySM text-text-assistive w-full">
                    광고노출 수 대비 QR링크 접속 전환률
                  </div>
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="relative size-[121px]">
                      <Image
                        src={'/donutChart.svg'}
                        alt={''}
                        fill
                        objectFit="cover"
                        className="top-0"
                      />
                    </div>
                    <div className="flex flex-row items-end gap-1.5">
                      <span className="mb-[3px] text-[40px] leading-[26px] font-normal tracking-[-1.6px] text-black">
                        16
                      </span>
                      <span className="text-BodyMD text-black">%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary-lighten flex w-full flex-col gap-3 rounded-xl px-6 py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center">
                    <Image
                      src={'/icon/sparkle_dark.svg'}
                      alt={''}
                      width={20}
                      height={20}
                    />
                    <span className="text-TitleSM text-text-normal">
                      내 광고 유형은?
                    </span>
                  </div>
                  <div className="text-ButtonMD text-primary">저녁 집중형</div>
                </div>
                <div className="text-BodySM text-text-normal w-full">
                  어제 전체 CTR은 2.8%로, 전일 대비 +0.5%p 상승했습니다.
                  <br /> 특히 퇴근 시간대(18시~20시)에 CTR이 평균 대비 약 1.4배
                  높게 나타났습니다.
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="text-TitleMD text-text-normal w-full">
                  광고노출 횟수
                </div>
                <div className="flex flex-row gap-1">
                  <span className="text-BodySM bg-primary text-text-inverse rounded-[20px] px-4 py-2">
                    전체
                  </span>
                  <span className="text-BodySM bg-normal-assistive text-text-assistive rounded-[20px] px-4 py-2">
                    여성
                  </span>
                  <span className="text-BodySM bg-normal-assistive text-text-assistive rounded-[20px] px-4 py-2">
                    남성
                  </span>
                  <span className="text-BodySM bg-normal-assistive text-text-assistive rounded-[20px] px-4 py-2">
                    20-30대
                  </span>
                  <span className="text-BodySM bg-normal-assistive text-text-assistive rounded-[20px] px-4 py-2">
                    40-50대
                  </span>
                  <span className="text-BodySM bg-normal-assistive text-text-assistive rounded-[20px] px-4 py-2">
                    60대 이상
                  </span>
                </div>
              </div>
              <div className="relative h-[268px] w-full">
                <Image src={'/lineChart.png'} alt={''} fill />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full flex-row items-center justify-between">
              <span className="text-Headline text-text-normal">
                광고 집행 내역
              </span>
              <Link
                href="/mypage/my-ads"
                className="flex flex-row items-center justify-center gap-[3px]"
              >
                <span className="text-text-assistive text-BodySM">자세히</span>
                <Image
                  src={'/icon/arrow_right.svg'}
                  alt={''}
                  width={18}
                  height={18}
                />
              </Link>
            </div>
            <div className="flex flex-col gap-3 py-3">
              <Link
                href={
                  status == 'Generating'
                    ? '/mypage'
                    : status == 'Confirmed'
                      ? '/mypage/my-ads'
                      : status == 'BroadCasting'
                        ? '/result'
                        : '/mypage'
                }
              >
                <div className="flex w-full flex-row justify-between">
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex w-full flex-row items-center justify-between gap-2">
                      <span className="text-TitleMD text-text-normal">
                        꽃사계
                      </span>
                      <div className="text-primary bg-primary-lighten rounded-lg px-2 py-1">
                        {statusLabel[status]}
                      </div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">기간</div>
                      <div className="text-text-normal">2025.09.15~09.30</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">지역</div>
                      <div className="text-text-normal">서울시 마포구</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">송출기계</div>
                      <div className="text-text-normal">엘리베이터TV, IPTV</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">결제일</div>
                      <div className="text-text-normal">2025.08.31</div>
                    </div>
                  </div>
                  <div className="ring-line-assistive relative h-[129px] w-[119px] rounded-xl bg-[url('/imageBackground.png')] bg-cover bg-center bg-no-repeat ring">
                    <video
                      src="https://storage.googleapis.com/hackathon_hmh/Four_Seasons%20_video.mp4"
                      muted
                      autoPlay
                      loop
                      className="size-full"
                    ></video>
                  </div>
                </div>
              </Link>
              <hr className="text-line-assistive" />
              <Link href="/mypage/my-ads">
                <div className="flex w-full flex-row justify-between">
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex w-full flex-row items-center justify-between gap-2">
                      <span className="text-TitleMD text-text-normal">
                        꽃사계
                      </span>
                      <div className="text-primary bg-primary-lighten rounded-lg px-2 py-1">
                        광고 진행중
                      </div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">기간</div>
                      <div className="text-text-normal">2025.08.08~10.08</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">지역</div>
                      <div className="text-text-normal">서울시 마포구</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">송출기계</div>
                      <div className="text-text-normal">엘리베이터TV, IPTV</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">결제일</div>
                      <div className="text-text-normal">2024.08.01</div>
                    </div>
                    {/* <button className="ring-line-assistive flex flex-row items-center justify-center gap-2 rounded-[120px] px-6 py-2 ring">
                    <span className="text-BodyMD text-text-normal">자세히</span>
                    <Image
                      src={'/icon/enter.svg'}
                      alt={''}
                      width={20}
                      height={20}
                    />
                  </button> */}
                  </div>
                  <div className="ring-line-assistive relative h-[129px] w-[119px] rounded-xl bg-[url('/imageBackground.png')] bg-cover bg-center bg-no-repeat ring">
                    <video
                      src="https://storage.googleapis.com/hackathon_hmh/template2Video.mp4"
                      muted
                      autoPlay
                      loop
                      className="size-full"
                    ></video>
                  </div>
                </div>
              </Link>
              <hr className="text-line-assistive" />
              <Link href="/mypage/my-ads">
                <div className="flex w-full flex-row justify-between">
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex w-full flex-row items-center justify-between gap-2">
                      <span className="text-TitleMD text-text-normal">
                        꽃사계
                      </span>
                      <div className="text-text-strong bg-normal-assistive rounded-lg px-2 py-1">
                        계약 종료
                      </div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">기간</div>
                      <div className="text-text-normal">2024.03.15~05.30</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">지역</div>
                      <div className="text-text-normal">서울시 마포구</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">송출기계</div>
                      <div className="text-text-normal">엘리베이터TV, IPTV</div>
                    </div>
                    <div className="text-BodyMD flex flex-row gap-4">
                      <div className="text-text-assistive">결제일</div>
                      <div className="text-text-normal">2024.03.31</div>
                    </div>
                    {/* <button className="ring-line-assistive flex flex-row items-center justify-center gap-2 rounded-[120px] px-6 py-2 ring">
                    <span className="text-BodyMD text-text-normal">자세히</span>
                    <Image
                      src={'/icon/enter.svg'}
                      alt={''}
                      width={20}
                      height={20}
                    />
                  </button> */}
                  </div>
                  <div className="ring-line-assistive relative h-[129px] w-[119px] rounded-xl bg-[url('/imageBackground.png')] bg-cover bg-center bg-no-repeat ring">
                    <video
                      src="https://storage.googleapis.com/hackathon_hmh/sandwichTemplate.mp4"
                      muted
                      autoPlay
                      loop
                      className="size-full"
                    ></video>
                  </div>
                </div>
              </Link>
              <hr className="text-line-assistive" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
