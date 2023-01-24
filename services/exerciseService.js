const localURL = "http://localhost:80/api/exercises";
const axios = require("axios");

const findExercisesByGroup = async (req, res) => {
  try {
    const response = await axios.get(`${localURL}`);
    const exercises = response.data;
    return exercises;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { findExercisesByGroup };
