const asyncHandler = require('express-async-handler');
const authService = require('../services/auth.service');

const registration = asyncHandler(async (req, res) => {
    const { login, email, password } = req.body;
    const user = await authService.register(login, email, password);
    res.status(201).json({ message: 'User created!', user }); 
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.json({ token, user: { id: user._id, login: user.login }});
});

module.exports = {
    registration,
    login
};