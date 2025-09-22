'use client';
import useCurrentAdStore from '@/store/useMockVideoStore';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COUNT_DATA = [
  { name: '버스정류장', value: 25 },
  { name: '엘리베이터 TV', value: 10 },
  { name: 'IPTV', value: 5 },
];

const BUSINESS_DATA = [
  {
    status: '요청',
    name: '꽃사계',
    number: '111-11-11111',
    ownerName: '한정욱',
    registrationDate: '2025-09-17',
  },
  {
    status: '검토',
    name: '희주반가',
    number: '222-22-22222',
    ownerName: '김유림',
    registrationDate: '2025-09-18',
  },
  {
    status: '승인',
    name: 'Alive',
    number: '333-33-33333',
    ownerName: '이연진',
    registrationDate: '2025-09-19',
  },
];

const OWNER_DATA = [
  {
    number: '111-11-11111',
    name: '꽃사계',
    ownerName: '한정욱',
    reportData: '2025-09-16',
    advice: '있음',
    adviceDate: '2025-09-16',
    status: '진행중',
  },
  {
    number: '222-22-22222',
    name: '희주반가',
    ownerName: '김유림',
    reportData: '2025-09-17',
    advice: '있음',
    adviceDate: '2025-09-17',
    status: '진행중',
  },
  {
    number: '333-33-33333',
    name: 'Alive',
    ownerName: '이연진',
    reportData: '2025-09-18',
    advice: '없음',
    adviceDate: '',
    status: '진행중',
  },
];

const CAMPAIGN_DATA = [
  {
    status: '검토요청',
    number: '111-11-11111',
    name: '꽃사계',
    campaignName: '꽃사계1',
    reason: '-',
  },
  {
    status: '반려',
    number: '111-11-11111',
    name: '꽃사계',
    campaignName: '꽃사계1',
    reason: '허위광고',
  },
  {
    status: '진행중',
    number: '222-22-22222',
    name: '희주반가',
    campaignName: '희주반가1',
    reason: '-',
  },
];

const QNA_DATA = [
  {
    status: '접수됨',
    ownerName: '한정욱',
    name: '꽃사계',
    userInquiry:
      '현재 송출중인 광고의 시간을 더 좋은 시간대로 변경하고 싶습니다.',
  },
  {
    status: '답변 완료',
    ownerName: '이연진',
    name: 'Alive',
    userInquiry: '예산을 추가로 결제하고 광고 노출량을 늘릴 수 있을까요?',
  },
];

const COLORS = [
  'rgba(104,70,244,1)',
  'rgba(150,170,255,1)',
  'rgba(19,1,154,1)',
];

const Tag = ({ label }: { label: string }) => {
  const colorMap: Record<string, string> = {
    있음: 'bg-green-100 text-green-800',
    없음: 'bg-red-100 text-red-800',
    진행중: 'bg-blue-100 text-blue-800',
    반려: 'bg-yellow-100 text-yellow-800',
    승인: 'bg-purple-100 text-purple-800',
    검토요청: 'bg-gray-100 text-gray-800',
    요청: 'bg-orange-100 text-orange-800',
  };

  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-medium ${colorMap[label] || 'bg-gray-100 text-gray-800'}`}
    >
      {label}
    </span>
  );
};

export default function BackPage() {
  const currentAd = useCurrentAdStore();

  console.log(currentAd.status);
  return (
    <div className="container mb-20 flex flex-row gap-[30px]">
      {/* 사이드바 */}

      <div className="shadow-section ring-line-assistive text-BodyMD flex h-fit w-[180px] flex-col rounded-xl px-1.5 ring">
        <div className="text-TitleMD px-4 pt-4 pb-2">백오피스</div>
        <div className="w-full rounded-lg py-3 pl-4">캠페인관리</div>
        <div className="w-full rounded-lg py-3 pl-4">소재관리</div>
        <div className="w-full rounded-lg py-3 pl-4">계정관리</div>
        <div className="w-full rounded-lg py-3 pl-4">매체관리</div>
        <div className="w-full rounded-lg py-3 pl-4">정산관리</div>
        <div className="w-full rounded-lg py-3 pl-4">시스템관리</div>
      </div>

      {/* 본문 */}
      <div className="flex w-full flex-col gap-3">
        {/* 캠페인 현황 */}
        <div className="shadow-section flex w-full flex-col rounded-[20px] p-3">
          <div className="pl-4">
            <span className="text-lg font-semibold text-gray-900">
              캠페인 현황
            </span>
            <div className="mt-2 h-[1px] w-full bg-gray-200" />
          </div>

          <div className="flex flex-1 flex-row gap-3">
            {[
              { label: '예약중', count: 20 },
              { label: '승인요청', count: 5 },
              { label: '진행대기', count: 13 },
              { label: '진행중', count: 40 },
              { label: '종료예정', count: 2 },
            ].map(({ label, count }) => (
              <div
                key={label}
                className="flex h-28 flex-1 flex-col items-center justify-center rounded-xl bg-white p-4 text-center"
              >
                <span className="text-base font-semibold text-gray-900 md:text-lg">
                  {label}
                </span>
                <span className="mt-2 text-sm font-medium text-gray-600 md:text-base">
                  {count}건
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 광고 비용 */}
        <div className="shadow-section flex w-full flex-col rounded-[20px] bg-white p-6">
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="pl-2">
                  <span className="text-lg font-semibold text-gray-900">
                    광고 비용
                  </span>
                </div>

                <div className="bg-normal-assistive flex flex-row items-center space-x-2 rounded-[10px] p-2">
                  <span>2025-08</span>
                  <button className="flex h-[32px] w-[32px] items-center justify-center rounded-lg bg-white">
                    <Image
                      src="/icon/schedule.png"
                      alt="달력 아이콘"
                      width={25}
                      height={25}
                    />
                  </button>
                  <div className="h-[20px] w-[1px] bg-gray-300" />
                  <button className="rounded-lg bg-white px-2 py-1">
                    당월
                  </button>
                  <button className="rounded-lg bg-white px-2 py-1">
                    전월
                  </button>
                  <button className="rounded-lg bg-white px-2 py-1">
                    전년
                  </button>
                </div>
              </div>

              <div className="mt-4 h-[1px] w-full bg-gray-200" />
            </div>
          </div>

          {/* 표 + 도넛 차트 */}
          <div className="mt-6 flex flex-row items-start justify-between gap-10">
            {/* 표 */}
            <div className="flex min-w-0 flex-1 flex-col">
              {/* Header */}
              <div className="flex h-[52px] w-full flex-row">
                <div className="bg-normal-assistive text-text-assistive flex h-full w-[136px] items-center justify-center">
                  매체명
                </div>
                <div className="bg-normal-assistive text-text-assistive flex h-full w-[136px] items-center justify-center">
                  건수
                </div>
                <div className="bg-normal-assistive text-text-assistive flex h-full w-[180px] items-center justify-center">
                  금액
                </div>
              </div>

              {/* 데이터 */}
              {COUNT_DATA.map((item) => (
                <div key={item.name} className="flex h-[52px] flex-row">
                  <div className="text-text-normal flex h-full w-[136px] items-center justify-center">
                    {item.name}
                  </div>
                  <div className="text-text-normal flex h-full w-[136px] items-center justify-center">
                    {item.value}건
                  </div>
                  <div className="text-text-normal flex h-full w-[180px] items-center justify-center">
                    {item.name === '버스정류장'
                      ? '2,000,000원'
                      : item.name === '엘리베이터 TV'
                        ? '850,000원'
                        : '900,000원'}
                  </div>
                </div>
              ))}

              <div className="flex h-[52p] w-[452px] border-t border-gray-200 bg-gray-50 font-semibold">
                <div className="flex h-[40px] w-[136px] items-center justify-center text-gray-600">
                  합계
                </div>
                <div className="flex h-[40px] w-[136px] items-center justify-center text-gray-600">
                  {COUNT_DATA.reduce((sum, item) => sum + item.value, 0)}건
                </div>
                <div className="flex h-[40px] w-[180px] items-center justify-center text-gray-600">
                  {['버스정류장', '엘리베이터 TV', 'IPTV']
                    .map((name) =>
                      name === '버스정류장'
                        ? 2000000
                        : name === '엘리베이터 TV'
                          ? 850000
                          : 900000,
                    )
                    .reduce((sum, amt) => sum + amt, 0)
                    .toLocaleString()}
                  원
                </div>
              </div>
            </div>

            {/* 도넛 차트 */}
            <div className="-mt-2 -ml-4 h-72 w-[340px] overflow-visible">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={COUNT_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={66}
                    paddingAngle={4}
                    stroke="none"
                    labelLine={true}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label={(props: any) => {
                      const { name, percent, cx, cy, midAngle, outerRadius } =
                        props;

                      const RAD = Math.PI / 180;
                      const r = outerRadius + 25;
                      const x = cx + r * Math.cos(-midAngle * RAD);
                      const y = cy + r * Math.sin(-midAngle * RAD);
                      const anchor = x > cx ? 'start' : 'end';
                      const pct = (percent * 100).toFixed(1);

                      return (
                        <text
                          x={x}
                          y={y}
                          textAnchor={anchor}
                          dominantBaseline="middle"
                          fontSize={11}
                          fill="#111827"
                        >
                          {name} ({pct}%)
                        </text>
                      );
                    }}
                  >
                    {COUNT_DATA.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="shadow-section flex w-full flex-col rounded-[20px] p-6">
          <div className="mb-6 flex flex-col">
            <span className="text-lg font-semibold text-gray-900">
              광고주 승인 요청 현황
            </span>
            <div className="mt-2 h-[1px] w-full bg-gray-200" />
          </div>

          <div className="grid grid-cols-[136px_136px_214px_214px_214px]">
            {/* Header */}
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              상태
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              상호명
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              사업자등록번호
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              대표명
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              등록일
            </div>

            {/* Data Rows */}
            {BUSINESS_DATA.map((item, idx) => (
              <Fragment key={idx}>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.status}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.name}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.number}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.ownerName}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.registrationDate}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="shadow-section flex w-full flex-col rounded-[20px] p-6">
          <div className="mb-6 flex flex-col">
            <span className="text-lg font-semibold text-gray-900">
              광고 청약 관리
            </span>
            <div className="mt-2 h-[1px] w-full bg-gray-200" />
          </div>

          <div className="grid grid-cols-[136px_136px_214px_214px_214px]">
            {/* Header */}
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              상태
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              사업자등록번호
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              상호명
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              광고이름
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              사유
            </div>

            {/* Data Rows */}
            {CAMPAIGN_DATA.map((item, idx) => (
              <Fragment key={idx}>
                <Link
                  href={
                    currentAd.backOffice !== 'Review' ? '/result' : '/analyze'
                  }
                >
                  <div className="text-text-normal flex h-[52px] items-center justify-center">
                    {item.status == '검토요청' ? (
                      <>
                        {currentAd.backOffice == 'Review' ? (
                          <>
                            <Tag label={'검토요청'} />
                            <Image
                              src="/icon/share.png"
                              alt="공유 아이콘"
                              width={16}
                              height={16}
                            />
                          </>
                        ) : (
                          <Tag label={'진행중'} />
                        )}
                      </>
                    ) : (
                      <Tag label={item.status} />
                    )}
                  </div>
                </Link>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.number}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.name}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.campaignName}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.reason}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="shadow-section flex w-full flex-col rounded-[20px] p-6">
          <div className="mb-6 flex flex-col">
            <span className="text-lg font-semibold text-gray-900">
              광고주 관리
            </span>
            <div className="mt-2 h-[1px] w-full bg-gray-200" />
          </div>

          <div className="grid grid-cols-[136px_100px_100px_214px_80px_136px_214px]">
            {/* Header */}
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              사업자등록번호
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              상호명
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              대표자명
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              최근 리포트 발송일
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              상담 요청
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              상담 요청일
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              광고 진행 상태
            </div>

            {/* Data Rows */}
            {OWNER_DATA.map((item, idx) => (
              <Fragment key={idx}>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.number}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.name}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.ownerName}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.reportData}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  <Tag label={item.advice} />
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.adviceDate}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  <Tag label={item.status} />
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="shadow-section flex w-full flex-col rounded-[20px] p-6">
          <div className="mb-6 flex flex-col">
            <span className="text-lg font-semibold text-gray-900">
              문의사항
            </span>
            <div className="mt-2 h-[1px] w-full bg-gray-200" />
          </div>

          <div className="grid grid-cols-[136px_136px_214px_480px]">
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              답변여부
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              대표명
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              상호명
            </div>
            <div className="bg-normal-assistive text-text-assistive flex h-[52px] items-center justify-center">
              문의내용
            </div>

            {QNA_DATA.map((item, idx) => (
              <Fragment key={idx}>
                <div className="text-text-normal flex h-[52px] items-center justify-center gap-1">
                  <span>{item.status}</span>
                  {item.status === '답변 완료' && (
                    <Image
                      src="/icon/share.png"
                      alt="공유 아이콘"
                      width={16}
                      height={16}
                    />
                  )}
                </div>

                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.ownerName}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.name}
                </div>
                <div className="text-text-normal flex h-[52px] items-center justify-center">
                  {item.userInquiry}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
