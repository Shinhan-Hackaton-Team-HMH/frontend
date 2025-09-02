'use Client';

import { DeviceType } from '@/assets/deviceMatching';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface DeviceResultsProps {
  deviceCount: number;
  impressions: number;
  timeSlot: number;
  deviceName: DeviceType;
  durationDays: number;
  total: number;
  setDeviceTotal: Dispatch<SetStateAction<number>>;
}

export default function DeviceResults({
  deviceCount,
  impressions,
  timeSlot,
  deviceName,
  durationDays,
  total,
  setDeviceTotal,
}: DeviceResultsProps) {
  const devicePrice =
    deviceName === 'IPTV' ? 15 : deviceName === '버스정류장' ? 10 : 5;
  // useEffect(() => {
  //   setDeviceTotal(
  //     deviceCount * devicePrice * timeSlot * impressions * durationDays,
  //   );
  // }, [
  //   deviceCount,
  //   devicePrice,
  //   timeSlot,
  //   impressions,
  //   durationDays,
  //   setDeviceTotal,
  // ]);
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-normal-assistive flex flex-col gap-4 rounded-xl px-4 pt-4 pb-2 transition-all duration-500 ease-in-out">
      {!open ? (
        <div
          className="flex flex-row items-center justify-between pl-[21px]"
          onClick={() => setOpen(true)}
        >
          <div className="text-BodySM text-text-assistive">자세히</div>
          <Image
            src={'/icon/expand.svg'}
            alt={'expand_icon'}
            width={18}
            height={18}
          />
        </div>
      ) : (
        <>
          <div className="flex w-full flex-row gap-3">
            <div className="flex w-full flex-col gap-1.5">
              <div className="flex flex-row justify-between">
                <div className="text-BodySM text-text-normal">총 기기 대수</div>
                <div className="text-primary text-BodySM">{`${deviceCount}대`}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-BodySM text-text-normal">
                  송출 횟수 당 금액
                </div>
                <div className="text-primary text-BodySM">{`${devicePrice}원`}</div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <div className="flex flex-row justify-between">
                <div className="text-BodySM text-text-normal">
                  일일 노출 시간
                </div>
                <div className="text-primary text-BodySM">{`${timeSlot}시간`}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-BodySM text-text-normal">
                  일일 송출 횟수
                </div>
                <div className="text-primary text-BodySM">{`${timeSlot * impressions}회`}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-BodySM flex w-full flex-row">
              최종 금액 산정
            </div>
            <div className="text-Caption text-text-assistive flex flex-row">
              (광고 기기 대수)*(일일 송출 횟수)*(계약 일수)
            </div>
            <div className="flex w-full flex-row justify-between">
              <div className="text-BodySM text-text-normal">
                {`${deviceCount}(대) x ${devicePrice}(원) x ${timeSlot * impressions}(회) x ${durationDays}(일)`}
              </div>
              <div className="text-TitleSM text-text-normal">{`${total}원`}</div>
            </div>
          </div>
          <div
            className="flex w-full items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <span>간략히</span>
            <Image
              src={'/icon/expand.svg'}
              alt={'expand_icon'}
              width={18}
              height={18}
              className="rotate-180"
            />
          </div>
        </>
      )}
    </div>
  );
}
