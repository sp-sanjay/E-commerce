const UserModel = require("../../../models/userModel");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "product Not Found",
      });
    }
    const deletedUser = await UserModel.findByIdAndDelete(id);
    console.log(deletedUser);
    res.json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = deleteUser;
