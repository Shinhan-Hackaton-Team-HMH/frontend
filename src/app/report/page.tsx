// 'use client';
// import axios from 'axios';
// import { useEffect } from 'react';

// export default function ReportPage() {
//   useEffect(() => {
//     const res = async () => {
//       const responseFF = await axios.get(
//         '/api/ffmpeg/inspection?url=https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4',
//       );
//       const responseGC = await axios.post('/api/video/analyze', {
//         gcsUri: 'gs://hmh_bucket/flower.mp4',
//       });
//       console.log(responseFF, responseGC);
//       const merged = { ...responseFF, ...responseGC };
//       downloadJSON(merged, 'video-analysis.json');
//     };
//     res();
//   }, []);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   function downloadJSON(data: any, filename = 'data.json') {
//     const jsonStr = JSON.stringify(data, null, 2); // 보기 좋게 들여쓰기
//     const blob = new Blob([jsonStr], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     a.click();

//     URL.revokeObjectURL(url);
//   }
//   return <div></div>;
// }

'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ReportPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mergedData, setMergedData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFF = await axios.get(
          '/api/ffmpeg/inspection?url=https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4',
        );
        const responseGC = await axios.post('/api/video/analyze', {
          gcsUri: 'gs://hmh_bucket/flower.mp4',
        });

        // 실제 데이터만 추출하고 병합
        const merged = { ...responseFF.data, ...responseGC.data };
        console.log(merged);
        setMergedData(merged);
      } catch (err) {
        console.error('Error fetching video analysis:', err);
      }
    };

    fetchData();
  }, []);

  // JSON 다운로드 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const downloadJSON = (data: any, filename = 'data.json') => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      {mergedData ? (
        <button
          onClick={() => downloadJSON(mergedData, 'video-analysis.json')}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Download Video Analysis
        </button>
      ) : (
        <p>Loading video analysis...</p>
      )}
    </div>
  );
}
