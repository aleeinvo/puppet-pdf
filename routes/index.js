var express = require('express');
const path = require('path');
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
  res.render('index', { title: 'Express', user }, async (error, html) => {
    await page.setContent(html);
    // page.addStyleTag({
    //   path: path.resolve('./public/css/bootstrap.css')
    // });

    const pdf = await page.pdf({ format: 'A4', scale: 0.5 });
 
  await browser.close();
  
  res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
	res.send(pdf)
  });
})

module.exports = router;
