const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/index");
const db = require("./models");

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);

db.sequelize.sync().then((req) => {
  app.listen(3001, () => {
    console.log("Запустился на сервере 3001");
  });
});
