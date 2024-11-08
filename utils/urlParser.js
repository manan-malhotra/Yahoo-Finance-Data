function toUnixTimestamp(date) {
  return Math.floor(new Date(date).getTime() / 1000);
}

function constructUrl(fromCurrency, toCurrency, fromDate, toDate) {
  const period1 = toUnixTimestamp(fromDate);
  const period2 = toUnixTimestamp(toDate);
  const quote = fromCurrency + toCurrency + "=X";
  const encodedQuote = encodeURIComponent(quote);
  return `https://finance.yahoo.com/quote/${encodedQuote}/history/?period1=${period1}&period2=${period2}`;
}

module.exports = { constructUrl };
