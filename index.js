const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const mongoose = require("mongoose");
connectDB();

const app = express();

const Exercise = require("./models/exerciseModel");
const Test = require("./models/testModel");

//middleware that parses encoded data content-type: application/x-www-form-urlencoded, submitted by forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", async (req, res) => {
  res.json("hello");
});

app.get("/test", async (req, res) => {
  const exercises = await Exercise.find({});
  res.send(exercises);
});

app.post("/test", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      res.status(400).json("Please add all fields");
    }
    const userTest = await Test.create({
      name,
      age,
    });
    if (userTest) {
      res.status(200).json({
        _id: userTest.id,
        name: userTest.name,
        age: userTest.age,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT;
app.listen(port, async () =>
  console.log(`listening to port: ${port}`.white.underline.bgGreen)
);
