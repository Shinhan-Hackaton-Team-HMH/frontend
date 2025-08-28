import Image from 'next/image';

export default function KakaoButton() {
  return (
    <div className="flex flex-row w-full items-center bg-[#FEE500] justify-center rounded-xl py-[12] relative">
      <Image
        className="absolute top-[11px] left-3 size-6"
        width={24}
        height={24}
        src="/kaka_icon.svg"
        alt="카카오로 시작하기"
      />
      카카오로 시작하기
    </div>
  );
}
