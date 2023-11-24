const express = require('express');
const {isAuthenticated} = require('../../middleware/auth');
const router = express.Router();
const createUser = require('./createUser');
const loginUser = require('./loginUser');
const logout = require('./logout');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');

router.post('/api/v1/user', createUser);
router.post('/api/v1/login', loginUser);
router.post('/api/v1/logout', isAuthenticated, logout);
router.post('/api/v1/resetPassword', isAuthenticated, forgotPassword);
router.put('/api/v1/reset/:token', isAuthenticated, resetPassword);

module.exports = router;