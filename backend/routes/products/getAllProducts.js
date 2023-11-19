const productModel = require("../../models/productModel");
const ApiFeatures = require("../../utils/apiFeature");

const getAllProducts = async (req, res) => {
  try {
    const apiFeatures = new ApiFeatures(productModel.find(), req.query)
      .search()
      .filter()
      .pagination();
    const productCount = await productModel.countDocuments();
    const products = await apiFeatures.query;
    res.send({ products, productCount });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = getAllProducts;
