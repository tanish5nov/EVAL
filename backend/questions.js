import mongoose from 'mongoose';
import { connectionString } from "./connectionString";

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

schemaQuestion.index({problemStatement: 1});

export default mongoose.model("questions", schemaQuestion);

// module.exports = {
  // modelQuestion,
// };
