const ProductModel = require('../../../models/productModel')
const deleteReview = async (req, res) => {
    try {
        const { id, productId } = req.query;
        const product = await ProductModel.findById(productId)

        if(!product) {
            throw new Error("Product Not Found");
        }

        const reviews = product.reviews.filter(rev => rev._id.toString() !== id.toString());
        product.reviews = reviews;
        product.numOfReviews = product.reviews.length;
        let total = 0;
        product.reviews.forEach(rev => total += rev.rating)
        product.ratings = total/product.reviews.length;
        await product.save({validateBeforeSave: false});
        res.json({
            success: true,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = deleteReview;