import mongoose from 'mongoose';
import { connectionString } from "./connectionString";

mongoose.connect(connectionString);

const schemaScores = new mongoose.Schema({
  
  rollNo: String,
  // testID: String,
  score: [Number],
});

export default mongoose.model("scores", schemaScores);

// module.exports = {
//   modelScores,
// };
