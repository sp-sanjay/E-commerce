const getAllProducts = require("./getAllProducts");
const createProduct = require("./createProduct");
const updateProduct = require("./updateProduct");
const deleteProduct = require("./deleteProduct");
const getSingleProduct = require("./getSingleProduct");
const express = require("express");
const router = express.Router();

router.get("/api/v1/products", getAllProducts);
router.post("/api/v1/product", createProduct);
router.put("/api/v1/product/:id", updateProduct);
router.delete("/api/v1/product/:id", deleteProduct);
router.get("/api/v1/product/:id", getSingleProduct);

module.exports = router;
