function getDates(period) {
  const to = new Date();
  const from = new Date();
  switch (period) {
    case "1D":
      from.setDate(from.getDate() - 1);
      break;
    case "1W":
      from.setDate(from.getDate() - 7);
      break;
    case "1M":
      from.setDate(from.getDate() - 30);
      break;
    case "3M":
      from.setDate(from.getDate() - 90);
      break;
    case "6M":
      from.setDate(from.getDate() - 180);
      break;
    case "1Y":
      from.setDate(from.getDate() - 365);
      break;
  }
  return { from, to };
}

module.exports = { getDates };
