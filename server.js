const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

app.get("/api", async (req, res) => {
  return res.status(200).json({ title: "working" });
});

const port = 8000;
app.listen(port, () => console.log(`listening to port: ${port}`));
