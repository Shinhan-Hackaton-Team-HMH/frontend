'use client';

import Image from 'next/image';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BussinessRegisterPage() {
  const [valid, setValid] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState(false);

  const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

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

  return (
    <div className="relative">
      <div className="flex flex-col container justify-center items-center">
        <Header />
        <div className="flex flex-row py-3 relative w-full text-center items-center justify-center text-BodyMD text-text-normal">
          <button
            onClick={handlePrevious}
            className="absolute left-0 size-6 m-1 text-icon-normal"
          >
            <ArrowLeft />
          </button>
          사업자등록증 제출하기
        </div>
        <div className="p-[60px] shadow-section rounded-[20px] w-full  mb-28">
          <section className="flex flex-col w-full justify-starts gap-3">
            <span className="text-Headline text-text-normal">
              광고집행을 위해 사업자등록증 제출이 필요해요.
            </span>
            <span className="text-BodySM text-text-assistive">
              제출하신 사업자 등록증은 광고 집행 목적으로만 사용돼요.
            </span>
          </section>
          <section className="flex flex-row gap-6 w-full mt-6">
            <div className="flex flex-col bg-primary-lighten rounded-xl justify-center items-center py-6 gap-6.5 w-1/2">
              <Image
                src={'businessRegister_example.svg'}
                alt={'bussiness-example'}
                width={200}
                height={250}
              />
              <div className="text-BodyMD text-white bg-primary px-4 py-3 rounded-xl w-[273px] text-center">
                화질이 좋지 않거나, 정보가 가려져 있으면 승인이 반려될 수 있어요
              </div>
            </div>
            <div className="flex flex-col gap-6 text-BodySM text-text-normal justify-between w-1/2">
              <div className=" p-6 bg-primary-lighten rounded-xl">
                <div
                  className="flex flex-col p-8 justify-between items-center h-[234px] input-focus rounded-lg"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <>
                      <div className="size-[120px] px-[11px] pt-4 pb-2 flex flex-col justify-center items-center gap-2 relative bg-normal-assistive rounded-xl">
                        <div className="flex justify-center items-center text-BodyMD text-black border border-line-assistive bg-normal-inverse rounded-lg w-14 h-[72px] ">
                          {fileType?.toUpperCase()}
                        </div>
                        <X className="size-6 absolute top-0 right-0 p-1" />
                        <div className="w-full flex flex-row">
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
                        src={'/pdf-uploader.svg'}
                        alt={'pdf-uploader'}
                        width={60}
                        height={60}
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
                  Pdf, Jpg, Png 형식의 파일만 업로드 가능해요.
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
                onClick={() => setModal(true)}
              >
                제출하기
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      {modal && (
        <div className="absolute top-0 left-0 w-screen h-screen z-20 bg-black/15 flex justify-center items-center">
          <section className="w-[453px] h-[374px] pt-10 pb-5.5 bg-white flex flex-col justify-around items-center rounded-[20px]">
            <div className="text-TitleMD text-black">
              사업자등록증 제출이 완료되었어요.
            </div>
            <Image
              src={'/pdf-confirm.svg'}
              alt={'modal_confirm'}
              width={80}
              height={80}
            />
            <div className="w-[269px] text-BodyMD text-text-normal">
              사업자 등록증 승인에는 2~3일 정도 소요되며, 승인 완료 시 카톡으로
              알림을 전송해드려요
            </div>
            <div className="flex flex-row gap-2">
              <Link
                href="/"
                className="py-2.5 px-6 border rounded-[120px] border-line-normal"
              >
                홈으로
              </Link>
              <Link
                href="/"
                className="w-[204px] py-2.5 bg-primary rounded-[120px] text-text-inverse"
              >
                광고만들기
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
