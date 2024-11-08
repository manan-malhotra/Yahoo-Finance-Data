const express = require("express");
const { getDates } = require("../utils/getDates");
const { readDatabase } = require("../utils/database/readData");
const middleware = (req, res, next) => {
  next();
};
const router = express.Router();
router.post("/forex-data", middleware, async (req, res) => {
  const { from: fromCurrency, to: toCurrency, period } = req.body;
  const timeStamp = getDates(period);
  const to = new Date();
  const from = new Date();
  to.setDate(from.getDate());
  from.setDate(from.getDate() - 1);
  console.log(fromCurrency, toCurrency, from, to);
  console.log(fromCurrency, toCurrency, timeStamp.from, timeStamp.to);
  const data = await readDatabase("EUR", "INR", timeStamp.from, timeStamp.to);
  res.json({ data });
});
module.exports = router;
