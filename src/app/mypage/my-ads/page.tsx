import Image from 'next/image';
import Link from 'next/link';

export default function MyAdPage() {
  return (
    <div className="container mb-20 flex flex-row gap-[30px]">
      <div className="shadow-section ring-line-assistive text-BodyMD flex h-fit w-[180px] flex-col rounded-xl px-1.5 ring">
        <div className="text-TitleMD px-4 pt-4 pb-2">마이페이지</div>
        <div className="w-full rounded-lg py-3 pl-4">내 광고 현황</div>
        <div className="bg-inactive w-full rounded-lg py-3 pl-4">
          광고 집행 내역
        </div>
        <div className="w-full rounded-lg py-3 pl-4">내 문의내역</div>
        <div className="w-full rounded-lg py-3 pl-4">회원정보 관리</div>
        <div className="w-full rounded-lg py-3 pl-4">개인정보처리방침</div>
      </div>
      <div className="flex w-full flex-col gap-9">
        <div className="flex flex-row gap-6">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full flex-row items-center justify-between">
              <span className="text-Headline text-text-normal">
                광고 집행 내역
              </span>
            </div>
            <div className="flex flex-col gap-3 py-3">
              <Link href="/ad/regenerate">
                <div className="flex w-full flex-row justify-between">
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex w-full flex-row items-center justify-between gap-2">
                      <span className="text-TitleMD text-text-normal">
                        꽃사계
                      </span>
                      <div className="text-primary bg-primary-lighten rounded-lg px-2 py-1">
                        진행중
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
              <Link href="/ad/regenerate">
                <div className="flex w-full flex-row justify-between">
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex w-full flex-row items-center justify-between">
                      <span className="text-TitleMD text-text-normal">
                        꽃사계
                      </span>
                      <div className="text-text-strong bg-normal-assistive rounded-lg px-2 py-1">
                        계약 종료
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
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col items-start justify-start gap-2">
                  <div className="flex w-full flex-row items-center justify-between">
                    <span className="text-TitleMD text-text-normal">
                      꽃사계
                    </span>
                    <div className="text-text-strong bg-normal-assistive rounded-lg px-2 py-1">
                      계약 종료
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
              <hr className="text-line-assistive" />
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col items-start justify-start gap-2">
                  <div className="flex w-full flex-row items-center justify-between">
                    <span className="text-TitleMD text-text-normal">
                      꽃사계
                    </span>
                    <div className="text-text-strong bg-normal-assistive rounded-lg px-2 py-1">
                      계약 종료
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
              <hr className="text-line-assistive" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
