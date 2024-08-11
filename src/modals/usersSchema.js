const mongoose = require("mongoose");
const validator = require("validator");
//const { UUID } = Realm.BSON;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  psw: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  googleId: String,
});
const User = new mongoose.model("Users", userSchema);
module.exports = User;
