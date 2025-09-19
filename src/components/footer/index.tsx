import Button from '@/components/common/button';
import { ChevronRight } from 'lucide-react';

import Image from 'next/image';

export default function Footer() {
  return (
    <div className="flex w-full flex-col gap-8">
      <section className="container flex w-full flex-col justify-between gap-4 px-4 sm:flex-row sm:gap-0 sm:px-0">
        <div className="flex flex-col">
          <Image
            src={'/logo/kt_logo.svg'}
            width={120}
            height={120}
            alt={'kt-logo'}
          />
          <div className="text-BodySM text-text-assistive mt-6.5 flex flex-row gap-3">
            <div className="flex flex-col gap-3">
              <span>대표 번호</span>
              <span>이메일</span>
              <span>주소</span>
            </div>
            <div className="flex flex-col gap-3">
              <span>1544-6979</span>
              <span>help.ktbrad@platbread.com</span>
              <span>
                경기도 성남시 분당구 불정로 90 KT 본사<span>13606</span>
              </span>
            </div>
          </div>
        </div>
        <div className="text-BodyMD text-text-assistive flex flex-col gap-3">
          <div className="flex w-full flex-row items-center justify-start sm:justify-between">
            <div>광고상담 문의</div>
            <Image
              src={'/icon/arrow_right.svg'}
              alt={''}
              width={24}
              height={24}
            />
          </div>
          <div className="mb-8.5 flex w-full flex-row items-center justify-start sm:justify-between">
            <div>사이트맵</div>
            <Image
              src={'/icon/arrow_right.svg'}
              alt={''}
              width={24}
              height={24}
            />
          </div>
        </div>
      </section>
      <section className="w-screen bg-[#F9FAFB] px-4 sm:px-0">
        <div className="container flex h-12 flex-row items-center justify-between text-[#A1A3A5]">
          <div>© KT Crop.</div>
          <div className="flex flex-row items-center gap-4">
            <div>이용약관</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="17"
              viewBox="0 0 2 17"
              fill="none"
            >
              <path d="M1 0.5L1 16.5" stroke="#D3D5D7" />
            </svg>
            <div>개인정보처리방침</div>
          </div>
        </div>
      </section>
    </div>
  );
}
