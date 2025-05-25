const postService = require('../services/post.service');

// Post creation
exports.createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const authorId = req.userId;
        const post = await postService.createPost(title, content, authorId, tags);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Getting all the posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' }); 
    }
};

// Getting a post by ID
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postService.getPostById(postId);
        res.status(200).json(post);
    } catch (err) {
        if (err.message === 'Post not found') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

// Updating a post
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;
        const updates = req.body;

        const updatedPost = await postService.updatePost(postId, userId, updates);
        res.status(200).json(updatedPost);
    } catch (err) {
        if (err.message === 'Post not found or access denied') {
            res.status(403).json({ error: err.message }); 
        } else {
            res.status(500). json({ error: 'Failed to update post' });
        }
    }
};

// Deleting a post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;

        await postService.deletePost(postId, userId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        if (err.message === 'Post not found or access denied') {
            res.status(403).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete post' });
        }
    }
}