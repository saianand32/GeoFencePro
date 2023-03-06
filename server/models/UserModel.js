const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  connectionKey: {
    key:{
      type:String
    },
    isValid:{
      type:Boolean
    }
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  IsLocationValid: {
    type: Boolean,
  },
});

module.exports = mongoose.model("users", UserSchema);
