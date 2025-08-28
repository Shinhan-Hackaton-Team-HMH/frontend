import { ArrowLeft, Dot } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

interface StepperProps {
  label: string;
  step: number;
  handlePreviousStep: () => void;
}

export default function Stepper({
  label,
  step,
  handlePreviousStep,
}: StepperProps) {
  return (
    <div className="flex h-8 w-full flex-row items-center justify-between">
      <ArrowLeft className="m-1 size-6" onClick={handlePreviousStep} />
      <div className="text-BodyMD text-text-normal">{label}</div>
      <div className="flex flex-row items-center gap-2">
        <Dot
          className={`bg-primary size-2.5 rounded-full text-transparent ${
            step === 0 &&
            'shadow-[0_0_10px_0_rgba(92,255,241,0.70)] outline-1 outline-[#96AAFF]'
          }`}
        />
        <Dot
          className={twMerge(
            'size-2.5 rounded-full text-transparent',
            `${
              step === 1 &&
              'shadow-[0_0_10px_0_rgba(92,255,241,0.70)] outline-1 outline-[#96AAFF]'
            }`,
            `${step >= 1 ? 'bg-primary' : 'bg-inactive'}`,
          )}
        />
        <Dot
          className={`bg-inactive size-2.5 rounded-full text-transparent ${
            step === 2 &&
            'bg-primary shadow-[0_0_10px_0_rgba(92,255,241,0.70)] outline-1 outline-[#96AAFF]'
          }`}
        />
      </div>
    </div>
  );
}
