const ProductModel = require("../../../models/productModel");

const create_updateProductReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        const product = await ProductModel.findById(productId);
        
        const index = product.reviews.findIndex((rev) => rev.user.toString() === req.user._id.toString())
        const isReviewd = index != -1
        if(isReviewd) {
            product.reviews[index] = review;
        } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }
        let total = 0;
        product.reviews.forEach(rev => total += rev.rating)
        product.ratings = total/product.reviews.length;
        await product.save({validateBeforeSave: false});

        res.json({
            success: true,
            product
        })
    } catch(err) {
        res.status(500).send(err.message)
    }
}

module.exports = create_updateProductReview;