import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface MarkerProps {
  device: 'ELE' | 'BUS';
  className: string;
}

export default function MapMarkers({ device, className }: MarkerProps) {
  return (
    <div
      className={twMerge(
        'ring-primary rounded-[120px] bg-white p-2 ring',
        className,
      )}
    >
      <Image
        src={
          device === 'BUS' ? '/icon/icon_bus.svg' : '/icon/icon_elevator.svg'
        }
        alt="map-marker"
        width={20}
        height={20}
      ></Image>
    </div>
  );
}
