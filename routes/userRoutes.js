const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/verification/:id', userController.assignVerification);

router.post('/login', userController.login);

// router.patch('/owner/:id', userController.addRestaurant);

router.post('/owner/:id', userController.signupOwner);

router.post('/signup', userController.signupUser);

module.exports = router;
