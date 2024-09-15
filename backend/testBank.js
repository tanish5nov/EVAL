const mongoose = require("mongoose");
const { connectionString } = require("./connectionString");

mongoose.connect(connectionString);

const schemaTest = new mongoose.Schema({
  questionId: [String],
});

const modelTest = mongoose.model("testBank", schemaTest);

module.exports = {
  modelTest,
};
