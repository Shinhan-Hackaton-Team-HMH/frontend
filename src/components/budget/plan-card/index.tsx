import { Dispatch, SetStateAction } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface BudgetCardProps {
  basic: boolean;
  plan: 'NO' | 'BASIC' | 'PREMIUM';
  setPlan: Dispatch<SetStateAction<'NO' | 'BASIC' | 'PREMIUM'>>;
}

export default function PlanCard({ basic, plan, setPlan }: BudgetCardProps) {
  const isBasic = basic;

  // 플랜별 데이터 설정
  const config = isBasic
    ? {
        key: 'BASIC' as const,
        label: '베이직',
        price: '5,900',
        titleClass: 'text-text-normal bg-primary-lighten',
        features: [
          '광고 스타일 선택 가능',
          '광고 생성 후 평생 소장 가능',
          // '최대 2회 재생성 가능',
        ],
      }
    : {
        key: 'PREMIUM' as const,
        label: '프리미엄',
        price: '14,900',
        titleClass: 'text-text-inverse bg-primary',
        features: [
          '최대 10회 재생성 가능',
          '광고 스타일 선택 가능',
          // '프로 AI 모델 사용으로 고퀄리티 광고 영상 제작',
        ],
      };

  const selected = plan === config.key;

  return (
    <div
      className="bg-primary-lighten border-line-assistive relative flex w-full flex-col gap-3 overflow-hidden rounded-[20px] border p-4"
      onClick={() => setPlan(config.key)}
    >
      <div className="outline-primary bg-normal-inverse relative z-20 flex flex-col gap-5.5 rounded-xl px-4 pt-3 pb-4 outline">
        <div
          className={`text-ButtonMD w-fit rounded-lg px-3 py-1 ${config.titleClass}`}
        >
          {config.label}
        </div>
        <div>고퀄리티 광고 출력을 위한 요금제 입니다.</div>
        <Image
          src={
            selected
              ? '/icon/check_circle_selected.svg'
              : '/icon/check_circle_unselected.svg'
          }
          alt="checked_circle"
          className="absolute top-4 right-3"
          width={24}
          height={24}
        />
        <div className="text-Headline text-text-normal absolute right-[19px] bottom-3">
          {config.price}
        </div>
      </div>

      {config.features.map((feature, idx) => (
        <div key={idx} className="flex flex-row items-center gap-2.5">
          <Check className="text-primary size-5" />
          {feature}
        </div>
      ))}
      {!isBasic && (
        <>
          <div className="absolute right-[-165px] bottom-[-201px] h-[466px] w-[537px] rounded-[537px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(92,255,241,0.3)_0%,rgba(92,255,241,0)_100%)]"></div>
          <div className="absolute top-[-330px] left-[-275px] h-[614px] w-[673px] rounded-[673px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(104,70,244,0.6)_0%,rgba(92,255,241,0)_100%)]"></div>
        </>
      )}
    </div>
  );
}
