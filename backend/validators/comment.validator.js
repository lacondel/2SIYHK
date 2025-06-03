const { body, param } = require('express-validator');

const addCommentValidator = [
    param('postId')
        .isMongoId()
        .withMessage('Invalid post ID'),
    
    body('text')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Comment must be between 1 and 1000 characters')
        .escape()
];

const deleteCommentValidator = [
    param('postId')
        .isMongoId()
        .withMessage('Invalid post ID'),
    
    param('commentIndex')
        .isInt({ min: 0 })
        .withMessage('Invalid comment index')
];

const getCommentsValidator = [
    param('postId')
        .isMongoId()
        .withMessage('Invalid post ID')
];

module.exports = {
    addCommentValidator,
    deleteCommentValidator,
    getCommentsValidator
}; 