const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { MongoClient } = require("mongodb");

const app = express();

// Connection URL
const url =
  "mongodb+srv://workoutPlanner123:workoutPlanner123@cluster0.l7xw66t.mongodb.net/workoutPlanner";

const client = new MongoClient(url);
const dbName = "workoutPlanner";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

app.use("/", async function (req, res) {
  const data = await global.db.collection("exercises").find({}).toArray();
  res.send({ data });
});

client.connect().then(() => {
  global.db = client.db(dbName);

  app.listen(8000, async () => {
    console.log(`listening to server`.green.underline);
  });
});
