const { body } = require('express-validator');

const registerValidator = [
    body('login')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Login must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Login can only contain letters, numbers and underscores'),
    
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
];

const loginValidator = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

module.exports = {
    registerValidator,
    loginValidator
}; 