const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('role')) {
        throw new Error('Role cannot be modified');
    }

    if (!this.isModified('password')) {
        return next();
    } else {
        this.password = await bcrypt.hash(this.password, 12);
    }
    
    next();
});

module.exports = mongoose.model('User', userSchema);