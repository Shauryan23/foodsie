const express = require('express');

const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post(
  '/',
  authController.auth,
  orderController.addOrderItems,
);

router.get(
  '/',
  authController.restrictTo('owner'),
  authController.auth,
  orderController.getAllOrderItems,
);

router.get(
  '/my-orders',
  authController.auth,
  getMyOrders,
);

router.get(
  '/:id',
  authController.auth,
  getOrderById,
);
