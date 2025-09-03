'use client';
import KakaoButton from '@/components/common/button/kakaoButton';
import InputTextField from '@/components/common/textfield';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function LoginPage() {
  return (
    <>
      <div className="container">
        <section className="mt-[60px] flex items-start justify-center">
          <div className="shadow-section mb-[120px] flex h-fit w-[600px] flex-col items-center gap-8 rounded-[20px]">
            <div className="w-[360px]">
              <div className="text-Headline text-text-normal mt-9 mb-8 text-center">
                통합 로그인
              </div>
              <div className="flex flex-col items-start gap-2">
                <InputTextField
                  label={'아이디를 입력해주세요'}
                  placeholder={'아이디를 입력해주세요'}
                />
                <InputTextField
                  label={'아이디를 입력해주세요'}
                  placeholder={'아이디를 입력해주세요'}
                />
                <div className="text-text-assistive text-Caption flex h-4 w-full flex-row items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <input type="checkbox" className="text-icon-assistive" />
                    아이디 저장
                  </div>
                  <div className="flex flex-row items-center justify-between gap-1.5">
                    <span>아이디 찾기</span>
                    <div className="bg-line-normal h-2.5 w-[1px]"></div>
                    <span>비밀번호 찾기</span>
                  </div>
                </div>
                <button className="bg-inactive text-text-assistive text-ButtonMD mt-6 flex w-full justify-center rounded-xl px-6 py-[13px]">
                  로그인
                </button>
              </div>
              <div className="mt-12 mb-[48px] flex flex-col items-center justify-center gap-4">
                <div className="text-BodySM text-text-assistive flex w-full flex-row items-center justify-between">
                  <hr className="text-line-assistive w-[137px]" />
                  간편 로그인
                  <hr className="text-line-assistive w-[137px]" />
                </div>
                <div className="text-text-normal text-titleSM text-center">
                  복잡한 절차 없이, 카카오로 빠르게 시작하기
                </div>
                <KakaoButton />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
