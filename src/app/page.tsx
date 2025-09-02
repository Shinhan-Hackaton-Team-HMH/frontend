'use client';
import React, { useEffect, useRef, useState } from 'react';
import { video } from 'framer-motion/client';
import { QRCodeCanvas } from 'qrcode.react';
// import axios, { AxiosProgressEvent } from 'axios';

import NaverImageSearch from '@/components/naver/naverSearch/index';
import Link from 'next/link';
import ImageCropper from '@/components/cropper';
import DeviceItem from '@/components/deviceItems/items';

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageList, setImageList] = useState<File[]>([]);

  const videos = [
    {
      url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/AIVIDEOAPI.mp4',
      text: 'merge 111111',
    },
    {
      url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/vidu-video-2915272097231915.mp4',
      text: 'merge 2222222',
    },
    {
      url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/vidu-video-2916927198884254.mp4',
      text: 'merge 3333333',
    },
    {
      url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/AIVIDEOAPI.mp4',
      text: 'merge 444444',
    },
    {
      url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/vidu-video-2915272097231915.mp4',
      text: 'merge 5555555',
    },
    {
      url: 'https://sceokvekldkqtdriqqpo.supabase.co/storage/v1/object/public/videos/vidu-video-2916927198884254.mp4',
      text: 'merge 6666666',
    },
  ];

  // 파일 업로드
  // videos.forEach((v) => {
  //   if (v.file) formData.append('files', v.file);
  // });

  // // URL 배열 (파일 대신 URL일 경우)
  // formData.append('urls', JSON.stringify(videos.map((v) => v.url || '')));

  // // 텍스트 배열
  // formData.append('texts', JSON.stringify(videos.map((v) => v.text)));

  // const handleMerge = async () => {
  //   const res = await fetch('/api/ffmpeg/editor', {
  //     method: 'POST',
  //     body: formData,
  //   });
  //   // 응답을 blob으로 변환
  //   const blob = await res.blob();
  //   setVideoBlob(blob);

  //   const finalResult = new File([blob], 'merged_video.mp4', {
  //     type: 'video/mp4',
  //   });
  //   setVideoFile(finalResult);

  //   // 브라우저에서 사용 가능한 Object URL 생성
  //   const url = URL.createObjectURL(blob);
  //   setVideoUrl(url);
  //   // const response = await res.json();
  //   console.log(res);
  // };

  // const handleProcessVideo = async () => {
  //   const formData = new FormData();
  //   formData.append('files', myFile); // 업로드 파일
  //   formData.append('texts', JSON.stringify(['첫번째 영상 텍스트']));

  //   const res = await fetch('/api/ffmpeg/editor', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   // 응답을 blob으로 변환
  //   const blob = await res.blob();

  //   // 브라우저에서 사용 가능한 Object URL 생성
  //   const url = URL.createObjectURL(blob);
  //   setVideoUrl(url);
  // };

  // const handleDownload = () => {
  //   if (!videoUrl) return;
  //   const link = document.createElement('a');
  //   link.href = videoUrl;
  //   link.download = 'final.mp4';
  //   link.click();
  // };

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [pngUrl, setPngUrl] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const aRef = useRef(null);
  useEffect(() => {
    if (canvas && canvas.current) {
      if (canvas.current instanceof HTMLCanvasElement) {
        setPngUrl(
          canvas.current
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream'),
        );
      }
    }
  }, []);
  return (
    <div>
      <Link href={'baemin://14100204'}>배민이동</Link>
      {/* <DetectionVideo /> */}

      <NaverImageSearch />
      <QRCodeCanvas
        ref={canvas}
        className="hidden"
        id={'qr-code-download'}
        value={`https://naver.me/G2EoxE4j`}
      />
      <a href={pngUrl} download={'qr.png'} className="px-3 py-3" ref={aRef}>
        QR 코드 저장
      </a>
      {/* <ImageCropper imageSrc={''} setImageList={setImageList} /> */}
      {uploadStatus && <p>{uploadStatus}</p>}
      <div className="h-[222px] w-[540px]"></div>
    </div>
  );
}
