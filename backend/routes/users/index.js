const express = require('express');
const {isAuthenticated} = require('../../middleware/auth');
const router = express.Router();
const createUser = require('./createUser');
const loginUser = require('./loginUser');
const logout = require('./logout');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const getUserProfile = require('./getUserProfile');
const changePassword = require('./changePassword');

router.post('/api/v1/user', createUser);
router.post('/api/v1/login', loginUser);
router.post('/api/v1/logout', isAuthenticated, logout);
router.post('/api/v1/resetPassword', isAuthenticated, forgotPassword);
router.put('/api/v1/reset/:token', isAuthenticated, resetPassword);
router.get('/api/v1/me', isAuthenticated, getUserProfile);
router.put('/api/v1/changePassword', isAuthenticated, changePassword);

module.exports = router;