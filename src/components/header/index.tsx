import DropDown, {
  DropDownDetail,
  DropDownItems,
} from '@/components/common/dropdown';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  const dropDownItems: DropDownDetail[] = [
    {
      text: 'KT 바로광고 소개',
      link: '/about',
    },
    {
      text: '실시간 광고 보기',
      link: '/ad-list',
    },
    {
      text: '광고 기기 소개',
      link: '/ad-about',
    },
  ];

  console.log(isHovered);
  return (
    <div className="flex justify-between w-full items-center py-2.5">
      <div>KT 바로광고</div>
      <div className="flex flex-row justify-center items-center gap-12">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative text-TitleSM"
        >
          <button> 서비스 소개</button>
          {isHovered && <DropDown items={dropDownItems} />}
        </div>
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
