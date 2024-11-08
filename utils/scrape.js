const { constructUrl } = require("./urlParser");
const { saveToDatabase } = require("./database/insertData");
const { history } = require("./history");
const { exit } = require("process");
async function scrapeData() {
  // Will be automated through cron later
  const fromCurrency = "EUR";
  const toCurrency = "INR";
  const to = new Date();
  const from = new Date();
  to.setDate(from.getDate() - 30);
  from.setDate(from.getDate() - 100);

  const url = constructUrl(fromCurrency, toCurrency, from, to);
  console.log(`Fetching data from: ${url}`);

  const data = await history(url);
  if (data && data.length) {
    saveToDatabase(data, fromCurrency, toCurrency);
  } else {
    console.log("No data found to save.");
    exit();
  }
}
module.exports = { scrapeData };
