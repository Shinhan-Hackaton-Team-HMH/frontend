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
import HeroCards from '@/components/common/heroCard';

export default function MainPage() {
  const [mapModal, setMapModal] = useState(false);
  const router = useRouter();

  const userId = useUserStore((state) => state.userId);
  const bizId = useUserStore((state) => state.biz_id);
  const status = useUserStore((state) => state.status);
  const updateStatus = useUserStore((state) => state.updateStatus);

  const handleRoute = () => {
    const info = getProgressInfo(status);
    if (userId !== '') {
      if (bizId) router.push(info.path);
      else router.push(info.path);
    } else router.push('/login');
  };

  useEffect(() => {
    if (userId !== '') {
      const runStepsUpTo = async (progress: Progress) => {
        const res = await axios.get(`/proxy/api/temporary/storage/${userId}`);
        const { progressStep } = res.data.data;
        updateStatus(progressStep);
        console.log(progressStep, res);
        return res;
      };
      const run = async () => {
        await runStepsUpTo(status);
      };
      run();
    }
  }, [status, updateStatus, userId]);

  const cardContent: CardDetail[] = [
    {
      title: '광고 영상이 없어요',
      with_video: false,
      key_feature: [
        '소상공인 광고주에게 추천해요',
        'AI로 간편하게 광고 영상 제작',
        '엘리베이터,  버스정류장,  IPTV 광고',
      ],
      handleRoute: handleRoute,
    },
    {
      title: '광고 영상이 있어요',
      with_video: true,
      key_feature: [
        '기업 광고주에게 추천해요',
        '전국패키지와 다양한 매체 보유',
        '대형 미디어 패널 보유',
      ],
      handleRoute: handleRoute,
    },
  ];

  return (
    <>
      <div className="container flex w-full flex-col items-center justify-center px-4 sm:px-0">
        <section
          className={`relative mt-3 flex h-fit w-full flex-col sm:h-[540px] sm:flex-row ${mapModal ? 'gap-0' : 'gap-3'}`}
        >
          <div
            className={`flex h-full w-full flex-col gap-6 transition-all duration-500 ${
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
            <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-2">
              {cardContent.map((value, index) => (
                <Card
                  key={index}
                  handleRoute={handleRoute}
                  title={value.title}
                  key_feature={value.key_feature}
                  with_video={value.with_video}
                />
              ))}
            </div>
          </div>
          <div
            className={`rounded-[20px] bg-white transition-all duration-500 ${
              mapModal ? 'flex-1' : 'flex-1/2'
            }`}
          >
            <MapInteraction mapModal={mapModal} setMapModal={setMapModal} />
          </div>
        </section>
        <section className="relative mt-12 mb-20 flex w-full flex-col items-center justify-center gap-6 sm:mb-0">
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-Headline">
                국내 유일 프로그래매틱 옥외광고 플랫폼
              </span>
              <span className="text-BodyMD">
                IPTV, 디지털 옥외광고는KT바로광고에서 신청하세요!
              </span>
            </div>
            <div className="hidden flex-row items-center gap-[1px] rounded-full border border-gray-200 bg-white p-1 sm:flex">
              <div className="hover:bg-primary-lighten hover:text-primary px-6 py-2.5 hover:rounded-full">
                통합 이용 가이드
              </div>
              <div className="hover:bg-primary-lighten hover:text-primary px-6 py-2.5 hover:rounded-full">
                유의사항
              </div>
              <div className="hover:bg-primary-lighten hover:text-primary px-6 py-2.5 hover:rounded-full">
                자주하는 질문
              </div>
              <div className="hover:bg-primary-lighten hover:text-primary px-6 py-2.5 hover:rounded-full">
                회원가입 안내
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <HeroCards
              title={'일일 이용(시청)자 수'}
              count={20403097}
              unit="명"
              description={'국내 최대 도달인원,  최대의 광고효과'}
            />
            <HeroCards
              title={'일일 광고 재생시간'}
              count={566314}
              unit="시간"
              description={'이용자의 행동,동선,생활에  맞춰진 광고'}
            />
            <HeroCards
              title={'연동된 총 디스플레이 수'}
              count={13031310}
              unit="개"
              description={'IPTV부터 옥외광고 TV까지  다양한 광고 송출 기기'}
            />
          </div>
        </section>
        <section className="mt-[80px] mb-[40px] hidden w-full sm:flex">
          <div className="text-center text-[26px] leading-[32px] font-medium tracking-[-1.04px] text-[color:var(--Text-Primary,#6846F4)]">
            디지털 옥외광고 One-Stop솔루션
          </div>
        </section>
      </div>
      <div className="relative mb-[40px] hidden w-screen bg-black/30 sm:flex">
        <div className="absolute top-0 left-0 flex w-full flex-col gap-4 bg-gradient-to-b from-[rgba(104,70,244,0.60)] to-[rgba(104,70,244,0.00)] pt-10 pl-[120px]">
          <div className="text-text-inverse text-Headline">
            KT 바로광고 실시간 영상 보기
          </div>
          <button className="flew-row bg-primary flex w-fit items-center gap-2 rounded-[120px] px-6 py-2.5">
            <div className="text-BodyMD text-text-inverse">자세히보기</div>
            <Image
              src={'/icon/enter_inverse.svg'}
              alt={''}
              width={24}
              height={24}
            />
          </button>
        </div>
        <video
          src="/video/heroVideo.mp4"
          muted
          autoPlay
          className="w-screen"
        ></video>
      </div>
    </>
  );
}
