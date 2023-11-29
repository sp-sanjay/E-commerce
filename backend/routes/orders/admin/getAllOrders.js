const OrderModel = require("../../../models/orderModel");
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));
    res.json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = getAllOrders;
