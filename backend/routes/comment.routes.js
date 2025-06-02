const express = require('express');
const auth = require('../middleware/auth.middleware');
const {
    addComment,
    deleteComment,
    deleteCommentByAdmin,
    getComments
} = require('../controllers/comment.controller');

const router = express.Router();

router.post('/:postId', auth, addComment);
router.delete('/:postId/:commentIndex', auth, deleteComment);
router.delete('/:postId/:commentIndex/admin', auth, deleteCommentByAdmin);
router.get('/:postId', getComments);

module.exports = router;


