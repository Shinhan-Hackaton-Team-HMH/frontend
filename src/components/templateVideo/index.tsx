import { Dispatch, SetStateAction, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export default function VideoExpand({
  src,
  selectedTemplate,
  setSelectTemplate,
  index,
}: {
  src: string;
  selectedTemplate: number | null;
  setSelectTemplate: Dispatch<SetStateAction<number | null>>;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handleMouseEnter = () => {
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  const handleSelectTemplate = () => {
    setSelectTemplate(index);
  };
  return (
    <video
      key={index}
      ref={videoRef}
      src={src}
      // onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      muted
      loop
      playsInline
      className={twMerge(
        'h-[292px] w-full rounded-lg object-cover',
        `${selectedTemplate == index && 'ring-primary ring-3'}`,
      )}
      onClick={handleSelectTemplate}
    />
  );
}
