const asyncHandler = require('express-async-handler');
const commentService = require('../services/comment.service');

// Adding a comment
const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const { text } = req.body;

    const result = await commentService.addComment(postId, userId, text);
    res.status(201).json(result);
});

// Deleting a comment
const deleteComment = asyncHandler(async (req, res) => {
    const { postId, commentIndex } = req.params;
    const userId = req.user._id;

    const result = await commentService.deleteComment(postId, userId, commentIndex);
    res.status(200).json(result);
});

// Deleting a comment by admin
const deleteCommentByAdmin = asyncHandler(async (req, res) => {
    const { postId, commentIndex } = req.params;
    const adminId = req.user._id;

    const result = await commentService.deleteCommentByAdmin(postId, commentIndex, adminId);
    res.status(200).json(result);
});

// Getting comments
const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const result = await commentService.getComments(postId);
    res.status(200).json(result);
});

module.exports = {
    addComment,
    deleteComment,
    deleteCommentByAdmin,
    getComments
};
