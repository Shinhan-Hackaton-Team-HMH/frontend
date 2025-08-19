'use client';
import { useRef, useState, useEffect, SetStateAction, Dispatch } from 'react';

import Image from 'next/image';

interface MapInteractionDetail {
  setMapModal: Dispatch<SetStateAction<boolean>>;
}

export default function MapInteraction({ setMapModal }: MapInteractionDetail) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);
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

  const clampPosition = (x: number, y: number) => {
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
  };

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
    e.preventDefault(); // prevent text/image selection
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;

    setPosition((prev) => clampPosition(prev.x + dx, prev.y + dy));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const move = (e: MouseEvent) => handleMouseMove(e);
    const up = () => handleMouseUp();
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isDragging, lastPos]);

  return (
    <div className="w-full h-full overflow-hidden bg-transparent flex items-center justify-center select-none">
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        className="relative w-full h-full overflow-hidden bg-black cursor-grab active:cursor-grabbing rounded-2xl shadow-lg"
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
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <button
            onClick={() => setScale((s) => Math.min(MAX_SCALE, s + 0.2))}
            className="size-6 bg-white/80 rounded-md shadow hover:bg-white"
          >
            +
          </button>
          <button
            onClick={() => setScale((s) => Math.max(MIN_SCALE, s - 0.2))}
            className="size-6 bg-white/80 rounded-md shadow hover:bg-white"
          >
            -
          </button>
        </div>
        <div className="absolute w-full bottom-4 flex justify-center">
          <button
            className="px-6 py-3 bg-white rounded-full z-40"
            onClick={() => setMapModal((prev) => !prev)}
          >
            지도 전체보기
          </button>
        </div>
      </div>
    </div>
  );
}
