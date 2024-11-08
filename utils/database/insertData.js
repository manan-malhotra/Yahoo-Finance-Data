const accessDatabase = require("./../../conifg/db");
const { parse, format } = require("date-fns");
function datetime(date) {
  const parsedDate = parse(date, "MMM dd, yyyy", new Date());
  return format(parsedDate, "yyyy-MM-dd");
}
function saveToDatabase(data, fromCurrency, toCurrency) {
  const db = accessDatabase();

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS HistoricalData (
      fromCurrency TEXT,
      toCurrency TEXT,
      date DATE,
      open TEXT,
      high TEXT,
      low TEXT,
      close TEXT,
      adjClose TEXT,
      PRIMARY KEY (fromCurrency, toCurrency, date)
    )`);

    const stmt = db.prepare(
      `INSERT OR IGNORE INTO HistoricalData (fromCurrency, toCurrency, date, open, high, low, close, adjClose) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    data.forEach((row) => {
      stmt.run(
        fromCurrency,
        toCurrency,
        datetime(row.date),
        row.open,
        row.high,
        row.low,
        row.close,
        row.adjClose
      );
    });
    stmt.finalize();
  });

  db.close();
}
module.exports = { saveToDatabase };
