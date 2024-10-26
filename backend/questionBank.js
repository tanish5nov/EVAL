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
// schemaQuestion.index({question: -1});//descending order
schemaQuestion.index({question: 1});//ascending order

export default mongoose.model("questionBank", schemaQuestion);
