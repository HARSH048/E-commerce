const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    isblocked: {
      type: String,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  const user = this;
  const salt = bcrypt.genSaltSync(10);
  const encryptedpassword = bcrypt.hashSync(user.password, salt);
  user.password = encryptedpassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
