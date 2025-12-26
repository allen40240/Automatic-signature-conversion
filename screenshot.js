const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  // 設定真實的 User-Agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');

  // 設定視窗大小
  await page.setViewport({ width: 1280, height: 1000 });

  try {
    // 前往目標網頁，並等待更久一點確保繞過驗證
    await page.goto('https://www.cingkang.com/schedule_auo.php', { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });

    // 額外等待 5 秒，給驗證頁面跳轉的時間
    await new Promise(r => setTimeout(r, 5000));

    // 截圖
    await page.screenshot({ path: 'schedule.png', fullPage: false });
    console.log('截圖成功！');
  } catch (err) {
    console.error('發生錯誤：', err);
  } finally {
    await browser.close();
  }
})();
