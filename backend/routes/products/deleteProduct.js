const ProductModel = require("../../models/productModel");

// ------Admin Route ------
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product Not Found",
      });
    }
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    console.log(deletedProduct);
    res.json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = deleteProduct;
