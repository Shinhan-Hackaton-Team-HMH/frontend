// // app/page.tsx (또는 다른 클라이언트 컴포넌트 파일)

// 'use client';

// import { CrawlResponseTypes } from '@/app/api/naver/crawl/route';
// import axios from 'axios';
// import Link from 'next/link';
// import { useState } from 'react';

// export default function CrawlingNaver() {
//   const [crawledImages, setCrawledImages] = useState<string[]>([]);
//   const [crawledLocation, setCrawledLocation] = useState<string>('');
//   const [crawledHours, setCrawledHours] = useState<string>('');
//   const [storeName, setStoreName] = useState('');
//   const [storeType, setStoreType] = useState('');

//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchKeyword, setSearchKeyword] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchKeyword(e.currentTarget.value);
//   };

//   const handleCrawl = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get<CrawlResponseTypes>(
//         `/api/naver/crawl?searchKeyword=${searchKeyword}`,
//       );
//       const geminiResponse = await axios.post(
//         '/api/gemini',
//         response.data.hours,
//       );
//       setCrawledImages([...response.data.images]);
//       setCrawledLocation(response.data.location);
//       setCrawledHours(geminiResponse.data.text);
//       setStoreName(response.data.storeName);
//       setStoreType(response.data.storeType);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('알 수 없는 오류가 발생했습니다.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (loading) {
//     return (
//       <div className="p-4 text-center">크롤링 데이터를 불러오는 중...</div>
//     );
//   }
//   if (error) {
//     return <div className="p-4 text-center text-red-500">오류: {error}</div>;
//   }

//   return (
//     <div className="flex h-20 flex-row bg-blue-600">
//       <input
//         type="text"
//         onChange={handleInputChange}
//         className="w-1/2 bg-white text-black"
//         value={searchKeyword}
//       />
//       <button onClick={handleCrawl}>CRAWL</button>
//       <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
//         크롤링된 데이터
//       </h1>
//       <div>{crawledHours}</div>
//       <div>{crawledLocation}</div>
//       <div>{storeName}</div>
//       <div>{storeType}</div>
//     </div>
//   );
// }
