const express = require('express');

const profileController = require('../controllers/profileController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/me', authController.auth, profileController.addProfile);

router.patch('/me', authController.auth, profileController.editProfile);

module.exports = router;
