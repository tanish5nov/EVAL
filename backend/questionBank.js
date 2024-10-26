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

export default mongoose.model("questionBank", schemaQuestion);
