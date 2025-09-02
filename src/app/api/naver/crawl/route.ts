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

export interface CrawlResponseTypes {
  images: string[];
  hours: string[];
  location: string;
  storeName: string;
  storeType: string;
}

export async function GET(
  request: Request,
): Promise<NextResponse<CrawlResponseTypes>> {
  let browser: Browser | null = null;

  try {
    const { searchParams } = new URL(request.url);
    const searchKeyword = searchParams.get('searchKeyword');

    if (!searchKeyword) {
      return new NextResponse(
        JSON.stringify({ error: '검색어가 필요합니다.' }),
        {
          status: 400,
        },
      );
    }

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    await page.goto(searchKeyword, { waitUntil: 'networkidle0' });

    // --- 1. searchIframe 프레임 찾기 ---
    const searchFrame_1 = await getFrameById(page, 'entryIframe');
    if (!searchFrame_1) {
      throw new Error('searchIframe을 찾지 못했습니다.');
    }

    // --- 2. anchor 태그 대기 ---
    const anchorSelector_1 = 'a.place_thumb.QX0J7';
    await searchFrame_1.waitForSelector(anchorSelector_1, { timeout: 10000 });

    // --- 3. href 추출 ---
    // const href_1 = await searchFrame_1.$eval(
    //   anchorSelector_1,
    //   (el: HTMLAnchorElement) => el.href,
    // );

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
    // const href_2 = await entryFrame.$eval(
    //   anchorSelector_2,
    //   (el: HTMLAnchorElement) => el.href,
    // );

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
      { timeout: 10000 },
    );

    const homeTab = 'a.tpj9w._tab-menu';
    await detailFrame.click(homeTab);

    const storeNameSelector = 'span.GHAhO';
    const storeName = await detailFrame.$$eval(
      storeNameSelector,
      (els: HTMLElement[]) => els.map((el) => el.innerText.trim()),
    );

    //상점 클릭
    const storeTypeSelector = 'span.lnJFt';
    const storeType = await detailFrame.$$eval(
      storeTypeSelector,
      (els: HTMLElement[]) => els.map((el) => el.innerText.trim()),
    );

    //영업시간 클릭하기
    const hourAnchor = 'a.gKP9i.RMgN0';
    await detailFrame.click(hourAnchor);

    //영업시간 가져오기
    const hoursSelector = 'div.w9QyJ';
    const hours = await detailFrame.$$eval(
      hoursSelector,
      (els: HTMLElement[]) =>
        els.map((el) =>
          Array.from(el.querySelectorAll('*')).map(
            (child) => child.textContent?.trim() || '',
          ),
        ),
    );

    const locationSelector = 'span.LDgIH';
    const location = await detailFrame.$$eval(
      locationSelector,
      (els: HTMLElement[]) => els.map((el) => el.innerText.trim()),
    );

    return new NextResponse(
      JSON.stringify({
        images: imgSrcList.splice(0, 5),
        location: location[0],
        storeName: storeName[0],
        storeType: storeType[0],
        hours: hours,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('크롤링 오류:', error);
    return new NextResponse(JSON.stringify({ error: '크롤링 실패' }), {
      status: 500,
    });
  }
  // finally {
  //   if (browser) await browser.close();
  // }
}
