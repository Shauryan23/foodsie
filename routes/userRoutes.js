const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/:id/applyVerification', userController.assignVerification);

router.post('/:id', userController.addOwner);

router.post('/', userController.addUser);

module.exports = router;
