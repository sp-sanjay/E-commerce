const ProductModel = require("../../models/productModel");
const ErrorHandler = require("../../utils/errorHandler");

const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product Not Found",
      });
    }
    res.json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getSingleProduct;
