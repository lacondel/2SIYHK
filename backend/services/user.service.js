const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

class UserService {
    // Getting user data by ID
    async getUserById(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    // User update (login, avatar)
    async updateUser(userId, updates) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        if (updates.login) {
            const existingUser = await User.findOne({ login: updates.login });
            if (existingUser && existingUser._id.toString() !== userId) {
                throw new Error('Login already taken');
            }
            user.login = updates.login;
        }
        
        if (updates.avatar) {
            user.avatar = updates.avatar;
        }

        await user.save();
        return user;
    }

    // Password change
    async changePassword(userId, oldPassword, newPassword) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }

        user.password = newPassword;
        await user.save();
        return { message: 'Password updated successfully' };
    }

    // User deletion
    async deleteUser(userId, password) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }

        await Post.updateMany(
            { 'comments.author': userId },
            { $pull: { comments: { author: userId } } }
        );

        await Post.updateMany(
            { likes: userId },
            { $pull: { likes: userId } }
        );

        await Post.deleteMany({ author: userId });

        await User.findByIdAndDelete(userId);

        return { message: 'Account deleted successfully' };
    }

    // Deleting a user by admin
    async deleteUserByAdmin(userIdToDelete, adminId) {
        if (!mongoose.Types.ObjectId.isValid(userIdToDelete) || !mongoose.Types.ObjectId.isValid(adminId)) {
            throw new Error('Invalid user or admin ID');
        }

        const admin = await User.findById(adminId);
        if (admin.role !== 'admin') throw new Error('Access denied: admin only');

        await Post.updateMany(
            { 'comments.author': userIdToDelete },
            { $pull: { comments: { author: userIdToDelete } } }
        );

        await Post.updateMany(
            { likes: userIdToDelete },
            { $pull: { likes: userIdToDelete } }
        );

        await Post.deleteMany({ author: userIdToDelete });

        const user = await User.findByIdAndDelete(userIdToDelete);
        if (!user) throw new Error('User not found');

        return { message: 'User and all their data deleted by admin' };
    }
}

module.exports = new UserService();
