const userModel = require("../../models/userModel");
const getToken = require("../../utils/getToken");

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await userModel.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(currentPassword);
    if (!isPasswordMatched) {
      throw new Error("current Password is incorrect");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("Password doesnot matched");
    }
    user.password = newPassword;
    await user.save();
    getToken(user, 200, res);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = changePassword;
