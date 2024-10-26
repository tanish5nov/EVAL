import mongoose from 'mongoose';
import { connectionString } from "./connectionString";

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
