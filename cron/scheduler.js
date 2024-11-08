const cron = require("node-cron");
const { currency } = require("./data");
const { getDates } = require("../utils/getDates");
function scheduleTasks() {
  // At 12:00 AM Every Day
  cron.schedule("0 0 * * *", () => {
    try {
      const timeStamp = getDates("1D");
      currency.forEach((item) => {
        scrapeData(
          item.fromCurrency,
          item.toCurrency,
          timeStamp.from,
          timeStamp.to
        );
      });
    } catch (error) {
      console.log(error);
    }
  });

  // At 12:00 PM Every Day
  cron.schedule("0 12 * * *", () => {
    try {
      const timeStamp = getDates("1D");
      currency.forEach((item) => {
        scrapeData(
          item.fromCurrency,
          item.toCurrency,
          timeStamp.from,
          timeStamp.to
        );
      });
    } catch (error) {
      console.log(error);
    }
  });

  // At 12:00 AM, only on Monday
  cron.schedule("0 0 * * 1", () => {
    try {
      const timeStamp = getDates("1W");
      currency.forEach((item) => {
        scrapeData(
          item.fromCurrency,
          item.toCurrency,
          timeStamp.from,
          timeStamp.to
        );
      });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = { scheduleTasks };
