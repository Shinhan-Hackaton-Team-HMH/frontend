import { getProgressInfo, Progress } from '@/types/user/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function ProgressBar({ progress }: { progress: Progress }) {
  const info = getProgressInfo(progress);
  console.log(info);
  const router = useRouter();
  const handleRoute = () => {
    router.push(info.path || '/');
  };
  return (
    <div
      className={`shadow-section flex flex-col justify-between gap-[22px] rounded-[20px] bg-white p-6`}
    >
      <div className="flex w-full flex-row items-center justify-between">
        <span className="text-text-normal text-Headline">
          원스탑 광고 솔루션
        </span>
        <button
          className="flew-row ring-line-assistive flex w-fit items-center gap-2 rounded-[120px] px-6 py-2.5 ring"
          onClick={handleRoute}
        >
          <span>이어하기</span>
          <Image
            src={'/icon/arrow_right.svg'}
            alt={''}
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="flex flex-col gap-2.25">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="text-BodyMD text-primary bg-primary-lighten rounded-lg px-2 py-1">
            광고 예산 산정
          </div>

          <div className="text-BodyMD bg-normal-assistive rounded-lg px-2 py-1 text-black">
            광고영상 제작
          </div>
        </div>
        <div className="bg-inactive relative h-2 w-full rounded-lg">
          <div
            className={twMerge(
              `bg-primary absolute top-0 left-0 h-2 w-[20%] rounded-lg`,
              `w-[${info.percent || 0}%]`,
            )}
            style={{ width: `${info.percent || 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
