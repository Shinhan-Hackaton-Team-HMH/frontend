import Image from 'next/image';

export interface CardDetail {
  title: string;
  with_video: boolean;
  key_feature: string[];
  handleRoute: () => void;
}

export default function Card({
  title,
  with_video,
  handleRoute,
  key_feature,
}: CardDetail) {
  return (
    <div
      className={`bg-whtie bg-normal-inverse relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-[20px] p-4 ring ${with_video ? 'ring-[#7A7DFF]' : 'ring-[#C3CDFF]'}`}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2 p-2">
        <div className={`text-Headline text-text-strong`}>{title}</div>
        <Image
          src={'/icon/enter_primary.svg'}
          alt={''}
          width={24}
          height={24}
        />
      </div>

      {with_video ? (
        <div className="relative h-32 w-24">
          <Image src={'/loading.svg'} alt={''} fill objectFit="cover" />
        </div>
      ) : (
        <div className="relative h-21 w-36.5">
          <Image src={'/marker.png'} alt={''} fill objectFit="cover" />
        </div>
      )}

      <div
        className={`absolute bottom-[-199px] h-[355px] w-[357px] shrink-0 rounded-[357px] ${with_video ? 'bg-[radial-gradient(50%_50%_at_50%_50%,rgba(87,49,240,0.15)_0%,rgba(92,255,241,0)_100%)]' : 'bg-[radial-gradient(50%_50%_at_50%_50%,rgba(111,253,248,0.15)_0%,rgba(195,205,255,0)_100%)]'}`}
      ></div>
      <div
        className={`text-BodyMD text-text-normal mt-0 flex w-full flex-col gap-3 rounded-[12px]`}
      >
        {key_feature.map((value, index) => {
          return (
            <div className="flex flex-row items-center" key={index}>
              <Image
                src="/icon/check_primary.svg"
                alt={''}
                width={24}
                height={24}
              />
              <div>{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
