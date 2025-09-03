import Image from 'next/image';

export interface CardDetail {
  client: string;
  title: string;
  small_business: boolean;
  handleRoute: () => void;
}

export default function Card({
  client,
  title,
  small_business,
  handleRoute,
}: CardDetail) {
  return (
    <>
      {small_business ? (
        <div className="bg-whtie relative flex size-[289px] flex-col items-center justify-between rounded-[20px] bg-[url('/small_biz.png')] bg-cover bg-center bg-no-repeat p-6">
          {/* <Image
            src={'/big.svg'}
            alt={''}
            fill
            className="absolute -z-10"
            objectFit="cover"
          /> */}
          <div className="flex w-full flex-row items-center gap-2">
            <div className="text-Headline text-text-inverse">{client}</div>
            <div className="text-BodySM text-text-inverse bg-alpha rounded-lg px-2 py-1">
              {'New'}
            </div>
          </div>
          <div
            className="bg-alpha flex w-full flex-row justify-between rounded-[120px] px-4 py-4.5"
            onClick={handleRoute}
          >
            <div>{title}</div>
            <Image src={'/icon/enter.svg'} alt={''} width={24} height={24} />
          </div>
        </div>
      ) : (
        <div className="bg-whtie relative flex size-[289px] flex-col items-center justify-between rounded-[20px] bg-[url('/big_biz.png')] bg-cover bg-center bg-no-repeat p-6">
          <div className="flex w-full flex-row items-center gap-2">
            <div className="text-Headline text-black">{client}</div>
          </div>
          <div
            className="bg-alpha flex w-full flex-row justify-between rounded-[120px] px-4 py-4.5"
            onClick={handleRoute}
          >
            <div>{title}</div>
            <Image src={'/icon/enter.svg'} alt={''} width={24} height={24} />
          </div>
        </div>
      )}
    </>
  );
}
