const { constructUrl } = require("./urlParser");
const { saveToDatabase } = require("./database/insertData");
const { history } = require("./history");
const { exit } = require("process");
async function scrapeData(fromCurrency, toCurrency, from, to) {
  const url = constructUrl(fromCurrency, toCurrency, from, to);
  try {
    const data = await history(url);
    if (data && data.length) {
      saveToDatabase(data, fromCurrency, toCurrency);
    } else {
      console.log("No data found to save.");
      exit();
    }
  } catch (error) {
    console.log("Error in scraping data", error);
  }
}
module.exports = { scrapeData };
