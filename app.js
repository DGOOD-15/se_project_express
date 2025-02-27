const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then().catch();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "67be3c7393a1bf55cb05d43e",
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT);
