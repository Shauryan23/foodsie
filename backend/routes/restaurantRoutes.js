const express = require('express');

const authController = require('../controllers/authController');
const foodController = require('../controllers/foodController');

const router = express.Router();

router.post(
  '/',
  authController.restrictTo('owner'),
  authController.auth,
  foodController.postFood,
);

router.patch(
  '/:id',
  authController.restrictTo('owner'),
  authController.auth,
  foodController.editFood,
);

router.delete(
  '/:id',
  authController.restrictTo('owner'),
  authController.auth,
  foodController.deleteFood,
);

router.delete(
  '/foods/deleteAll',
  authController.restrictTo('owner'),
  authController.auth,
  foodController.deleteAllFoods,
);
