const axios = require("axios");
const puppeteer = require("puppeteer");

async function history(url) {
  try {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: true });
    console.log("Browser launched.");
    const page = await browser.newPage();
    console.log("New page created.");

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    console.log("Page loaded.");
    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tbody tr");
      const result = [];
      rows.forEach((row) => {
        const columns = row.querySelectorAll("td");
        if (columns.length > 0) {
          const date = columns[0].innerText;
          const open = columns[1].innerText;
          const high = columns[2].innerText;
          const low = columns[3].innerText;
          const close = columns[4].innerText;
          const adjClose = columns[5].innerText;
          result.push({ date, open, high, low, close, adjClose });
        }
      });
      return result;
    });
    await browser.close();
    return data;
  } catch (error) {
    console.error("Error scraping data: " + error);
  }
}

module.exports = { history };
