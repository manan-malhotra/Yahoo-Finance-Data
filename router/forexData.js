const express = require("express");
const { getDates } = require("../utils/getDates");
const { readDatabase } = require("../utils/database/readData");
const { validateData } = require("../router/middleware");
const router = express.Router();
router.post("/forex-data", validateData, async (req, res) => {
  const { from: fromCurrency, to: toCurrency, period } = req.query;
  const timeStamp = getDates(period);
  try {
    const data = await readDatabase(
      fromCurrency,
      toCurrency,
      timeStamp.from,
      timeStamp.to
    );
    if (!data) {
      res.status(500).json({ error: "Data not found" });
      return;
    }
    res.json({ data });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: "Facing some issues in fetching data.",
    });
  }
});
module.exports = router;
