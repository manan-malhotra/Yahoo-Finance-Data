const accessDatabase = require("./../../conifg/db");
const { format, parse } = require("date-fns");
function formatDate(date) {
  return format(date, "yyyy-MM-dd");
}

function readDatabase(fromCurrency, toCurrency, from, to) {
  const db = accessDatabase();
  const fromDate = formatDate(from);
  const toDate = formatDate(to);
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM HistoricalData WHERE fromCurrency = ? AND toCurrency = ? AND date between ? and ?`,
      [fromCurrency, toCurrency, fromDate, toDate],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
    db.close();
  });
}

module.exports = { readDatabase };
