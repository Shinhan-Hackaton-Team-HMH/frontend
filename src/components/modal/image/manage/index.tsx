'use client';

import ImageCard from '@/components/common/imageCard';
import Modal from '@/components/modal';
import Image from 'next/image';
import { useState, useRef, SetStateAction, Dispatch, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragMoveEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = {
  id: string;
  src: string;
  index: number;
  imageList: string[];
  setImageList: (imagesList: string[]) => void;
};

function SortableItem({
  id,
  src,
  index,
  imageList,
  setImageList,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex-shrink-0"
    >
      <ImageCard
        imageList={imageList}
        setImageList={setImageList}
        imgSrc={src}
        isSorting={true}
        index={index}
        className="z-[500] h-[344px] w-[258px]"
        selectedId={0}
      />
    </div>
  );
}

export default function ImageManageModal({
  imageData,
  setImages,
  setImageModal,
}: {
  imageData: string[];
  setImageModal: Dispatch<SetStateAction<boolean>>;
  setImages: (imagesList: string[]) => void;
}) {
  const [items, setItems] = useState(
    imageData.map((src, idx) => ({ src, uniqueId: `${src}-${idx}` })),
  );

  // items가 바뀔 때만 부모에 전달
  useEffect(() => {
    setImages(items.map((item) => item.src));
  }, [items, setImages]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.uniqueId === active.id);
        const newIndex = prev.findIndex((item) => item.uniqueId === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    let clientX: number | null = null;

    if (event.activatorEvent instanceof MouseEvent) {
      clientX = event.activatorEvent.clientX;
    }
    if (event.activatorEvent instanceof TouchEvent) {
      clientX = event.activatorEvent.touches[0].clientX;
    }

    if (clientX === null) return;

    const rect = container.getBoundingClientRect();
    const edgeThreshold = 100;

    if (clientX - rect.left < edgeThreshold) {
      container.scrollBy({ left: -20, behavior: 'smooth' });
    } else if (rect.right - clientX < edgeThreshold) {
      container.scrollBy({ left: 20, behavior: 'smooth' });
    }
  };

  return (
    <Modal className="h-fit w-[1049px] items-start px-8 py-9">
      <Image
        src={'/icon/cancel.svg'}
        alt={'cancel_icon'}
        className="absolute top-8 right-8"
        width={24}
        height={24}
        onClick={() => setImageModal(false)}
      />
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-3">
          <div className="text-TitleMD text-black">
            사진은 최대 5장까지 업로드 가능합니다.
          </div>
          <div className="text-BodyMD text-text-assistive">
            입력하신 네이버 링크에서 선별한 사진을 가져왔어요.
          </div>
        </div>
        <div className="relative flex w-full">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragMove={handleDragMove}
          >
            <SortableContext
              items={items.map((item) => item.uniqueId)}
              strategy={horizontalListSortingStrategy}
            >
              <div
                ref={scrollRef}
                className="scrollbar-hide relative flex w-full gap-4 overflow-x-scroll scroll-smooth"
              >
                {items.map((item, index) => (
                  <SortableItem
                    key={item.uniqueId}
                    id={item.uniqueId}
                    src={item.src}
                    index={index}
                    imageList={imageData}
                    setImageList={setImages}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="text-BodyMD text-text-normal w-[269px] text-center">
          사진을 추가하려면 기존 사진을 삭제해 주세요.
        </div>

        <button
          className="text-text-inverse bg-primary flex w-full items-center justify-center rounded-xl py-2.5"
          onClick={() => setImageModal(false)}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
