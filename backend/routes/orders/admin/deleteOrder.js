const OrderModel = require("../../../models/orderModel");
const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      throw new Error("Order Not Found");
    }
    await OrderModel.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = deleteOrder;
