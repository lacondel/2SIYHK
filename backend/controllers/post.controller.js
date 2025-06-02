const asyncHandler = require('express-async-handler');
const postService = require('../services/post.service');

// Post creation
const createPost = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;
    const authorId = req.userId;

    const post = await postService.createPost(title, content, authorId, tags);
    res.status(201).json(post);
});

// Getting all the posts
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
});

// Getting a post by ID
const getPostById = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    const post = await postService.getPostById(postId);
    res.status(200).json(post);
});

// Updating a post
const updatePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;
    const updates = req.body;

    const updatedPost = await postService.updatePost(postId, userId, updates);
    res.status(200).json(updatedPost);
});

// Deleting a post
const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    const result = await postService.deletePost(postId, userId);
    res.status(200).json(result);
});

// Deleting a post by admin
const deletePostByAdmin = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const adminId = req.userId;

    const result = await postService.deletePostByAdmin(postId, adminId);
    res.status(200).json(result);
});

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    deletePostByAdmin
};
