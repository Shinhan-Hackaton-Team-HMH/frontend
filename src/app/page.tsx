// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { video } from 'framer-motion/client';
// import { QRCodeCanvas } from 'qrcode.react';
// // import axios, { AxiosProgressEvent } from 'axios';

// import NaverImageSearch from '@/components/naver/naverSearch/index';
// import Link from 'next/link';
// import ImageCropper from '@/components/cropper';
// import DeviceItem from '@/components/deviceItems/items';

// export default function App() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const [uploadStatus, setUploadStatus] = useState<string>('');
//   const [selectedImage, setSelectedImage] = useState<string>('');
//   const [imageList, setImageList] = useState<File[]>([]);

//   const videos = [
//     {
//       url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/AIVIDEOAPI.mp4',
//       text: 'merge 111111',
//     },
//     {
//       url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/vidu-video-2915272097231915.mp4',
//       text: 'merge 2222222',
//     },
//     {
//       url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/vidu-video-2916927198884254.mp4',
//       text: 'merge 3333333',
//     },
//     {
//       url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/AIVIDEOAPI.mp4',
//       text: 'merge 444444',
//     },
//     {
//       url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/vidu-video-2915272097231915.mp4',
//       text: 'merge 5555555',
//     },
//     {
//       url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/vidu-video-2916927198884254.mp4',
//       text: 'merge 6666666',
//     },
//   ];

//   // 파일 업로드
//   // videos.forEach((v) => {
//   //   if (v.file) formData.append('files', v.file);
//   // });

//   // // URL 배열 (파일 대신 URL일 경우)
//   // formData.append('urls', JSON.stringify(videos.map((v) => v.url || '')));

//   // // 텍스트 배열
//   // formData.append('texts', JSON.stringify(videos.map((v) => v.text)));

//   // const handleMerge = async () => {
//   //   const res = await fetch('/api/ffmpeg/editor', {
//   //     method: 'POST',
//   //     body: formData,
//   //   });
//   //   // 응답을 blob으로 변환
//   //   const blob = await res.blob();
//   //   setVideoBlob(blob);

//   //   const finalResult = new File([blob], 'merged_video.mp4', {
//   //     type: 'video/mp4',
//   //   });
//   //   setVideoFile(finalResult);

//   //   // 브라우저에서 사용 가능한 Object URL 생성
//   //   const url = URL.createObjectURL(blob);
//   //   setVideoUrl(url);
//   //   // const response = await res.json();
//   //   console.log(res);
//   // };

//   // const handleProcessVideo = async () => {
//   //   const formData = new FormData();
//   //   formData.append('files', myFile); // 업로드 파일
//   //   formData.append('texts', JSON.stringify(['첫번째 영상 텍스트']));

//   //   const res = await fetch('/api/ffmpeg/editor', {
//   //     method: 'POST',
//   //     body: formData,
//   //   });

//   //   // 응답을 blob으로 변환
//   //   const blob = await res.blob();

//   //   // 브라우저에서 사용 가능한 Object URL 생성
//   //   const url = URL.createObjectURL(blob);
//   //   setVideoUrl(url);
//   // };

//   // const handleDownload = () => {
//   //   if (!videoUrl) return;
//   //   const link = document.createElement('a');
//   //   link.href = videoUrl;
//   //   link.download = 'final.mp4';
//   //   link.click();
//   // };

//   const canvas = useRef<HTMLCanvasElement | null>(null);
//   const [pngUrl, setPngUrl] = useState('');
//   const [isEdit, setIsEdit] = useState(false);
//   const aRef = useRef(null);
//   useEffect(() => {
//     if (canvas && canvas.current) {
//       if (canvas.current instanceof HTMLCanvasElement) {
//         setPngUrl(
//           canvas.current
//             .toDataURL('image/png')
//             .replace('image/png', 'image/octet-stream'),
//         );
//       }
//     }
//   }, []);
//   return (
//     <div>
//       <Link href={'baemin://14100204'}>배민이동</Link>
//       {/* <DetectionVideo /> */}

//       <NaverImageSearch />
//       <QRCodeCanvas
//         ref={canvas}
//         className="hidden"
//         id={'qr-code-download'}
//         value={`https://naver.me/G2EoxE4j`}
//       />
//       <a href={pngUrl} download={'qr.png'} className="px-3 py-3" ref={aRef}>
//         QR 코드 저장
//       </a>
//       {/* <ImageCropper imageSrc={''} setImageList={setImageList} /> */}
//       {uploadStatus && <p>{uploadStatus}</p>}
//       <div className="h-[222px] w-[540px]"></div>
//     </div>
//   );
// }

'use client';

import Card, { CardDetail } from '@/components/card';
import GlitchyNumber from '@/components/glitchy_text';
import MapInteraction from '@/components/map';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useUserStore from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/common/progress';
import axios from 'axios';
import { getProgressInfo, Progress } from '@/types/user/type';

export default function MainPage() {
  const [mapModal, setMapModal] = useState(false);
  const router = useRouter();

  const userId = useUserStore((state) => state.userId);
  const bizId = useUserStore((state) => state.biz_id);
  const status = useUserStore((state) => state.status);
  const updateStatus = useUserStore((state) => state.updateStatus);
  const campaignId = useUserStore((state) => state.campaignId);
  const setCampaignId = useUserStore((state) => state.setCampaignId);
  const steps: Progress[] = [
    'NOT_STARTED',
    'BUSINESS_REGISTERED',
    'CAMPAIGN_SETUP',
    'BUDGET_ALLOCATED',
    'MEDIA_UPLOADED',
    'REVIEW_APPROVED',
    'AD_BROADCAST',
  ];

  const handleRoute = () => {
    const info = getProgressInfo(status);
    if (userId !== '') {
      if (bizId) router.push(info.path);
      else router.push(info.path);
    } else router.push('/login');
  };

  useEffect(() => {
    const runStepsUpTo = async (progress: Progress) => {
      const res = await axios.get(`/proxy/api/temporary/storage/${userId}`);
      const { progressStep } = res.data;
      updateStatus(progressStep);
      return res;
    };

    const run = async () => {
      await runStepsUpTo(status);
    };
    if (userId !== '') run();
  }, [status, updateStatus, userId]);

  const cardContent: CardDetail[] = [
    {
      client: '전국 동시 광고',
      title: '광고 예산 책정 바로가기',
      small_business: false,
      handleRoute: handleRoute,
    },
    {
      client: '우리 동네 광고',
      title: '소상공인에게 추천해요',
      small_business: true,
      handleRoute: handleRoute,
    },
  ];

  return (
    <>
      <div className="container flex flex-col items-center justify-center">
        <section
          className={`relative mt-3 flex h-[468px] w-full flex-row ${mapModal ? 'gap-0' : 'gap-3'}`}
        >
          <div
            className={`rounded-[20px] bg-white transition-all duration-500 ${
              mapModal ? 'flex-1' : 'flex-1/2'
            }`}
          >
            <MapInteraction mapModal={mapModal} setMapModal={setMapModal} />
          </div>
          <div
            className={`flex h-full w-full flex-col gap-3 transition-all duration-500 ${
              mapModal
                ? 'pointer-events-none w-0 flex-0 overflow-hidden opacity-0'
                : 'flex-1/2 opacity-100'
            }`}
          >
            {bizId ? (
              <ProgressBar progress={status} />
            ) : (
              <div
                className={`shadow-section flex flex-col justify-between gap-[22px] rounded-[20px] bg-white p-6`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-text-normal text-Headline">
                    원스탑 광고 솔루션
                  </span>
                  <span className="text-text-assistive text-BodySM">
                    광고 제작부터 송출까지 한번에 KT바로광고에서 손쉽게
                    도와드려요.
                  </span>
                </div>
                <button
                  className="flew-row ring-line-assistive flex w-fit items-center gap-2 rounded-[120px] px-6 py-2.5 ring"
                  onClick={handleRoute}
                >
                  <div className="text-BodyMD text-text-normal">
                    사업자등록증 제출하기
                  </div>
                  <Image
                    src={'/icon/arrow_right.svg'}
                    alt={''}
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            )}
            <div className="grid h-full grid-cols-2 gap-2">
              {cardContent.map((value, index) => (
                <Card
                  key={index}
                  handleRoute={handleRoute}
                  client={value.client}
                  title={value.title}
                  small_business={value.small_business}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="relative mt-[23px] mb-[101px] flex w-full flex-col items-center justify-center">
          <div className="shadow-section flex w-full items-center justify-center rounded-[20px] bg-[#FFF] py-[3px]">
            <div className="flex h-[160px] w-[400px] flex-col items-center justify-center gap-5">
              <div className="text-text-strong text-TitleMD text-center">
                일일 광고 재생시간
              </div>
              <div className="text-StatsLG text-text-dark-primary">
                <GlitchyNumber target={566314} duration={1000} />
                <span className="text-TitleMD text-text-primary">시간</span>
              </div>
            </div>
            <div className="flex h-[160px] w-[400px] flex-col items-center justify-center gap-5">
              <div className="text-text-strong text-Headline text-center">
                일일 광고 재생시간
              </div>
              <div className="text-text-primary text-StatsXL">
                <GlitchyNumber target={20403097} duration={1000} />명
              </div>
            </div>
            <div className="flex h-[160px] w-[400px] flex-col items-center justify-center gap-5">
              <div className="text-text-strong text-TitleMD text-center">
                일일 광고 재생시간
              </div>
              <div className="text-StatsLG text-text-dark-primary">
                <GlitchyNumber target={13031310} duration={1000} />개
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 flex flex-row gap-[1px] rounded-full border border-gray-200 bg-white p-1">
            <div className="rounded-full bg-[#ECEEF0] px-6 py-2.5">
              실시간 광고 보기
            </div>
            <div className="px-6 py-2.5">통합 이용 가이드</div>
            <div className="px-6 py-2.5">유의사항</div>
            <div className="px-6 py-2.5">자주하는 질문</div>
            <div className="px-6 py-2.5">회원가입 안내</div>
          </div>
        </section>
      </div>
    </>
  );
}
