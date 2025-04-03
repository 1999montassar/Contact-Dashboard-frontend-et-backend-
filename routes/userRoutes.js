const express = require('express');
const { loginUser, registerUser, forgotPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;
