const OrderModel = require("../../../models/orderModel");
const ProductModel = require("../../../models/productModel");
const updateOrder = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      throw new Error("Order Not Found");
    }
    if (order.orderStatus === "Delivered") {
      throw new Error("Order is already Delivered");
    }
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
    order.orderStatus = orderStatus;
    if (orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
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

module.exports = updateOrder;

const updateStock = async (id, quantity) => {
    const product = await ProductModel.findById(id);
    if(!product.stock) {
        return;
    }
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false});
}
