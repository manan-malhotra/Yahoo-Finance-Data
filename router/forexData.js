const express = require("express");
const { getDates } = require("../utils/getDates");
const { readDatabase } = require("../utils/database/readData");
const { validateData } = require("../router/middleware");
const router = express.Router();
router.post("/forex-data", validateData, async (req, res) => {
  const { from: fromCurrency, to: toCurrency, period } = req.body;
  const timeStamp = getDates(period);
  const data = await readDatabase(
    fromCurrency,
    toCurrency,
    timeStamp.from,
    timeStamp.to
  );
  res.json({ data });
});
module.exports = router;
