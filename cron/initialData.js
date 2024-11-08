const { scrapeData } = require("../utils/scrape");
const { currency } = require("./data");
const { getDates } = require("../utils/getDates");
const { scheduleTasks } = require("../cron/scheduler");
function initialData() {
  try {
    const timeStamp = getDates("1Y");
    currency.forEach((item) => {
      scrapeData(
        item.fromCurrency,
        item.toCurrency,
        timeStamp.from,
        timeStamp.to
      );
    });
    scheduleTasks();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { initialData };
