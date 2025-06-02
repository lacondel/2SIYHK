const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

class AuthService {
    // Registration
    async register(login, email, password) {
        const existingUser = await User.findOne({ $or: [{ email }, { login }] });
        if (existingUser) {
            throw new Error('Email or login is already in use');
        }

        const user = new User({
            login,
            email,
            password
        });

        await user.save();

        const token = this.generateToken(user._id);

        return { token };
    }

    // Login
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password');

        const token = this.generateToken(user._id);

        return { user, token };
    }

    generateToken(userId) {
        return jwt.sign(
            { userId },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );
    }
}

module.exports = new AuthService();