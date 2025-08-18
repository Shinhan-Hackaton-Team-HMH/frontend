import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-between w-full items-center py-2.5">
      <div>KT 바로광고</div>
      <div className="flex flex-row justify-center items-center gap-12">
        <Link href={''}>서비스 소개</Link>
        <Link href={''}>가이드</Link>
        <Link href={''}>고객지원</Link>
        <Link href={''}>마이페이지</Link>
        <button className="bg-gradient-to-r from-[#5731F0] to-[#5CFFF1] px-6 py-2 rounded-[1.25rem]">
          <Link href={''}>광고만들기</Link>
        </button>
      </div>
    </div>
  );
}
