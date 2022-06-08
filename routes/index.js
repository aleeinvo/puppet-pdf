var express = require('express');
const path = require('path');
var router = express.Router();
const puppeteer = require('puppeteer')

/* GET home page. */
router.get('/', function (req, res, next) {
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
        level: 4
      }
    ]
  };

  user.skills.map(skill => {
    const level = [];
    for (let index = 1; index <= 5; index++) {
      level.push({
        has: skill.level >= index
      })
    }

    skill.level = level;

    return skill;
  })
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
        level: 3,
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
        level: 1,
      }
    ]
  };

  const levels = [
    { some: 1 },
    { some: 2 },
    { some: 3 },
    { some: 4 },
    { some: 5 }
  ]
  res.render('index', { title: 'Express', user, levels }, async (error, html) => {
    await page.setContent(html);
    const pdfPath = 'cv-' + Date.now() + '.pdf';
    const pdf = await page.pdf({ format: 'A4', scale: 0.5, path: path.join(global.uploadDir, pdfPath) });

    await browser.close();

    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    res.send(pdf)
  });
})

module.exports = router;
