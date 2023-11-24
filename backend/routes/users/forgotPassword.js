const UserModel = require("../../models/userModel");
const sendEmail = require("../../utils/sendEmail");
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Please Enter valid Email");
    }

    const token = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/reset/${token}`;

    const message = `Please click this link to reset your password:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

    try {
      await sendEmail({
        email,
        subject: "Reset Password for your Account",
        message,
      });
      res.send({ message: `Email sent to ${email} is successfully` });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(500).send(err.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = forgotPassword;
