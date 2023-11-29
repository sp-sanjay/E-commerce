const OrderModel = require("../../models/orderModel");
const getMyOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id });
    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = getMyOrders;
