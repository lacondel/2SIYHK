const { param } = require('express-validator');

const toggleLikeValidator = [
    param('postId')
        .isMongoId()
        .withMessage('Invalid post ID')
];

const getLikesValidator = [
    param('postId')
        .isMongoId()
        .withMessage('Invalid post ID')
];

const getLikesCountValidator = [
    param('postId')
        .isMongoId()
        .withMessage('Invalid post ID')
];

module.exports = {
    toggleLikeValidator,
    getLikesValidator,
    getLikesCountValidator
}; 