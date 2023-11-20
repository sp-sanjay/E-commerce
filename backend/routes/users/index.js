const express = require('express');
const {isAuthenticated} = require('../../middleware/auth');
const router = express.Router();
const createUser = require('./createUser');
const loginUser = require('./loginUser');
const logout = require('./logout');

router.post('/api/v1/user', createUser);
router.post('/api/v1/login', loginUser);
router.post('/api/v1/logout', isAuthenticated, logout);

module.exports = router;