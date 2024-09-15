const mongoose = require("mongoose");
const { connectionString } = require("./connectionString");

mongoose.connect(connectionString);

const schemaAnswer = new mongoose.Schema({
  questionId: String,
  corectOption: String,
});

const modelAnswer = mongoose.model('answerBank', schemaAnswer);

module.exports = {
  modelAnswer,
};
