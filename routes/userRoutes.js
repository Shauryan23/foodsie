const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.addUser);

router.post('/applyVerification', userController.assignVerification);

module.exports = router;
