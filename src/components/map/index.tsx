'use client';
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react';
import { Map } from 'lucide-react';
import Image from 'next/image';

interface MapInteractionDetail {
  mapModal: boolean;
  setMapModal: Dispatch<SetStateAction<boolean>>;
}

export default function MapInteraction({
  mapModal,
  setMapModal,
}: MapInteractionDetail) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(mapModal ? 1.4 : 1.2);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  const clampPosition = useCallback(
    (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return { x, y };

      const containerRect = container.getBoundingClientRect();
      const imgWidth = containerRect.width * scale;
      const imgHeight = containerRect.height * scale;

      const maxX = (imgWidth - containerRect.width) / 2;
      const maxY = (imgHeight - containerRect.height) / 2;

      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    [scale],
  );

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newScale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, scale - e.deltaY * 0.001),
    );
    setScale(newScale);
    setPosition((pos) => clampPosition(pos.x, pos.y));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      setPosition((prev) => clampPosition(prev.x + dx, prev.y + dy));
      setLastPos({ x: e.clientX, y: e.clientY });
    },
    [clampPosition, isDragging, lastPos.x, lastPos.y],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent select-none">
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        className="relative h-full w-full cursor-grab overflow-hidden rounded-2xl bg-black shadow-lg active:cursor-grabbing"
      >
        <Image
          src="/map3.png"
          alt="map"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          objectFit="cover"
          fill
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
          className="pointer-events-none h-full w-full object-cover"
        />
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <button
            onClick={() => setScale((s) => Math.min(MAX_SCALE, s + 0.2))}
            className="size-[52px] place-items-center rounded-[120px] bg-white/80 shadow hover:bg-white"
          >
            <Image src={'/icon/add.svg'} alt={''} width={24} height={24} />
          </button>
          <button
            onClick={() => setScale((s) => Math.max(MIN_SCALE, s - 0.2))}
            className="size-[52px] place-items-center rounded-[120px] bg-white/80 shadow hover:bg-white"
          >
            <Image
              src={'/icon/check_small.svg'}
              alt={''}
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="absolute bottom-4 flex w-full justify-center">
          <button
            className="z-10 flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3"
            onClick={() => setMapModal((prev) => !prev)}
          >
            {mapModal ? '돌아가기' : '지도 전체보기'}
            <Map />
          </button>
        </div>
      </div>
    </div>
  );
}
