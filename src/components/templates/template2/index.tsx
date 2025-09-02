import { useState } from 'react';
import Image from 'next/image';
import InputTextField from '@/components/common/textfield';

interface TemplateDetail {
  imageList: string[];
}

export default function TemplateTwo({ imageList }: TemplateDetail) {
  const [imageStep, setImageStep] = useState(1);

  const handleNextStep = () => {
    if (imageStep < 5) {
      setImageStep(imageStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (imageStep > 1) {
      setImageStep(imageStep - 1);
    }
  };
  return (
    <div className="flex h-[441px] w-full flex-row gap-9">
      <section className="flex h-full w-full flex-row items-center justify-center gap-[63px] px-4 pt-[30px] pb-[63px]">
        <div
          className="bg-alpha border-line-assistive flex size-[52px] items-center justify-center rounded-[120px] border p-1.5"
          onClick={handlePreviousStep}
        >
          <Image
            src="/icon/arrow_left.svg"
            width={24}
            height={24}
            alt={'arrow_icon'}
          ></Image>
        </div>
        <div className="border-line-assistive relative aspect-[170/227] h-[227px] w-[170px] rounded-xl border bg-gray-200 bg-[url('/imageBackground.png')] bg-cover bg-center bg-no-repeat">
          <Image
            src={imageList[imageStep - 1]}
            fill
            style={{ objectFit: 'contain' }}
            alt={`image-${imageStep}`}
          />
          <>{imageStep}</>
        </div>
        <div
          className="bg-alpha border-line-assistive flex size-[52px] items-center justify-center rounded-[120px] border p-1.5"
          onClick={handleNextStep}
        >
          <Image
            src="/icon/arrow_right.svg"
            width={24}
            height={24}
            alt={'arrow_icon'}
          ></Image>
        </div>
      </section>
      <section className="flex h-full w-full flex-col justify-between">
        {imageStep == 1 && (
          <div className="flex flex-col gap-[13px]">
            <InputTextField label={'본문 1'} placeholder={'문구 1'} />
            <InputTextField label={'본문 2'} placeholder={'문구 1'} />
          </div>
        )}
        {imageStep == 2 && (
          <div className="flex flex-col gap-[13px]">
            <InputTextField label={'본문'} placeholder={'문구 1'} />
            <InputTextField label={'본문'} placeholder={'문구 1'} />
          </div>
        )}
        {imageStep == 3 && (
          <div className="flex flex-col gap-[13px]">
            <InputTextField label={'본문'} placeholder={'문구 1'} />
            <InputTextField label={'본문'} placeholder={'문구 1'} />
            <InputTextField label={'본문'} placeholder={'문구 1'} />
          </div>
        )}
        {imageStep == 4 && (
          <div className="flex flex-col gap-[13px]">
            <InputTextField label={'본문'} placeholder={'문구 1'} />
            <InputTextField label={'본문'} placeholder={'문구 1'} />
            <InputTextField label={'본문'} placeholder={'문구 1'} />
          </div>
        )}
        {imageStep == 5 && (
          <div className="flex flex-col gap-[13px]">
            <InputTextField label={'본문'} placeholder={'문구 1'} />
            <InputTextField label={'본문'} placeholder={'문구 1'} />
          </div>
        )}
        {imageStep == 5 && (
          <button
            className={
              'bg-primary text-text-inverse w-full rounded-xl py-[13px]'
            }
            // onClick={handleStepTwo}
          >
            다음
          </button>
        )}
      </section>
    </div>
  );
}
