const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/verification/:id', userController.assignVerification);

router.post('/owner/:id', userController.addOwner);

router.patch('/owner/:id', userController.addRestaurant);

router.post('/', userController.addUser);

module.exports = router;
