const ProductModel = require("../../models/productModel");

// ------Admin Route ------
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product Not Found",
      });
    }
    ///important options for getting perfect response after update
    const options = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      req.body,
      options
    );
    res.json({
      success: true,
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = updateProduct;
