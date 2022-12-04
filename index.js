const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models");
const config = require("./config/config");
const path = require("path");
const PORT = process.env.PORT || config.server;
const fs = require("fs");
// const db = require('./config/database');
const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
require("./routes")(app);
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
  // app.use(express.static(path.join(__dirname, "../ui/dist")));
}

// app.get(/.*/, function (req, res) {
//   res.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
// });

sequelize
  .sync({})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
