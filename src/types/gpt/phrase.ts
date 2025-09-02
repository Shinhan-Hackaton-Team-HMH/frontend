// export type VideoTemplate1Type = {
//   Image1: { text1: string; text2: string };
//   Image2: { text1: string; text2: string };
//   Image3: { text1: string; text2: string; text3: string };
// };

import { DeviceType } from '@/assets/deviceMatching';

// export type VideoTemplate2Type = {
//   Image1: { text1: string; text2: string };
//   Image2: { text1: string; text2: string };
//   Image3: { text1: string; text2: string; text3: string };
//   Image4: { text1: string; text2: string; text3: string };
//   Image5: { text1: string; text2: string };
// };

// export type VideoTemplate3Type = {
//   Image1: { text1: string; text2: string };
//   Image2: { text1: string };
// };

// export type AdsJsonType = {
//   VideoTemplate1: VideoTemplate1Type;
//   VideoTemplate2: VideoTemplate2Type;
//   VideoTemplate3: VideoTemplate3Type;
// };

// Image 타입 (Image1, Image2 ... 공통 구조)
export type ImageTexts = {
  text1: string;
  text2?: string;
  text3?: string;
};

// VideoTemplate 타입
export type VideoTemplate = {
  [key: string]: ImageTexts;
};

// 전체 구조 타입
export type VideoTemplates = {
  VideoTemplate1: VideoTemplate;
  VideoTemplate2: VideoTemplate;
  VideoTemplate3: VideoTemplate;
};

export type AdPlan = {
  device: DeviceType;
  deviceCount: string;
  timeSlots: string[];
  impressions: string;
  budget: string;
  reason: string;
};

export type AdResponse = {
  [industryBudget: string]: {
    [adType: string]: AdPlan;
  };
};
