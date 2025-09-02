import Image from 'next/image';

export default function Loading({ headLine }: { headLine: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <div className="text-Headline text-text-normal">{headLine}</div>
      <Image src={'/loading.png'} width={414} height={400} alt={'loading'} />
    </div>
  );
}
