var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dev', async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });
 
  await browser.close();
  
  res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
	res.send(pdf)
})

module.exports = router;
