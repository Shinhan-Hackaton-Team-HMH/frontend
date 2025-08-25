'use client';
import React, { useState, useEffect } from 'react';
import axios, { AxiosProgressEvent } from 'axios';

import CrawlingNaver from '@/app/components/naverCrawl';
import NaverImageSearch from '@/app/components/naverSearch/index';
import Link from 'next/link';
import ImageCropper from '@/components/cropper';

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageList, setImageList] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadStatus(''); // 파일 선택 시 상태 초기화
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      setIsUploading(true);
      setUploadStatus('업로드 중...');
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (!isUploading || !selectedFile) return;

      const formData = new FormData();
      formData.append('files', selectedFile);
      formData.append('files', selectedFile);
      formData.append('files', selectedFile);
      formData.append('files', selectedFile);
      try {
        const response = await axios.post(
          '/proxy/auth/post/test/multiple',
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data; boundary=<calculated when request is sent>',
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setUploadStatus(`업로드 진행률: ${percentCompleted}%`);
              }
            },
          },
        );
        console.log('업로드 성공:', response.data);
        setUploadStatus('✅ 업로드 성공!');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('업로드 실패:', error.message);
          setUploadStatus(`❌ 업로드 실패: ${error.message}`);
        } else {
          console.error('예상치 못한 오류:', error);
          setUploadStatus('❌ 업로드 실패!');
        }
      } finally {
        setIsUploading(false);
        setSelectedFile(null);
      }
    };

    uploadImage();
  }, [isUploading, selectedFile]);

  return (
    <div>
      <h2>이미지 업로드 컴포넌트</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button
        onClick={handleUploadClick}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? '업로드 중...' : '업로드'}
      </button>
      <Link href={'baemin:// '}>배민이동</Link>
      {/* <DetectionVideo /> */}

      <NaverImageSearch />
      <CrawlingNaver />
      {/* <ImageCropper imageSrc={''} setImageList={setImageList} /> */}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
