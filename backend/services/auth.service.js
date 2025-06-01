const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    // Registration
    async register(login, email, password) {
        const mailVerification = await User.findOne({ email });
        if (mailVerification) throw new Error('Email already registered');

        const loginVerification = await User.findOne({ login });
        if (loginVerification) throw new Error('Login already taken');

        const user = new User({ 
            login, 
            email, 
            password,
            role: 'user'
        });
        
        await user.save();
        return user;
    }

    // Login
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password');

        const token = jwt.sign(
            { 
                id: user._id,
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return { 
            token, 
            user: {
                id: user._id,
                login: user.login,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        };
    }
}

module.exports = new AuthService();