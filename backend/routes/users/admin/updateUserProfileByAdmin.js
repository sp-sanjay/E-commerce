//Update any user profile by admin can change role

const UserModel = require("../../../models/userModel");
const updateUserProfileByAdmin = async (req, res, next) => {
  try {
    const userData = {
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
    };
    ///important options for getting perfect response after update
    const options = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      userData,
      options
    );
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = updateUserProfileByAdmin;
