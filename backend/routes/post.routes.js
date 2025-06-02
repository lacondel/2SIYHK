const express = require('express');
const auth = require('../middleware/auth.middleware');
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    deletePostByAdmin
} = require('../controllers/post.controller');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.delete('/:id/admin', auth, deletePostByAdmin);

module.exports = router;

