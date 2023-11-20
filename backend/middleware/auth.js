const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')
const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please Authenticated");
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const authorizedRoles = (roles) => {
    try {
        return (req, res, next) => {
            if(!roles.includes(req.user.role)) {
                throw new Error(`${req.user.role} Role is not Valid for this request`)
            }
            next();
        }
    } catch (err) {
        res.status(403).send(err.message)
    }
}
module.exports = { isAuthenticated, authorizedRoles };
