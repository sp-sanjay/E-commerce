const mongoose = require("mongoose");
const validator = require("validator");
const bcrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name Should less then 30 character"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should altleat 8 character"],
      select: false,
    },
    avatar: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  //stop hashing password when already hashed password
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrpt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = async function () {
  const token = await jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET
    //   , {
    //   expiresIn: process.env.JWT_EXPIRY,
    // }
  );
  return token;
};
//compare password with hashing

userSchema.methods.comparePassword = async function (enteredPassword) {
  const isPasswordMatched = await bcrpt.compare(enteredPassword, this.password);
  return isPasswordMatched;
};

//create resetpassword token and store in database

userSchema.methods.getResetPasswordToken = function () {
  //Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding resetPasswordToken to database

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Expire token after 15 minutes
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
