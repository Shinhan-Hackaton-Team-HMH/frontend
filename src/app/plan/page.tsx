'use client';
import Stepper from '@/components/common/stepper';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import { CrawlResponseTypes } from '@/app/api/naver/crawl/route';
import useCrawledDataStore from '@/store/useCrawledDataStore';
import Image from 'next/image';
import ImageCard from '@/components/common/imageCard';
import { useVideoTemplateStore } from '@/store/usePhraseStore';
import useImageStore from '@/store/useImageStore';
import VideoExpand from '@/components/templateVideo';
import ImageErrorModal from '@/components/modal/image/error';
import TemplateOne from '@/components/templates/template1';
import Loading from '@/components/common/loading';
import { useBusinessStore } from '@/store/useBusinessStore';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/useUserStore';
import ImageManageModal from '@/components/modal/image/manage';

interface IMAGES3URL {
  immageTemplate: number;
  imgUrl: string;
}

export interface IMAGETEMPLATESUBMIT {
  imageTemplate: number;
  imgUrl: string;
  text1: string;
  text2?: string;
  text3?: string;
}

export default function PlanPage() {
  const [urlError, setUrlError] = useState(false);
  const [step, setStep] = useState(0);

  //선택된 이미지
  const [imageModal, setImageModal] = useState(false);
  const [imageFileList, setImageFileList] = useState<File[]>([]);
  const [imageErrorModal, setImageErrorModal] = useState(false);
  const [imageCurrent, setImageCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [templateFinalList, setTemplateFinalList] = useState<
    IMAGETEMPLATESUBMIT[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const userId = useUserStore((state) => state.userId);
  //비디오 탬플릿 선택
  const [videoTemplate, setVideoTemplate] = useState<number | null>(1);

  const phrases = useVideoTemplateStore((state) => state.phrases);
  const setPhrase = useVideoTemplateStore((state) => state.setPhrases);

  //업로드용 이미지
  const imageList = useImageStore((state) => state.images);
  const setImageList = useImageStore((state) => state.setImages);

  const naverUrl = useCrawledDataStore((state) => state.naverUrl);
  const setNaverUrl = useCrawledDataStore((state) => state.setNaverUrl);
  const searchKeyword = useCrawledDataStore((state) => state.searchKeyword);
  const setSearchKeyword = useCrawledDataStore(
    (state) => state.setSearchKeyword,
  );
  const crawledData = useCrawledDataStore((state) => state.crawledData);
  const setCrawledData = useCrawledDataStore((state) => state.setCrawledData);
  //네이버에서 가져온 이미지
  const adImages = useCrawledDataStore((state) => state.adImages);
  const setAdImages = useCrawledDataStore((state) => state.setAdImages);
  //네이버 크롤링 데이터 리셋
  const resetCrawlData = useCrawledDataStore((state) => state.resetCrawlData);

  const router = useRouter();
  const NAVER_SHORT_URL_REGEX = /^https?:\/\/naver\.me\/[A-Za-z0-9]+$/;

  const handleNaverUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNaverUrl(e.target.value);
    setUrlError(NAVER_SHORT_URL_REGEX.test(value.trim()));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step == 0) router.back();
    setStep(step - 1);
  };

  //키워드 입력
  const handleKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value);
  };

  //네이버URL 입력 및 크롤링
  const handleUrlSubmit = async () => {
    const exampleImages = [
      '/baseImage/example/image1.png',
      '/baseImage/example/image2.png',
      '/baseImage/example/image3.png',
      '/baseImage/example/image4.png',
      '/baseImage/example/image5.png',
    ];
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<CrawlResponseTypes>(
        `/api/naver/crawl?searchKeyword=${naverUrl}`,
      );
      const geminiResponse = await axios.post(
        '/api/gemini',
        response.data.hours,
      );
      setCrawledData({ ...response.data, hours: geminiResponse.data.text });
      if (response.data.images) {
        setAdImages(response.data.images);
        setImageList(response.data.images.slice(0, 5));
      }

      await generateAds();

      setAdImages(exampleImages);
      setImageList(exampleImages);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      // await axios.post(`/proxy/api/storage/campaign/naver/${campaignId}`, {
      //   naverPlaceUrl: naverUrl,
      //   keyword: searchKeyword,
      //   description: '',
      // });
      setIsLoading(false);
      handleNextStep();
    }
  };

  //이미지 업로드 로직
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    // const urls = fileArray.map((file) => URL.createObjectURL(file));
    setImageFileList(fileArray);
    // 기존 이미지 + 새로운 이미지 합치기, 최대 5개
    const newImages = [...imageList, ...fileArray].slice(0, 5);
    setImageList(newImages);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 5) {
      alert('over 5 images');
    } else {
      handleFiles(e.target.files);
    }
  };

  const handleStepTwo = async () => {
    if (imageList.length < 5) {
      setImageErrorModal(true);
    }
    handleNextStep();
    await handleImageSubmit();
  };

  const { biz_type } = useBusinessStore();

  const generateAds = async () => {
    try {
      const res = await axios.post('/api/gpt/phraseMaker', {
        name: crawledData?.storeName,
        url: naverUrl,
        keywords: searchKeyword,
        biz_type: biz_type,
      });
      console.log('광고 문구 JSON:', res.data);
      setPhrase(res.data.data);
      return res.data;
    } catch (error) {
      console.error('광고 생성 실패:', error);
      return null;
    }
  };

  //1단계 확인
  const stepOne_valid = naverUrl !== '' && searchKeyword !== '' && !!urlError;

  const stepTwo_valid = imageList.length >= 5 && videoTemplate;

  //미리보기용 영상 템플릿
  const videos = [
    'https://storage.googleapis.com/hackathon_hmh/sandwichTemplate.mp4',
    'https://storage.googleapis.com/hackathon_hmh/template2Video.mp4',
    'https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4',
  ];

  //이미지 URL 반환 API Submit
  const handleImageSubmit = async () => {
    const form = new FormData();
    for (const item of imageList) {
      if (item instanceof File) {
        form.append('files', item);
      } else {
        try {
          const proxyUrl = `/api/naver/imageMod?url=${encodeURIComponent(item)}`;
          const res = await fetch(proxyUrl);
          const blob = await res.blob();
          const fileName = item.split('/').pop()?.split('?')[0] ?? 'image.png';
          form.append('files', new File([blob], fileName, { type: blob.type }));
        } catch (err) {
          console.log(err);
        }
      }
    }

    const response = await axios.post<IMAGES3URL[]>(
      `/proxy/api/template/image/${videoTemplate}/${userId}`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const res = await axios.post(
      `/proxy/api/temporary/storage/${userId}/${'MEDIA_UPLOADED'}`,
    );
    const responseImgUrl = response.data.map((value) => value.imgUrl);
    console.log(responseImgUrl);
    setImageList(responseImgUrl);
  };

  console.log(imageList);

  return (
    <>
      <div className="container mt-3 mb-[165px]">
        <section className="shadow-section mb-[72px] flex w-[1192px] flex-col items-center justify-center rounded-[20px] bg-white px-[60px] pt-3 pb-[60px]">
          <Stepper
            label={'광고 송출 기기 안내'}
            step={step}
            handlePreviousStep={handlePreviousStep}
          />
          {isLoading ? (
            <Loading headLine={'광고 영상을 제작을 준비하고 있어요.'} />
          ) : (
            <>
              {step === 0 && (
                <div className="mt-6 flex w-full flex-col gap-6">
                  <div className="text-Headline text-text-normal w-full">
                    가게 정보를 입력해 주세요.
                  </div>
                  <div className="flex w-full flex-row justify-between gap-9">
                    <div className="bg-primary-lighten flex w-full flex-col gap-4 rounded-xl p-4">
                      <div>1. 네이버 홈 또는 네이버 지도에서 상호명 검색</div>
                      <div className="w-full place-items-center rounded-lg bg-white p-3">
                        <Image
                          src={'/naver/naver_searchBar.png'}
                          alt={'naver-search'}
                          width={345}
                          height={298}
                        />
                      </div>
                      <div>2. 공유하기 버튼 클릭 후 링크 복사</div>
                      <div className="relative place-items-center rounded-lg bg-white px-3 py-5">
                        <Image
                          src={'/naver/naver_menu.png'}
                          alt={'naver-menu'}
                          width={345}
                          height={36}
                        />
                        <div className="absolute top-3 right-[57px] h-[70px] w-[79px] rounded-[8px] shadow-[-7px_6px_20px_0_rgba(104,70,244,0.2)]">
                          <Image
                            src="/naver/v.svg"
                            alt="share_icon"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        3. 복사한 링크 마우스 우클릭 또는 Ctrl+V 로 입력창에
                        붙여넣기
                      </div>
                    </div>
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex flex-col gap-6">
                        <div className="text-TitleMD text-text-normal">
                          네이버 지도에 있는 링크를 붙여넣어 주세요.
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <input
                            type="text"
                            onChange={handleNaverUrlChange}
                            className="bg-normal-assistive w-full rounded-xl px-6 py-3.5"
                            placeholder="예시)https://naver.me/FpxBwCPl"
                          />
                          <span className={'text-text-assistive text-Caption'}>
                            URL형식으로 입력해 주세요.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                          <div className="text-TitleMD text-text-normal">
                            광고 영상에서 강조하고 싶은 가게 키워드를
                            알려주세요.
                          </div>
                          <div className="text-BodyMD text-text-assistive">
                            광고 영상에서 나올 문구
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <input
                            type="text"
                            className="bg-normal-assistive w-full rounded-xl px-6 py-3.5 ring-0"
                            onChange={handleKeyWordChange}
                            placeholder="예시)한정식, 연희동 맛집, 고급스러운 분위기"
                          />
                          <span className="text-Caption text-text-assistive">
                            키워드는 최대 5개까지 입력 가능해요.
                          </span>
                        </div>
                      </div>
                      <button
                        className={twMerge(
                          'mt-[60px] w-full rounded-xl py-[13px]',
                          `${
                            stepOne_valid
                              ? 'bg-primary text-text-inverse'
                              : 'bg-inactive text-text-assistive'
                          }`,
                        )}
                        disabled={!stepOne_valid}
                        onClick={handleUrlSubmit}
                      >
                        다음
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="mt-6 flex w-full flex-col gap-6">
                  <div className="text-Headline text-text-normal w-full">
                    광고 스타일을 선택해 주세요.
                  </div>
                  <div className="flex h-full w-full flex-row justify-between gap-9">
                    <div className="relative flex h-[644px] w-full flex-col gap-6">
                      <div className="text-TitleMD text-text-normal flex h-full">
                        바로광고에서 제공되는 영상 템플릿이에요.
                      </div>
                      <div className="grid h-full grid-cols-2 gap-2.5">
                        {videos.map((value, index) => {
                          return (
                            <VideoExpand
                              src={value}
                              key={index}
                              index={index + 1}
                              selectedTemplate={videoTemplate}
                              setSelectTemplate={setVideoTemplate}
                            />
                          );
                        })}
                        <div className="relative">
                          <Image
                            src={'/baseImage/image21.png'}
                            alt={''}
                            fill
                            className={twMerge(
                              'h-[292px] w-full rounded-lg object-cover',
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative flex h-[644px] w-full flex-col justify-between">
                      <div className="flex h-full flex-col gap-6">
                        <div className="flex flex-col gap-3">
                          <div className="text-TitleMD text-text-normal">
                            광고에 사용될 이미지를 확인해 주세요.
                          </div>
                          <span className={'text-text-assistive text-BodyMD'}>
                            입력하신 네이버 링크에서 선별한 사진을 가져왔어요.
                          </span>
                        </div>
                        <div className="grid w-full grid-cols-3 gap-1">
                          {imageList.map((value, index) => (
                            <ImageCard
                              key={index}
                              imgSrc={value}
                              index={index}
                              selectedId={imageCurrent}
                              setSelect={setImageCurrent}
                              imageList={imageList}
                              setImageList={setImageList}
                              setModal={setImageModal}
                              isSorting={false}
                            />
                          ))}
                          {imageList.length < 5 && (
                            <div
                              className={twMerge(
                                'border-line-assistive flex h-[227px] w-full flex-col items-center justify-center gap-[17px] rounded-xl border transition-colors',
                                isDragging &&
                                  'border-primary bg-primary-lighten/20 cursor-copy',
                                imageList.length >= 5 &&
                                  'cursor-not-allowed opacity-50',
                              )}
                              onClick={handleClick}
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                            >
                              <span>사진 추가하기</span>
                              <Image
                                src={'/icon/add.svg'}
                                alt={'add_icon'}
                                width={24}
                                height={24}
                              />
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                ref={inputRef}
                                onChange={handleImageChange}
                                disabled={imageList.length >= 5}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        className={twMerge(
                          'bg-inactive text-text-assistive w-full rounded-xl py-[13px]',
                          `${
                            stepTwo_valid
                              ? 'bg-primary text-text-inverse'
                              : 'bg-inactive text-text-assistive'
                          }`,
                        )}
                        onClick={handleStepTwo}
                      >
                        다음
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="mt-6 flex w-full flex-col gap-6">
                  <div className="text-Headline text-text-normal w-full">
                    광고 영상 내용을 확인해 주세요.
                  </div>
                  <div className="flex flex-row gap-9">
                    <section className="flex w-full flex-row items-center justify-center gap-[63px] px-4">
                      {videoTemplate == 1 && (
                        <TemplateOne
                          templateList={templateFinalList}
                          setTemplateList={setTemplateFinalList}
                          imageList={imageList}
                          phraseList={phrases}
                          templateNo={videoTemplate}
                        />
                      )}
                      {videoTemplate == 2 && (
                        <TemplateOne
                          templateList={templateFinalList}
                          setTemplateList={setTemplateFinalList}
                          imageList={imageList}
                          phraseList={phrases}
                          templateNo={videoTemplate}
                        />
                      )}
                      {videoTemplate == 3 && (
                        <TemplateOne
                          templateList={templateFinalList}
                          setTemplateList={setTemplateFinalList}
                          imageList={imageList}
                          phraseList={phrases}
                          templateNo={videoTemplate}
                        />
                      )}
                      {videoTemplate == 4 && (
                        <TemplateOne
                          templateList={templateFinalList}
                          setTemplateList={setTemplateFinalList}
                          imageList={imageList}
                          phraseList={phrases}
                          templateNo={videoTemplate}
                        />
                      )}
                    </section>
                    <section className="flex flex-col"></section>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
      {imageModal && (
        <ImageManageModal
          imageData={imageList}
          setImages={setImageList}
          setImageModal={setImageModal}
        />
      )}
      {imageErrorModal && (
        <ImageErrorModal setImageErrorModal={setImageErrorModal} />
      )}
    </>
  );
}
