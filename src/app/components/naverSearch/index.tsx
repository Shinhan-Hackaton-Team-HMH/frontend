'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function NaverImageSearch() {
  const [imageList, setImageList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // input의 값
  const [query, setQuery] = useState(''); // API 요청에 사용할 값

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleSearchClick = async () => {
    // 버튼 클릭 시에만 API 요청 쿼리 상태 업데이트
    setQuery(searchTerm);

    if (searchTerm.trim() === '') {
      setImageList([]); // 입력값이 없으면 이미지 목록 비우기
      return;
    }

    try {
      // 쿼리 상태를 사용하여 API 호출
      const response = await fetch(
        `/api/naver/imageSearch?search=${searchTerm}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch image data');
      }
      const data = await response.json();
      console.log(data);
      if (data && data.items) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setImageList(data.items.map((value: any) => value.thumbnail));
      } else {
        setImageList([]); // 데이터가 없으면 빈 배열로 설정
      }
    } catch (error) {
      console.error('Error fetching', error);
      setImageList([]); // 에러 발생 시 빈 배열로 설정
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      <div className="col-span-5 flex gap-2">
        <input
          onChange={handleInputChange}
          value={searchTerm}
          className="flex-1 text-black bg-white p-2 border rounded-md"
          placeholder="이미지 검색어를 입력하세요"
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          검색
        </button>
      </div>

      {imageList.length > 0 ? (
        imageList.map((value, index) => (
          <div
            key={index}
            className="w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-lg"
          >
            <Image
              src={value}
              alt={`검색된 이미지 ${index + 1}`}
              width={200}
              height={200}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        ))
      ) : (
        <div className="col-span-5 text-center text-gray-500">
          이미지를 검색해주세요.
        </div>
      )}
    </div>
  );
}
