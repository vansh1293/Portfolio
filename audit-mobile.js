const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 }); // iPhone X
  
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle2' });
  
  // Wait a moment for ScrollReveal animations
  await new Promise(r => setTimeout(r, 2000));
  
  // Scroll down to the Work section
  await page.evaluate(() => {
    document.getElementById('projects').scrollIntoView();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: 'mobile-screenshot.png', fullPage: false });
  
  await browser.close();
  console.log('Screenshot saved to mobile-screenshot.png');
})();
