const express = require("express");
const { isAuthenticated, authorizedRoles } = require("../../middleware/auth");
const router = express.Router();
const createUser = require("./createUser");
const loginUser = require("./loginUser");
const logout = require("./logout");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const getUserProfile = require("./getUserProfile");
const changePassword = require("./changePassword");
const updateProfile = require("./updateProfile");
const getAllUSer = require("./getAllUserForAdmin");
const getSingleUser = require("./getSingleUserForAdmin");

router.post("/api/v1/user", createUser);
router.post("/api/v1/login", loginUser);
router.post("/api/v1/logout", isAuthenticated, logout);
router.post("/api/v1/resetPassword", isAuthenticated, forgotPassword);
router.put("/api/v1/reset/:token", isAuthenticated, resetPassword);
router.get("/api/v1/me", isAuthenticated, getUserProfile);
router.put("/api/v1/changePassword", isAuthenticated, changePassword);
router.put("/api/v1/me/update", isAuthenticated, updateProfile);

//Admin route
router.get(
  "/api/v1/admin/users",
  isAuthenticated,
  authorizedRoles(["admin"]),
  getAllUSer
);
router.get(
  "/api/v1/admin/user/:id",
  isAuthenticated,
  authorizedRoles(["admin"]),
  getSingleUser
);

module.exports = router;
