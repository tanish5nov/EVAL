import mongoose from 'mongoose';
import { connectionString } from "./connectionString";

mongoose.connect(connectionString);

const schemaAnswer = new mongoose.Schema({
  questionId: String,
  corectOption: String,
});
const answerModel = mongoose.model('answerBank', schemaAnswer);
export default answerModel;

// module.exports = {
//   modelAnswer,
// };
