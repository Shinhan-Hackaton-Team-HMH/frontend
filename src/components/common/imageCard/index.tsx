import { Dispatch, forwardRef, SetStateAction, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import ImageDeleteModal from '@/components/modal/image/delete';

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  index: number;
  className?: string;
  style?: React.CSSProperties;
  selectedId: number;
  isSorting: boolean;
  setSelect?: Dispatch<SetStateAction<number>>;
  imageList?: string[];
  setImageList?: (imagesList: string[]) => void;
  setImageSrc?: Dispatch<SetStateAction<string>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
}

const ImageCard = forwardRef<HTMLDivElement, ImageCardProps>(
  (
    {
      imgSrc,
      index,
      className,
      style,
      setModal,
      setSelect,
      imageList,
      setImageList,
      selectedId,
      isSorting,
      ...rest
    },
    ref,
  ) => {
    const handleModal = () => {
      if (setModal && setSelect) {
        setSelect(index);
        setModal(true);
      }
    };
    const handleDelete = () => {
      if (imageList && setImageList) {
        setImageList(imageList.filter((_, i) => i !== index));
        //setImageDeleteModal(false);
      }
    };

    return (
      <>
        <div
          ref={ref}
          style={style}
          className={twMerge(
            "border-line-assistive relative aspect-[170/227] h-[227px] w-[170px] rounded-xl border bg-gray-200 bg-[url('/imageBackground.png')] bg-cover bg-center bg-no-repeat",
            className,
          )}
          {...rest}
        >
          {imgSrc !== '' && (
            <>
              <Image
                src={imgSrc}
                fill
                style={{ objectFit: 'contain' }}
                alt={`image-${index}`}
                onClick={handleModal}
              />
            </>
          )}
          <div
            onClick={handleDelete}
            className="absolute right-3.5 bottom-4 z-[1000] cursor-pointer rounded-sm bg-white"
          >
            <Image
              src={'/icon/delete.svg'}
              width={24}
              height={24}
              alt={`delete_icon`}
            />
          </div>
          <div className="text-primary text-ButtonMD bg-primary-lighten absolute top-[7px] left-2 rounded-lg px-[11px] py-[5px]">
            <span>{index + 1}</span>
          </div>
        </div>
      </>
    );
  },
);

ImageCard.displayName = 'ImageCard';
export default ImageCard;
