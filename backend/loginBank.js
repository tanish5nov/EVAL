import mongoose from 'mongoose';
import { connectionString } from "./connectionString";

mongoose.connect(connectionString);

const schemaLogin = new mongoose.Schema({
  userId: String,
  type: String,
});

const loginModel = mongoose.model("loginBank", schemaLogin);

export default loginModel;

// module.exports = {
  // modelLogin,
// };
