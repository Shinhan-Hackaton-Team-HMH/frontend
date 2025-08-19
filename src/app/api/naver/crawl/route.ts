// app/api/crawl/route.ts

import { NextResponse } from 'next/server';
import puppeteer, { Browser, Frame } from 'puppeteer'; // Puppeteer 임포트
import * as cheerio from 'cheerio';
// GET 요청을 처리하는 함수
export async function GET(request: Request) {
  let browser: Browser | null = null; // 브라우저 인스턴스를 저장할 변수

  try {
    // 크롤링할 검색어를 쿼리 파라미터에서 가져옵니다.
    // 예: /api/crawl?searchKeyword=싸다김밥
    const { searchParams } = new URL(request.url);
    const searchKeyword = searchParams.get('searchKeyword');

    if (!searchKeyword) {
      // 검색어가 없을 경우 400 Bad Request 응답
      return new NextResponse(
        JSON.stringify({ error: '검색어가 필요합니다.' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    // 네이버 지도 검색 URL을 구성합니다.
    const naverMapSearchUrl = `https://map.naver.com/p/search/${encodeURIComponent(
      searchKeyword,
    )}`;

    console.log(`Puppeteer를 사용한 크롤링 시작: ${naverMapSearchUrl}`); // 디버깅 로그

    // Puppeteer 브라우저 인스턴스
    browser = await puppeteer.launch({ headless: false }); // headless: true로 백그라운드 실행
    const page = await browser.newPage();

    // 페이지 로드 타임아웃을 설정
    page.setDefaultNavigationTimeout(60000);

    await page.goto(
      naverMapSearchUrl,
      // 'https://map.naver.com/p/entry/place/1759221815?c=12.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202508141417&locale=ko&svcName=map_pcv5',
      // 실제 IFRAME 주소 : 'https://pcmap.place.naver.com/restaurant/1759221815/home?from=map&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202508141528&locale=ko&svcName=map_pcv',
      { waitUntil: 'networkidle0' },
    );

    let targetFrame: Frame | null = null;
    let extractedIframeSrc: string | null = null;
    const imageResults: string[] = [];
    for (const frame of page.frames()) {
      const frameUrl = frame.url();
      // 네이버 지도 검색 및 상세 정보 iframe URL 패턴을 확인합니다.
      if (frameUrl.includes('https://pcmap.place.naver.com/')) {
        extractedIframeSrc = frameUrl;
        console.log(`추출된 iframe src: ${extractedIframeSrc}`);

        // iframe의 src 속성을 추출합니다.
        // 해당 frame을 포함하는 <iframe/> 요소를 찾아야 합니다.
        const frameContent = await frame.content();
        // cheerio 로드
        const $ = cheerio.load(frameContent);

        $('img').each((_, el) => {
          const imageResult = $(el).attr('src');
          console.log('this is img src', $(el).attr('src'));
          if (imageResult) {
            imageResults.push(imageResult);
          }
        });
        break;
      }
    }
    // 대상 iframe을 찾지 못했다면, 메인 페이지에서 시도하거나 에러를 반환합니다.
    if (!targetFrame) {
      console.warn(
        '경고: 네이버 지도 검색/엔트리 iframe을 찾지 못했습니다. 메인 프레임에서 시도합니다.',
      );
      targetFrame = page.mainFrame(); // 메인 프레임으로 설정
    }

    const parentContainerSelector = '.CB8aP';
    try {
      await targetFrame.waitForSelector(parentContainerSelector, {
        timeout: 10000,
      }); // 10초 대기
      console.log(
        `부모 셀렉터 "${parentContainerSelector}"를 대상 프레임에서 찾았습니다.`,
      );
    } catch (e) {
      console.warn(
        `경고: 대상 프레임에서 부모 셀렉터 "${parentContainerSelector}"를 찾지 못했습니다.`,
        e,
      );
    }

    // --- Puppeteer로 로드된 HTML을 가져와 Cheerio로 파싱 ---

    // // 대상 프레임의 HTML 콘텐츠를 가져옵니다.
    // const htmlContent = await targetFrame.content();
    // const $ = cheerio.load(htmlContent);

    // console.log('Puppeteer로 iframe HTML 콘텐츠 가져오기 성공.');

    // const extractedImages: { src?: string }[] = [];
    // $(`${parentContainerSelector} img`).each((index, element) => {
    //   const src = $(element).attr('src');
    //   extractedImages.push({ src });
    // });
    // const response = extractedImages.flatMap((value) => value.src);

    // // 페이지 내에서 JavaScript를 실행하여 데이터를 추출합니다.
    // const extractedLink: string | null = await page.evaluate((sel) => {
    //   const firstATag = document.querySelector(sel) as HTMLAnchorElement | null;
    //   return firstATag ? firstATag.href : null;
    // }, selector); // page.evaluate에 셀렉터를 인자로 전달

    return new NextResponse(JSON.stringify({ response: imageResults }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('크롤링 중 오류 발생:', error);
    // 오류 응답을 반환합니다.
    return new NextResponse(
      JSON.stringify({ error: '크롤링 중 오류가 발생했습니다.' }),
    );
  } finally {
    if (browser) {
      await browser.close();
      console.log('Puppeteer 브라우저 닫힘.');
    }
  }
}
