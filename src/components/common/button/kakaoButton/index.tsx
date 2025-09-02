import Image from 'next/image';

export default function KakaoButton() {
  const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  const K_REDIRECT_URI = `https://frontend-five-sepia-55.vercel.app/auth/callback/kakao`;

  // const K_REDIRECT_URI = `http://localhost:3000/auth/callback/kakao`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div
      className="relative flex w-full flex-row items-center justify-center rounded-xl bg-[#FEE500] py-[12]"
      onClick={handleKakaoLogin}
    >
      <Image
        className="absolute top-[11px] left-3 size-6"
        width={24}
        height={24}
        src="/kaka_icon.svg"
        alt="카카오로 시작하기"
      />
      카카오로 시작하기
    </div>
  );
}
