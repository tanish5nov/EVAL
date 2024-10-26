const mongoose = require("mongoose");
const { connectionString } = require("./connectionString");

mongoose.connect(connectionString);

const schemaQuestion = new mongoose.Schema({
  question: [
    {
      type: String,
      ref: "questions",
    }
  ]
});

const modelQuestion = mongoose.model("questionBank", schemaQuestion);

module.exports = {
  modelQuestion,
};
