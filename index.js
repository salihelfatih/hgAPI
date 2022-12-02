const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models");
const config = require("./config/config");
// const path = require('path');
// const fs = require('fs');
// const db = require('./config/database');

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

require("./routes")(app);

sequelize.sync({}).then(() => {
  app.listen(config.server);
  console.log(`Server started on port ${config.server}`);
});
