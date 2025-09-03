export type Progress =
  | 'NOT_STARTED'
  | 'BUSINESS_REGISTERED'
  | 'CAMPAIGN_SETUP'
  | 'BUDGET_ALLOCATED'
  | 'MEDIA_UPLOADED'
  | 'REVIEW_APPROVED'
  | 'AD_BROADCAST';

type ProgressInfo = {
  percent: number;
  path: string;
};

const progressMap: Record<Progress, ProgressInfo> = {
  NOT_STARTED: { percent: 0, path: '/business' },
  BUSINESS_REGISTERED: { percent: 20, path: '/budget' }, //지역선택 비어있게
  CAMPAIGN_SETUP: { percent: 40, path: '/budget' }, //지역선택 채워지게
  BUDGET_ALLOCATED: { percent: 60, path: '/plan' }, //네이버 플레이스 not filled
  MEDIA_UPLOADED: { percent: 75, path: '/plan' }, //네이버 플레이스 Filled
  REVIEW_APPROVED: { percent: 90, path: '/mypage' },
  AD_BROADCAST: { percent: 100, path: '/mypage' },
};

export function getProgressInfo(status: Progress): ProgressInfo {
  return progressMap[status];
}

// 사용 예시
const info = getProgressInfo('MEDIA_UPLOADED');
console.log(info.percent); // 75
console.log(info.path); // "/campaign/media"
