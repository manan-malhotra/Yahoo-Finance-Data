const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./router/forexData");
app.use(bodyParser.json());
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
