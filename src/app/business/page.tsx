'use client';

import Image from 'next/image';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Dot, X } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BusinessConfirmModal from '@/components/modal/businessConfirm';
import BusinessUploadModal from '@/components/modal/businessUpload';
import InputTextField from '@/components/common/textfield';
import useUserStore from '@/store/useUserStore';
import { useBusinessStore } from '@/store/useBusinessStore';
import { BusinessInfo } from '@/types/business/type';

interface UploadResponse {
  message: string;
  data: BusinessInfo;
}

interface RegisterStatus {
  status: 'NOTHING' | 'FILE' | 'UPLOADED' | 'PENDING' | 'APPLIED' | 'SUBMITTED';
}

export default function BussinessRegisterPage() {
  const [valid, setValid] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  // const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userId = useUserStore((state) => state.userId);

  const biz_id = useBusinessStore((state) => state.biz_id);
  const biz_name = useBusinessStore((state) => state.biz_name);
  const owner_name = useBusinessStore((state) => state.owner_name);
  const biz_number = useBusinessStore((state) => state.biz_number);
  const biz_type = useBusinessStore((state) => state.biz_type);
  const biz_subtype = useBusinessStore((state) => state.biz_subtype);
  const address = useBusinessStore((state) => state.address);
  const setBusinessInfo = useBusinessStore((state) => state.setBusinessInfo);
  const clearBusinessInfo = useBusinessStore(
    (state) => state.clearBusinessInfo,
  );
  const businessInfo: BusinessInfo = {
    biz_id,
    biz_name,
    owner_name,
    biz_number,
    biz_type,
    biz_subtype,
    address,
  };

  const [registerStatus, setRegisterStatus] = useState<RegisterStatus>({
    status: 'NOTHING',
  });

  const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setError('Only PNG, JPG, and PDF files are allowed.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setFileName(file.name);
        setFile(file);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setFileName(file.name.split('.')[0]);
        setFileType(file.name.split('.')[1]);
        setFile(file);
        setValid(true);
        setRegisterStatus({ status: 'FILE' });
      } else {
        alert('PNG, JPG, PDF 파일만 업로드 가능합니다.');
        setValid(false);
      }
    }
  };
  const router = useRouter();
  const handlePrevious = () => {
    router.back();
  };

  const handleUpload = async () => {
    setRegisterStatus({ status: 'UPLOADED' });
    if (!file) {
      alert('파일을 업로드 해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post<UploadResponse>(
        `/proxy/api/upload/image/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('파일 업로드 성공:', response);
      await delay(2000);
      setRegisterStatus({ status: 'APPLIED' });
      setBusinessInfo(response.data.data);

      setFile(null);
      setValid(false);
      setFileName(null);
      setFileType(null);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  const handleSubmit = async () => {
    if (!businessInfo) return;
    const { biz_id, ...restOfInfo } = businessInfo;
    console.log(biz_id, restOfInfo);
    try {
      const response = await axios.patch(
        `/proxy/api/upload/businesses/${biz_id}`,
        restOfInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            userId: userId,
          },
        },
      );
      console.log('파일 업로드 성공:', response);
      setRegisterStatus({ status: 'SUBMITTED' });
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setBusinessInfo((info) => {
    //   if (!info) return null;
    //   return {
    //     ...info,
    //     [name]: value,
    //   };
    // });
    setBusinessInfo({
      ...businessInfo,
      [name]: value,
    });
  };

  const handleFileReset = () => {
    setFile(null);
    setValid(false);
    setFileName(null);
    setFileType(null);
    clearBusinessInfo();
    setRegisterStatus({ status: 'NOTHING' });
  };

  return (
    <div className="relative">
      <div className="container flex flex-col items-center justify-center">
        <div className="shadow-section mb-28 w-full rounded-[20px] p-[60px] pt-0">
          <div className="text-BodyMD text-text-normal relative mt-3 flex w-full flex-row items-center justify-between text-center">
            <ArrowLeft
              onClick={handlePrevious}
              className="text-icon-normal m-1 size-6"
            />
            사업자등록증 제출하기
            <div className="flex flex-row gap-2">
              <Dot
                className={`bg-primary size-2.5 rounded-full text-transparent ${
                  registerStatus.status === 'NOTHING' &&
                  'shadow-[0_0_10px_0_rgba(92,255,241,0.70)] outline-1 outline-[#96AAFF]'
                }`}
              />
              <Dot
                className={twMerge(
                  'bg-primary size-2.5 rounded-full text-transparent',
                  `${
                    registerStatus.status === 'FILE' &&
                    'shadow-[0_0_10px_0_rgba(92,255,241,0.70)] outline-1 outline-[#96AAFF]'
                  }`,
                  `${registerStatus.status === 'NOTHING' && 'bg-inactive'}`,
                )}
              />
              <Dot
                className={`bg-inactive size-2.5 rounded-full text-transparent ${
                  (registerStatus.status === 'APPLIED' ||
                    registerStatus.status === 'SUBMITTED') &&
                  'bg-primary shadow-[0_0_10px_0_rgba(92,255,241,0.70)] outline-1 outline-[#96AAFF]'
                }`}
              />
            </div>
          </div>
          <section className="justify-starts mt-5 flex w-full flex-col gap-3">
            <div className="text-Headline text-text-normal">
              광고집행을 위해 <br />
              사업자등록증 제출이 필요해요.
            </div>
            <div className="text-BodySM text-text-assistive">
              제출하신 사업자 등록증은 광고 집행 목적으로만 사용돼요.
            </div>
          </section>
          <section className="mt-6 flex w-full flex-row gap-6">
            <div className="bg-primary-lighten flex h-[398px] w-1/2 flex-col items-center justify-center gap-6.5 rounded-xl py-6">
              <Image
                src="businessModal/businessRegister_example.svg"
                alt={'bussiness-example'}
                width={200}
                height={250}
              />
              <div className="text-BodyMD bg-primary w-[273px] rounded-xl px-4 py-3 text-center text-white">
                화질이 좋지 않거나, 정보가 가려져 있으면 승인이 반려될 수 있어요
              </div>
            </div>
            {(registerStatus.status === 'APPLIED' ||
              registerStatus.status === 'SUBMITTED') &&
            businessInfo ? (
              <div className="flex w-1/2 flex-col gap-6">
                <InputTextField
                  label="사업자명"
                  value={businessInfo.biz_name || ''}
                  onChange={handleInputChange}
                  name="biz_name"
                  placeholder="사업자명"
                />
                <InputTextField
                  label="대표자명"
                  value={businessInfo.owner_name || ''}
                  onChange={handleInputChange}
                  name="owner_name"
                  placeholder="대표자명"
                />
                <InputTextField
                  label="사업자등록번호"
                  value={businessInfo.biz_number || ''}
                  onChange={handleInputChange}
                  name="biz_number"
                  placeholder="사업자등록번호"
                />
                <div className="flex w-full flex-row gap-2">
                  {/* <div className="flex flex-col gap-2">
                    <div className="text-TitleSM text-text-normal">
                      업종대분류
                    </div>
                    <div> {businessInfo.biz_type || '해당없음'}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-TitleSM text-text-normal">
                      업종소분류
                    </div>
                    <div>{businessInfo.biz_subtype || '해당없음'}</div>
                  </div> */}
                  <InputTextField
                    label="업종대분류"
                    value={businessInfo.biz_type || ''}
                    onChange={handleInputChange}
                    name="biz_type"
                    placeholder="업종대분류"
                  />
                  <InputTextField
                    label="업종소분류"
                    value={businessInfo.biz_subtype || ''}
                    onChange={handleInputChange}
                    name="biz_subtype"
                    placeholder="업종소분류"
                  />
                </div>
                <InputTextField
                  label="주소지"
                  value={businessInfo.address || ''}
                  onChange={handleInputChange}
                  name="address"
                  placeholder="주소지"
                />
                <div className="flex flex-row gap-2">
                  <button
                    className="text-ButtonMD bg-normal-assistive border-line-assistive text-text-normal w-full rounded-xl border px-6 py-[13px]"
                    onClick={handleFileReset}
                  >
                    재업로드
                  </button>
                  <button
                    className="text-ButtonMD text-text-inverse bg-primary w-full rounded-xl px-6 py-[13px]"
                    onClick={handleSubmit}
                  >
                    확인
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-BodySM text-text-normal flex w-1/2 flex-col justify-between gap-6">
                <div className="bg-primary-lighten rounded-xl p-6">
                  <div
                    className="input-focus flex h-[234px] flex-col items-center justify-between rounded-lg p-8"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {file && registerStatus.status === 'FILE' ? (
                      <>
                        <div className="bg-normal-assistive relative flex size-[120px] flex-col items-center justify-center gap-2 rounded-xl px-[11px] pt-4 pb-2">
                          <div className="text-BodyMD border-line-assistive bg-normal-inverse flex h-[72px] w-14 items-center justify-center rounded-lg border text-black">
                            {fileType?.toUpperCase()}
                          </div>
                          <X
                            className="absolute top-0 right-0 size-6 p-1"
                            onClick={handleFileReset}
                          />
                          <div className="flex w-full flex-row justify-center">
                            <span className="truncate">{fileName}</span>
                            <span>{`.${fileType}`}</span>
                          </div>
                        </div>
                        <label
                          className="text-BodyMD border-line-normal items-center rounded-[120px] border px-6 py-2"
                          htmlFor="input-file"
                        >
                          파일 선택하기
                        </label>
                        <input
                          type="file"
                          id="input-file"
                          className="hidden"
                          // placeholder="파일 선택하기"
                          onChange={handleFileInput}
                        ></input>
                      </>
                    ) : (
                      <>
                        <Image
                          src={'/businessModal/pdf_uploader.svg'}
                          alt={'pdf-uploader'}
                          className="overflow-visible p-2"
                          width={68}
                          height={68}
                        />
                        <div>첨부 파일을 마우스로 끌어서 올려주세요. </div>
                        <div className="text-Caption">또는</div>
                        <label
                          className="text-BodyMD border-line-normal items-center rounded-[120px] border px-6 py-2"
                          htmlFor="input-file"
                        >
                          파일 선택하기
                        </label>
                        <input
                          type="file"
                          id="input-file"
                          className="hidden"
                          // placeholder="파일 선택하기"
                          onChange={handleFileInput}
                        ></input>
                      </>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    PDF, JPG, PNG 형식의 파일만 업로드 가능해요.
                  </div>
                </div>
                <button
                  className={twMerge(
                    `text-ButtonMD w-full rounded-xl px-6 py-[13px] text-center`,
                    valid
                      ? 'bg-primary text-white'
                      : 'text-text-assistive bg-inactive',
                  )}
                  disabled={!valid}
                  onClick={handleUpload}
                >
                  제출하기
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
      {registerStatus.status === 'UPLOADED' && <BusinessUploadModal />}
      {registerStatus.status === 'SUBMITTED' && <BusinessConfirmModal />}
    </div>
  );
}
