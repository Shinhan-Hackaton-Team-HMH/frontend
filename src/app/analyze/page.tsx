'use client';

import useCurrentAdStore from '@/store/useMockVideoStore';
import {
  CheckCircle,
  AlertTriangle,
  FileVideo,
  Shield,
  Tag,
  Type,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const videoAnalysisData = {
  message: '영상 규격 검사 통과',
  url: 'https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4',
  resolution: '1200x1600',
  detail: {
    videoUrl: 'https://storage.googleapis.com/hackathon_hmh/flowerVideo.mp4',
    resolution: '1200x1600',
    videoCodec: 'h264',
    audioCodec: 'N/A',
    frameRate: '24.00 fps',
    duration: '20.00 seconds',
    fileSize: '19.06 MB',
  },
  explicit: [
    { time: '0.839s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '1.949s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '3.130s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '4.77s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '4.924s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '6.106s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '7.131s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '8.329s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '9.221s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '10.269s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '11.114s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '12.169s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '13.95s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '14.238s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '15.60s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '16.166s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '17.104s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '18.86s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '19.43s', pornographyLikelihood: 'VERY_UNLIKELY' },
    { time: '19.948s', pornographyLikelihood: 'VERY_UNLIKELY' },
  ],
  label: [
    {
      label: 'flower',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.9053409695625305',
        },
      ],
    },
    {
      label: 'centrepiece',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.5087083578109741',
        },
      ],
    },
    {
      label: 'flower bouquet',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.8725555539131165',
        },
      ],
    },
    {
      label: 'floristry',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.7349227070808411',
        },
      ],
    },
    {
      label: 'flora',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.3198046386241913',
        },
      ],
    },
    {
      label: 'flowering plant',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.35252830386161804',
        },
      ],
    },
    {
      label: 'plant',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.6012514233589172',
        },
      ],
    },
    {
      label: 'floral design',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.6695383191108704',
        },
      ],
    },
    {
      label: 'cut flowers',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.5582544207572937',
        },
      ],
    },
    {
      label: 'flowerpot',
      time: [
        {
          start: 'Start: 0.0s',
          end: 'End: 19.958333000s',
          confidence: 'Confidence: 0.5777149200439453',
        },
      ],
    },
  ],
  text: [
    '서촌 감성 플라워샵',
    '특별한 날,',
    '툭별한 사람에게',
    '맞춤제작 꽃다발',
    '마음을  전하는 가장 아름다운 방법',
    '당일 예약 - 배송 가능',
    '간편하게 원하는 시간에 배송',
  ],
};

export default function VideoAnalysisReport() {
  const getConfidenceValue = (confidenceStr: string): number => {
    const match = confidenceStr.match(/Confidence: ([\d.]+)/);
    return match ? Number.parseFloat(match[1]) * 100 : 0;
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const safetyStatus = videoAnalysisData.explicit.every(
    (item) => item.pornographyLikelihood === 'VERY_UNLIKELY',
  );
  const currentAd = useCurrentAdStore();
  const router = useRouter();
  const handleApprove = async () => {
    currentAd.updateBackOffice('Confirm');
    currentAd.updateVideoStatus('BroadCasting');
    router.push('/backOffice');
  };

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="space-y-2 text-start">
        <h1 className="text-foreground text-3xl font-bold">
          비디오 분석 리포트
        </h1>
        <p className="text-muted-foreground">Video Analysis Report Dashboard</p>
      </div>
      {/* Status Overview */}
      <div className="bg-card shadow-section ring-line-assistive rounded-lg ring">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="text-2xl leading-none font-semibold tracking-tight">
                분석 상태
              </h3>
            </div>
            <button
              onClick={handleApprove}
              className="text-ButtonMD text-text-inverse bg-primary w-fit rounded-xl px-6 py-[13px]"
            >
              최종 검토 확인
            </button>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-green-600">
                {videoAnalysisData.message}
              </p>
              <p className="text-muted-foreground text-sm">
                Analysis completed successfully
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 ring ring-green-200">
              PASSED
            </span>
          </div>
        </div>
      </div>
      {/* Technical Specifications */}
      <div className="bg-card text-card-foreground ring-line-assistive shadow-section rounded-lg ring">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="flex items-center gap-2 text-2xl leading-none font-semibold tracking-tight">
            <FileVideo className="h-5 w-5" />
            기술 사양
          </h3>
          <p className="text-muted-foreground text-sm">
            Video Technical Specifications
          </p>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">
                해상도
              </p>
              <p className="text-lg font-semibold">
                {videoAnalysisData.detail.resolution}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">코덱</p>
              <p className="text-lg font-semibold uppercase">
                {videoAnalysisData.detail.videoCodec}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">
                프레임레이트
              </p>
              <p className="text-lg font-semibold">
                {videoAnalysisData.detail.frameRate}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">
                재생시간
              </p>
              <p className="text-lg font-semibold">
                {videoAnalysisData.detail.duration}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">
                파일크기
              </p>
              <p className="text-lg font-semibold">
                {videoAnalysisData.detail.fileSize}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">
                오디오 코덱
              </p>
              <p className="text-lg font-semibold">
                {videoAnalysisData.detail.audioCodec}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flew-row flex gap-2">
        <div className="bg-card text-card-foreground shadow-section ring-line-assistive rounded-lg ring">
          <div className="flex flex-col space-y-1.5 p-5">
            <h3 className="text-2xl leading-none font-semibold tracking-tight">
              비디오 미리보기
            </h3>
            <p className="text-muted-foreground text-sm">Video Preview</p>
          </div>
          <div className="p-6 pt-0">
            <div className="bg-muted flex aspect-video items-center justify-center rounded-lg">
              <video
                className="max-h-full max-w-full rounded-lg"
                autoPlay
                controls
                muted
                src={videoAnalysisData.detail.videoUrl}
              ></video>
            </div>
            <div className="text-muted-foreground mt-2 text-center text-sm">
              {videoAnalysisData.detail.videoUrl}
            </div>
          </div>
        </div>
        <div className="bg-card text-card-foreground shadow-section ring-line-assistive rounded-lg ring">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="flex items-center gap-2 text-2xl leading-none font-semibold tracking-tight">
              <Type className="h-5 w-5" />
              텍스트 인식
            </h3>
            <p className="text-muted-foreground text-sm">
              Extracted Text Content
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {videoAnalysisData.text.map((text, index) => (
                <div key={index} className="bg-muted rounded-lg p-3">
                  <p className="text-center font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Safety Check */}
        <div className="bg-card text-card-foreground shadow-section ring-line-assistive rounded-lg ring">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="flex items-center gap-2 text-2xl leading-none font-semibold tracking-tight">
              <Shield className="h-5 w-5" />
              안전성 검사
            </h3>
            <p className="text-muted-foreground text-sm">
              Content Safety Analysis
            </p>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">성인 콘텐츠 검사</p>
                <p className="text-muted-foreground text-sm">
                  {videoAnalysisData.explicit.length}개 프레임 분석 완료
                </p>
              </div>
              <div className="flex items-center gap-2">
                {safetyStatus ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring ${
                    safetyStatus
                      ? 'bg-green-50 text-green-700 ring-green-200'
                      : 'bg-red-50 text-red-700 ring-red-200'
                  }`}
                >
                  {safetyStatus ? 'SAFE' : 'FLAGGED'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>안전 점수</span>
                <span className="font-medium">100%</span>
              </div>
              <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div className="text-muted-foreground text-xs">
              모든 프레임에서 부적절한 콘텐츠가 발견되지 않았습니다.
            </div>
          </div>
        </div>

        {/* Object Detection */}
        <div className="bg-card text-card-foreground shadow-section ring-line-assistive rounded-lg ring">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="flex items-center gap-2 text-2xl leading-none font-semibold tracking-tight">
              <Tag className="h-5 w-5" />
              객체 인식
            </h3>
            <p className="text-muted-foreground text-sm">
              Object Detection Results
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-3">
              {videoAnalysisData.label
                .sort(
                  (a, b) =>
                    getConfidenceValue(b.time[0].confidence) -
                    getConfidenceValue(a.time[0].confidence),
                )
                .slice(0, 6)
                .map((item, index) => {
                  const confidence = getConfidenceValue(
                    item.time[0].confidence,
                  );
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">
                            {item.label}
                          </span>
                          <span
                            className={`text-sm font-semibold ${getConfidenceColor(confidence)}`}
                          >
                            {confidence.toFixed(1)}%
                          </span>
                        </div>
                        <div className="bg-primary/20 relative h-1.5 w-full overflow-hidden rounded-full">
                          <div
                            className={`h-full rounded-full transition-all ${
                              confidence >= 80
                                ? 'bg-green-500'
                                : confidence >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
