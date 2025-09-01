import { z } from 'zod';

// 개별 이미지(Texts) 스키마
const ImageTextsSchema = z.object({
  text1: z.string(),
  text2: z.string().optional(),
  text3: z.string().optional(),
});

// VideoTemplate (Image1, Image2...) 스키마
const VideoTemplateSchema = z.record(ImageTextsSchema);

// 전체 구조 스키마
export const VideoTemplatesSchema = z.object({
  VideoTemplate1: VideoTemplateSchema,
  VideoTemplate2: VideoTemplateSchema,
  VideoTemplate3: VideoTemplateSchema,
});

// 타입 추론 (TypeScript용)
export type VideoTemplates = z.infer<typeof VideoTemplatesSchema>;
