const express = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const getOrdersById = require("./admin/getOrdersById");
const router = express.Router();

const createOrder = require('./createOrder');
const getMyOrders = require("./getMyOrders");

router.post("/api/v1/createOrder", isAuthenticated, createOrder)
router.get("/api/v1/orders/me", isAuthenticated, getMyOrders)
router.get("/api/v1/order/:id", isAuthenticated, getOrdersById)

module.exports = router;