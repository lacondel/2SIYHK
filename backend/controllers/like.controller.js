const asyncHandler = require('express-async-handler');
const likeService = require('../services/like.service');

// Add/remove like
const toggleLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    const result = await likeService.toggleLike(postId, userId);
    res.status(200).json(result);
});

// Getting a list of likes
const getLikes = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const result = await likeService.getLikes(postId);
    res.status(200).json(result);
});

// Getting likes count
const getLikesCount = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const result = await likeService.getLikesCount(postId);
    res.status(200).json(result);
});

module.exports = {
    toggleLike,
    getLikes,
    getLikesCount
};
