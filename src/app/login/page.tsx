import KakaoButton from '@/components/common/kakaoButton';
import InputTextField from '@/components/common/textfield';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function LoginPage() {
  return (
    <>
      <div className="container">
        <Header />
        <section className="flex items-start justify-center mt-[60px]">
          <div className="w-[600px] h-[530px] flex flex-col items-center gap-8 shadow-section rounded-[20px] mb-[120px]">
            <div className="w-[360px]">
              <div className="text-Headline text-text-normal text-center mt-9 mb-8">
                통합 로그인
              </div>
              <div className="flex flex-col gap-2 items-start">
                <InputTextField
                  text={'아이디를 입력해주세요'}
                  placeholder={'아이디를 입력해주세요'}
                />
                <InputTextField
                  text={'아이디를 입력해주세요'}
                  placeholder={'아이디를 입력해주세요'}
                />
                <div className="w-full h-4 flex flex-row justify-between items-center  text-text-assistive text-Caption ">
                  <div className="flex flex-row gap-1">
                    <input type="checkbox" className="text-icon-assistive" />
                    아이디 저장
                  </div>
                  <div className="flex flex-row gap-1.5 items-center justify-between">
                    <span>아이디 찾기</span>
                    <div className="w-[1px] h-2.5 bg-line-normal"></div>
                    <span>비밀번호 찾기</span>
                  </div>
                </div>
                <button className="w-full px-6 py-[13px] flex justify-center rounded-xl bg-inactive text-text-assistive text-ButtonMD mt-6">
                  로그인
                </button>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center mt-12 mb-[48px]">
                <div className="flex flex-row justify-between items-center text-BodySM text-text-assistive w-full">
                  <hr className="w-[137px] text-line-assistive " />
                  간편 로그인
                  <hr className="w-[137px] text-line-assistive" />
                </div>
                <div className="text-center text-text-normal text-titleSM">
                  복잡한 절차 없이, 카카오로 빠르게 시작하기
                </div>
                <KakaoButton />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
