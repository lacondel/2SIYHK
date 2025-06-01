const userService = require('../services/user.service');

// Getting user data by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.userId);
        res.status(200).json(user);
    } catch (err) {
        if (err.message === 'User not found') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Failed to get user data' });
        }
    }
};

// User update (login, avatar)
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await userService.updateUser(req.userId, updates);
        res.status(200).json(updatedUser);
    } catch (err) {
        if (err.message === 'User not found') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }
};

// Password change
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const result = await userService.changePassword( req.userId, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (err) {
        if (err.message === 'User not found') {
            res.status(404).json({ error: err.message });
        } else if (err.message === 'Current password is incorrect') {
            res.status(401).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Failed to change password' });
        }
    }
};

// User deletion
exports.deleteUser = async (req, res) => {
    try {
        const { password } = req.body;
        const result = await userService.deleteUser(req.userId, password);
        res.status(200).json(result);
    } catch (err) {
        if (err.message === 'User not found') {
            res.status(404).json({ error: err.message });
        } else if (err.message === 'Invalid password') {
            res.status(401).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
};