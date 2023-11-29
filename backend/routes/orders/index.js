const express = require("express");
const { isAuthenticated, authorizedRoles } = require("../../middleware/auth");
const getOrdersById = require("./getOrdersById");
const router = express.Router();

const createOrder = require('./createOrder');
const getMyOrders = require("./getMyOrders");
const getAllOrders = require("./admin/getAllOrders");
const updateOrder = require("./admin/updateOrder");
const deleteOrder = require("./admin/deleteOrder");

router.post("/api/v1/createOrder", isAuthenticated, createOrder)
router.get("/api/v1/orders/me", isAuthenticated, getMyOrders)
router.get("/api/v1/order/:id", isAuthenticated, getOrdersById)

// Admin**********
router.get("/api/v1/admin/orders", isAuthenticated, authorizedRoles(["admin"]),  getAllOrders)
router.put("/api/v1/admin/order/:id", isAuthenticated, authorizedRoles(["admin"]),  updateOrder)
router.delete("/api/v1/admin/order/:id", isAuthenticated, authorizedRoles(["admin"]),  deleteOrder)

module.exports = router;