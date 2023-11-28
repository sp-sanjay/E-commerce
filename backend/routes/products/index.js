const getAllProducts = require("./getAllProducts");
const createProduct = require("./createProduct");
const updateProduct = require("./updateProduct");
const deleteProduct = require("./deleteProduct");
const getSingleProduct = require("./getSingleProduct");
const express = require("express");
const router = express.Router();
const {isAuthenticated, authorizedRoles} = require('../../middleware/auth');
const create_updateProductReview = require("./review/create_updateProductReview");
const getAllReview = require("./review/getAllReview");
router.get("/api/v1/products", getAllProducts);
router.post("/api/v1/product",isAuthenticated, authorizedRoles(['admin']), createProduct);
router.put("/api/v1/product/:id", isAuthenticated, authorizedRoles(['admin']), updateProduct);
router.delete("/api/v1/product/:id", isAuthenticated, authorizedRoles(['admin']), deleteProduct);
router.get("/api/v1/product/:id", getSingleProduct);
router.put("/api/v1/review", isAuthenticated, create_updateProductReview);
router.get("/api/v1/getAllreview", getAllReview);

module.exports = router;
