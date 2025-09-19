import GlitchyNumber from '@/components/glitchy_text';

export default function HeroCards({
  title,
  unit,
  count,
  description,
}: {
  title: string;
  unit: string;
  count: number;
  description: string;
}) {
  return (
    <div className="flex h-[200px] w-full flex-col items-start justify-between rounded-[20px] bg-[linear-gradient(180deg,#F4F8FF_0%,#FCFDFF_100%)] p-5">
      <div className="text-text-normal text-TitleMD">{title}</div>
      <div className="flex flex-col gap-2">
        <div className="text-text-normal text-TitleMD flex flex-row items-end gap-1">
          <GlitchyNumber
            target={count}
            duration={1000}
            className="text-StatsLG text-text-dark-primary"
          />
          {unit}
        </div>
        <div className="text-BodyMD text-text-normal">{description}</div>
      </div>
    </div>
  );
}
