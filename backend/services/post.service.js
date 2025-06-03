const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

class PostService {
    // Post creation
    async createPost(title, content, authorId, tags = []) {
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            throw new Error('Invalid author ID');
        }

        const author = await User.findById(authorId);
        if (!author) throw new Error('Author not found');
        
        const post = new Post({ title, content, author: authorId, tags });
        await post.save();
        return post;
    }

    // Getting all the posts
    async getAllPosts() {
        return Post.find().populate('author', 'login');
    }

    // Getting a post by ID
    async getPostById(postId) {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error('Invalid post ID');
        }

        const post = await Post.findById(postId).populate('author', 'login');
        if (!post) throw new Error('Post not found');
        return post;
    }

    // Updating a post
    async updatePost(postId, userId, updates) {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid post or user ID');
        }

        const post = await Post.findOne({ _id: postId, author: userId });
        if (!post) throw new Error('Post not found or access denied');

        Object.assign(post, updates);
        await post.save();
        return post;
    }

    // Deleting a post
    async deletePost(postId, userId) {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid post or user ID');
        }

        const post = await Post.findOneAndDelete({ _id: postId, author: userId });
        if (!post) throw new Error('Post not found or access denied');
        return { message: 'Post deleted successfully'};
    }

    // Deleting a post by admin
    async deletePostByAdmin(postId, adminId) {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(adminId)) {
            throw new Error('Invalid post or admin ID');
        }

        const admin = await User.findById(adminId);
        if (admin.role !== 'admin') throw new Error('Access denied: admin only');

        const post = await Post.findOneAndDelete({ _id: postId });
        if (!post) throw new Error('Post not found');

        return { message: 'Post deleted by admin' };
    }
}

module.exports = new PostService();