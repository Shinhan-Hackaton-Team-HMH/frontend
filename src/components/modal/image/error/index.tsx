import Modal from '@/components/modal';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

export default function ImageErrorModal({
  setImageErrorModal,
}: {
  setImageErrorModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal className="h-fit w-[440px] gap-6 px-8 py-9">
      <Image
        src={'/icon/cancel.svg'}
        alt={'cancel_icon'}
        className="absolute top-9 right-9"
        width={24}
        height={24}
      ></Image>
      <div className="text-TitleMD text-black">
        사진은 최대 5장까지 업로드 가능합니다.
      </div>
      <div className="relative flex w-full items-center justify-center">
        <Image
          src={'/icon/error.svg'}
          alt={'cancel_icon'}
          width={98}
          height={98}
        ></Image>
      </div>
      <div className="text-BodyMD text-text-normal w-[269px] text-center">
        광고 영상 제작에 사진 5장이 필요해요.
      </div>
      <button
        className="border-line-normal text-text-normal flex w-full items-center justify-center rounded-[20px] border py-2.5"
        onClick={() => setImageErrorModal(false)}
      >
        확인
      </button>
    </Modal>
  );
}
