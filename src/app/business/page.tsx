'use client';

import Image from 'next/image';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Dot, X } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BusinessConfirmModal from '@/components/modal/businessConfirm';
import BusinessUploadModal from '@/components/modal/businessUpload';
import InputTextField from '@/components/common/textfield';
import useUserStore from '@/store/useUserStore';

interface BusinessInfo {
  biz_id: number;
  biz_number: string;
  biz_name: string;
  owner_name: string;
  address: string;
  biz_type: string;
  biz_subtype: string;
}

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
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userId = useUserStore((state) => state.userId);

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

  const [registerStatus, setRegisterStatus] = useState<RegisterStatus>({
    status: 'NOTHING',
  });

  const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
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
      setRegisterStatus({ status: 'SUBMITTED' });
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessInfo((info) => {
      if (!info) return null;
      return {
        ...info,
        [name]: value,
      };
    });
  };

  const handleFileReset = () => {
    setFile(null);
    setValid(false);
    setFileName(null);
    setFileType(null);
    setBusinessInfo(null);
    setRegisterStatus({ status: 'NOTHING' });
  };

  return (
    <div className="relative">
      <div className="flex flex-col container justify-center items-center">
        <Header />
        <div className="flex flex-row py-3 relative w-full text-center justify-between items-center text-BodyMD text-text-normal">
          <ArrowLeft
            onClick={handlePrevious}
            className="size-6 m-1 text-icon-normal"
          />
          사업자등록증 제출하기
          <div className="flex flex-row gap-2">
            <Dot
              className={`size-2.5 bg-primary rounded-full text-transparent  ${
                registerStatus.status === 'NOTHING' &&
                ' outline-1 outline-[#96AAFF] shadow-[0_0_10px_0_rgba(92,255,241,0.70)]'
              }`}
            />
            <Dot
              className={twMerge(
                'size-2.5 rounded-full text-transparent bg-primary',
                `${
                  registerStatus.status === 'FILE' &&
                  'outline-1 outline-[#96AAFF] shadow-[0_0_10px_0_rgba(92,255,241,0.70)]'
                }`,
                `${registerStatus.status === 'NOTHING' && 'bg-inactive'}`,
              )}
            />
            <Dot
              className={`size-2.5 bg-inactive text-transparent rounded-full ${
                (registerStatus.status === 'APPLIED' ||
                  registerStatus.status === 'SUBMITTED') &&
                'bg-primary outline-1 outline-[#96AAFF] shadow-[0_0_10px_0_rgba(92,255,241,0.70)]'
              }`}
            />
          </div>
        </div>
        <div className="p-[60px] shadow-section rounded-[20px] w-full  mb-28">
          <section className="flex flex-col w-full justify-starts gap-3">
            <div className="text-Headline text-text-normal">
              광고집행을 위해 <br />
              사업자등록증 제출이 필요해요.
            </div>
            <div className="text-BodySM text-text-assistive">
              제출하신 사업자 등록증은 광고 집행 목적으로만 사용돼요.
            </div>
          </section>
          <section className="flex flex-row gap-6 w-full mt-6">
            <div className="flex flex-col bg-primary-lighten rounded-xl justify-center items-center py-6 gap-6.5 w-1/2 h-[398px]">
              <Image
                src="businessModal/businessRegister_example.svg"
                alt={'bussiness-example'}
                width={200}
                height={250}
              />
              <div className="text-BodyMD text-white bg-primary px-4 py-3 rounded-xl w-[273px] text-center">
                화질이 좋지 않거나, 정보가 가려져 있으면 승인이 반려될 수 있어요
              </div>
            </div>
            {(registerStatus.status === 'APPLIED' ||
              registerStatus.status === 'SUBMITTED') &&
            businessInfo ? (
              <div className="flex flex-col gap-6 w-1/2">
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
                <div className="flex flex-row gap-2 w-full">
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
                    className="w-full text-ButtonMD bg-normal-assistive border border-line-assistive text-text-normal py-[13px] px-6 rounded-xl"
                    onClick={handleFileReset}
                  >
                    재업로드
                  </button>
                  <button
                    className="w-full text-ButtonMD text-text-inverse bg-primary py-[13px] px-6 rounded-xl"
                    onClick={handleSubmit}
                  >
                    확인
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 text-BodySM text-text-normal justify-between w-1/2">
                <div className=" p-6 bg-primary-lighten rounded-xl">
                  <div
                    className="flex flex-col p-8 justify-between items-center h-[234px] input-focus rounded-lg"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {file && registerStatus.status === 'FILE' ? (
                      <>
                        <div className="size-[120px] px-[11px] pt-4 pb-2 flex flex-col justify-center items-center gap-2 relative bg-normal-assistive rounded-xl">
                          <div className="flex justify-center items-center text-BodyMD text-black border border-line-assistive bg-normal-inverse rounded-lg w-14 h-[72px] ">
                            {fileType?.toUpperCase()}
                          </div>
                          <X
                            className="size-6 absolute top-0 right-0 p-1"
                            onClick={handleFileReset}
                          />
                          <div className="w-full flex flex-row justify-center">
                            <span className="truncate">{fileName}</span>
                            <span>{`.${fileType}`}</span>
                          </div>
                        </div>
                        <label
                          className="text-BodyMD border border-line-normal rounded-[120px] py-2 px-6 items-center"
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
                          className="text-BodyMD border border-line-normal rounded-[120px] py-2 px-6 items-center"
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
                  <div className="text-center mt-6">
                    PDF, JPG, PNG 형식의 파일만 업로드 가능해요.
                  </div>
                </div>
                <button
                  className={twMerge(
                    ` text-ButtonMD rounded-xl w-full px-6 text-center py-[13px]`,
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
