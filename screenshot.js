const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 800 });
  await page.goto('https://www.cingkang.com/schedule_auo.php', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'schedule.png' }); // 存成固定檔名
  await browser.close();
})();
