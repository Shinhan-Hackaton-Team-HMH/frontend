import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import Image from 'next/image';
import InputTextField from '@/components/common/textfield';
import { IMAGETEMPLATESUBMIT } from '@/app/plan/page';
import useUserStore from '@/store/useUserStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface TemplateDetail {
  imageList: (File | string)[];
  templateList: IMAGETEMPLATESUBMIT[];
  setTemplateList: Dispatch<SetStateAction<IMAGETEMPLATESUBMIT[]>>;
  phraseList: string[]; // 초기값 또는 필요시 사용
  templateNo: number;
}

export default function TemplateOne({
  imageList,
  phraseList,
  templateList,
  setTemplateList,
  templateNo,
}: TemplateDetail) {
  const textLimits = [
    8, 15, 6, 6, 6, 6, 6, 6, 9, 6, 20, 6, 18, 10, 8, 10, 8, 10, 8, 8, 12, 5, 20,
    8, 9, 9, 10, 10, 6, 20, 20,
  ];

  // templateNo별로 slice 범위 지정
  const templateRanges: Record<number, [number, number]> = {
    1: [0, 11], // 0 ~ 10
    2: [11, 23], // 11 ~ 22
    3: [23, 33], // 23 ~ 32
  };
  const stepInputsCount = useMemo(
    () =>
      templateNo == 1
        ? [2, 2, 2, 2, 3]
        : templateNo == 2
          ? [2, 2, 3, 3, 2]
          : [2, 2, 1, 2, 3],
    [templateNo],
  );

  const templateTextLimits = useMemo(() => {
    const [start, end] = templateRanges[templateNo] || [0, 0];
    const sliced = textLimits.slice(start, end);
    let idx = 0;
    return stepInputsCount.map((count) => {
      const group = sliced.slice(idx, idx + count);
      idx += count;
      return group;
    });
  }, [templateNo, stepInputsCount]);

  const [imageStep, setImageStep] = useState(0);

  const userId = useUserStore((state) => state.userId);

  // step별 input 개수 정의

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
  const formattedImageList = imageList.map((value) => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    return value;
  });

  const handleNextStep = () => {
    const currentInputs = inputs[imageStep]; // 현재 step의 입력값 배열

    const submitData: IMAGETEMPLATESUBMIT = {
      imageTemplate: imageStep,
      imgUrl: formattedImageList[imageStep],
      text1: currentInputs[0] ?? '',
    };

    // text2, text3이 존재할 때만 추가
    if (currentInputs[1]) {
      submitData.text2 = currentInputs[1];
    }
    if (currentInputs[2]) {
      submitData.text3 = currentInputs[2];
    }

    setTemplateList((prev) => {
      const newList = [...prev];
      newList[imageStep] = submitData; // 특정 index에 값 덮어쓰기
      return newList;
    });

    if (imageStep < 4) setImageStep((prev) => prev + 1);
  };

  const router = useRouter();

  const handleFinalSubmit = async () => {
    try {
      const response = await axios.post(
        `/proxy/api/template/image/text/${templateNo}/${userId}`,
        templateList,
      );

      // REVIEW_APPROVED
      const res = await axios.post(
        `/proxy/api/temporary/storage/${userId}/${'REVIEW_APPROVED'}`,
      );
      router.push('/');
      console.log('final request', templateList, response);
    } catch {
      console.log('err in making video');
    }
  };

  const handlePreviousStep = () => {
    if (imageStep > 0) setImageStep(imageStep - 1);
  };

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
            src={formattedImageList[imageStep]}
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
                maxLength={templateTextLimits[imageStep][inputIdx]}
              />
            ),
          )}
        </div>

        {/* 마지막 step에서만 다음 버튼 */}
        {imageStep === 4 && (
          <button
            className="bg-primary text-text-inverse w-full rounded-xl py-[13px]"
            onClick={handleFinalSubmit}
          >
            다음
          </button>
        )}
      </section>
    </div>
  );
}
