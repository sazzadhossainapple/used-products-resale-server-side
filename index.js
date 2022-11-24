const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

//muddleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    status: "success",
    message: "E-Shoppers Server is running.",
  });
});

app.listen(port, () => {
  console.log(`E-Shoppers server on running port ${port}`);
});
