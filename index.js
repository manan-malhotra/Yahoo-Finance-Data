const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { initialData } = require("./cron/initialData");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./router/forexData");
app.use(bodyParser.json());
app.use("/api", routes);
initialData();
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
