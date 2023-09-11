const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    service_provider:String,
    name: String,
    message:String,
    email: String,
    user_id:String,
    national_id:String
});

module.exports = mongoose.model("Help", UserSchema);