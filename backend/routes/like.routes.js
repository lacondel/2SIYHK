const express = require('express');
const auth = require('../middleware/auth.middleware');
const {
    toggleLike,
    getLikes,
    getLikesCount
} = require('../controllers/like.controller');

const router = express.Router();

router.post('/:postId', auth, toggleLike);
router.get('/:postId', getLikes);
router.get('/:postId/count', getLikesCount);    

module.exports = router;

