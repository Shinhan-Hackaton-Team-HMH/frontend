'use client';

import Stepper from '@/components/common/stepper';
import MapInteraction from '@/components/map';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import locationData from '@/assets/cities';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { useOnClickOutside } from 'usehooks-ts';
import { Calendar } from '@/components/ui/calendar';

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
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  //BUDGET
  const [amount, setAmount] = useState(0);
  const [budget, setBudget] = useState<number | ''>('');
  //CALENDAR_REF
  const startCalendarRef = useRef<HTMLDivElement>(null!);
  const endCalendarRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(startCalendarRef, () => setStartCalendarFocus(false));
  useOnClickOutside(endCalendarRef, () => setEndCalendarFocus(false));

  //DISPLAY
  const [firstDisplay, setFirstDisplay] = useState('');
  const [secondDisplay, setSecondDisplay] = useState('');

  const [firstDisplayFocus, setFirstDisplayFocus] = useState(false);
  const [secondDisplayFocus, setSecondDisplayFocus] = useState(false);
  const firstDisplayRef = useRef<HTMLDivElement>(null!);
  const secondDisplayRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(firstDisplayRef, () => setFirstDisplayFocus(false));
  useOnClickOutside(secondDisplayRef, () => setSecondDisplayFocus(false));

  const displayMachine = ['엘리베이터', ' 버스정류장', 'IPTV'];

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
    amount !== 0;

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
    setBudget(Number(rawValue));
  };
  const formattedValue = budget === '' ? '' : budget.toLocaleString('ko-KR');

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const displaySelection = displayMachine.filter((value) => {
    return value !== firstDisplay && value !== secondDisplay;
  });

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
                        <div className="ring-line-assistive bg-normal-inverse absolute top-[50px] left-0 z-10 flex h-[358px] w-full flex-col overflow-y-scroll rounded-xl p-1.5 ring-1">
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
                        className="ring-line-assistive absolute top-full left-0 z-10 w-full rounded-[20px] ring-1"
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
                        className="ring-line-assistive absolute top-full left-0 z-50 w-full rounded-[20px] ring-1"
                        selected={endDate}
                        mode="single"
                        required
                        disabled={{ before: startDate as Date }}
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
                        value={formattedValue}
                      ></input>
                      <Image
                        src={'/icon/won.svg'}
                        alt={'won_icon'}
                        width={18}
                        height={18}
                        className="absolute top-[15px] right-4"
                      />
                    </div>
                    <div className="text-BodySM text-text-assistive">
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
                  onClick={handleNextStep}
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
                      className="relative flex h-fit w-fit flex-col gap-2"
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
                          src={`/icon/check_circle_selected.svg`}
                          alt={'chev_icon'}
                          width={24}
                          height={24}
                        />
                        {firstDisplayFocus && (
                          <div className="ring-line-assistive bg-normal-inverse absolute top-full left-0 flex w-full flex-col rounded-xl p-1.5 ring">
                            {displaySelection.map((value) => {
                              return (
                                <div
                                  key={value}
                                  onClick={() => {
                                    setFirstDisplay(value);
                                    setFirstDisplayFocus(false);
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
                          src={`/icon/check_circle_selected.svg`}
                          alt={'chev_icon'}
                          width={24}
                          height={24}
                        />
                        {secondDisplayFocus && (
                          <div className="ring-line-assistive bg-normal-inverse absolute top-full left-0 flex w-full flex-col rounded-xl p-1.5 ring">
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
                    <div className="text-TitleMD">엘리베이터 TV</div>
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
      </section>
    </div>
  );
}
