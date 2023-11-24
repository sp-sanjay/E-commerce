const UserModel = require("../../models/userModel");
const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = getUserProfile;