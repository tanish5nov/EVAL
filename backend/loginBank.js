const mongoose = require("mongoose");
const { connectionString } = require("./connectionString");

mongoose.connect(connectionString);

const schemaLogin = new mongoose.Schema({
  userId: String,
  type: String,
});

const modelLogin = mongoose.model("loginBank", schemaLogin);

module.exports = {
  modelLogin,
};
