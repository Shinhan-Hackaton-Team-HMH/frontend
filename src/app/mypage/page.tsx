import Image from 'next/image';

export default function MyPage() {
  return (
    <div className="container flex flex-row gap-[30px]">
      <div className="shadow-section ring-line-assistive flex h-fit flex-col rounded-xl px-6.5 ring">
        <div className="w-[168px] pt-4 pb-2">마이페이지</div>
        <div className="w-full py-2.5">내 광고 현황</div>
        <div className="w-full py-2.5">내 광고 영상 관리</div>
        <div className="w-full py-2.5">광고 집행 내역</div>
        <div className="w-full py-2.5">내 문의내역</div>
        <div className="w-full py-2.5">회원정보 관리</div>
        <div className="w-full py-2.5">개인정보처리방침</div>
      </div>
      <div className="flex w-full flex-col gap-9">
        <div className="shadow-section flex w-full flex-col rounded-[20px] p-6">
          <div className="flex w-full flex-row justify-between rounded-[120px]">
            <span className="text-Headline text-text-normal">홍길동</span>
            <button className="ring-line-assistive flex flex-row items-center justify-center gap-2 rounded-[120px] px-6 py-2 ring">
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
          <div className="text-Headline text-text-normal">어제의 광고 현황</div>
          <div className="ring-line-assistive shadow-section flex w-full flex-row p-6 ring">
            <div className="flex flex-col">
              <div className="flex flex-row gap-6">
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
              <div className="flex flex-col">
                <div className="flex flex-row"></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
