// "치킨집_예산_100만원": {
//   "엘리베이터광고": {
//     "기기대수": 80,
//     "시간대": ["18-21", "12-15"],
//     "노출횟수": 60,
//     "집행예산": 300000,
//     "선택이유": "저녁 배달 수요 높은 시간대 생활권 반복노출"
//   },
//   "버스쉘터광고": {
//     "기기대수": 60,
//     "시간대": ["06-09", "18-21"],
//     "노출횟수": 50,
//     "집행예산": 250000,
//     "선택이유": "출퇴근길 직장인 타깃 집중 공략"
//   },
//   "IPTV광고": {
//     "기기대수": "노출기준",
//     "시간대": ["18-21", "21-24"],
//     "노출횟수": 40,
//     "집행예산": 450000,
//     "선택이유": "저녁 프라임타임 가정 내 브랜드 노출 극대화"
//   }
// },

import { DeviceType } from '@/assets/deviceMatching';
import { useDeviceStore } from '@/store/useDeviceStore';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface OptionListProps {
  options: string[];
  onSelect: (value: string) => void;
}

interface DeviceProps {
  deviceName: DeviceType;
  deviceCount: string;
  timePeriod: string[];
  exposeCount: string;
  budget: string;
  inputBudget: number;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function DeviceItem({
  deviceName,
  deviceCount,
  timePeriod,
  exposeCount,
  inputBudget,
  budget,
  isEdit = true,
  setIsEdit,
}: DeviceProps) {
  const [timeDropDown, setTimeDropDown] = useState(false);
  const [timeSlot, setTimeSlot] = useState<string[]>(timePeriod);
  const [exposeCountDropDown, setExposeCountDropDown] = useState(false);
  const [impression, setImpression] = useState(`${exposeCount}회`);
  const { deviceState, updateStore } = useDeviceStore();
  const [validBudget, setValidBudget] = useState(false);

  const timeList = [
    '06:00-09:00',
    '09:00-12:00',
    '12:00-15:00',
    '15:00-18:00',
    '18:00-21:00',
    '21:00-24:00',
  ];

  const toggleTimeSlot = (value: string) => {
    setTimeSlot((prev) => {
      let newSlots;
      if (prev.includes(value)) {
        newSlots = prev.filter((v) => v !== value);
      } else {
        newSlots = [...prev, value];
      }
      return newSlots.sort((a, b) => timeList.indexOf(a) - timeList.indexOf(b));
    });
  };

  useEffect(() => {
    updateStore(deviceName, { timeSlots: timeSlot, impressions: impression });
  }, [deviceName, impression, timeSlot, updateStore]);

  const TimeTag = (time: string, index: number) =>
    isEdit && timeDropDown ? (
      <div
        key={index}
        className="text-BodyMD text-primary bg-primary-lighten flex h-8 max-h-8 w-fit flex-none flex-row items-center justify-between rounded-lg px-2 py-1"
      >
        {time}
        <Image
          src={'/icon/cancel_small.svg'}
          alt={''}
          width={24}
          height={24}
          onClick={() => {
            setTimeSlot((prev) => prev.splice(index, 1));
          }}
        />
      </div>
    ) : (
      <div
        key={index}
        className="text-BodyMD text-primary bg-primary-lighten flex max-h-8 w-fit flex-none rounded-lg px-2 py-1"
      >
        {time}
      </div>
    );

  const devicePrice = {
    '엘리베이터 TV': '1시간 당/1회 당 5초',
    버스정류장: '1시간 당/1회 당 10초',
    IPTV: '1시간 당/1회 당 15초',
  };
  const timeDropDownRef = useRef<HTMLDivElement>(null!);
  const exposeCountDropDownRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(timeDropDownRef, () => setTimeDropDown(false));
  useOnClickOutside(exposeCountDropDownRef, () =>
    setExposeCountDropDown(false),
  );

  const handleComplete = () => {
    setIsEdit(false);
  };

  return (
    <div className="text-text-normal shadow-section ring-line-assistive w-full rounded-xl bg-white px-5 pt-[17px] pb-4 ring">
      <div className="mb-[19px] flex flex-row items-center justify-between">
        <div className="text-TitleSM text-text-strong">{deviceName}</div>
        <div className="flex flex-row gap-4">
          {isEdit ? (
            <button
              className="ring-line-assistive text-BodyMD rounded-[120px] px-6 py-2.5 ring"
              disabled={validBudget}
              onClick={() => setIsEdit(false)}
            >
              완료
            </button>
          ) : (
            <>
              <div
                className="flex cursor-pointer flex-row items-center justify-center gap-0.5"
                onClick={() => setIsEdit(true)}
              >
                수정
                <Image
                  src={'/icon/edit.svg'}
                  alt={'edit_icon'}
                  width={18}
                  height={18}
                />
              </div>
              <div className="flex cursor-pointer flex-row items-center justify-center gap-0.5">
                삭제
                <Image
                  src={'/icon/delete.svg'}
                  alt={'delete_icon'}
                  width={18}
                  height={18}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="text-BodyMD">광고 기기 대수</div>
          <div className="text-TitleSM h-5.5">
            {deviceCount === '' ? '0개 ' : `${deviceCount}개`}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="text-BodyMD">광고 노출 시간대</div>
          {isEdit ? (
            <div className="relative h-11" ref={timeDropDownRef}>
              <div
                className="ring-line-assistive flex w-[260px] cursor-pointer flex-row justify-between rounded-xl py-1.5 pr-[11px] pl-1.5 ring"
                onClick={() => setTimeDropDown(!timeDropDown)}
              >
                <div className="flex h-8 flex-row flex-nowrap gap-1.5 overflow-x-scroll whitespace-nowrap">
                  {timePeriod.map((value, index) => TimeTag(value, index))}
                </div>
                <Image
                  src={'/icon/expand.svg'}
                  alt={''}
                  width={24}
                  height={24}
                  className={`transform duration-500 ease-in-out ${timeDropDown ? 'rotate-0' : 'rotate-180'}`}
                />
              </div>
              {timeDropDown && (
                <div className="ring-line-assistive absolute top-12 z-10 flex w-full flex-col gap-2 rounded-xl bg-white p-4 ring">
                  <div className="flex flex-row items-center gap-1.5">
                    <div className="bg-primary-lighten text-primary text-BodyMD px-2 py-1.5">
                      추천
                    </div>
                    <div className="text-BodySM text-text-assistive">
                      최대 6개까지 선택 가능해요
                    </div>
                  </div>
                  <hr className="text-line-assistive w-full" />
                  {timeList.map((period) => (
                    <div
                      key={period}
                      onClick={() => toggleTimeSlot(period)}
                      className={`text-BodyMD w-fit cursor-pointer rounded px-2 py-1.5 ${
                        timeSlot.includes(period)
                          ? 'bg-primary-lighten text-primary'
                          : 'text-text-strong'
                      }`}
                    >
                      {period}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex max-w-72 flex-row gap-1.5 overflow-x-scroll overflow-y-hidden">
              {timePeriod.map((value, index) => TimeTag(value, index))}
            </div>
          )}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="text-BodyMD">광고 송출횟수</div>
          {isEdit ? (
            <div
              className="relative h-11 w-[200px]"
              ref={exposeCountDropDownRef}
            >
              <div
                className="ring-line-assistive flex flex-row items-center justify-between rounded-xl py-1.5 pr-[11px] pl-1.5 ring"
                onClick={() => setExposeCountDropDown(!exposeCountDropDown)}
              >
                <div className="text-BodyMD text-text-strong bg-normal-assistive rounded-lg px-2 py-1.5">
                  {exposeCount}
                </div>
                <Image
                  src={'/icon/expand.svg'}
                  alt={''}
                  width={24}
                  height={24}
                />
              </div>
              {exposeCountDropDown && (
                <OptionList
                  options={['10회', '20회', '30회', '40회', '50회']}
                  onSelect={(val) => setImpression(val)}
                />
              )}
            </div>
          ) : (
            <div className="flex h-8 flex-row items-center gap-2">
              <div className="text-text-assistive text-BodySM">
                {devicePrice[deviceName]}
              </div>
              <div className="text-BodyMD text-text-strong bg-normal-assistive rounded-lg px-2 py-1.5">
                {exposeCount === '' ? '30회' : exposeCount}
              </div>
            </div>
          )}
        </div>
        {isEdit && validBudget && (
          <div className="text-Caption text-status-error flex w-full flex-row items-center justify-end gap-1">
            <Image src={'/icon/error.svg'} alt={''} width={18} height={18} />
            <div> 예산을 초과한 횟수입니다.</div>
          </div>
        )}
        <hr className="text-line-assistive" />
        <div className="text-text-strong flex flex-row items-center justify-between">
          <div className="text-BodyMD">집행 예산</div>
          <div className="text-BodyMD">{`${budget}원`}</div>
        </div>
      </div>
    </div>
  );
}

function OptionList({ options, onSelect }: OptionListProps) {
  return (
    <div className="ring-line-assistive absolute top-12 flex w-full flex-col gap-2 rounded-xl bg-white p-4 ring">
      {options.map((option) => (
        <div
          key={option}
          className="text-text-strong text-BodyMD cursor-pointer rounded px-2 py-1.5 hover:bg-gray-100"
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
