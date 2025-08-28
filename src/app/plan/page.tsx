'use client';
import PlanCard from '@/components/budget/plan-card';
import Stepper from '@/components/common/stepper';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function PlanPage() {
  const [plan, setPlan] = useState<'NO' | 'BASIC' | 'PREMIUM'>('NO');
  const [step, setStep] = useState(0);
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container mt-3">
      <section className="shadow-section mb-[72px] flex w-[1192px] flex-col items-center justify-center rounded-[20px] bg-white px-[200px] pt-3 pb-[60px]">
        <Stepper
          label={'광고 송출 기기 안내'}
          step={step}
          handlePreviousStep={handlePreviousStep}
        />
        {step === 0 && (
          <>
            <div className="text-Headline text-text-normal my-6 w-full">
              광고 생성 요금제를 선택해 주세요.
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <PlanCard basic={true} plan={plan} setPlan={setPlan} />
              <PlanCard basic={false} plan={plan} setPlan={setPlan} />
            </div>
            <button
              className={twMerge(
                'mt-4.5 w-full rounded-xl py-[13px]',
                `${
                  plan === 'NO'
                    ? 'bg-inactive text-text-assistive'
                    : 'bg-primary text-text-inverse'
                }`,
              )}
              disabled={plan === 'NO'}
              onClick={() => setStep(step + 1)}
            >
              다음
            </button>
          </>
        )}
        {step === 1 && <div></div>}
      </section>
    </div>
  );
}
