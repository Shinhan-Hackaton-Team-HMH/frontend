'use client';
import { NewsItem, NewsResponse } from '@/types/news/newsType';
import { use, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

export default function NaverNews() {
  type NewsApiResponse = NewsResponse;
  const [newsData, setNewsData] = useState<NewsApiResponse['items']>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        const data: NewsResponse = await response.json();
        setNewsData(data.items || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div className="text-Headline">Naver News</div>
      {newsData.length > 0 ? (
        <ul className="flex flex-col justify-center gap-10 px-10">
          {newsData.map((news, index) => (
            <li key={index} className="text-Body">
              <a href={news.link} target="_blank" rel="noopener noreferrer">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(news.title),
                  }}
                />
              </a>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(news.description),
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(news.pubDate),
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-Body">Loading news data...</p>
      )}
    </div>
  );
}
