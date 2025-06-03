const express = require('express');
const { registration, login } = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const validate = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/register', registerValidator, validate, registration);
router.post('/login', loginValidator, validate, login);

module.exports = router;
