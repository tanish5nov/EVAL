import mongoose from 'mongoose';
import { connectionString } from "./connectionString";

mongoose.connect(connectionString);

const schemaTest = new mongoose.Schema({
  title: String,
  sections: [
    title: String,
    questions: [
    {
      type: String,
      ref: "questions",
    }
    ]
  ]
});

const modelTest = mongoose.model("testBank", schemaTest);

module.exports = {
  modelTest,
};
