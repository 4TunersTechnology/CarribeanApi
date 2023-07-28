const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    imgUrl:Array
  });
module.exports = mongoose.model("data", UserSchema);