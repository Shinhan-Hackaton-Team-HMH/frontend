import Modal from '@/components/modal';
import Image from 'next/image';

export default function BusinessUploadModal() {
  return (
    <Modal>
      <div className="text-TitleMD text-black">사업자등록증을 읽고 있어요.</div>
      <div className="relative flex w-full justify-center items-center">
        <Image
          src={'/businessModal/pdf_uploadedModal.svg'}
          alt={'modal_uploaded'}
          width={100}
          height={100}
        />
        <Image
          src={'/businessModal/pdf_line_primary.svg'}
          alt={'modal_line'}
          className="animate-float z-20 absolute  top-0"
          width={140}
          height={100}
        />
      </div>
      <div className="w-[269px] text-BodyMD text-text-normal text-center">
        최대 30초까지 걸릴 수 있어요.
        <br /> 잠시만 기다려주세요.
      </div>
    </Modal>
  );
}
