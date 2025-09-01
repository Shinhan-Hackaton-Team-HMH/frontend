'use client';

import Stepper from '@/components/common/stepper';
import MapInteraction from '@/components/map';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import locationData from '@/assets/cities';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { useOnClickOutside } from 'usehooks-ts';
import { Calendar } from '@/components/ui/calendar';
import { businessAdMapping, DeviceType } from '@/assets/deviceMatching';
import DeviceItem from '@/components/deviceItems/items';
import DeviceResults from '@/components/deviceItems/results';
import { useBusinessStore } from '@/store/useBusinessStore';
import axios from 'axios';
import { useDeviceStore } from '@/store/useDeviceStore';
import { AdPlan, AdResponse } from '@/types/gpt/phrase';
// import { AdType } from '@/app/api/gpt/deviceSort/route';

interface Province {
  province_name: string;
  cities: string[];
}

export default function BudgetPage() {
  //STEPPER
  const [step, setStep] = useState(0);
  //LOCATION
  const [cityFocus, setCityFocus] = useState(false);
  const [countyFocus, setCountyFocus] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  //CALENDAR
  const [startCalendarFocus, setStartCalendarFocus] = useState(false);
  const [endCalendarFocus, setEndCalendarFocus] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(
    addDays(startDate as Date, 8),
  );
  //BUDGET
  const [amount, setAmount] = useState(0);
  const [budget, setBudget] = useState<number | ''>('');
  const [budgetInputValid, setBudgetInputValid] = useState(true);

  //CALENDAR-REF
  const startCalendarRef = useRef<HTMLDivElement>(null!);
  const endCalendarRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(startCalendarRef, () => setStartCalendarFocus(false));
  useOnClickOutside(endCalendarRef, () => setEndCalendarFocus(false));
  //DISPLAY-Preference
  const [firstDisplay, setFirstDisplay] = useState('');
  const [secondDisplay, setSecondDisplay] = useState('');
  const [firstDisplayFocus, setFirstDisplayFocus] = useState(false);
  const [secondDisplayFocus, setSecondDisplayFocus] = useState(false);
  const firstDisplayRef = useRef<HTMLDivElement>(null!);
  const secondDisplayRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(firstDisplayRef, () => setFirstDisplayFocus(false));
  useOnClickOutside(secondDisplayRef, () => setSecondDisplayFocus(false));
  //Device-Card
  const [firstDeviceEdit, setFirstDeviceEdit] = useState(false);
  const [secondDeviceEdit, setSecondDeviceEdit] = useState(false);

  //DISPLAY-Details
  const displayMachine = ['엘리베이터', ' 버스정류장', 'IPTV'];
  // const { biz_type, biz_subtype } = useBusinessStore();
  const biz_type = '한식 일반음식점';
  const recommendAd: DeviceType = businessAdMapping[biz_type] || '엘리베이터';
  //TODO  기기 추천 데이터 뽑아오기
  const deviceState = useDeviceStore((state) => state.deviceState);
  const setDeviceState = useDeviceStore((state) => state.setDeviceState);
  const clearDeviceState = useDeviceStore((state) => state.clearDeviceState);
  const [firstDeviceTotal, setFirstDeviceTotal] = useState(0);
  const [secondDeviceTotal, setSecondDeviceTotal] = useState(0);

  useEffect(() => {
    if (selectedCounty) {
      const province: Province | undefined = locationData.provinces.find(
        (p: Province) => p.province_name === selectedCounty,
      );
      if (province) {
        setCities(province.cities);
      } else {
        setCities([]);
      }
    } else {
      setCities([]);
    }
  }, [selectedCounty]);

  const handleCountyClick = (countyName: string): void => {
    setSelectedCounty(countyName);
    setCountyFocus(false);
    const province: Province | undefined = locationData.provinces.find(
      (p: Province) => p.province_name === countyName,
    );
    if (province) {
      setCities(province.cities);
    } else {
      setCities([]);
    }
  };

  const handleCityClick = (cityName: string): void => {
    setSelectedCity(cityName);
    setAmount(120000);
    setCityFocus(false);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const stepTwo_valid =
    !!startDate &&
    !!endDate &&
    !!selectedCounty &&
    !!budget &&
    !!selectedCity &&
    amount !== 0 &&
    budgetInputValid;

  const handleBudgetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ''); // 콤마 제거
    if (rawValue === '') {
      setBudget('');
      return;
    }
    if (!/^\d+$/.test(rawValue)) {
      alert('숫자만 입력해주세요.');
      return;
    }
    if (rawValue && Number(rawValue) % 10000 !== 0) {
      setBudgetInputValid(false);
      console.warn('⚠️ 만원 단위로 입력해주세요!');
    } else setBudgetInputValid(true);
    setBudget(Number(rawValue));
  };

  const priceCalculate = (deviceIndex: number) => {
    if (!deviceState[deviceIndex]) return;
    const devicePrice =
      deviceState[deviceIndex].device === 'IPTV'
        ? 15
        : deviceState[deviceIndex].device === '버스정류장'
          ? 10
          : 5;
    return (
      devicePrice *
      parseInt(deviceState[0].deviceCount) *
      deviceState[deviceIndex].timeSlots.length *
      3 *
      parseInt(deviceState[deviceIndex].impressions)
    );
  };
  const formattedBudget = budget === '' ? '' : budget.toLocaleString('ko-KR');
  const totalDevicePrice = firstDeviceTotal + secondDeviceTotal;
  const subtraction = -(Number(budget) - totalDevicePrice);
  const formattedSubtraction = subtraction.toLocaleString('ko-KR');
  const formattedTotal = (Number(budget) + subtraction).toLocaleString('ko-KR');

  // // --- 디버깅 로그 ---
  // console.log('===== Budget 계산 로그 =====');
  // console.log('budget (raw):', budget, typeof budget);
  // console.log('formattedBudget:', formattedBudget);

  // console.log('firstDeviceTotal:', firstDeviceTotal);
  // console.log('secondDeviceTotal:', secondDeviceTotal);
  // console.log('totalDevicePrice:', totalDevicePrice);

  // console.log('Number(budget):', Number(budget));
  // console.log('subtraction (차액):', subtraction);
  // console.log('formattedSubtraction:', formattedSubtraction);

  // console.log('formattedTotal (최종 합산):', formattedTotal);
  // console.log('================================');

  const displaySelection = displayMachine.filter((value) => {
    return value !== firstDisplay && value !== secondDisplay;
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const handleFirstStep = async () => {
    await fetchRecommendation();
    if (deviceState) handleNextStep();
  };

  const fetchRecommendation = async () => {
    try {
      const response = await axios.post<AdPlan[]>('/api/gemini/deviceSort', {
        biz_type,
        budget: budget.toString(),
      });
      setDeviceState(response.data);
    } catch (error) {
      console.error('광고 데이터 불러오기 실패:', error);
    } finally {
      setFirstDeviceTotal(priceCalculate(0) || 0);
      setSecondDeviceTotal(priceCalculate(1) || 0);
    }
  };
  function addDays(date: Date, days: number): Date | undefined {
    if (!date) return undefined;
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  return (
    <div className="container mt-3">
      <section className="shadow-section mb-[72px] flex w-[1192px] flex-col items-center justify-center gap-5 rounded-[20px] bg-white px-[60px] pt-3 pb-[60px]">
        <Stepper
          label={'광고 송출 기기 안내'}
          step={step}
          handlePreviousStep={handlePreviousStep}
        />
        {step === 0 && (
          <>
            <div className="text-Headline text-text-normal w-full">
              광고집행을 위해 옵션을 선택해 주세요.
            </div>
            <div className="flex w-full flex-row justify-between">
              <section className="flex flex-col gap-6">
                <div className="text-TitleMD text-text-normal">
                  광고 지역을 선택해 주세요.
                </div>
                <div className="flex flex-row gap-2">
                  <div className="relative">
                    <button
                      className={twMerge(
                        'relative flex h-12 w-[259px] flex-row items-center justify-end rounded-xl p-3 pl-1 ring-1',
                        `${countyFocus ? 'bg-inactive ring-primary' : 'ring-line-assistive bg-normal-inverse'}`,
                      )}
                      onClick={() => setCountyFocus(!countyFocus)}
                      onBlur={() => setCountyFocus(false)}
                    >
                      <span
                        className={twMerge(
                          'text-BodyMD h-5 w-[202px]',
                          `${selectedCounty === '' ? 'text-text-assistive' : 'text-text-strong'}`,
                        )}
                      >
                        {selectedCounty === '' ? '시/도' : selectedCounty}
                      </span>
                      {!countyFocus ? <ChevronDown /> : <ChevronUp />}
                      {countyFocus && (
                        <div className="ring-line-assistive bg-normal-inverse absolute top-[50px] left-0 z-10 flex h-[358px] w-full flex-col overflow-y-scroll rounded-xl p-1.5 ring-1">
                          {locationData.provinces.map((province: Province) => {
                            return (
                              <div
                                key={province.province_name}
                                className="text-BodyMD text-text-strong w-full py-3 pl-4 text-start"
                                onMouseDown={() =>
                                  handleCountyClick(province.province_name)
                                }
                              >
                                {province.province_name}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      className={twMerge(
                        'relative flex h-12 w-[259px] flex-row items-center justify-end rounded-xl p-3 pl-1 ring-1',
                        `${cityFocus ? 'bg-inactive ring-primary' : 'ring-line-assistive bg-normal-inverse'}`,
                      )}
                      onClick={() => {
                        if (selectedCounty) setCityFocus(true);
                      }}
                      onBlur={() => setCityFocus(false)}
                    >
                      <span
                        className={twMerge(
                          'text-BodyMD h-5 w-[202px]',
                          `${selectedCity === '' ? 'text-text-assistive' : 'text-text-strong'}`,
                        )}
                      >
                        {selectedCity === '' ? '시/군/구' : selectedCity}
                      </span>
                      {!cityFocus ? <ChevronDown /> : <ChevronUp />}
                      {cityFocus && (
                        <div className="ring-line-assistive bg-normal-inverse absolute top-[50px] left-0 z-20 flex h-[358px] w-full flex-col overflow-y-scroll rounded-xl p-1.5 ring-1">
                          {cities.map((city: string) => {
                            return (
                              <div
                                key={city}
                                className="text-BodyMD text-text-strong w-full py-3 pl-4 text-start"
                                onMouseDown={() => handleCityClick(city)}
                              >
                                {city}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </button>
                  </div>
                </div>
                <MapInteraction mapModal={true} setMapModal={() => {}} />
              </section>
              <section>
                <div className="text-TitleMD text-text-normal mb-2">
                  광고 일정을 선택해 주세요.
                </div>
                <div className="text-BodySM text-text-assistive">
                  광고 일정은 최소 1주 이상부터 선택 가능하며, 금일 7일 이후부터
                  신청 가능해요.
                </div>
                <div className="mt-6 mb-9 flex flex-row gap-2">
                  <div className="relative h-fit w-fit" ref={startCalendarRef}>
                    <button
                      className={twMerge(
                        'ring-line-assistive relative flex h-12 w-[259px] flex-row items-center justify-end gap-1 rounded-xl p-3.5 ring-1',
                      )}
                      onClick={() => setStartCalendarFocus(!startCalendarFocus)}
                    >
                      <span className="h-5 w-[202px]">
                        {startDate ? formatDate(startDate) : '시작일'}
                      </span>
                      <Image
                        src={'/icon/calendar_month.svg'}
                        alt={'calendar_icon'}
                        width={24}
                        height={24}
                      />
                    </button>
                    {startCalendarFocus && (
                      <Calendar
                        className="ring-line-assistive absolute top-full left-0 z-20 h-fit w-full rounded-[20px] ring-1"
                        selected={startDate}
                        mode="single"
                        required
                        disabled={{ before: new Date() }}
                        onSelect={(date: Date) => {
                          if (date) {
                            setStartDate(date);
                            setStartCalendarFocus(false);
                          }
                        }}
                      />
                    )}
                  </div>
                  <div className="relative h-fit w-fit" ref={endCalendarRef}>
                    <button
                      className={twMerge(
                        'ring-line-assistive relative flex h-12 w-[259px] flex-row items-center justify-end gap-1 rounded-xl p-3.5 ring-1',
                      )}
                      onClick={() => setEndCalendarFocus(true)}
                    >
                      <span className="h-5 w-[202px]">
                        {endDate ? formatDate(endDate) : '종료일'}
                      </span>
                      <Image
                        src={'/icon/calendar_month.svg'}
                        alt={'calendar_icon'}
                        width={24}
                        height={24}
                      />
                    </button>
                    {endCalendarFocus && (
                      <Calendar
                        className="ring-line-assistive absolute top-full left-0 z-30 h-fit w-full rounded-[20px] ring-1"
                        selected={endDate}
                        defaultMonth={addDays(new Date(), 7)}
                        mode="single"
                        required
                        disabled={{
                          before: addDays(startDate as Date, +7) as Date,
                        }} // startDate 기준 7일 전 disable
                        onSelect={(date: Date) => {
                          if (date) {
                            setEndDate(date);
                            setEndCalendarFocus(false);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="text-TitleMD text-text-normal">
                    광고 예산을 설정해 주세요.
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="relative flex flex-row">
                      <input
                        type="text"
                        placeholder="광고예산을 입력해주세요."
                        className="bg-normal-assistive w-full rounded-xl px-6 py-3.5"
                        onChange={handleBudgetInput}
                        value={formattedBudget}
                      ></input>
                      <Image
                        src={'/icon/won.svg'}
                        alt={'won_icon'}
                        width={18}
                        height={18}
                        className="absolute top-[15px] right-4"
                      />
                    </div>
                    <div
                      className={`text-BodySM ${budgetInputValid ? 'text-text-assistive' : 'text-red-400'}`}
                    >
                      광고예산은 만원단위로 집행됩니다.
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="relative flex flex-row">
                      <div className="bg-primary-lighten text-BodySM text-text-normal w-full rounded-xl px-6 py-3">
                        선택한 지역의 최소 집행 금액
                      </div>
                      <span className="absolute top-[11px] right-6">{`${amount} 원`}</span>
                    </div>
                    <div className="text-BodySM text-text-assistive">
                      선택하신 지역의 평균 광고비는 000,000원 이에요
                    </div>
                  </div>
                </div>
                <button
                  className={twMerge(
                    'mt-[60px] w-full rounded-xl py-[13px]',
                    `${
                      stepTwo_valid
                        ? 'bg-primary text-text-inverse'
                        : 'bg-inactive text-text-assistive'
                    }`,
                  )}
                  disabled={!stepTwo_valid}
                  onClick={handleFirstStep}
                >
                  다음
                </button>
              </section>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className="text-Headline text-text-normal w-full">
              광고 송출 기기를 선택해 주세요.
            </div>
            <div className="flex h-[482px] w-full flex-row justify-between">
              <section className="flex flex-col gap-6">
                <div className="text-TitleMD text-text-normal">
                  광고 송출기기 안내
                </div>
                <MapInteraction mapModal={true} setMapModal={() => {}} />
              </section>
              <section className="flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="text-TitleMD text-text-normal mb-2">
                      선호하는 광고 송출기기를 선택해 주세요
                    </div>
                    <div className="text-BodySM text-text-assistive">
                      선택하신 광고 송출 기기와 광고 예산에 맞춰 광고 예산을
                      최적화 분배해드려요
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div
                      className="relative flex w-fit flex-col gap-2"
                      ref={firstDisplayRef}
                    >
                      <button
                        className={twMerge(
                          'ring-line-assistive relative flex h-12 w-[259px] flex-row items-center justify-end gap-1 rounded-xl p-3.5 ring-1',
                        )}
                        onClick={() => setFirstDisplayFocus(true)}
                      >
                        <span className="h-5 w-[202px]">
                          {firstDisplay === '' ? '엘리베이터' : firstDisplay}
                        </span>
                        <Image
                          src={`/icon/expand.svg`}
                          alt={'chev_icon'}
                          width={24}
                          height={24}
                        />
                        {firstDisplayFocus && (
                          <div className="ring-line-assistive bg-normal-inverse absolute top-13 left-0 flex w-full flex-col rounded-xl p-1.5 ring">
                            {displaySelection.map((value) => {
                              return (
                                <div
                                  key={value}
                                  onClick={() => {
                                    setFirstDisplay(value);
                                    setFirstDisplayFocus(false);
                                  }}
                                  className="text-BodyMD hover:bg-inactive rounded-xl py-3 pl-4 text-start"
                                >
                                  {value}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </button>
                    </div>
                    <div
                      className="relative flex h-fit w-fit flex-col gap-2"
                      ref={secondDisplayRef}
                    >
                      <button
                        className={twMerge(
                          'ring-line-assistive relative flex h-12 w-[259px] flex-row items-center justify-end gap-1 rounded-xl p-3.5 ring-1',
                        )}
                        onClick={() => setSecondDisplayFocus(true)}
                      >
                        <span className="h-5 w-[202px]">
                          {secondDisplay === '' ? '엘리베이터' : secondDisplay}
                        </span>
                        <Image
                          src={`/icon/expand.svg`}
                          alt={'chev_icon'}
                          width={24}
                          height={24}
                        />
                        {secondDisplayFocus && (
                          <div className="ring-line-assistive bg-normal-inverse absolute top-13 left-0 flex w-full flex-col rounded-xl p-1.5 ring">
                            {displaySelection.map((value) => {
                              return (
                                <div
                                  key={value}
                                  onClick={() => {
                                    setSecondDisplay(value);
                                    setSecondDisplayFocus(false);
                                  }}
                                  className="text-BodyMD hover:bg-inactive py-3 pl-4 text-start"
                                >
                                  {value}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="bg-primary-lighten text-text-normal flex h-12 flex-row items-center justify-between rounded-xl px-6">
                    <div className="text-BodySM">
                      사장님의 업종에 최적화된 광고 송출 기기는?
                    </div>
                    <div className="text-TitleMD">{recommendAd}</div>
                  </div>
                </div>
                <button
                  className={twMerge(
                    'w-full rounded-xl py-[13px]',
                    `${
                      stepTwo_valid
                        ? 'bg-primary text-text-inverse'
                        : 'bg-inactive text-text-assistive'
                    }`,
                  )}
                  disabled={!stepTwo_valid}
                  onClick={handleNextStep}
                >
                  다음
                </button>
              </section>
            </div>
          </>
        )}
        {step === 2 && deviceState && (
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="text-Headline text-text-normal">
                광고 송출 기기를 선택해 주세요.
              </div>
              <button className="ring-line-assistive text-BodyMD text-text-normal flex flex-row gap-2 rounded-[120px] px-6 py-2.5 ring">
                광고 기기 위치보기
                <Image src={'/icon/map.svg'} alt={''} width={20} height={20} />
              </button>
            </div>
            <div className="bg-primary-lighten flex w-full flex-row rounded-xl py-4 pl-6">
              <Image
                src={`/icon/check_circle_selected.svg`}
                alt={'check_icon'}
                width={24}
                height={24}
              />
              <div className="text-ButtonMD text-primary ml-4">
                한식 일반음식점
              </div>
              <div className="text-BodyMD text-text-normal ml-2">
                업종의 추천 광고 기기와 송출 시간이에요
              </div>
            </div>
            <div className="flex w-full flex-row gap-6">
              <div className="flex w-full flex-col gap-2">
                <DeviceItem
                  deviceName={deviceState[0].device}
                  deviceCount={deviceState[0].deviceCount}
                  timePeriod={deviceState[0].timeSlots}
                  exposeCount={deviceState[0].impressions}
                  budget={deviceState[0].budget}
                  isEdit={firstDeviceEdit}
                  setIsEdit={setFirstDeviceEdit}
                />
                <DeviceResults
                  deviceCount={parseInt(deviceState[0].deviceCount)}
                  impressions={parseInt(deviceState[0].impressions)}
                  timeSlot={deviceState[0].timeSlots.length * 3}
                  deviceName={deviceState[0].device}
                  durationDays={0}
                  total={firstDeviceTotal}
                  setDeviceTotal={setFirstDeviceTotal}
                />
                <div className="bg-primary-lighten flex w-full flex-row items-center gap-2 rounded-xl py-[15px] pl-4">
                  <Image
                    src={'/icon/sparkle_primary.svg'}
                    alt={''}
                    width={20}
                    height={20}
                    className="p-0.5"
                  />
                  <div className="text-BodyMD text-text-normal">
                    {deviceState[0].reason}
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <DeviceItem
                  deviceName={deviceState[1].device}
                  deviceCount={deviceState[1].deviceCount}
                  timePeriod={deviceState[1].timeSlots}
                  exposeCount={deviceState[1].impressions}
                  budget={deviceState[1].budget}
                  isEdit={secondDeviceEdit}
                  setIsEdit={setSecondDeviceEdit}
                />
                <DeviceResults
                  deviceCount={parseInt(deviceState[1].deviceCount)}
                  impressions={parseInt(deviceState[1].impressions)}
                  timeSlot={deviceState[1].timeSlots.length * 3}
                  deviceName={deviceState[1].device}
                  durationDays={0}
                  total={secondDeviceTotal}
                  setDeviceTotal={setSecondDeviceTotal}
                />
                <div className="bg-primary-lighten flex w-full flex-row items-center gap-2 rounded-xl py-[15px] pl-4">
                  <Image
                    src={'/icon/sparkle_primary.svg'}
                    alt={''}
                    width={20}
                    height={20}
                    className="p-0.5"
                  />
                  <div className="text-BodyMD text-text-normal">
                    {deviceState[1].reason}
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-6">
                  <button className="ring-line-normal flex w-full flex-row justify-center gap-2 rounded-[120px] py-2.5 ring">
                    <span>광고 기기 추가하기</span>
                    <Image
                      src={'/icon/add.svg'}
                      alt={''}
                      width={20}
                      height={20}
                    />
                  </button>
                  <div className="ring-line-assistive flex flex-col gap-1 rounded-xl p-6 ring">
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-BodyMD text-text-normal">
                        입력 예산
                      </span>
                      <span className="text-BodyMD text-text-normal">
                        {formattedBudget}원
                      </span>
                    </div>
                    <div className="flex items-center justify-end">
                      {formattedSubtraction}원
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-BodyMD text-text-normal">
                        최총 예산
                      </span>
                      <span className="text-Headline text-text-normal">
                        {formattedTotal}원
                      </span>
                    </div>
                  </div>
                  <button className="ring-line-normal flex w-full flex-row justify-center gap-2 rounded-[120px] py-2.5 ring">
                    <span>총 예산 변경하기</span>
                    <Image
                      src={'/icon/edit.svg'}
                      alt={''}
                      width={20}
                      height={20}
                    />
                  </button>
                  <button
                    className="text-ButtonMD text-text-inverse bg-primary w-full rounded-xl py-[13px]"
                    onClick={handleNextStep}
                  >
                    다음
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
