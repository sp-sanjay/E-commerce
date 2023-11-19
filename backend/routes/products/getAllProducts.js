const productModel = require("../../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.send(products);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = getAllProducts;
