const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');

class LikeService {
    // Add/remove like
    async toggleLike(postId, userId) {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid post or user ID');
        }

        const [post, user] = await Promise.all([
            Post.findById(postId),
            User.findById(userId)
        ]);

        if (!post) throw new Error('Post not found');
        if (!user) throw new Error('User not found');

        const likeIndex = post.likes.indexOf(userId);
        
        if (likeIndex === -1) {
            await Post.findByIdAndUpdate(
                postId,
                { $push: { likes: userId } }
            );
        } else {
            await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } }
            );
        }

        return { 
            message: likeIndex === -1 ? 'Like added' : 'Like removed',
            likesCount: likeIndex === -1 ? post.likes.length + 1 : post.likes.length - 1
        };
    }

    // Getting a list of likes
    async getLikes(postId) {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error('Invalid post ID');
        }

        const post = await Post.findById(postId)
            .populate('likes', 'login avatar')
            .select('likes');
            
        if (!post) throw new Error('Post not found');
        return post.likes;
    }

    // Getting likes count
    async getLikesCount(postId) {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error('Invalid post ID');
        }

        const post = await Post.findById(postId).select('likes');
        if (!post) throw new Error('Post not found');
        
        return { likesCount: post.likes.length };
    }
}

module.exports = new LikeService();