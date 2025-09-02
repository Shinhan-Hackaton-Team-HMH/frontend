import Link from 'next/link';

export function NaverMap() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div className="text-Headline">this is spoqa</div>
      <Link
        href={
          'nmap://place?lat=37.3677345&lng=127.1083617&name=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%84%B1%EB%82%A8%EC%8B%9C%20%EB%B6%84%EB%8B%B9%EA%B5%AC%20%EC%A0%95%EC%9E%90%EB%8F%99&appname=com.example.myapp'
        }
        className="text-Body"
      >
        Naver Url Scheme
      </Link>
      <Link
        href={
          'nmap://search?query=%EA%B0%95%EB%82%A8%EC%97%AD&appname=com.example.myapp'
        }
        className="text-Body"
      >
        강남역 검색창
      </Link>
      <Link
        href={'nmap://search?query=싸다김밥 명동역점&appname=com.example.myapp'}
        className="text-Body"
      >
        싸다김밥 명동역점 한글 인코딩 전
      </Link>
      <Link
        href={
          'nmap://search?query=%EC%8B%B8%EB%8B%A4%EA%B9%80%EB%B0%A5%20%EB%AA%85%EB%8F%99%EC%97%AD%EC%A0%90&appname=com.example.myapp'
        }
        className="text-Body"
      >
        싸다김밥 명동역점 한글 인코딩 후
      </Link>
      <div className="w-48 h-32 text-black bg-white">맵임 </div>
    </div>
  );
}
