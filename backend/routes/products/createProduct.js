const productModel = require("../../models/productModel");
// -----Admin Route ------
const createProduct = async (req, res, next) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = createProduct;
