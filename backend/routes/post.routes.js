const express = require('express');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    deletePostByAdmin
} = require('../controllers/post.controller');
const {
    createPostValidator,
    updatePostValidator,
    deletePostValidator,
    deletePostByAdminValidator,
    getPostByIdValidator
} = require('../validators/post.validator');

const router = express.Router();

router.post('/', auth, createPostValidator, validate, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostByIdValidator, validate, getPostById);
router.put('/:id', auth, updatePostValidator, validate, updatePost);
router.delete('/:id', auth, deletePostValidator, validate, deletePost);
router.delete('/:id/admin', auth, deletePostByAdminValidator, validate, deletePostByAdmin);

module.exports = router;

