const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  first_name: String,
  last_name:String,
  dob:String,
  email: String,
  password: String,
  confirm_password:String
});

module.exports = mongoose.model("users", UserSchema);