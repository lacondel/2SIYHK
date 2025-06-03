const express = require('express');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const {
    getUserById,
    updateUser,
    changePassword,
    deleteUser,
    deleteUserByAdmin,
    getUserPosts
} = require('../controllers/user.controller');
const {
    updateUserValidator,
    changePasswordValidator,
    deleteUserValidator,
    deleteUserByAdminValidator
} = require('../validators/user.validator');

const router = express.Router();

router.get('/', auth, getUserById);
router.get('/posts', auth, getUserPosts);
router.put('/update', auth, updateUserValidator, validate, updateUser);
router.put('/change-password', auth, changePasswordValidator, validate, changePassword);
router.delete('/delete', auth, deleteUserValidator, validate, deleteUser);
router.delete('/:userId/admin', auth, deleteUserByAdminValidator, validate, deleteUserByAdmin);

module.exports = router;

