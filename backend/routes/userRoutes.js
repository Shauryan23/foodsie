const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

/* Check again if JWT token verification takes place before applying for verification[*Below Route]
  by applying for verification for different restaurant id while signing in with different user
*/
router.post(
  '/verification/:id',
  authController.auth,
  userController.assignVerification,
);

router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMyPassword', authController.updatePassword);

router.post('/login', userController.login);

// router.patch('/owner/:id', userController.addRestaurant);

router.post('/owner/:id', authController.auth, userController.signupOwner);

router.post('/signup', userController.signupUser);

module.exports = router;
