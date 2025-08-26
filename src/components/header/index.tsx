import DropDown, {
  DropDownDetail,
  DropDownItems,
} from '@/components/common/dropdown';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isIntroHovered, setIsIntroHovered] = useState(false);
  const [isGuideHovered, setIsGuideHovered] = useState(false);
  const [isCSHovered, setIsCSHovered] = useState(false);

  const serviceIntroItems: DropDownDetail[] = [
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
  const serviceGuideItems: DropDownDetail[] = [
    {
      text: '통합이용가이드',
      link: '/',
    },
    {
      text: '회원가입 안내',
      link: '/',
    },
    {
      text: '광고 집행 안내',
      link: '/',
    },
    {
      text: '광고 업종가이드',
      link: '/',
    },
    {
      text: '광고 소재가이드',
      link: '/',
    },
  ];
  const customerServiceItems: DropDownDetail[] = [
    {
      text: '공지사항',
      link: '/',
    },
    {
      text: '자주묻는 질문',
      link: '/',
    },
    {
      text: '문의 사항',
      link: '/',
    },
  ];
  return (
    <div className="flex justify-between w-full items-center py-2.5">
      <div>KT 바로광고</div>
      <div className="flex flex-row justify-center items-center gap-12">
        <div
          onMouseEnter={() => setIsIntroHovered(true)}
          onMouseLeave={() => setIsIntroHovered(false)}
          className="relative text-TitleSM"
        >
          <button> 서비스 소개</button>
          {isIntroHovered && <DropDown items={serviceIntroItems} />}
        </div>
        <div
          onMouseEnter={() => setIsGuideHovered(true)}
          onMouseLeave={() => setIsGuideHovered(false)}
          className="relative text-TitleSM"
        >
          <button> 가이드</button>
          {isGuideHovered && <DropDown items={serviceGuideItems} />}
        </div>
        <div
          onMouseEnter={() => setIsCSHovered(true)}
          onMouseLeave={() => setIsCSHovered(false)}
          className="relative text-TitleSM"
        >
          <button>고객지원</button>
          {isCSHovered && <DropDown items={customerServiceItems} />}
        </div>
        <Link href={''}>마이페이지</Link>
        <button className="bg-gradient-to-r from-[#5731F0] to-[#5CFFF1] px-6 py-2 rounded-[1.25rem]">
          <Link href={''}>광고만들기</Link>
        </button>
      </div>
    </div>
  );
}
