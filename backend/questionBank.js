const mongoose = require("mongoose");
const { connectionString } = require("./connectionString");

mongoose.connect(connectionString);

const schemaQuestion = new mongoose.Schema({
  problemStatement: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  subject: String,
  level: String,
});

const modelQuestion = mongoose.model("questionBank", schemaQuestion);

module.exports = {
  modelQuestion,
};
