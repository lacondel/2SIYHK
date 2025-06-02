const asyncHandler = require('express-async-handler');
const userService = require('../services/user.service');

// Getting user data by ID
const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.user._id);
    res.status(200).json(user);
});

// User update (login, avatar)
const updateUser = asyncHandler(async (req, res) => {
    const updates = req.body;

    const updatedUser = await userService.updateUser(req.user._id, updates);
    res.status(200).json(updatedUser);
});

// Password change
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const result = await userService.changePassword(req.user._id, oldPassword, newPassword);
    res.status(200).json(result);
});

// User deletion
const deleteUser = asyncHandler(async (req, res) => {
    const { password } = req.body;

    const result = await userService.deleteUser(req.user._id, password);
    res.status(200).json(result);   
});

// User deletion by admin
const deleteUserByAdmin = asyncHandler(async (req, res) => {
    const userIdToDelete = req.params.id;
    const adminId = req.user._id;

    const result = await userService.deleteUserByAdmin(userIdToDelete, adminId);
    res.status(200).json(result);
});

module.exports = {
    getUserById,
    updateUser,
    changePassword,
    deleteUser,
    deleteUserByAdmin
};