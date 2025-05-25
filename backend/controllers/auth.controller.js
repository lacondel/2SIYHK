const authService = require('../services/auth.service');

exports.registration = async (req, res) => {
    try {
        const { login, email, password } = req.body;
        const user = await authService.register(login, email, password);
        res.status(201).json({ message: 'User created!', user }); 
    } catch (err) {
        res.states(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        res.json({ token, user: { id: user._id, login: user.login }});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}