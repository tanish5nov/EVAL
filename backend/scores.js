const mongoose = require("mongoose");
const { connectionString } = require("./connectionString");

mongoose.connect(connectionString);

const schemaScores = new mongoose.Schema({
  rollNo: String,
  testID: String,
  score: Number,
});

const modelScores = mongoose.model("scores", schemaScores);

module.exports = {
  modelScores,
};
