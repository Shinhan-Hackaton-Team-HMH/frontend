import InputTextField from '@/components/common/textfield';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function LoginPage() {
  return (
    <div className="container">
      <Header></Header>
      <section className="flex items-start justify-center">
        <div className="w-[596px] h-[530px] flex flex-col items-center justify-center gap-8">
          <div className="text-Headline text-[#3D3F41] text-center">
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
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-row gap-[15px] justify-center items-center">
              <hr className="w-[137px] text-[#ECEEF0]" />
              간편 로그인
              <hr className="w-[137px] text-[#ECEEF0]" />
            </div>
            <div className="text-center ">
              복잡한 절차 없이, 카카오로 빠르게 시작하기
            </div>
            <button>카카오로 시작하기</button>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
