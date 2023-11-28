const ProductModel = require('../../models/productModel');
const getAllReview = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await ProductModel.findById(id);
        if(!product) {
            throw new Error("Product is Not Found");
        }
        res.json({
            success: true,
            reviews: product.reviews
        })
    } catch(err) {
        res.status(500).json({success: false, message: err.message})
    }
}

module.exports = getAllReview;