import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-full relative">
      <div className="text-Headline">this is spoqa</div>
      <Link
        href={
          'nmap://place?lat=37.3677345&lng=127.1083617&name=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%84%B1%EB%82%A8%EC%8B%9C%20%EB%B6%84%EB%8B%B9%EA%B5%AC%20%EC%A0%95%EC%9E%90%EB%8F%99&appname=com.example.myapp'
        }
        className="text-Body"
      >
        Naver Url Scheme
      </Link>
    </div>
  );
}
