var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer')

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = {
    name: 'Amna Mustafa',
    skills: [
      {
        name: 'PHP',
        level: 3
      },
      {
        name: 'Node',
        level: 5,
      },
      {
        name: 'Laravel',
        level: 2
      },
      {
        name: 'Git',
        level: 1
      }
    ]
  };
  res.render('index', { title: 'Express', user });
});

router.get('/dev', async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4', scale: 0.5 });
 
  await browser.close();
  
  res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
	res.send(pdf)
})

module.exports = router;
