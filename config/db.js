const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      "mongodb+srv://workoutPlanner123:workoutPlanner123@cluster0.l7xw66t.mongodb.net/workoutPlanner",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //   useFindAndModify: false,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
