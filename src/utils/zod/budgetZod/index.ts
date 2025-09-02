import { z } from 'zod';

const AdPlanSchema = z.object({
  기기대수: z.string(),
  시간대: z.array(z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/)), // HH:MM-HH:MM 형식
  노출횟수: z.string(),
  집행예산: z.string().regex(/^\d{1,3}(,\d{3})*$/), // 천 단위 콤마 처리
  선택이유: z.string(),
});

// 최상위: 업종_예산 -> { 광고1, 광고2 }
const ResponseSchema = z.record(z.string(), z.record(z.string(), AdPlanSchema));
