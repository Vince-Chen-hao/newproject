const SitemapGenerator = require('sitemap-generator');
const fs = require('fs');
const path = require('path');

// 設定網站 URL 和其他選項
const generator = SitemapGenerator('https://cleans717.tw', {
  filepath: path.resolve(__dirname, 'public', 'sitemap.xml'),
  maxDepth: 2, // 增加抓取深度
  maxEntriesPerFile: 50000,
  changefreq: 'daily',
  priority: 0.8,
  userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', // 模擬 Googlebot 爬蟲
});

// 開始生成網站地圖
generator.start();

generator.on('done', () => {
  console.log('Sitemap generated successfully!');
});
