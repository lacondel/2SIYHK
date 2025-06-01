const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');

class CommentService {
    // Adding a comment
    async addComment(postId, userId, text) {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid post or user ID');
        }

        if (!text || text.trim().length === 0) {
            throw new Error('Comment text cannot be empty');
        }

        const [post, user] = await Promise.all([
            Post.findById(postId),
            User.findById(userId)
        ]);

        if (!post) throw new Error('Post not found');
        if (!user) throw new Error('User not found');

        const comment = {
            text: text.trim(),
            author: userId,
            createdAt: new Date()
        };

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: comment } },
            { new: true }
        ).populate('comments.author', 'login avatar');

        return updatedPost.comments[updatedPost.comments.length - 1];
    } 

    // Deleting a comment
    async deleteComment(postId, userId, commentIndex) {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid post or user ID');
        }

        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');

        if (commentIndex < 0 || commentIndex >= post.comments.length) {
            throw new Error('Invalid comment index');
        }

        const comment = post.comments[commentIndex];
        if (comment.author.toString() !== userId) {
            throw new Error('Access denied: you can only delete your own comments');
        }

        await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: post.comments[commentIndex] } }
        );

        return { message: 'Comment deleted successfully' };
    }

    // Deleting a comment by admin
    async deleteCommentByAdmin(postId, commentIndex, adminId) {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(adminId)) {
            throw new Error('Invalid post or admin ID');
        }

        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            throw new Error('Access denied: admin only');
        }

        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');

        if (commentIndex < 0 || commentIndex >= post.comments.length) {
            throw new Error('Invalid comment index');
        }

        await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: post.comments[commentIndex] } }
        );

        return { message: 'Comment deleted by admin' };
    }
    
    // Getting post comments
    async getComments(postId) {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error('Invalid post ID');
        }

        const post = await Post.findById(postId)
            .populate('comments.author', 'login avatar')
            .select('comments');
            
        if (!post) throw new Error('Post not found');

        return post.comments.sort((a, b) => b.createdAt - a.createdAt);
    }
}

module.exports = new CommentService();