const UserModel = require("../../models/userModel");
const updateProfile = async (req, res, next) => {
  try {
    const userData = {
      email: req.body.email,
      name: req.body.name,
    };
    ///important options for getting perfect response after update
    const options = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      userData,
      options
    );
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = updateProfile;
