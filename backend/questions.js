const mongoose = require("mongoose");
const { connectionString } = require("./connectionString");

mongoose.connect(connectionString);

const schemaQuestion = new mongoose.Schema({
  problemStatement: String,
  
  options: [
    {
      type: String,
    }
  ],
  
  difficulty: String,

  Pictures: String,

  subjects: [
    {
      type: String,
    }
  ],

  correctAnswer: String,
});

const modelQuestion = mongoose.model("questions", schemaQuestion);

module.exports = {
  modelQuestion,
};
