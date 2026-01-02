import { chromium as pw } from 'playwright-core'
import chromium from "@sparticuz/chromium"
// import { json } from "@sveltejs/kit"
import { onError } from "@toolsntuts/utils"
import puppeteer from "puppeteer-core"
// import puppeteer from 'puppeteer'
// import { getChromePath } from 'chrome-launcher'
import puppeteerExtra from 'puppeteer-extra'
import Stealth from 'puppeteer-extra-plugin-stealth'
import { dev } from "$app/environment"
// import type { Page } from 'puppeteer'
import type { Page } from 'puppeteer-core'



const stealthMode = async (url: string) => {

  const email = "br.ibironke@gmail.com"
  const password = "TmbkBr!2025!!"
  puppeteerExtra.use(Stealth())

  const browser = await puppeteerExtra.launch({
    args: chromium.args,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true
  })

  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  const page = await browser.newPage()

  await page.setViewport({ width: 1920, height: 1080 })

  await page.setUserAgent(ua)

  await page.goto(url, { waitUntil: 'networkidle2' })

  // const body = await page.content()

  // console.log({ body })
  // await page.type('input', email)
  // await page.keyboard.press('Enter')
  // await page.waitForNetworkIdle()
  // await page.type('input[aria-label="Password"]', password)
  // await page.keyboard.press('Enter')
  // await page.waitForNetworkIdle()

  await page.screenshot({
    path: 'screenshot_stealth.png'
  })

  await browser.close()
}

const playWrightMode = async (url: string) => {
  const executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe"
  const browser = await pw.launch({
    executablePath,
    args: chromium.args,
    headless: dev ? false : true,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const html = await page.content();

  let screenshotBuffer: Buffer | undefined = await page.screenshot({ fullPage: true });

  await browser.close();

  const headers = { 'Content-Type': 'application/json' };
  const body = {
    html,
    screenshot: screenshotBuffer?.toString('base64'),
  };

  return new Response(JSON.stringify(body), { headers });
};

const normalMode = async (url: string) => {

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true
  })

  const page = await browser.newPage()

  // Define a helper to detect rendering completion: no skeleton loaders,
  // key content visible, and DOM stable over time.
  const renderCheck = async () => {
    return await page.evaluate(() => {
      const skeletons = document.querySelectorAll('.skeleton, .loading, [data-loading], .product-async-seller-name');

      console.log({ skeletons: skeletons.length })
      const solids = document.querySelectorAll(
        'img, p, div:not(.skeleton):not([style*="display:none"]), .product-item-info'
      );
      const hasNoSkeleton = skeletons.length === 0;
      const hasContent = solids.length > 5;
      return hasNoSkeleton && hasContent;
    });
  };

  // Set a realistic User-Agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
    'Chrome/115.0.0.0 Safari/537.36'
  );
  page.setViewport({ width: 1920, height: 1080 })

  // Navigate and wait until network is completely idle
  await page.goto(url, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
    // timeout: 60000, // generous timeout for complex sites
  });

  // Wait for our custom condition to be true and the DOM to settle
  await page.waitForFunction(
    renderCheck,
    { polling: 500, timeout: 60000 }
  );

  // Wait for our custom condition to be true and the DOM to settle
  await page.waitForFunction(
    renderCheck,
    { polling: 500, timeout: 60000 }
  );
}


const serverlessModeWith = async (url: string) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  );

  page.setViewport({ width: 1920, height: 1080 });

  // Navigate to the target URL
  await page.goto(url, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
    timeout: 30000 // Increased timeout to give more room for rendering
  });

  // **Added: Wait for an additional short period to allow JavaScript to finalize rendering.**
  // This is a common heuristic for highly dynamic pages.
  // Adjust the duration (in milliseconds) as needed based on the target website's behavior.
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds

  const data = await page.content();

  await browser.close();
  return data;
};

const serverlessMode = async (url: string) => {
  // Launch headless browser with Vercel’s Chromium settings
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  // Define a helper to detect rendering completion: no skeleton loaders,
  // key content visible, and DOM stable over time.
  const renderCheck = async () => {
    return await page.evaluate(() => {
      const skeletons = document.querySelectorAll('.skeleton, .loading, [data-loading], .product-async-seller-name');

      console.log({ skeletons: skeletons.length })
      const solids = document.querySelectorAll(
        'img, p, div:not(.skeleton):not([style*="display:none"]), .product-item-info'
      );
      const hasNoSkeleton = skeletons.length === 0;
      const hasContent = solids.length > 5;
      return hasNoSkeleton && hasContent;
    });
  };

  // Set a realistic User-Agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
    'Chrome/115.0.0.0 Safari/537.36'
  );
  page.setViewport({ width: 1920, height: 1080 });

  // Navigate and wait until network is completely idle
  await page.goto(url, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
    timeout: 60000, // generous timeout for complex sites
  });

  // Wait for our custom condition to be true and the DOM to settle
  await page.waitForFunction(
    renderCheck,
    { polling: 500, timeout: 60000 }
  );

  // Optional: one final pause to let late microtasks finish
  // await page.waitForTimeout(1000);


  // At this point, the page should be fully rendered
  console.log('pageFullyRendered:', true);

  // Retrieve final HTML
  const html = await page.content();

  await browser.close();
  return html;
};


export const scrapeWithPuppeteer = async (url: string) => {
  if (!url) {
    return onError("Missing url")
  }

  try {

    // await stealthMode(url)
    // const data = serverlessMode(url)
    const data = normalMode(url)
    // const data = playWrightMode(url)
    return data
  } catch (error: any) {
    console.log({ error })
    return error.message
  }
}