const sqlite3 = require("sqlite3").verbose();

const accessDatabase = () => {
  const db = new sqlite3.Database("./historicalData.db", (err) => {
    if (err) {
      console.error("Failed To Connect Database", err.message);
      process.exit(1);
    }
    return console.log("Database Connected Successfully");
  });

  return db;
};

module.exports = accessDatabase;
