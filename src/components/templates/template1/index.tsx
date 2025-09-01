import { useMemo, useState } from 'react';
import Image from 'next/image';
import InputTextField from '@/components/common/textfield';

interface TemplateDetail {
  imageList: string[];
  phraseList: string[]; // 초기값 또는 필요시 사용
  templateNo: number;
}

export default function TemplateO({
  imageList,
  phraseList,
  templateNo,
}: TemplateDetail) {
  const safePhraseList = Array.isArray(phraseList) ? phraseList : [];

  const [imageStep, setImageStep] = useState(0);

  // step별 input 개수 정의
  const stepInputsCount = useMemo(
    () =>
      templateNo == 1
        ? [2, 2, 2, 2, 3]
        : templateNo == 2
          ? [2, 2, 3, 3, 2]
          : [2, 2, 2, 2, 3],
    [templateNo],
  );

  // step별 입력값 상태 (2차원 배열)
  // const [inputs, setInputs] = useState<string[][]>(() => {
  //   let startIdx = 0;
  //   return stepInputsCount.map((count) => {
  //     const slice = phraseList.slice(startIdx, startIdx + count);
  //     startIdx += count;
  //     return slice.length < count
  //       ? [...slice, ...Array(count - slice.length).fill('')]
  //       : slice;
  //   });
  // });
  // phraseList를 기반으로 step별 2차원 배열 초기화 (useMemo로 성능 최적화)
  const initialInputs = useMemo(() => {
    const list = Array.isArray(phraseList) ? phraseList : [];
    let startIdx = 0;
    return stepInputsCount.map((count) => {
      const slice = list.slice(startIdx, startIdx + count);
      startIdx += count;
      return slice.length < count
        ? [...slice, ...Array(count - slice.length).fill('')]
        : slice;
    });
  }, [phraseList, stepInputsCount]);

  const [inputs, setInputs] = useState<string[][]>(initialInputs);
  // 공용 onChange
  const handleChange = (stepIdx: number, inputIdx: number, value: string) => {
    setInputs((prev) => {
      const copy = [...prev];
      copy[stepIdx][inputIdx] = value;
      return copy;
    });
  };

  const handleNextStep = () => {
    if (imageStep < 4) setImageStep(imageStep + 1);
  };

  const handlePreviousStep = () => {
    if (imageStep > 0) setImageStep(imageStep - 1);
  };

  console.log(phraseList);

  return (
    <div className="flex h-[441px] w-full flex-row gap-9">
      {/* 이미지 영역 */}
      <section className="flex h-full w-full flex-row items-center justify-center gap-[63px] px-4 pt-[30px] pb-[63px]">
        <div
          className="bg-alpha border-line-assistive flex size-[52px] items-center justify-center rounded-[120px] border p-1.5"
          onClick={handlePreviousStep}
        >
          <Image
            src="/icon/arrow_left.svg"
            width={24}
            height={24}
            alt="arrow_icon"
          />
        </div>

        <div className="border-line-assistive relative aspect-[170/227] h-[227px] w-[170px] overflow-hidden rounded-xl border bg-gray-200 bg-[url('/imageBackground.png')] bg-cover bg-center bg-no-repeat">
          <Image
            src={imageList[imageStep]}
            fill
            style={{ objectFit: 'cover' }}
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
            alt="arrow_icon"
          />
        </div>
      </section>

      {/* 텍스트 입력 영역 */}
      {/* 텍스트 입력 영역 */}
      <section className="flex h-full w-full flex-col justify-between">
        <div className="flex flex-col gap-[13px]">
          {Array.from({ length: stepInputsCount[imageStep] }).map(
            (_, inputIdx) => (
              <InputTextField
                key={inputIdx}
                label={`본문 ${inputIdx + 1}`}
                placeholder={`문구 ${inputIdx + 1}`}
                value={inputs[imageStep][inputIdx]}
                onChange={(e) =>
                  handleChange(imageStep, inputIdx, e.target.value)
                }
              />
            ),
          )}
        </div>

        {/* 마지막 step에서만 다음 버튼 */}
        {imageStep === 4 && (
          <button className="bg-primary text-text-inverse w-full rounded-xl py-[13px]">
            다음
          </button>
        )}
      </section>
    </div>
  );
}
