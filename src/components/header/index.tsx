import Button from '@/components/common/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex justify-between w-full items-center py-2.5">
      <Image
        src={'/logo/kt_logo.svg'}
        width={120}
        height={120}
        alt={'kt-logo'}
      />
      <div className="flex flex-row justify-center items-center gap-12">
        <Link href={''}>서비스 소개</Link>
        <Link href={''}>가이드</Link>
        <Link href={''}>고객지원</Link>
        <Link href={''}>마이페이지</Link>
        <Button text={'광고만들기'} href={'/'} />
      </div>
    </div>
  );
}
