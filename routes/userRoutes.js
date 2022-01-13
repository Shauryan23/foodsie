const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/verification/:id', userController.assignVerification);

router.post('/login', userController.login);

// router.patch('/owner/:id', userController.addRestaurant);

router.post('/owner/:id', authController.auth, userController.signupOwner);

router.post('/signup', userController.signupUser);

module.exports = router;
