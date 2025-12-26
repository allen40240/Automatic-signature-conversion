const puppeteer = require('puppeteer');
(async () => {
  // 增加 args: ['--no-sandbox'] 繞過環境限制
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  // 設定視窗大小
  await page.setViewport({ width: 500, height: 800 });
  
  // 前往目標網頁
  await page.goto('https://www.cingkang.com/schedule_auo.php', { waitUntil: 'networkidle2' });
  
  // 截圖並儲存
  await page.screenshot({ path: 'schedule.png' });
  
  await browser.close();
  console.log('截圖成功！');
})();
