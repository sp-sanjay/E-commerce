const UserModel = require("../../models/userModel");
const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not Found");
    }
    res.send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = getSingleUser;
