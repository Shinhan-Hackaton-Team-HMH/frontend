import Modal from '@/components/modal';

import Image from 'next/image';
import Link from 'next/link';

export default function BusinessConfirmModal() {
  return (
    <Modal>
      <div className="text-TitleMD text-black">
        사업자등록증 제출이 완료되었어요.
      </div>
      <Image
        src={'/businessModal/pdf_confirm.svg'}
        alt={'modal_confirm'}
        width={80}
        height={80}
      />
      <div className="text-BodyMD text-text-normal w-[269px]">
        사업자 등록증 승인에는 2~3일 정도 소요되며, 승인 완료 시 카톡으로 알림을
        전송해드려요
      </div>
      <div className="flex flex-row gap-2">
        <Link
          href="/"
          className="border-line-normal rounded-[120px] border px-6 py-2.5"
        >
          홈으로
        </Link>
        <Link
          href="/budget"
          className="bg-primary text-text-inverse w-[204px] rounded-[120px] py-2.5 text-center"
        >
          광고만들기
        </Link>
      </div>
    </Modal>
  );
}
