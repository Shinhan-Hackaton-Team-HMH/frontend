import useUserStore from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export interface CardDetail {
  client: string;
  title: string;
  small_business: boolean;
}

export default function Card({ client, title, small_business }: CardDetail) {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);

  const handleRoute = () => {
    if (userId !== '') {
      router.push('/business');
    } else router.push('/login');
  };
  return (
    <>
      {small_business ? (
        <div className="bg-whtie relative flex size-[289px] flex-col items-center justify-between rounded-[20px] bg-red-300 p-6">
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
        <div className="bg-whtie relative flex size-[289px] flex-col items-center justify-between rounded-[20px] bg-red-300 p-6">
          <div className="flex w-full flex-row items-center gap-2">
            <div className="text-Headline text-text-inverse">{client}</div>
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
