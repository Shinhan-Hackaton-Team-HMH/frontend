'use client';

import DropDown, {
  DropDownDetail,
  // DropDownItems,
} from '@/components/common/dropdown';
import useUserStore from '@/store/useUserStore';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isIntroHovered, setIsIntroHovered] = useState(false);
  const [isGuideHovered, setIsGuideHovered] = useState(false);
  const [isCSHovered, setIsCSHovered] = useState(false);
  const userId = useUserStore((state) => state.userId);

  const pathname = usePathname();

  const bizId = useUserStore((state) => state.biz_id);

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

  console.log('path', pathname);

  return (
    <div className="container flex w-full items-center justify-between px-4 py-3.5 sm:px-0 sm:py-2">
      <Image
        src={'/logo/kt_logo.svg'}
        width={120}
        height={120}
        alt={'kt-logo'}
      />
      {pathname !== '/analyze' &&
        pathname !== '/backOffice' &&
        pathname !== '/result/12' && (
          <>
            <div className="hidden flex-row items-center justify-center gap-12 sm:flex">
              <div
                onMouseEnter={() => setIsIntroHovered(true)}
                onMouseLeave={() => setIsIntroHovered(false)}
                className="text-TitleSM relative"
              >
                <button> 서비스 소개</button>
                {isIntroHovered && <DropDown items={serviceIntroItems} />}
              </div>
              <div
                onMouseEnter={() => setIsGuideHovered(true)}
                onMouseLeave={() => setIsGuideHovered(false)}
                className="text-TitleSM relative"
              >
                <button> 가이드</button>
                {isGuideHovered && <DropDown items={serviceGuideItems} />}
              </div>
              <div
                onMouseEnter={() => setIsCSHovered(true)}
                onMouseLeave={() => setIsCSHovered(false)}
                className="text-TitleSM relative"
              >
                <button>고객지원</button>
                {isCSHovered && <DropDown items={customerServiceItems} />}
              </div>
              <Link href={'/mypage'}>마이페이지</Link>

              {userId === '' ? (
                <Link href={'/login'}>
                  <div className="ring-line-assistive flex flex-row items-center justify-center gap-2 rounded-[120px] px-6 py-2.5 ring">
                    <div className="text-BodyMD text-text-normal">로그인</div>
                    <Image
                      src={'/icon/enter.svg'}
                      alt={''}
                      width={24}
                      height={24}
                    />
                  </div>
                </Link>
              ) : (
                <Link href={bizId ? '/business' : '/budget'}>
                  <button className="bg-primary text-text-inverse flex flex-row items-center justify-center gap-2.5 rounded-[1.25rem] from-[#5731F0] to-[#5CFFF1] px-6 py-2 hover:bg-gradient-to-r">
                    광고 진행
                    <Image
                      src={'/Sparkle.svg'}
                      width={24}
                      height={24}
                      alt={'kt-logo'}
                    />
                  </button>
                </Link>
              )}
            </div>
            <Image
              src={'/icon/menu.svg'}
              width={24}
              height={24}
              alt={'menu_icon'}
              className="sm:hidden"
            />
          </>
        )}
    </div>
  );
}
