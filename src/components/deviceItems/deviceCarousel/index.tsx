import { useState } from 'react';
import Image from 'next/image';
export default function DeviceCarousel() {
  const images = [
    '/displayImages/display1.jpg',
    '/displayImages/display2.jpg',
    '/displayImages/display3.png',
    '/displayImages/display4.png',
    '/displayImages/display5.jpg',
  ];
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    if (index >= images.length - 1) {
      setIndex(0);
    } else setIndex(index + 1);
  };
  const handlePrev = () => {
    if (index <= 0) {
      setIndex(images.length - 1);
    } else setIndex(index - 1);
  };

  return (
    <div className="shadow-section flex flex-col overflow-hidden rounded-xl">
      <section className="relative flex h-[260px] w-full flex-row items-center justify-center bg-black">
        <button
          className="bg-alpha absolute left-4 z-20 flex size-[52px] items-center justify-center rounded-[120px] p-3.5"
          onClick={handlePrev}
        >
          <Image src={'/icon/arrow_left.svg'} alt="" width={24} height={24} />
        </button>
        <Image
          src={images[index]}
          alt=""
          fill
          className=""
          objectFit="contain"
        />
        <button
          className="bg-alpha absolute right-4 z-20 flex size-[52px] items-center justify-center rounded-[120px] p-3.5"
          onClick={handleNext}
        >
          <Image src={'/icon/arrow_right.svg'} alt="" width={24} height={24} />
        </button>
      </section>
      <section className="flex flex-col items-start gap-2 pt-4 pr-[24px] pb-4.5 pl-[22px]">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="text-TitleMD text-black">엘리베이터 TV</div>
          <div className="bg-normal-assistive text-text-assistive rounded-lg px-3 py-1">
            자세히
          </div>
        </div>
        <div className="flex w-1/2 flex-row justify-between">
          <div className="text-BodyMD text-text-normal">운영 수량</div>
          <div className="text-BodyMD text-text-normal">26,000대</div>
        </div>
        <div className="flex w-1/2 flex-row justify-between">
          <div className="text-BodyMD text-text-normal">운영 시간</div>
          <div className="text-BodyMD text-text-normal">
            06:00 -24:00 (18시간)
          </div>
        </div>
        <div className="flex w-1/2 flex-row justify-between">
          <div className="text-BodyMD text-text-normal">운영 채널</div>
          <div className="text-BodyMD text-text-normal">총 93개</div>
        </div>
        <div className="flex w-1/2 flex-row justify-between">
          <div className="text-BodyMD text-text-normal">광고 송출 시간</div>
          <div className="text-BodyMD text-text-normal">15초~30초</div>
        </div>
      </section>
    </div>
  );
}
