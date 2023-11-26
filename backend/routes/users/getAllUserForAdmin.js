const UserModel = require("../../models/userModel");
const getAllUSer = async (req, res, next) => {
  try {
    const users = await UserModel.find({ role: "user" });
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = getAllUSer;
