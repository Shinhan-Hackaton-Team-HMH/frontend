import Modal from '@/components/modal';
import Image from 'next/image';

interface DeleteModal {
  index: number;
  handleDelete: (index: number) => void;
  handleCancel: () => void;
}

export default function ImageDeleteModal({
  index,
  handleDelete,
  handleCancel,
}: DeleteModal) {
  return (
    <Modal>
      <Image
        src={'/icon/cancel.svg'}
        alt={'cancel_icon'}
        className="absolute top-6 right-6"
        width={24}
        height={24}
      ></Image>
      <div className="text-TitleMD text-black">정말 삭제하시겠습니까?</div>
      <div className="relative flex w-full items-center justify-center">
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="98"
            viewBox="0 0 98 98"
            fill="none"
          >
            <circle
              cx="49"
              cy="49"
              r="49"
              fill="url(#paint0_radial_527_5721)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_527_5721"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49 49) rotate(90) scale(49)"
              >
                <stop stopColor="#FF4242" stopOpacity="0.3" />
                <stop offset="1" stop-Color="#FF4242" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </>
      </div>
      <div className="text-BodyMD text-text-normal w-[269px] text-center">
        한번 삭제한 사진은
        <br />
        다시 불러오기 어려워요.
      </div>
      <div className="flex w-full flex-row gap-2">
        <button
          className="ring-line-normal text-text-normal flex w-full items-center justify-center rounded-[20px] py-2.5 ring"
          onClick={handleCancel}
        >
          취소
        </button>
        <button
          className="ring-line-normal bg-primary text-text-inverse flex w-full items-center justify-center rounded-[20px] py-2.5 ring"
          onClick={() => handleDelete(index)}
        >
          삭제
        </button>
      </div>
    </Modal>
  );
}
