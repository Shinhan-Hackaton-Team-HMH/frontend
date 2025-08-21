import Button from '@/components/common/button';
import { ChevronRight } from 'lucide-react';

import Image from 'next/image';

export default function Footer() {
  return (
    <div className="flex flex-col w-full gap-8">
      <section className="flex flex-row w-full justify-between container">
        <div className="flex flex-col">
          <Image
            src={'/logo/kt_logo.svg'}
            width={120}
            height={120}
            alt={'kt-logo'}
          />
          <div className="flex flex-row gap-3 text-BodySM text-assistive mt-6.5">
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
        <div className="flex flex-col text-BodyMD text-assistive gap-3">
          <div className="flex flex-row justify-between w-full">
            <div>광고상담 문의</div>
            <ChevronRight className="size-5" />
          </div>
          <div className="flex flex-row justify-between w-full mb-8.5">
            <div>사이트맵</div>
            <ChevronRight className="size-5" />
          </div>
          <Button text={'광고만들기'} href={'/'} />
        </div>
      </section>
      <section className="w-screen bg-[#F9FAFB]">
        <div className="flex flex-row h-12 items-center justify-between container text-[#A1A3A5]">
          <div>© KT Crop.</div>
          <div className="flex flex-row gap-4 items-center">
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
