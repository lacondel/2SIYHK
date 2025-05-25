const Post = require('../models/Post');

class PostService {
    // Post creation
    async createPost(title, content, authorId, tags = []) {
        const post = new Post({ title, content, author: authorId, tags });
        await post.save();
        return post;
    }

    // Getting all the posts
    async getAllPosts() {
        return Post.find().populate('author', 'login');
    }

    // Getting a post by ID
    async getPostById(id) {
        const post = await Post.findById(id).populate('author', 'login');
        if (!post) throw new Error('Post not found');
        return post;
    }

    // Updating a post
    async updatePost(id, userId, updates) {
        const post = await Post.findOne({ _id: id, author: userId });
        if (!post) throw new Error('Post not found or access denied');

        Object.assign(post, updates);
        await post.save();
        return post;
    }

    // Deleting a post
    async deletePost(is, userId) {
        const post = await Post.findOneAndDelete({ _id: id, author: userId });
        if (!post) throw new Error('Post not found or access denied');
        return post;
    }
}

module.exports = new PostService();