const crypto = require("crypto");
const UserModel = require("../../models/userModel");
const getToken = require("../../utils/getToken")
const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Reset Password Token is invalid or has been expired");
    }
    const {password, confirmPassword} = req.body;
    if(password !== confirmPassword) {
        throw new Error("Password does not matched")
    }
    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    getToken(user,200,res)
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = resetPassword;
