const express = require('express');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const {
    toggleLike,
    getLikes,
    getLikesCount
} = require('../controllers/like.controller');
const {
    toggleLikeValidator,
    getLikesValidator,
    getLikesCountValidator
} = require('../validators/like.validator');

const router = express.Router();

router.post('/:postId', auth, toggleLikeValidator, validate, toggleLike);
router.get('/:postId', getLikesValidator, validate, getLikes);
router.get('/:postId/count', getLikesCountValidator, validate, getLikesCount);    

module.exports = router;

