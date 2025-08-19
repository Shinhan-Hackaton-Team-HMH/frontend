// app/page.tsx (또는 다른 클라이언트 컴포넌트 파일)

'use client';

import { useState, useEffect } from 'react';

export default function CrawlingNaver() {
  const [crawledData, setCrawledData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('싸다김밥 명동역');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value);
  };

  const handleCrawl = async () => {
    setLoading(true);
    setError(null);
    try {
      // API 라우트를 호출하여 크롤링된 데이터를 가져옵니다.
      // 크롤링할 대상 URL을 쿼리 파라미터로 전달합니다.
      const response = await fetch(
        `/api/naver/crawl?searchKeyword=${searchKeyword}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }
      const result = await response.json();
      console.log('result: ', result);
      setCrawledData([crawledData, ...result.response]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };
  console.log('crawledData: ', crawledData);
  if (loading) {
    return (
      <div className="p-4 text-center">크롤링 데이터를 불러오는 중...</div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">오류: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md max-w-2xl mt-8">
      <div className="h-20 bg-blue-600 flex flex-row">
        <input
          type="text"
          onChange={handleInputChange}
          className="bg-white text-black w-1/2"
        />
        <button onClick={handleCrawl}>CRAWL</button>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        크롤링된 데이터
      </h1>
      {crawledData.length > 0 ? (
        <ul className="space-y-3">
          {crawledData.map((item, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:border-blue-400 transition duration-200"
            >
              <img src={item}></img>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">추출된 데이터가 없습니다.</p>
      )}
    </div>
  );
}
