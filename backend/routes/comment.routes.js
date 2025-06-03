const express = require('express');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const {
    addComment,
    deleteComment,
    deleteCommentByAdmin,
    getComments
} = require('../controllers/comment.controller');
const {
    addCommentValidator,
    deleteCommentValidator,
    getCommentsValidator
} = require('../validators/comment.validator');

const router = express.Router();

router.post('/:postId', auth, addCommentValidator, validate, addComment);
router.delete('/:postId/:commentIndex', auth, deleteCommentValidator, validate, deleteComment);
router.delete('/:postId/:commentIndex/admin', auth, deleteCommentValidator, validate, deleteCommentByAdmin);
router.get('/:postId', getCommentsValidator, validate, getComments);

module.exports = router;


