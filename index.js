const Scraper = require('./Scraper.js');

const abdul = '7089206228@vtext.com';

const scrapers = [
  new Scraper(
    'Engine',
    'https://jdmengineschicago.com/honda/engines/acura-tsx-k24a-2-4l-dohc-vtec/845/jdm-2004-2008-acura-tsx-k24a3-2-4l-dohc-vtec-rb1-engine-with-6-speed-m-t/',
    abdul,
    'div.price_title',
    'h4.mt0'
  ),
];

scrapers.forEach(async (scraper) => {
    await scraper.scrape();
  });

// const handle = setInterval(async () => {
  
// }, 1000 * 60);
