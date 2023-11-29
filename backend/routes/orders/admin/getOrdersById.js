const OrderModel = require("../../../models/orderModel");
const getOrdersById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      throw new Error("Order Not Found");
    }
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = getOrdersById;
