const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, jwtConfig.secret);
        
        const user = await User.findOne({ _id: decoded.userId });
        
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        req.token = token;
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please, authorize' });
    }
};

module.exports = auth; 