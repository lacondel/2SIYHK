const { body, param } = require('express-validator');

const updateUserValidator = [
    body('login')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Login must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Login can only contain letters, numbers and underscores'),
    
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    
    body('avatar')
        .optional()
        .isURL()
        .withMessage('Invalid avatar URL')
];

const changePasswordValidator = [
    body('oldPassword')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Current password must be at least 6 characters long'),
    
    body('newPassword')
        .trim()
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
        .custom((value, { req }) => {
            if (value === req.body.currentPassword) {
                throw new Error('New password must be different from current password');
            }
            return true;
        })
];

const deleteUserValidator = [
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

const deleteUserByAdminValidator = [
    param('userId')
        .isMongoId()
        .withMessage('Invalid user ID')
];

module.exports = {
    updateUserValidator,
    changePasswordValidator,
    deleteUserValidator,
    deleteUserByAdminValidator
}; 