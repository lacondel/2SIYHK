const express = require('express');
const auth = require('../middleware/auth.middleware');
const {
    getUserById,
    updateUser,
    changePassword,
    deleteUser,
    deleteUserByAdmin
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.put('/:id/password', auth, changePassword);
router.delete('/:id', auth, deleteUser);
router.delete('/:id/admin', auth, deleteUserByAdmin);

module.exports = router;

