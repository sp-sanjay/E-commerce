const express = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const router = express.Router();

const createOrder = require('./createOrder');

router.post("/api/v1/createOrder", isAuthenticated, createOrder)

module.exports = router;