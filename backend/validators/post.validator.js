const { body, param } = require('express-validator');

const createPostValidator = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters')
        .escape(),
    
    body('content')
        .trim()
        .isLength({ min: 10, max: 5000 })
        .withMessage('Content must be between 10 and 5000 characters')
        .escape(),
    
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array')
        .custom((tags) => {
            if (tags && tags.length > 10) {
                throw new Error('Maximum 10 tags allowed');
            }
            if (tags && tags.some(tag => typeof tag !== 'string' || tag.length > 30)) {
                throw new Error('Each tag must be a string with maximum length of 30 characters');
            }
            return true;
        })
];

const updatePostValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid post ID'),
    
    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters')
        .escape(),
    
    body('content')
        .optional()
        .trim()
        .isLength({ min: 10, max: 5000 })
        .withMessage('Content must be between 10 and 5000 characters')
        .escape(),
    
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array')
        .custom((tags) => {
            if (tags && tags.length > 10) {
                throw new Error('Maximum 10 tags allowed');
            }
            if (tags && tags.some(tag => typeof tag !== 'string' || tag.length > 30)) {
                throw new Error('Each tag must be a string with maximum length of 30 characters');
            }
            return true;
        })
];

const deletePostValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid post ID')
];

const deletePostByAdminValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid post ID')
];

const getPostByIdValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid post ID')
];

module.exports = {
    createPostValidator,
    updatePostValidator,
    deletePostValidator,
    deletePostByAdminValidator,
    getPostByIdValidator
}; 