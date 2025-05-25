const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    // Registration
    async register(login, email, password) {
        const userExists = await User.findOne({ email });
        if (userExists) throw new Error('User already exists');

        const user = new User({ login, email, password });
        await user.save();
        return user;
    }

    // Login
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
    }
}

module.exports = new AuthService();