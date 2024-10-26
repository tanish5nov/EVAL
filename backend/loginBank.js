import mongoose from 'mongoose';
import { connectionString } from "./connectionString";

mongoose.connect(connectionString);

const schemaLogin = new mongoose.Schema({
  userId: String,
  type: String,
});

const modelLogin = mongoose.model("loginBank", schemaLogin);

module.exports = {
  modelLogin,
};
