// app/api/crawl/route.ts
import { NextResponse } from 'next/server';
import puppeteer, { Browser, Frame, Page } from 'puppeteer';

// --- 특정 iframe을 id로 찾는 헬퍼 함수 ---
async function getFrameById(
  page: Page,
  frameId: string,
): Promise<Frame | null> {
  const iframeElement = await page.$(`iframe#${frameId}`);
  if (!iframeElement) return null;
  return await iframeElement.contentFrame();
}

export async function GET(request: Request) {
  let browser: Browser | null = null;

  try {
    const { searchParams } = new URL(request.url);
    const searchKeyword = searchParams.get('searchKeyword');

    if (!searchKeyword) {
      return new NextResponse(
        JSON.stringify({ error: '검색어가 필요합니다.' }),
        { status: 400 },
      );
    }

    const naverMapSearchUrl = `https://map.naver.com/p/search/${encodeURIComponent(
      searchKeyword,
    )}`;
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    await page.goto(naverMapSearchUrl, { waitUntil: 'networkidle0' });

    // --- 1. searchIframe 프레임 찾기 ---
    const searchFrame_1 = await getFrameById(page, 'searchIframe');
    if (!searchFrame_1) {
      throw new Error('searchIframe을 찾지 못했습니다.');
    }

    // --- 2. anchor 태그 대기 ---
    const anchorSelector_1 = 'a.place_bluelink.C6RjW.k4f_J';
    await searchFrame_1.waitForSelector(anchorSelector_1, { timeout: 10000 });

    // --- 3. href 추출 ---
    const href_1 = await searchFrame_1.$eval(
      anchorSelector_1,
      (el: HTMLAnchorElement) => el.href,
    );
    console.log('검색 결과 링크:', href_1);

    // // --- 4. 클릭해서 이동 ---
    // await searchFrame_1.click(anchorSelector_1);
    // // await page.waitForNavigation({ waitUntil: 'networkidle0' }); // 페이지 이동을 기다림

    // --- 4. 클릭해서 이동 ---
    await searchFrame_1.click(anchorSelector_1);

    // ✅ 여기서는 page.waitForNavigation() 대신
    // entryIframe 이 뜰 때까지 기다려야 함
    await page.waitForSelector('iframe#entryIframe', { timeout: 15000 });

    // --- 5. entryIframe 프레임 다시 찾기 ---
    const entryFrame = await getFrameById(page, 'entryIframe');
    if (!entryFrame) {
      throw new Error('entryIframe을 찾지 못했습니다.');
    }

    //--- 6. 두번째 anchor 태그 대기 ---
    const anchorSelector_2 = 'a.place_thumb.QX0J7';
    await entryFrame.waitForSelector(anchorSelector_2, { timeout: 10000 });

    // --- 7. href 추출 ---
    const href_2 = await entryFrame.$eval(
      anchorSelector_2,
      (el: HTMLAnchorElement) => el.href,
    );
    console.log('검색 결과 링크2 :', href_2);

    // --- 8. 클릭해서 이동 ---
    await entryFrame.click(anchorSelector_2);

    // ✅ 다시 iframe 변화가 일어나므로 entryIframe 을 다시 기다림
    await page.waitForSelector('iframe#entryIframe', { timeout: 15000 });

    // --- 9. 상세 페이지용 entryIframe 다시 가져오기 ---
    const detailFrame = await getFrameById(page, 'entryIframe');
    if (!detailFrame) {
      throw new Error('상세 entryIframe을 찾지 못했습니다.');
    }

    // --- 10. 이미지 src 전부 추출 ---
    const imgSelector = 'img';
    const imgSrcList = await detailFrame.$$eval(
      imgSelector,
      (els: HTMLImageElement[]) => els.map((el) => el.src),
    );

    console.log('이미지 src 리스트:', imgSrcList);
    return new NextResponse(JSON.stringify({ images: imgSrcList }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('크롤링 오류:', error);
    return new NextResponse(JSON.stringify({ error: '크롤링 실패' }), {
      status: 500,
    });
  } finally {
    if (browser) await browser.close();
  }
}
