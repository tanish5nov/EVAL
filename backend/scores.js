import mongoose from 'mongoose';
import { connectionString } from "./connectionString";

mongoose.connect(connectionString);

const schemaScores = new mongoose.Schema({
  
  rollNo: String,
  // testID: String,
  score: [Number],
});

const scoresModel = mongoose.model("scores", schemaScores);

export default scoresModel;

// module.exports = {
//   modelScores,
// };
